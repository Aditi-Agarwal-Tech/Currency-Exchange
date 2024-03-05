const express = require("express");
const db = require("./database");
const jwt = require("jsonwebtoken")
const { verifyJWT } = require("./authentication");

const router = express.Router();

router.get("/check", verifyJWT, (req, res) => {
    console.log("checking");
    res.send("authenticated");
});

router.post("/wallet", verifyJWT, (req, res) => {
    const userId = req.body.userId;
    db.query(
        "SELECT currency, amount FROM wallet WHERE userId = ?",
        [userId],
        (err, result) => {
            if(err) {
                console.log(err);
                res.send({err: err});
            }
            if(result) {
                res.send({walletData: result});
            }
        }
    )
});

router.post("/currencyList", (req, res) => {
    console.log("fetching currency list")
    db.query(
        "SELECT DISTINCT currencyFrom FROM exchangevalue",
        (err, result) => {
            if(err) {
                console.log(err);
                res.send({err: err});
            }
            if(result) {
                const currencyList = result.map((item) => item.currencyFrom);
                console.log(currencyList);
                res.send({currencyList: currencyList});
            }
        }
    )
});

router.post("/exchangerate", verifyJWT, (req, res) => {
    const currencyFrom = req.body.currencyFrom;
    const currencyTo = req.body.currencyTo;
    db.query(
        "SELECT multiplicationFactor FROM exchangevalue WHERE currencyFrom = ? AND currencyTo = ?",
        [currencyFrom, currencyTo],
        (err, result) => {
            if(err) {
                console.log(err);
                res.send({err: err});
            }
            if(result.length>0) {
                res.send({exchangeRate: result[0].multiplicationFactor});
            } else {
                res.send({exchangeRate: 1});
            }
        }
    )
});

router.post("/transactions", verifyJWT, (req, res) => {
    const userId = req.body.userId;
    db.query(
        "SELECT * FROM transactions where userId = ?",
        [userId],
        (err, result) => {
            if(err) {
                console.log(err);
                res.send({err: err});
            }
            if(result) {
                res.send({transactionData: result});
            }
        }
    )
});

router.post("/registerTransaction", verifyJWT, (req, res) => {
    const userId = req.body.userId;
    const currencyFrom = req.body.currencyFrom;
    const valueFrom = req.body.valueFrom;
    const currencyTo = req.body.currencyTo;
    const valueTo = req.body.valueTo;

    console.log(req.body);

    db.query(
        "SELECT amount FROM wallet WHERE userId = ? AND currency = ?",
        [userId, currencyFrom],
        (err, result) => {
            if(err) {
                console.log(err);
                res.send({err: err});
            }
            if(result.length>0 && result[0].amount>=valueFrom) {
                const balanceFrom = result[0].amount-valueFrom;
                db.query(
                    "UPDATE wallet SET amount = ? WHERE userId = ? AND currency = ?",
                    [balanceFrom, userId, currencyFrom],
                    (err2, result2) => {
                        if(err2) {
                            console.log(err2);
                            res.send({err: err2});
                        }
                        if(result2) {
                            console.log("first currency updated");
                        }
                    }
                )

                console.log("before second query");
                db.query(
                    "SELECT amount FROM wallet WHERE userId = ? AND currency = ?",
                    [userId, currencyTo],
                    (err2, result2) => {
                        console.log("inside second query")
                        if (err2) {
                            console.log(err2)
                            res.send({ err: err2 })
                        }
                        if (result2.length > 0) {
                            const balanceTo = result2[0].amount + valueTo;
                            console.log("value To = "+valueTo)
                            db.query(
                                "UPDATE wallet SET amount = ? WHERE userId = ? AND currency = ?",
                                [balanceTo, userId, currencyTo],
                                (err3, result3) => {
                                    if (err3) {
                                        console.log(err3)
                                        res.send({ err: err3 })
                                    }
                                    if (result3) {
                                        console.log("second currency updated")
                                    }
                                }
                            )
                        } else {
                            db.query(
                                "INSERT INTO wallet VALUES(?,?,?)",
                                [userId, currencyTo, valueTo],
                                (err3, result3) => {
                                    if (err3) {
                                        console.log(err3)
                                        res.send({ err: err3 })
                                    }
                                    if (result3) {
                                        console.log("second currency updated")
                                    }
                                }
                            )
                        }
                    }
                )

                db.query(
                    "INSERT INTO transactions(userId, currencyFrom, currencyTo, valueFrom, valueTo) VALUES (?,?,?,?,?)",
                    [userId, currencyFrom, currencyTo, valueFrom, valueTo],
                    (err, result) => {
                        if(err) {
                            console.log(err);
                            res.send({err: err});
                        }
                        if(result) {
                            console.log("transaction added");
                        }
                    }
                )
            } else {
                res.send({message: "Insufficient balance"});
            }
        }
    )
});

router.get("/", (req, res) => {
    if (req.session.username) {
        res.json({valid: true, username: req.session.username});
    } else {
        res.json({valid: false});
    }
});

router.post("/login", (req, res) => {
    console.log("login api called");
    const email = req.body.email;
    const password = req.body.password;
    console.log(email + " " + password);
    
    db.query(
        "SELECT * FROM user WHERE email = ? and password = ?",
        [email, password],
        (err, result) => {
            if(err) {
                console.log("error in login" + err);
                res.send({err: err});
            }
            if(result.length>0) {
                console.log("result length 1")
                
                const id = result[0].id
                const token = jwt.sign({id}, "jwtSecret", {
                    expiresIn: 300*12,
                })
                req.session.username = result[0].name;
                console.log("session " + req.session.username);
                res.send({auth: true, token: token, result: result[0]});
            } else {
                console.log("result length 0")
                res.send({auth: false, message: "wrong credentials"});
            } 
        }    
    )
});

router.post("/logout", (req, res) => {
    req.session.destroy();
    res.json({status: "success"});
});

module.exports = { init: (app) => app.use("/", router) };

const express = require("express")
const app = express()
const mysql = require("mysql")
const cors  = require("cors")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const bodyParser = require("body-parser")

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 'sessionSecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000*60*60*24
    }
}))

const db = mysql.createConnection({
    user: process.env.DB_USERNAME || "root",
    host: process.env.DB_HOST || "localhost",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "currency_exchange"
});

const verifyJWT = (req, res, next) => {
    console.log("verifying")
    const token = req.headers["x-access-token"]
    console.log(token)
    if(!token) {
        res.send("send a token")
    } else {
        console.log("verifying 2")
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if(err) {
                console.log(err)
                res.send({auth: false, message: "failed to authenticate"});
            } else {
                console.log("success");
                // req.userId = decoded.id;
                next();
            }
        });
    }
};

app.get("/check", verifyJWT, (req, res) => {
    console.log("checking");
    res.send("authenticated");
})

app.post("/wallet", verifyJWT, (req, res) => {
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
})

app.post("/exchangerate", verifyJWT, (req, res) => {
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
            if(result) {
                res.send({exchangeRate: result[0] ?? 2});
            }
        }
    )
})

app.post("/transactions", verifyJWT, (req, res) => {
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
})

app.post("/registerTransaction", verifyJWT, (req, res) => {
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
                            // res.send({data: result2});
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
                                        // res.send({ data: result3 })
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
                                        // res.send({ data: result3 })
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
                            // res.send({data: result});
                        }
                    }
                )
            } else {
                res.send({message: "Insufficient balance"});
            }
        }
    )
})

app.get("/", (req, res) => {
    if(req.session.username) {
        res.json({valid: true, username: req.session.username});
    } else {
        res.json({valid: false});
    }
});

app.post("/login", (req, res) => {
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

app.post("/logout", (req, res) => {
    req.session.destroy();
    res.json({status: "success"});
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening");
})

app.get("/", (req,res) => {
    res.json({message: "this is from backend"});
})
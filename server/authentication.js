const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    console.log("verifying");
    const token = req.headers["x-access-token"];
    console.log(token);
    if (!token) {
        res.send("send a token");
    } else {
        console.log("verifying 2");
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err) {
                console.log(err);
                res.send({auth: false, message: "failed to authenticate"});
            } else {
                console.log("success");
                next();
            }
        });
    }
};

module.exports = { verifyJWT };

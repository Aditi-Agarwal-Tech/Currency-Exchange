const mysql = require("mysql");

const db = mysql.createConnection({
    user: process.env.DB_USERNAME || "root",
    host: process.env.DB_HOST || "localhost",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "currency_exchange"
});

module.exports = db;

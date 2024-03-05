const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();

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
}));

routes.init(app);

const port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log("Listening");
});

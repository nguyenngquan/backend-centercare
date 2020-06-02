require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

var app = express();
var port = process.env.port || 3300;

app.listen(port, () => {
  console.log("Hi This port is running");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", true);
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

var router = require("./routes")();
var auth = require("./auth")();
var authMiddleware = require("./middleware/auth.middleware");

app.use("/api", authMiddleware, router);
app.use("/auth", auth);

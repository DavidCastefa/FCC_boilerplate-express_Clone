var express = require('express');
var app = express();
require('dotenv').config();

app.use("/json", (req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip)
  next();
  }
);

console.log("Hello World");

// app.get("/", (req, res) => res.send("Hello Express"));

console.log(process.env.MESSAGE_STYLE, "= message style")

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));
app.use("/public", express.static(__dirname + "/public"));
app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE == "uppercase") {
    res.json({message: "HELLO JSON"})
  } else {
    res.json({message: "Hello json"})
  }
});

app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
 },
  (req, res) => res.send( { time: req.time } )  // res.json() works too
);

app.get("/:word/echo", (req, res) => {
  res.json( { echo: req.params.word} )
});

app.get("/name", (req, res) => {
  res.json( { name: `${req.query.first} ${req.query.last}`} )
});

module.exports = app;

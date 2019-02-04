var express = require("express");
var app = express();

var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");

// BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

var env = require("dotenv").load();

var models = require("./app/models");

models.sequelize.sync().then(function() {
    console.log("Database looks good!");
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});

app.get("/", function(req, res) {
    res.send("Welcome to Passport with Sequelize!");
});

app.listen(5000, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Site is Live!");
    };
});


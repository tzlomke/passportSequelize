// Imports
var express = require("express");
var app = express();
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
var env = require("dotenv").load();
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 5000;

// BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());


// Views
app.set("views", "./app/views");
app.engine("hbs", exphbs({
    extname: "hbs"
}));
app.set("view engine", ".hbs");

app.get("/", function(req, res) {
    res.send("Welcome to Passport with Sequelize!");
});

// Models
var models = require("./app/models");

// Routes
var authRoute = require("./app/routes/auth")(app, passport);

// Passport Strategy
require("./config/passport")(passport, models.user);

// Sync Database
models.sequelize.sync().then(function() {
    console.log("Database looks good!");
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});

app.listen(PORT, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Site is Live on Port " + PORT);
    };
});


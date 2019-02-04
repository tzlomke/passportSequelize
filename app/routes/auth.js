var authController = require("../controllers/authcontroller");

module.exports = function (app, passport) {

    // Get Routes
    app.get("/signup", authController.signup);
    
    app.get("/signin", authController.signin);

    app.get("/dashboard", isLoggedIn, authController.dashboard);

    app.get("/logout", authController.logout);

    // Post Routes
    app.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/dashboard",
        failureRedirect: "/signup"
    }));

    app.post('/signin', passport.authenticate("local-signin", {
            successRedirect: "/dashboard",
            failureRedirect: "/signin"
        }
    ));

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        };

        res.redirect("/signin");
    }
};
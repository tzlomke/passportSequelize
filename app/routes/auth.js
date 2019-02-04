var authController = require("../controllers/authcontroller");

module.exports = function(app, passport) {
    
    // Get Routes
    app.get("/signup", authController.signup);
    app.get("/signin", authController.signin);

    app.get('/dashboard',authController.dashboard)

    // Post Routes
    app.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/dashboard",
        failureRedirect: "/signup"
    }));
};
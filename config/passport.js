var bCrypt = require("bcrypt-nodejs");

module.exports = function(passport, user) {
    var User = user;
    var LocalStrategy = require("passport-local").Strategy;

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            };
        });
    });

    // Signup
    passport.use("local-signup", new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        },

        function(req, username, password, done) {
            var generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            User.findOne({
                where: {
                    username: username
                }
            }).then(function(user) {
                if (user) {
                    return done(null, false, {
                        message: "That username is already taken."
                    });
                } else {
                    var userPassword = generateHash(password);
                    var data = {
                        username: username,
                        password: userPassword
                    };
                    User.create(data).then(function(newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        };
                        if (newUser) {
                            return done(null, newUser, created);
                        };
                    });
                }
            });
        }
    ));

    // Signin
    passport.use("local-signin", new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        }, 

        function(req, username, password, done) {
            var User = user;

            var isValidPassword = function(userpass, password) {
                return bCrypt.compareSync(password, userpass);
            };

            User.findOne({
                where: {
                    username: username
                }
            }).then(function(user) {
                if (!user) {
                    return done(null, false, {
                        message: "Username does not exist"
                    });
                };

                if (!isValidPassword(user.password, password)) {
                    return done(null, false, {
                        message: "Password is incorrect"
                    });
                };

                var userInfo = user.get();
                return done(null, userInfo);
            }).catch(function(err) {
                console.log("Error: ", err);
                
                return done(null, false, {
                    message: "Something went wrong with your signin."
                });
            });
        }
    ));
};


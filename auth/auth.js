const bcrypt = require("bcryptjs");
LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

// check sign in credentials
const checkAuth = passport => {
    try {
        passport.use(
            new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
                // check if user exists
                User.findOne({ email: email })
                    .then((user) => {
                        if (!user) {
                            console.log("You've entered an invalid user email address");
                            return done(null, false);
                        }
                        // check if password is correct
                        bcrypt.compare(password, user.password, (error, isMatch) => {
                            if (error) throw error;
                            if (isMatch) {
                                return done(null, user);
                            } else {
                                console.log("You've entered an invalid user password");
                                return done(null, false);
                            }
                        });
                    }).catch((error) => console.log(error));
            })
        );

        // serialize user
        passport.serializeUser((user, done) => {
            done(null, user._id);
        });

        // deserialize user
        passport.deserializeUser((id, done) => {
            let user = User.findById(id);
            done(null, user);
        });
    } catch (error) {
        console.error('Error:', error);
        return null;
    };
};

module.exports = {
    checkAuth,
};
const passport = require("passport");
const bcrypt = require("bcryptjs");
const UserValidator = require("../services/UserValidator");
const User = require("../models/User");

const signupView = async (req, res) => {
    try {
        const user = await req?.user;
        if (user?._id) return res.redirect("/main")
        res.render("signup", { user: {}, error: '' });
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

const signupUser = (req, res) => {
    try {
        const { name, email, password, confirm } = req.body;

        // check if all fields are filled
        if (!name || !email || !password || !confirm) {
            return res.render("signup", {
                email,
                password,
                user: {},
                error: "All fields are required!",
            });
        }

        // validate user data
        const userValidator = new UserValidator();
        userValidator.initValidator(UserValidator);
        const isValid = userValidator.validate({
            type: 'signup',
            name: name,
            email: email,
            password: password,
            confirm: confirm
        });

        if (isValid !== true) {
            return res.render("signup", {
                name,
                email,
                password,
                confirm,
                user: {},
                error: 'Invalid user signup data!',
            });

        }

        // check if user already exists
        User.findOne({ email: email }).then((user) => {
            if (user) {
                res.render("signup", {
                    name,
                    email,
                    password,
                    confirm,
                    user: {},
                    error: "User email already exists!",
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password,
                });

                // hash password before saving in database
                bcrypt.genSalt(10, (error, salt) => {
                    if (error) throw error;
                    // hash password using salt
                    bcrypt.hash(newUser.password, salt, (error, hash) => {
                        if (error) throw error;
                        newUser.password = hash;
                        newUser.save()
                            .then(res.redirect("/signin"))
                            .catch((error) => console.log(error));
                    })
                });
            }
        });
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

const signinView = async (req, res) => {
    try {
        const user = await req?.user;
        if (user?._id) return res.redirect("/main")
        res.render("signin", { user: user, error: '' });
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

const signinUser = (req, res) => {
    try {
        const { email, password } = req.body;

        // check if all fields are filled
        if (!email || !password) {
            res.render("signin", {
                email,
                password,
                user: {},
                error: "All fields are required!",
            });
        } else {
            // check if user exists
            passport.authenticate('local', (err, user, info) => {
                if (user == false) {
                    return res.render("signin", {
                        email,
                        password,
                        user: {},
                        error: "Invalid user email or password!",
                    });
                }

                // login user
                req.logIn(user, (err) => {
                    if (err) {
                        console.log('req.logIn', err);
                    }
                    if (user?._id) {
                        return res.redirect("/main");
                    }
                });
            })(req, res);
        }
    } catch (error) {
        console.error('Error:', error);
        return null;

    }
};

const logoutUser = (req, res) => {
    try {
        // logout user
        req.logout(function (error) {
            if (error) { return next(error); }
            res.redirect('/');
        });
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

module.exports = {
    signupView,
    signinView,
    signupUser,
    signinUser,
    logoutUser
};
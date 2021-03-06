'use strict';
const User = require("../models/user");
const Boom = require("@hapi/boom");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");          // ADDED
const saltRounds = 10;
const sanitizeHtml = require("sanitize-html");
// account controller, inlcudes contoller for signup, login,update and deleting a user
const Accounts = {
    index: {
        auth: false,
        handler: function(request, h) {
            return h.view("main", { title: "Welcome to Poi" });
        }
    },
    showSignup: {
        auth: false,
        handler: function(request, h) {
            return h.view('signup', { title: 'Sign up for Poi' });
        }
    },
    signup: {
        auth: false,
        validate: {
            payload: {
                // begin with upper case letter and then 2+ lower case letters
                firstName: Joi.string().regex(/^[A-Z][a-z]{2,}$/),

                // begin with upper case letter, then any 2+ characters
                lastName: Joi.string().regex(/^[A-Z]/).min(3),
                email: Joi.string().email().required(),

                password: Joi.string().min(8)               // min 8 characters
            },
            options: {
                abortEarly: false,
            },
            failAction: function (request, h, error) {
                return h
                    .view("signup", {
                        title: "Sign up error",
                        errors: error.details,
                    })
                    .takeover()
                    .code(400);
            },
        },
        handler: async function (request, h) {
            try {
                const payload = request.payload;
                let user = await User.findByEmail(payload.email);
                if (user) {
                    const message = "Email address is already registered";
                    throw Boom.badData(message);
                }

                const hash = await bcrypt.hash(payload.password, saltRounds);

                const newUser = new User({
                    firstName: sanitizeHtml(payload.firstName),
                    lastName: sanitizeHtml(payload.lastName),
                    email: sanitizeHtml(payload.email),
                    password: sanitizeHtml(hash)
                });
                user = await newUser.save();
                request.cookieAuth.set({ id: user.id });
                return h.redirect("/home");
            } catch (err) {
                return h.view("signup", { errors: [{ message: err.message }] });
            }
        },
    },

// diplays the login form
    showLogin: {
        auth: false,
        handler: function(request, h) {
            return h.view('login', { title: 'Login to POI' });
        }
    },
// allows the user to login, JOI used to for user validation
    login: {
        auth: false,
        validate: {
            payload: {
                email: Joi.string().email().required(),
                password: Joi.string().required(),
            },
            options: {
                abortEarly: false,
            },
            failAction: function (request, h, error) {
                return h
                    .view("login", {
                        title: "Sign in error",
                        errors: error.details,
                    })
                    .takeover()
                    .code(400);
            },
        },
        handler: async function (request, h) {
            const { email, password } = request.payload;
            try {
                let user = await User.findByEmail(email);
                if (!user) {
                    const message = "Email address is not registered";
                    throw Boom.unauthorized(message);
                }
                await user.comparePassword(password);
                request.cookieAuth.set({ id: user.id });
                return h.redirect("/home");
            } catch (err) {
                return h.view("login", { errors: [{ message: err.message }] });
            }
        },
    },

    logout: {
        handler: function (request, h) {
            request.cookieAuth.clear();
            return h.redirect("/");
        },
    },
// displays the users settings
    showSettings: {
        handler: async function (request, h) {
            try {
                const id = request.auth.credentials.id;
                const user = await User.findById(id).lean();
                return h.view("settings", { title: "User Settings", user: user });
            } catch (err) {
                return h.view("login", { errors: [{ message: err.message }] });
            }
        }
    },
    // allows the user to update ther setting if required
    updateSettings: {
        validate: {
            payload: { // JOI validation is used to verfiry the user has enter all the correct fields
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().required(),
            },
            options: {
                abortEarly: false,
            },
            failAction: function (request, h, error) {
                return h
                    .view("settings", {
                        title: "Sign up error",
                        errors: error.details,
                    })
                    .takeover()
                    .code(400);
            },
        },
        handler: async function (request, h) {
            try {
                const userEdit = request.payload;
                const id = request.auth.credentials.id;
                const user = await User.findById(id);
                user.firstName = userEdit.firstName;
                user.lastName = userEdit.lastName;
                user.email = userEdit.email;
                user.password = userEdit.password;
                await user.save();
                return h.redirect("/settings");
            } catch (err) {
                return h.view("main", { errors: [{ message: err.message }] });
            }
        },
    },
// the user account can be deleted
    deleteUser: {

        handler: async function (request, h) {
            try {
                const id = request.auth.credentials.id;
                const user = await User.findById(id);
                console.log("Deleting User: " + user);
                await user.remove();
                return h.redirect("/home");
            } catch
                (err) {
                return h.view('home', {errors: [{message: err.message}]});
            }
        },
    },



    
};

//const User = require('../models/user');
module.exports = Accounts;
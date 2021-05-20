"use strict";
/*


 */
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const Boom = require("@hapi/boom");

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

// makes sure the password matches the email, if it does not returns a boom error

userSchema.methods.comparePassword = function(candidatePassword) {
    const isMatch = this.password === candidatePassword;
    if (!isMatch) {
        throw Boom.unauthorized('Password mismatch');
    }
    return this;
};

// makes sure that the email is correct and matches the records
userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email : email});
};



module.exports = Mongoose.model("User", userSchema);
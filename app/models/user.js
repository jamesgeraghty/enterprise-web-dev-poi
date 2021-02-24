"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const Boom = require("@hapi/boom");

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});



userSchema.methods.comparePassword = function(candidatePassword) {
    const isMatch = this.password === candidatePassword;
    if (!isMatch) {
        throw Boom.unauthorized('Password mismatch');
    }
    return this;
};

userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email : email});
};



module.exports = Mongoose.model("User", userSchema);
"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const newpointofinterestSchema = new Schema({
    amount: Number,
    method: String,


});

module.exports = Mongoose.model("Newpointofinterest", newpointofinterestSchema);
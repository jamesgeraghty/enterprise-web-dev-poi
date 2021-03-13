"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const newpointofinterestSchema = new Schema({
    poi: String,
    method: String,
    text: String,
    donor: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
});

module.exports = Mongoose.model("Newpointofinterest", newpointofinterestSchema);
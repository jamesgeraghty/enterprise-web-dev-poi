"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const newpointofinterestSchema = new Schema({
    poi: String,
    method: String,
    donor: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

});

module.exports = Mongoose.model("Newpointofinterest", newpointofinterestSchema);
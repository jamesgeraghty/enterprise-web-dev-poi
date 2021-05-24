"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const noticeSchema = new Schema({
    notice: String,
    donor: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = Mongoose.model("Notice", noticeSchema);
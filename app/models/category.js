'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
// Category Model store the name the of the Point of Interest
const categorySchema = Schema({
    name: String,
//    type: String,
});

module.exports = Mongoose.model('Category', categorySchema);
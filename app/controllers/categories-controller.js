'use strict';

const Categorymodel = require('../models/category');
const Newpointofinterest = require('../models/newpointofinterest');

const User = require("../models/user");
const Joi = require('@hapi/joi');

/*
The category controller allows the user to add a category if required
 */
const Category = {

    addCategory: {

        handler: async function (request, h)
        {
            try
            {
                const id = request.auth.credentials.id;
                const user = await User.findById(id);
                const data = request.payload;
                const newCategory = new Categorymodel({
                    name: data.name,
                });
                await newCategory.save();
                return h.redirect("/home");
            } catch (err) {
                return h.view("main", { errors: [{ message: err.message }]
                });
            }
        }
    },

}

module.exports = Category;
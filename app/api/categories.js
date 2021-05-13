'use strict';

const Category = require('../models/category');
const Boom = require("@hapi/boom");

const Categories = {
    find: {
        auth: false,
        handler: async function (request, h) {
            const categories = await Category.find();
            return categories;
        },
    },

    findOne: {
        auth: false,
        handler: async function (request, h) {
            try {
                const category = await Category.findOne({_id: request.params.id});
                if (!category) {
                    return Boom.notFound("No Category with this id");
                }
                return category;
            } catch (err) {
                return Boom.notFound("No Candidate with this id");
            }
        },
    },

    create: {
        auth: false,
        handler: async function (request, h) {
            const newCategory = new Category(request.payload);
            const category = await newCategory.save();
            if (category) {
                return h.response(category).code(201);
            }
            return Boom.badImplementation("error creating candidate");
        },
    },

    deleteAll: {
        auth: false,
        handler: async function (request, h) {
            await Category.remove({});
            return {success: true};
        },
    },

    deleteOne: {
        auth: false,
        handler: async function (request, h) {
            const category = await Category.remove({_id: request.params.id});
            if (category) {
                return {success: true};
            }
            return Boom.notFound("id not found");
        },
    },



};

module.exports = Categories;
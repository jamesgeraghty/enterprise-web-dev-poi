"use strict";

const Newpointofinterest = require("../models/newpointofinterest");
const Category = require("../models/category");
const Boom = require("@hapi/boom");

const Pointsofinterest = {
    find: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const pointsofinterest = await Newpointofinterest.find();
            return pointsofinterest;
        },
    },

    findOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const newpointofinterest = await Newpointofinterest.findOne({ _id: request.params.id });
                if (!newpointofinterest) {
                    return Boom.notFound("No POI with this id");
                }
                return newpointofinterest;
            } catch (err) {
                return Boom.notFound("No POI with this id");
            }
        }
    },

    findByCategory: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const pointsofinterest = await Newpointofinterest.find({ category: request.params.id });
            return pointsofinterest;
        },
    },

    create: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const newPointofinterest = new Newpointofinterest(request.payload);
            const newpointofinterest = await newPointofinterest.save();
            if (newpointofinterest) {
                return h.response(newpointofinterest).code(201);
            }
            return Boom.badImplementation("error creating poi");
        },
    },

    deleteAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            await Newpointofinterest.deleteMany({});
            return { success: true };
        },
    },

    deleteOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const newpointofinterest = await Newpointofinterest.remove({ _id: request.params.id });
            if (newpointofinterest) {
                return { success: true };
            }
            return Boom.notFound("id not found");
        },
    },

};

module.exports = Pointsofinterest;
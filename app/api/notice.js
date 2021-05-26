"use strict";

const Newpointofinterest = require("../models/newpointofinterest");
const Noticeboard = require("../models/notice");
const Category = require("../models/category");
const Boom = require("@hapi/boom");

const Noticeboards = {
    find: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const notices = await Noticeboard.find();
            return notices;
        },
    },

    findOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const notices = await Noticeboard.findOne({ _id: request.params.id });
                if (!notices) {
                    return Boom.notFound("No POI with this id");
                }
                return notices;
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
            const notices = await Noticeboard.find({ category: request.params.id });
            return notices;
        },
    },

    create: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const newNoticeboard = new Noticeboard(request.payload);
            const notices = await newNoticeboard.save();
            if (notices) {
                return h.response(notices).code(201);
            }
            return Boom.badImplementation("error creating poi");
        },
    },

    deleteAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            await Noticeboard.deleteMany({});
            return { success: true };
        },
    },

    deleteOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const notices = await Noticeboard.remove({ _id: request.params.id });
            if (notices) {
                return { success: true };
            }
            return Boom.notFound("id not found");
        },
    },

};

module.exports = Noticeboards;
"use strict";
const Newpointofinterest = require("../models/newpointofinterest");
const User = require("../models/user");
const Category = require("../models/category");
const Joi = require('@hapi/joi');
/*
This the controller for adding, updateing and deleting the
points of Interest.


 */
const PointsOfInterest  = {
    home: {
        handler: async function (request, h) {
            const categories = await Category.find().lean();
            return h.view("home", {title: "Add POI", categories: categories});
        },
    },

    report: {
        handler: async function (request, h) {
            const pointsofinterest = await Newpointofinterest.find().populate("donor").populate("category").lean();
            return h.view("report", {
                title: "POI to Date",
                pointsofinterest: pointsofinterest,
            });
        },
    },
    addpointofinterest: {
        handler: async function (request, h) {
            try {
                //   id: uuidv4()
                const id = request.auth.credentials.id;
                const user = await User.findById(id);

                const data = request.payload;
                const rawCategory = request.payload.category;
                const category = await Category.findOne({
                    name: rawCategory
                });

                const newNewpointofinterest = new Newpointofinterest({
                    poi: data.poi,
                    text: data.text,
                    method: data.method,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    donor: user._id,
                    category: category._id,
                });
                await newNewpointofinterest.save();
                return h.redirect("/report");
            } catch (err) {
                return h.view("main", {
                    errors: [{message: err.message}]
                });
            }
        }
    },

// allows the user to delete a Point of Interest

    removepointofinterest: {
        handler: async function (request, h) {
            try {
                const pointofinterest = Newpointofinterest.findById(request.params._id);
                console.log("Removing pointofinterest: " + pointofinterest);
                await pointofinterest.remove();
                return h.redirect("/report");
            } catch
                (err) {
                return h.view('home', {errors: [{message: err.message}]});
            }
        },

    },
// displays the points of interest in the form before being updated
    showUpdatePointofinterest: {
        handler: async function(request, h) {
            try {
                const id = request.params._id
                const newpointofinterest = await Newpointofinterest.findById(id).populate('category').lean().sort('-category');;
                console.log(newpointofinterest);
                const category = await Category.find().lean();

                const categories = await Category.find().lean().sort('name');
                return h.view("update-pointofinterest", { title: "Edit Poi", newpointofinterest: newpointofinterest, categories: categories,});
            } catch (err) {
                return h.view("home", { errors: [{ message: err.message }] });
            }
        },
    },

    updatePointofinterest: {
        validate: {
            payload: {
                poi: Joi.string().required(),
                method: Joi.string().required(),
                text: Joi.string().required(),
                category: Joi.string().required(),
            },
            options: {
                abortEarly: false
            },
            failAction: function (request, h, error)
            {
                return h
                    .view('home', {
                        title: 'Failed to update POI ' + error.details,
                        errors: error.details
                    })
                    .takeover()
                    .code(400);
            }
        },

        handler: async function (request, h)
        {
            try
            {

                const newpointofinterestEdit = request.payload;
                const newpointofinterest = await Newpointofinterest.findById(request.params._id);
                console.log(newpointofinterest);
                const rawCategory = newpointofinterestEdit.category;
                const category = await Category.findOne({
                    name: rawCategory
                }).lean();

                newpointofinterest.poi = newpointofinterestEdit.poi;
                newpointofinterest.method = newpointofinterestEdit.method;
                newpointofinterest.text = newpointofinterestEdit.text;
                newpointofinterest.category = category._id;
                await newpointofinterest.save();
                return h.redirect('/report');
            } catch (err)
            {
                return h.view('home', {errors: [{message: err.message}]});
            }
        },
    },
};
module.exports = PointsOfInterest;
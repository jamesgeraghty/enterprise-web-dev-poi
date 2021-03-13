"use strict";
const Newpointofinterest = require("../models/newpointofinterest");
const User = require("../models/user");
const Category = require("../models/category");

function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const PointsOfInterest  = {
    home: {
        handler: async function (request, h) {
            const categories = await Category.find().lean();
            return h.view("home", { title: "Add POI",categories: categories });
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
        handler: async function(request, h) {
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
                    donor: user._id,
                    category: category._id,
                });
                await newNewpointofinterest.save();
                return h.redirect("/report");
            } catch (err) {
                return h.view("main", { errors: [{ message: err.message }] });
            }
        }
    }
};
module.exports = PointsOfInterest;
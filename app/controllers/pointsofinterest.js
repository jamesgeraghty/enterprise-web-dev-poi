"use strict";
const Newpointofinterest = require("../models/newpointofinterest");
const User = require("../models/user");

const PointsOfInterest  = {


    home: {
        handler: function (request, h) {
            return h.view("home", { title: "Add POI" });
        },
    },

    report: {
        handler: async function (request, h) {
            const pointsofinterest = await Newpointofinterest.find().populate("poi").lean();
            return h.view("report", {
                title: "POI to Date",
                pointsofinterest: pointsofinterest,
            });
        },
    },
    addpointofinterest: {
        handler: async function (request, h) {
            const id = request.auth.credentials.id;
            const user = await User.findById(id);
            const data = request.payload;
            const newNewpointofinterest= new Newpointofinterest({
                amount: data.amount,
                method: data.method,
                donor: user._id
            });
            await newNewpointofinterest.save();
            return h.redirect("/report");
        },
    },
};
module.exports = PointsOfInterest;
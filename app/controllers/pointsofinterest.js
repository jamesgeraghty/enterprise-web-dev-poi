"use strict";
const PointsOfInterest  = {

    home: {
        handler: function (request, h) {
            return h.view("home", { title: "Make a Donation" });
        },
    },
    report: {
        handler: function (request, h) {
            return h.view("report", {
                title: "Donations to Date",
                pointsofinterest: this.pointsofinterest,
            });
        },
    },
    addpointofinterest: {
        handler: function (request, h) {
            const data = request.payload;
            var donorEmail = request.auth.credentials.id;
            data.donor = this.users[donorEmail];
            this.pointsofinterest.push(data);
            return h.redirect("/report");
        },
    },
};
module.exports = PointsOfInterest;
"use strict";

const Accounts = require("./app/controllers/accounts");

const PointsOfInterest = require("./app/controllers/pointsofinterest");


module.exports = [
    { method: "GET", path: "/", config: Accounts.index },
    { method: "GET", path: "/signup", config: Accounts.showSignup },
    { method: "GET", path: "/login", config: Accounts.showLogin },
    { method: "GET", path: "/logout", config: Accounts.logout },
    { method: "POST", path: "/signup", config: Accounts.signup },
    { method: "POST", path: "/login", config: Accounts.login },
    { method: 'POST', path: '/addpointofinterest', config: PointsOfInterest.addpointofinterest },




    { method: "GET", path: "/home", config: PointsOfInterest.home },
    { method: "GET", path: "/report", config: PointsOfInterest.report },

    {
        method: "GET",
        path: "/{param*}",
        handler: {
            directory: {
                path: "./public"
            }
        },
        options: { auth: false }
    }
];
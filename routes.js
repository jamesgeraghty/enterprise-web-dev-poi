"use strict";

const Accounts = require("./app/controllers/accounts");

const PointsOfInterest = require("./app/controllers/pointsofinterest");
const Category =require("./app/controllers/categories-controller")
const Admin = require("./app/controllers/admin");
const Gallery = require('./app/controllers/gallery');
const Notices =require('./app/controllers/notices');
//const dashboard = require('./controllers/dashboard.js');

module.exports = [
    { method: "GET", path: "/", config: Accounts.index },
    { method: "GET", path: "/signup", config: Accounts.showSignup },
     { method: "GET", path: "/login", config: Accounts.showLogin },

    { method: "GET", path: "/logout", config: Accounts.logout },
    { method: "POST", path: "/signup", config: Accounts.signup },
    { method: "POST", path: "/login", config: Accounts.login },
        { method: 'POST', path: '/addpointofinterest', config: PointsOfInterest.addpointofinterest },
    {method: "GET" ,path: "/deleteUser", config: Accounts.deleteUser},

    { method: 'GET', path: '/gallery', config: Gallery.index },
    { method: 'POST', path: '/uploadfile', config: Gallery.uploadFile },
    { method: 'GET', path: '/deleteimage/{id}', config: Gallery.deleteImage },

    {method: 'GET',path: '/admindashboard', config: Admin.adminDashboard},

    { method: "GET", path: "/home", config: PointsOfInterest.home },
    { method: "GET", path: "/report", config: PointsOfInterest.report },

    { method: "GET", path: "/delete-pointofinterest/{_id}", config: PointsOfInterest.removepointofinterest },
    {method: 'GET', path: '/update-pointofinterest/{_id}', config: PointsOfInterest.showUpdatePointofinterest},
    {method: 'POST', path: "/update_pointofinterest/{_id}", config: PointsOfInterest.updatePointofinterest},

    {method: 'POST', path: '/new-category', config: Category.addCategory},

    { method: 'GET', path: '/settings', config: Accounts.showSettings },
    { method: 'POST', path: '/settings', config: Accounts.updateSettings },

    { method: "GET", path: "/notice-home", config: Notices.noticehome },
    { method: "POST", path: "/add-notice", config: Notices.addNotice },
    { method: "GET", path: "/notice-report", config: Notices.Noticereport },
    { method: "GET", path: "/delete-notice/{_id}", config: Notices.removenotice },

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
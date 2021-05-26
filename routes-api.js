const Categories = require('./app/api/categories');
const Users = require("./app/api/users");
const Pointsofinterest = require('./app/api/poi');
const Noticeboards = require('./app/api/notice');


module.exports = [
    { method: 'GET', path: '/api/categories', config: Categories.find },
    { method: 'GET', path: '/api/categories/{id}', config: Categories.findOne },
    { method: "POST", path: "/api/categories", config: Categories.create },
    { method: "DELETE", path: "/api/categories/{id}", config: Categories.deleteOne },
    { method: "DELETE", path: "/api/categories", config: Categories.deleteAll },

    { method: "GET", path: "/api/users", config: Users.find },
    { method: "GET", path: "/api/users/{id}", config: Users.findOne },
    { method: "POST", path: "/api/users", config: Users.create },
    { method: "DELETE", path: "/api/users/{id}", config: Users.deleteOne },
    { method: "DELETE", path: "/api/users", config: Users.deleteAll },

    { method: "GET", path: "/api/poi", config: Pointsofinterest.find },
    { method: "GET", path: "/api/poi/{id}", config: Pointsofinterest.findOne },
    { method: "POST", path: "/api/poi", config: Pointsofinterest.create },
    { method: "DELETE", path: "/api/poi/{id}", config: Pointsofinterest.deleteOne },
    { method: "DELETE", path: "/api/poi", config: Pointsofinterest.deleteAll },

    { method: "GET", path: "/api/notice", config: Noticeboards.find },
    { method: "GET", path: "/api/notice/{id}", config: Noticeboards.findOne },
    { method: "POST", path: "/api/notice", config: Noticeboards.create },
    { method: "DELETE", path: "/api/notice/{id}", config: Noticeboards.deleteOne },
    { method: "DELETE", path: "/api/notice", config: Noticeboards.deleteAll },


    { method: 'POST', path: '/api/users/authenticate', config: Users.authenticate },
];


'use strict';
const User = require("../models/user");
const Boom = require("@hapi/boom");
const Joi = require("@hapi/joi");
const Utils = require('../utils/isAdmin');

const Admin = {

    adminDashboard: {
        auth: {scope: 'admin'},
        handler: async function (request, h)
        {
                const id = request.auth.credentials.id;
                const user = await User.findById(id).lean();
                const allusers = await User.find({scope: 'user'}).lean().sort('lastName');
                const isadmin = Utils.isAdmin(scope);
                return h.view('admin-dashboard',
                    {
                        title: 'All Users',
                        users: allusers,
                        isadmin: isadmin,
                    });

                return h.view('login', {errors: [{message: err.message}]});
            }
        }
    };

module.exports = Admin;
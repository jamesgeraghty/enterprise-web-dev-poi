const Notice = require("../models/notice");
const User = require("../models/user");
const Categorymodel = require('../models/category');

const Notices = {
    noticehome: {
        handler: function(request, h) {
            return h.view("notice-home", { title: "Make a Donation" });
        }
    },
    Noticereport: {
        handler: async function(request, h) {
            const notices = await Notice.find().populate("donor").lean();
            return h.view("notice-report", {
                title: "notices to Date",
                notices: notices
            });
        }
    },
    addNotice: {
        handler: async function(request, h) {
            try {
                const id = request.auth.credentials.id;
                const user = await User.findById(id);
                const data = request.payload;
                const newNotice = new Notice({

                    notice: data.notice,
                    donor: user._id
                });
                await newNotice.save();
                return h.redirect("notice-report");
            } catch (err) {
                return h.view("main", { errors: [{ message: err.message }] });
            }
        }
    },

    removenotice: {
        handler: async function (request, h) {
            try {
                const notices = Notice.findById(request.params._id);
                console.log("Removing notices: " + notices);
                await notices.remove();
                return h.redirect("/notice-report");
            } catch
                (err) {
                return h.view('home', {errors: [{message: err.message}]});
            }
        },

    },
};

module.exports = Notices;
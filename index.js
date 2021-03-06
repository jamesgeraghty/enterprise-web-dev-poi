"use strict";

const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const Handlebars = require("handlebars");
const Cookie = require("@hapi/cookie");
const utils = require("./app/api/utils.js");
const Bell = require('@hapi/bell');
const Joi = require("@hapi/joi");
require("./app/models/db");
const env = require("dotenv");
const ImageStore = require('./app/utils/image-store');

const dotenv = require("dotenv");

env.config();

const credentials = {
    cloud_name: process.env.name,
    api_key: process.env.key,
    api_secret: process.env.secret
};

const result = dotenv.config();
if (result.error) {
    console.log(result.error.message);
    process.exit(1);
}

const server = Hapi.server({
    port: process.env.PORT || 4000,
    routes: { cors: true },
});

async function init() {
    await server.register(Inert);
    await server.register(Vision);
    await server.register(Cookie);
    await server.register(Bell);
    await server.register(require('hapi-auth-jwt2'));

    ImageStore.configure(credentials);

    server.validator(require("@hapi/joi"));

    server.views({
        engines: {
            hbs: require("handlebars"),
        },
        relativeTo: __dirname,
        path: "./app/views",
        layoutPath: "./app/views/layouts",
        partialsPath: "./app/views/partials",
        layout: true,
        isCached: false,
    });
    server.auth.strategy("session", "cookie", {
        cookie: {
            name: process.env.cookie_name,
            password: process.env.cookie_password,
            isSecure: false,
        },
        redirectTo: "/",
    });

    var bellAuthOptions = {
        provider: 'github',
        password: 'github-encryption-password-secure', // String used to encrypt cookie
        // used during authorisation steps only
        clientId: '78949d886bb3dc286100',          // *** Replace with your app Client Id ****
        clientSecret: 'bd1465cd2c00ca22d38e3cb0e407e34de9afefc3',  // *** Replace with your app Client Secret ***
        isSecure: false        // Should be 'true' in production software (requires HTTPS)
    };

    server.auth.strategy('github-oauth', 'bell', bellAuthOptions);

    server.auth.strategy("jwt", "jwt", {
        key: "secretpasswordnotrevealedtoanyone",
        validate: utils.validate,
        verifyOptions: { algorithms: ["HS256"] },
    });


    server.auth.default("session");
    server.route(require("./routes"));
    server.route(require('./routes-api'));
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
}

process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});

init();
//mongod -dbpath db
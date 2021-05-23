"use strict";

const assert = require("chai").assert;
const PoiService = require("./poi-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("User API tests", function () {
    let users = fixtures.users;
    let newUser = fixtures.newUser;

    const poiService = new PoiService(fixtures.poiService);

    setup(async function () {
        await poiService.deleteAllUsers();
        const returnedUser = await poiService.createUser(newUser);
        const response = await poiService.authenticate(newUser);
    });

    teardown(async function () {
        await poiService.deleteAllUsers();
        poiService.clearAuth();
    });

    test("Create a User", async function () {
        const returnedUser = await poiService.createUser(newUser);
        assert(_.some([returnedUser], newUser), "returnedUser must be a superset of newUser");
        assert.isDefined(returnedUser._id);
    });

    test("get user", async function () {
        const u1 = await poiService.createUser(newUser);
        const u2 = await poiService.getUser(u1._id);
        assert.deepEqual(u1, u2);
    });

    test("Get Invalid User", async function () {
        const u1 = await poiService.getUser("1234");
        assert.isNull(u1);
        const u2 = await poiService.getUser("012345678901234567890123");
        assert.isNull(u2);
    });

    test("Delete a User", async function () {
        let u = await poiService.createUser(newUser);
        assert(u._id != null);
        await poiService.deleteOneUser(u._id);
        u = await poiService.getUser(u._id);
        assert(u == null);
    });

    test("Get All Users", async function () {
        for (let u of users) {
            await poiService.createUser(u);
        }

        const allUsers = await poiService.getUsers();
        assert.equal(allUsers.length, users.length+1);
    });

    test("get users details", async function () {
        let arrUsers = [newUser];
        for (let u of users) {
            const createdUser = await poiService.createUser(u);
            arrUsers.push(createdUser);
        }
        const allUsers = await poiService.getUsers();
        for (var i = 0; i < arrUsers.length; i++) {
            assert(_.some([allUsers[i]], arrUsers[i]), "returnedCandidate must be a superset of newCandidate");
        }
    });

    test("Get All Users Empty", async function () {
        const allUsers = await poiService.getUsers();
        assert.equal(allUsers.length, 1);
    });
});
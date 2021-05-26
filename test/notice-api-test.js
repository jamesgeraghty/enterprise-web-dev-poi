"use strict";

const assert = require("chai").assert;
const PoiService = require("./poi-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("Noitce API tests", function () {
    let pointsofinterest = fixtures.pointsofinterest;
    let newNoticeboards = fixtures.newNoticeboards;
    let newUser = fixtures.newUser;

    const poiService = new PoiService(fixtures.poiService);

    setup(async function () {
        await poiService.deleteAllNotices();
        const returnedUser = await poiService.createUser(newUser);
        const response = await poiService.authenticate(newUser);
    });

    teardown(async function () {
        await poiService.deleteAllUsers();
        poiService.clearAuth();
    });

    test("Submit a Notice Board", async function () {
        const returnedNotice = await poiService.createNoticeboard(newNoticeboards);
        assert(_.some([returnedNotice], newNoticeboards), "returnedNotice must be a superset of newNoticeboard");
        assert.isDefined(returnedNotice._id);
    });

    test("Get Notice", async function () {
        const p1 = await poiService.createNoticeboard(newNoticeboards);
        const p2 = await poiService.getNoticeboard(p1._id);
        assert.deepEqual(p1, p2);
    });

    test("Get Invalid Notice", async function () {
        const p1 = await poiService.getNoticeboard("1234");
        assert.isNull(p1);
        const p2 = await poiService.getNoticeboard("012345678901234567890123");
        assert.isNull(p2);
    });

    test("Delete a Notice", async function () {
        let p = await poiService.createNoticeboard(newNoticeboards);
        assert(p._id != null);
        await poiService.deleteOneNotice(p._id);
        p = await poiService.getNoticeboard(p._id);
        assert(p == null);
    });



});
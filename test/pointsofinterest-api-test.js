"use strict";

const assert = require("chai").assert;
const PoiService = require("./poi-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("POI API tests", function () {
    let pointsofinterest = fixtures.pointsofinterest;
    let newPointsofinterest = fixtures.newPointsofinterest;

    const poiService = new PoiService(fixtures.poiService);

    setup(async function () {
        await poiService.deleteAllPointsofinterst();
    });

    teardown(async function () {
        await poiService.deleteAllPointsofinterst();
    });

    test("Submit a POI", async function () {
        const returnedPoi = await poiService.createPointofinterest(newPointsofinterest);
        assert(_.some([returnedPoi], newPointsofinterest), "returnedPoi must be a superset of newPoi");
        assert.isDefined(returnedPoi._id);
    });

    test("Get POI", async function () {
        const p1 = await poiService.createPointofinterest(newPointsofinterest);
        const p2 = await poiService.getPointofinterest(p1._id);
        assert.deepEqual(p1, p2);
    });

    test("Get Invalid POI", async function () {
        const p1 = await poiService.getPointofinterest("1234");
        assert.isNull(p1);
        const p2 = await poiService.getPointofinterest("012345678901234567890123");
        assert.isNull(p2);
    });

    test("Delete a POI", async function () {
        let p = await poiService.createPointofinterest(newPointsofinterest);
        assert(p._id != null);
        await poiService.deleteOnePointofinterst(p._id);
        p = await poiService.getPointofinterest(p._id);
        assert(p == null);
    });



});
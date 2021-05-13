"use strict";

const assert = require("chai").assert;
const axios = require("axios");

suite("Category API tests", function () {
    test("get categories", async function () {
        const response = await axios.get("http://laptop-burpbof6:3000/api/categories");
        const categories = response.data;
        assert.equal(3, categories.length);

        assert.equal(categories[0].name, "Slievenamon");
        assert.equal(categories[1].name, "Kilcash Woods");
        assert.equal(categories[2].name, "Kilcash Church");

    });

    test("get one Category", async function () {
        let response = await axios.get("http://laptop-burpbof6:3000/api/categories");
        const categories = response.data;
        assert.equal(3, categories.length);

        const oneCategoryUrl = "http://laptop-burpbof6:3000/api/categories/" + categories[0]._id;
        response = await axios.get(oneCategoryUrl);
        const oneCategory = response.data;

        assert.equal(oneCategory.name, "Slievenamon");


    });

    test("create a category", async function () {
        const categoriesUrl = "http://laptop-burpbof6:3000/api/categories";
        const newCategory = {
            name: "Slievenamon",

        };

        const response = await axios.post(categoriesUrl, newCategory);
        const returnedCategory = response.data;
        assert.equal(201, response.status);

        assert.equal(returnedCategory.name, "Slievenamon");

    });
});
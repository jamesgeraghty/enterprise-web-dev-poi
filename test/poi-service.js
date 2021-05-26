"use strict";

const axios = require("axios");
const baseUrl = "http://LAPTOP-BURPBOF6:4000";

class PoiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getCategories() {
        const response = await axios.get(this.baseUrl + "/api/categories");
        return response.data;
    } catch (e) {
        return null;
    }

    async getCategory(id) {
        try {
            const response = await axios.get(this.baseUrl + "/api/categories/" + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async createCategory(newCategory) {
        const response = await axios.post(this.baseUrl + "/api/categories", newCategory);
        return response.data;
    }

    async deleteAllCategories() {
        const response = await axios.delete(this.baseUrl + "/api/categories");
        return response.data;
    }

    async deleteOneCategory(id) {
        const response = await axios.delete(this.baseUrl + "/api/categories/" + id);
        return response.data;
    }

    async getUsers() {
        try {
            const response = await axios.get(this.baseUrl + "/api/users");
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async getUser(id) {
        try {
            const response = await axios.get(this.baseUrl + "/api/users/" + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async createUser(newUser) {
        try {
            const response = await axios.post(this.baseUrl + "/api/users", newUser);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteAllUsers() {
        try {
            const response = await axios.delete(this.baseUrl + "/api/users");
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteOneUser(id) {
        try {
            const response = await axios.delete(this.baseUrl + "/api/users/" + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }
    async getPointsofinterest() {
        try {
            const response = await axios.get(this.baseUrl + "/api/poi");
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async getPointofinterest(id) {
        try {
            const response = await axios.get(this.baseUrl + "/api/poi/" + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async createPointofinterest(newPointofinterest) {
        try {
            const response = await axios.post(this.baseUrl + "/api/poi", newPointofinterest);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteAllPointsofinterest() {
        try {
            const response = await axios.delete(this.baseUrl + "/api/poi");
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteOnePointofinterst(id) {
        try {
            const response = await axios.delete(this.baseUrl + "/api/poi/" + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async getNoticeboards() {
        try {
            const response = await axios.get(this.baseUrl + "/api/notice");
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async getNoticeboard(id) {
        try {
            const response = await axios.get(this.baseUrl + "/api/notice/" + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async createNoticeboard(newNoticeboard) {
        try {
            const response = await axios.post(this.baseUrl + "/api/notice", newNoticeboard);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteAllNotices() {
        try {
            const response = await axios.delete(this.baseUrl + "/api/notice");
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteOneNotice(id) {
        try {
            const response = await axios.delete(this.baseUrl + "/api/notice/" + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }




    async authenticate(user) {
        try {
            const response = await axios.post(this.baseUrl + "/api/users/authenticate", user);
            axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async clearAuth(user) {
        axios.defaults.headers.common["Authorization"] = "";
    }
}


module.exports = PoiService;
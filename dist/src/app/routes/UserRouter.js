"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_openid_connect_1 = require("express-openid-connect");
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get("/", function (req, res, next) {
            res.render("main", { user: req.oidc?.user });
        });
        this.router.get("/callback", async (req, res, next) => {
            if (req.query.code)
                next();
            else
                res.status(302).redirect("/profile");
        });
        this.router.get("/profile", (0, express_openid_connect_1.requiresAuth)(), async (req, res) => {
            res.render("profile", { user: req.oidc.user });
        });
    }
}
exports.default = UserRouter;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const express_openid_connect_1 = require("express-openid-connect");
const cors_1 = __importDefault(require("cors"));
const UserController_1 = __importDefault(require("./app/controllers/UserController"));
const auth0_1 = __importDefault(require("../config/auth0"));
const body_parser_1 = __importDefault(require("body-parser"));
class App {
    constructor() {
        dotenv_1.default.config();
        this._app = (0, express_1.default)();
        this.config = auth0_1.default;
        this.userController = new UserController_1.default();
        this.initializeMiddlewares();
    }
    get app() {
        return this._app;
    }
    initializeMiddlewares() {
        this._app.set("views", path_1.default.join("./dist/views"));
        this._app.set("view engine", "ejs");
        this._app.use((0, morgan_1.default)("dev"));
        this._app.use(express_1.default.static(path_1.default.join("./dist/")));
        this._app.use(express_1.default.json());
        this._app.use(body_parser_1.default.urlencoded({ extended: true }));
        this._app.use((0, cors_1.default)());
        this._app.get("/callback", async (req, res, next) => {
            if (req.query.code)
                next();
            else
                res.status(302).redirect("/profile");
        });
        this._app.use((0, express_openid_connect_1.auth)(this.config));
        this._app.use(function (req, res, next) {
            res.locals.user = req.oidc.user;
            next();
        });
        this._app.use("/", this.userController.userRouter.router);
        this._app.use(function (req, res, next) {
            const err = new Error("Not Found");
            err.status = 404;
            next(err);
        });
        this._app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render("404", {
                message: err.message,
                error: process.env.NODE_ENV !== "production" ? err : {},
            });
        });
    }
}
exports.default = App;

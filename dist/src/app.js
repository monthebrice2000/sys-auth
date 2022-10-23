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
const PassportMiddleware_1 = require("./app/middlewares/PassportMiddleware");
class App {
    constructor() {
        dotenv_1.default.config();
        this._app = (0, express_1.default)();
        this.config = auth0_1.default;
        this.passportMiddleware = new PassportMiddleware_1.PassportMiddleware();
        this.userController = new UserController_1.default(this.passportMiddleware);
        this.initializeMiddlewares();
    }
    get app() {
        return this._app;
    }
    initializeMiddlewares() {
        this.passportMiddleware.use();
        this._app.use(require("express-status-monitor")({
            title: "Express Status",
            theme: "default.css",
            path: "/status",
            socketPath: "/socket.io",
            //websocket: existingSocketIoInstance,
            spans: [
                {
                    interval: 1,
                    retention: 60, // Keep 60 datapoints in memory
                },
                {
                    interval: 5,
                    retention: 60,
                },
                {
                    interval: 15,
                    retention: 60,
                },
            ],
            chartVisibility: {
                cpu: true,
                mem: true,
                load: true,
                eventLoop: true,
                heap: true,
                responseTime: true,
                rps: true,
                statusCodes: true,
            },
            // config
            healthChecks: [
                {
                    protocol: "http",
                    host: "localhost",
                    path: "/",
                    port: "5002",
                },
                {
                    protocol: "http",
                    host: "localhost",
                    path: "/profile",
                    port: "5002",
                },
            ],
            ignoreStartsWith: "/admin",
        }));
        this._app.set("views", path_1.default.join("./dist/views"));
        //this._app.set("view engine", "ejs");
        this._app.set("view engine", "art");
        this._app.use((0, morgan_1.default)("dev"));
        this._app.use(express_1.default.static(path_1.default.join("./dist/")));
        this._app.use(express_1.default.json());
        this._app.use(body_parser_1.default.urlencoded({ extended: true }));
        this._app.use((0, cors_1.default)());
        this._app.engine("art", require("express-art-template"));
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

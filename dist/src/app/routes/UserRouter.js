"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_openid_connect_1 = require("express-openid-connect");
const axios_1 = __importDefault(require("axios"));
const UserRepository_1 = require("../repositories/UserRepository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UserRouter {
    constructor(passportMiddleware) {
        this.passportMiddleware = passportMiddleware;
        this.router = (0, express_1.Router)();
        this.userRepository = new UserRepository_1.UserRepository();
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
        this.router.get("/signup", async (req, res) => {
            res.render("signup");
        });
        this.router.post("/registration", async (req, res) => {
            //console.log( req.body )
            const { email, password } = req.body;
            //console.log(req.body);
            await this.userRepository
                .connectDB()
                .catch((error) => res.status(404).json({ message: "Cannot connect application" }));
            //console.log( client )
            await this.userRepository
                .insertDB(email, password)
                .then((success) => res.status(200).json({ email, password }))
                .catch((error) => res
                .status(404)
                .json({ message: error.message || "Cannot register user" }));
            await this.userRepository.end();
        });
        this.router.post("/login", async (req, res) => {
            const { email, password } = req.body;
            //console.log( req.body )
            await this.userRepository
                .connectDB()
                .catch((error) => res.status(404).json({ email, password }));
            //console.log( client )
            await this.userRepository
                .readDB(email, password)
                .then((success) => {
                let payload = { subject: { email, password } };
                let token = jsonwebtoken_1.default.sign(payload, String(process.env.JWT_SECRET));
                res
                    .status(http_status_codes_1.StatusCodes.OK)
                    .cookie("token", token, { httpOnly: true })
                    .json({
                    email,
                    password,
                    message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.OK),
                    token,
                });
            })
                .catch((error) => res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                message: error.message,
                msg: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.UNAUTHORIZED),
            }));
            await this.userRepository.end();
        });
        this.router.get("/events", this.passportMiddleware.authenticate, async (req, res) => {
            console.log(req.user);
            if (!req.user) {
                return res
                    .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                    .json({ message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.UNAUTHORIZED) });
            }
            //const { email, password } = req.user;
            axios_1.default
                .get("https://zoo-animal-api.herokuapp.com/animals/rand/7", {
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                console.log(response.data);
                res.status(http_status_codes_1.StatusCodes.OK).json({ data: response.data });
            })
                .catch((err) => res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                msg: err.message,
                message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.BAD_REQUEST),
            }));
        });
        this.router.get("/special-events", this.passportMiddleware.authenticate, async (req, res) => {
            console.log(req.user);
            if (!req.user) {
                return res
                    .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                    .json({ message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.UNAUTHORIZED) });
            }
            //const { email, password } = req.user;
            axios_1.default
                .get("https://zoo-animal-api.herokuapp.com/animals/rand/5", {
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                console.log(response.data);
                res.status(http_status_codes_1.StatusCodes.OK).json({ data: response.data });
            })
                .catch((err) => res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                msg: err.message,
                message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.BAD_REQUEST),
            }));
        });
    }
}
exports.default = UserRouter;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configAuth0 = {
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    secret: process.env.SECRET,
    clientSecret: process.env.SECRET,
    idpLogout: true,
    routes: {
        postLogoutRedirect: process.env.BASE_URL,
    },
    authorizationParams: {
        response_type: "code",
        scope: "openid email profile",
        audience: process.env.AUDIENCE,
        redirect_uri: process.env.REDIRECT_URI,
    },
    logoutParams: {},
};
exports.default = configAuth0;

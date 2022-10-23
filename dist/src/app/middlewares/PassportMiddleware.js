"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassportMiddleware = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const UserRepository_1 = require("../repositories/UserRepository");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class PassportMiddleware {
    constructor() {
        this.userRepository = new UserRepository_1.UserRepository();
    }
    async use() {
        return passport_1.default.use(new passport_jwt_1.Strategy({
            secretOrKey: String(process.env.JWT_SECRET),
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        }, async (payload, done) => {
            await this.userRepository
                .connectDB()
                .catch((error) => done(null, false));
            await this.userRepository
                .readDB(payload.subject.email, payload.subject.password)
                .then((success) => {
                done(null, {
                    email: payload.subject.email,
                    password: payload.subject.password,
                });
            })
                .catch((error) => done(null, false));
            await this.userRepository.end();
        }));
    }
    async initialize() {
        return passport_1.default.initialize();
    }
    async authenticate() {
        return passport_1.default.authenticate("jwt", { session: false });
    }
}
exports.PassportMiddleware = PassportMiddleware;

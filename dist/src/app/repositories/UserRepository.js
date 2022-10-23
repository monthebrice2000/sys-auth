"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const pg_1 = __importDefault(require("pg"));
class UserRepository {
    constructor() {
        this.client = new pg_1.default.Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: Number(process.env.PGPORT),
            ssl: Boolean(process.env.PGSSL),
            connectionTimeoutMillis: 0,
        });
    }
    async connectDB() {
        try {
            await this.client
                .connect()
                .then((data) => console.log("connect successfully"))
                .catch((err) => {
                throw new Error("Connection Error");
            });
        }
        catch (error) {
            this.client = null;
            throw new Error(error.message || "Error Message");
        }
        return this.client;
    }
    async insertDB(email, password) {
        if (!this.client)
            return null;
        try {
            const res = await this.client.query(`INSERT INTO dept(email, password) VALUES ( '${email}', '${password}' )`);
            //await client.end()
            console.log(res.rows);
            return res;
        }
        catch (error) {
            //console.log("++++++++++")
            console.log(error);
            throw new Error(error.message || "Error Message");
        }
    }
    async readDB(email, password) {
        if (!this.client)
            return null;
        try {
            const res = await this.client.query(`SELECT * FROM dept WHERE password='${password}' AND ( email='${email}' )`);
            //await client.end()
            console.log(res.rows);
            if (res.rows && res.rows.length !== 0) {
                return res[0];
            }
            else {
                throw new Error("User Not Found");
            }
            return res;
        }
        catch (error) {
            //console.log("++++++++++")
            console.log(error);
            throw new Error(error.message || "Error Message");
        }
    }
    async end() {
        this.client.end();
    }
}
exports.UserRepository = UserRepository;

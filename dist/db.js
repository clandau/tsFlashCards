"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const promise_mysql_1 = __importDefault(require("promise-mysql"));
dotenv_1.default.config();
const config = {
    connectionLimit: 100,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
};
const pool = promise_mysql_1.default.createPool(config);
exports.default = pool;

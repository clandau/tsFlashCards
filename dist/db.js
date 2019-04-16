"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const mysql = require('promise-mysql');
const promise_mysql_1 = __importDefault(require("promise-mysql"));
require('dotenv').config();
const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    connectionLimit: 100,
};
const pool = promise_mysql_1.default.createPool(config);
exports.default = pool;

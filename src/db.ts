// const mysql = require('promise-mysql');
import mysql from 'promise-mysql';
require('dotenv').config();

const config : Object = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    connectionLimit: 100,
};

const pool = mysql.createPool(config);

export default pool;
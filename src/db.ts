import dotenv from "dotenv";
import mysql from "promise-mysql";

dotenv.config();

const config: object = {
    connectionLimit: 100,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
};

const pool = mysql.createPool(config);

export default pool;

import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// PostgreSQL接続設定
export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
});
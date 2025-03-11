import express from "express";
import { pool } from "../db";

const router = express.Router();

// 道具一覧取得API
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM tools;");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "データ取得に失敗しました" });
    }
});

export default router;

import express from "express";
import { pool } from "../db";

const router = express.Router();

const formatTagResponse = (tag: any) => ({
    id: tag.id,
    name: tag.name,
    createdAt: tag.created_at,
    updatedAt: tag.updated_at
});

// タグ一覧取得API
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM tags;");
        const formattedData = result.rows.map(formatTagResponse);
        res.json(formattedData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "データ取得に失敗しました" });
    }
});

export default router;
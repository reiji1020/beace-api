import express from "express";
import { pool } from "../db";

const router = express.Router();

const formatCategoryResponse = (category: any) => ({
    id: category.id,
    name: category.name,
    createdAt: category.created_at,
    updatedAt: category.updated_at
});

// カテゴリー一覧取得API
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM categories;");
        const formattedData = result.rows.map(formatCategoryResponse);
        res.json(formattedData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "データ取得に失敗しました" });
    }
});

export default router;
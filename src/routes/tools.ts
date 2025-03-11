import express from "express";
import { pool } from "../db";

const router = express.Router();

const formatToolResponse = (tool: any) => {
    return {
        id: tool.id,
        name: tool.name,
        modelNumber: tool.model_number,
        categoryId: tool.category_id,
        brand: tool.brand,
        purchaseDate: tool.purchase_date,
        price: tool.price,
        quantity: tool.quantity,
        discontinued: tool.discontinued,
        discontinuedDate: tool.discontinued_date,
        note: tool.note,
        createdAt: tool.created_at,
        updatedAt: tool.updated_at
    };
};

// 道具一覧取得API
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM tools;");
        const formattedData = result.rows.map(formatToolResponse);
        res.json(formattedData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "データ取得に失敗しました" });
    }
});

export default router;

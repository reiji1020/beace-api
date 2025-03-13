import express from "express";
import toolsRoutes from "./routes/tools";
import categoriesRoutes from "./routes/categories";
import tagsRoutes from "./routes/tags";

const app = express();
app.use(express.json());

// 📌 ルーティングを設定
app.use("/api/tools", toolsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/tags", tagsRoutes);

export default app;
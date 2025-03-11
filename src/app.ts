import express from "express";
import toolsRoutes from "./routes/tools";
import categoriesRoutes from "./routes/categories";
import tagsRoutes from "./routes/tags";

const app = express();
app.use(express.json());

// 📌 ルーティングを設定
app.use("/tools", toolsRoutes);
app.use("/categories", categoriesRoutes);
app.use("/tags", tagsRoutes);

export default app;
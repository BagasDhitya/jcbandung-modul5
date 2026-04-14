import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routers/product.router";
import logRoutes from "./routers/log.router";

import { connectRedis } from "./config/redis";
import { errorHandler } from "./middlewares/error.middleware";
import { requestLogger } from "./middlewares/logger.middleware";

import "./queues/product.processor"; // harus wajib import worker untuk menjalankan queuenya
import { startLowStockJob } from "./jobs/lowStock.job"; // untuk schedulernya

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/report", logRoutes);
app.use(requestLogger);
app.use("/api/products", productRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

(async () => {
  await connectRedis();
  startLowStockJob();
  app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT);
  });
})();

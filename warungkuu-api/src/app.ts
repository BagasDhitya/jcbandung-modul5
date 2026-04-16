import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routers/product.router";
import logRoutes from "./routers/log.router";
import jobRoutes from "./routers/job.router";
import { swaggerSpec } from "./docs/swagger";
import swaggerUi from "swagger-ui-express";

import { errorHandler } from "./middlewares/error.middleware";
import { requestLogger } from "./middlewares/logger.middleware";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());

app.use("/report", logRoutes);
app.use(requestLogger);
app.use("/products", productRoutes);
app.use("/jobs", jobRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

// app.listen(PORT, () => {
//   console.log("Server running on http://localhost:" + PORT);
// });

export default app;

// serverless tidak bisa menggunakan listen, karena hanya hidup pada saat direquest
// solusinya: kita ganti dengan export app

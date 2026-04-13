// routes/log.routes.ts
import express from "express";
import { getLogsHtml } from "../controllers/log.controller";

const router = express.Router();

router.get("/logs", getLogsHtml);

export default router;

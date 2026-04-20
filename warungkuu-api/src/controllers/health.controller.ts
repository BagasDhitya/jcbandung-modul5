import { Request, Response } from "express";
import { checkHealth } from "../services/health.service";

export async function healthController(req: Request, res: Response) {
  try {
    const result = await checkHealth();

    // tentukan status code berdasarkan kondisi service
    const statusCode = result.status === "ok" ? 200 : 503;

    return res.status(statusCode).json({
      success: result.status === "ok",
      message:
        result.status === "ok" ? "Service is healthy" : "Service is degraded",
      data: result,
    });
  } catch (error) {
    // fallback kalau checkHealth sendiri crash
    return res.status(500).json({
      success: false,
      message: "Health check failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

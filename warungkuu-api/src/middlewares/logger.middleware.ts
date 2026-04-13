import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    logger.info("HTTP Request", {
      method: req.method,
      endpoint: req.originalUrl,
      status: res.statusCode,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      duration: `${duration}ms`,
    });
  });

  next();
};

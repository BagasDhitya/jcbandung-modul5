import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import { handlePrismaError } from "../utils/prismaErrorHandler";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let error = err;

  // handle prisma error
  if (err?.name?.includes("Prisma")) {
    error = handlePrismaError(err);
  }

  // handle custom error
  if (error instanceof AppError) {
    return res.status(error.statusCode).send({
      success: false,
      message: error.message,
    });
  }

  // unknown error
  console.error("Unknown error : ", err);
  return res.status(500).send({
    success: false,
    message: "Internal Server Error",
  });
}

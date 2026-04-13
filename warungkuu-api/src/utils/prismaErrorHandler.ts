import { Prisma } from "../../generated/prisma/client";
import { AppError } from "./appError";

export function handlePrismaError(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return new AppError("Data already exist (unique constraint)", 400);
      case "P2025":
        return new AppError("Data not found", 404);
      default:
        return new AppError(`Database error: ${error.message}`, 500);
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return new AppError("Invalid query/validation error", 400);
  }

  return new AppError("Internal server error", 500);
}

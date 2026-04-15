import { Router, Request, Response, NextFunction } from "express";
import { startLowStockJob } from "../jobs/lowStock.job";

const router = Router();

router.get(
  "/low-stock",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await startLowStockJob();
      res.status(200).send({
        message: "Low stock check executed",
        total: result.length,
      });
    } catch (error) {
      next(error);
    }
  },
);

export default router

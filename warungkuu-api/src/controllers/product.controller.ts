import { Request, Response } from "express";
import * as productService from "../services/product.service";
import { AppError } from "../utils/appError";
import { asyncHandler } from "../utils/asyncHandler";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.createProduct(req.body);
  res.status(201).json(product);
});

export const findAll = asyncHandler(async (_: Request, res: Response) => {
  const products = await productService.getProducts();
  res.json(products);
});

export const findOne = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.getProductById(String(req.params.id));

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  res.json(product);
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.updateProduct(
    String(req.params.id),
    req.body,
  );

  res.json(product);
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  await productService.deleteProduct(String(req.params.id));
  res.json({ message: "Product deleted (soft delete)" });
});

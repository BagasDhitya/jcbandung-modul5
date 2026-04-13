import { Request, Response } from "express";
import * as productService from "../services/product.service";

export const create = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

export const findAll = async (_: Request, res: Response) => {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

export const findOne = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(String(req.params.id));
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const product = await productService.updateProduct(
      String(req.params.id),
      req.body,
    );
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await productService.deleteProduct(String(req.params.id));
    res.json({ message: "Product deleted (soft delete)" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

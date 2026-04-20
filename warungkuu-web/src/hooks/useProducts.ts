import { useState, useEffect } from "react";
import { api } from "../api/warungkuApi";

export interface Product {
  title: string;
  description: string;
  price: number;
  stock: number;
}

export function useProducts() {
  const [products, setProduct] = useState<Product[]>([]);

  async function getProducts() {
    try {
      const response = await api.get("/products");
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return { products };
}

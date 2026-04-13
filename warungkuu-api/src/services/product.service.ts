import prisma from "../config/prisma";

export const createProduct = async (data: {
  title: string;
  description?: string;
  price: number;
  stock: number;
}) => {
  return prisma.product.create({
    data,
  });
};

export const getProducts = async () => {
  return prisma.product.findMany({
    where: {
      deletedAt: null,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getProductById = async (id: string) => {
  return prisma.product.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });
};

export const updateProduct = async (
  id: string,
  data: Partial<{
    title: string;
    description: string;
    price: number;
    stock: number;
  }>,
) => {
  return prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: string) => {
  return prisma.product.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
  });
};

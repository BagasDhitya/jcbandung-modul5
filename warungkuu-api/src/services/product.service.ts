import prisma from "../config/prisma";
import redisClient from "../config/redis";

const CACHE_KEY = "products";

// cache -> tidak boleh menyimpan data sensitive

export const getProducts = async () => {
  // 1.cek cache dulu, ada atau engga
  // -- kalau cache ada ambil dari cache
  // -- kalau cache tidak ada, lanjut ke step berikutnya
  const cached = await redisClient.get(CACHE_KEY);

  if (cached) {
    console.log("ambil data dari cache ...");
    return JSON.parse(cached);
  }

  // 2.kalau cache ngga ada, ambil dari database
  console.log("ambil data dari database ...");
  const products = await prisma.product.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
  });

  // 3.simpan ke cache (TTL 60 detik)
  await redisClient.set(CACHE_KEY, JSON.stringify(products), {
    EX: 60,
  });

  return products;
};

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

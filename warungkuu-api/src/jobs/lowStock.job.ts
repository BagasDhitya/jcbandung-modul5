import prisma from "../config/prisma";

export async function startLowStockJob() {
  console.log("⏰ Running low stock check ...");

  const lowStockProduct = await prisma.product.findMany({
    where: {
      stock: {
        lt: 5,
      },
      deletedAt: null,
    },
  });

  console.log("Low stock products: ", lowStockProduct.length);

  // bisa ditambah:
  // - kirim email
  // - push notification
  // - dll.

  return lowStockProduct;
}

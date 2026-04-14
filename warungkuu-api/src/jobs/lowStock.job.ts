import cron from "node-cron";
import prisma from "../config/prisma";
import productQueue from "../queues/product.queue";

// format cron: * * * * *
// jika dibaca dari kiri

// * pertama -> minute (0-59)
// * kedua -> hour (0-23)
// * ketiga -> day of month (1-31)
// * keempat -> month of year (1-12)
// * kelima -> day of week (0-7)

export function startLowStockJob() {
  // setiap 1 menit
  cron.schedule("* * * * *", async () => {
    console.log("⏰ Running low stock check ...");

    const lowStockProduct = await prisma.product.findMany({
      where: {
        stock: {
          lt: 5,
        },
        deletedAt: null,
      },
    });

    for (const product of lowStockProduct) {
      await productQueue.add({ product });
    }

    console.log(`${lowStockProduct.length} product(s) queued \n`);
  });
}

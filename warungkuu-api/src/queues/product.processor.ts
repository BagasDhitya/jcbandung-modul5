import productQueue from "./product.queue";

productQueue.process(async (job) => {
  const { product } = job.data;

  console.log("⚠️ Low Stock Product:");
  console.log(`- ${product.title} | Stock: ${product.stock}`);

  // simulasi delay, misalnya untuk kirim ke email atau notifikasi
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Job Selesai ...");
});

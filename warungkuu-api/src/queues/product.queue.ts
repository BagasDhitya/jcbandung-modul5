import Queue from "bull";

const productQueue = new Queue("product-queue", {
  redis: {
    host: "127.0.0.1",
    port: 6379,
  },
});

export default productQueue;

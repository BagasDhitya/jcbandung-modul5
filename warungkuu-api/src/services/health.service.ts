import prisma from "../config/prisma";
import redisClient from "../config/redis";

export async function checkHealth() {
  const start = Date.now();
  const services: Record<string, string> = {};

  // cek database
  try {
    await prisma.$queryRaw`SELECT 1`;
    services.database = "connected";
  } catch (error) {
    services.database = "down";
  }

  // cek redis
  try {
    await redisClient.ping();
    services.redis = "connected";
  } catch (error) {
    services.redis = "down";
  }

  const end = Date.now();

  return {
    status: Object.values(services).includes("down") ? "degraded" : "ok",
    latencyMs: end - start,
    uptime: process.uptime(),
    timestamp: Date.now(),
    services,
    system: {
      memory: process.memoryUsage(),
    },
  };
}

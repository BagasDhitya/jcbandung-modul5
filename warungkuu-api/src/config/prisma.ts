import { PrismaClient } from "../../generated/prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// bikin pool dari pg
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// inject ke prisma adapter
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
  log: ["query", "info", "warn", "error"],
});

export default prisma;

// Tanpa adapter:

// Prisma yang atur koneksi sendiri (black box)

// Dengan pg-adapter:

// Kamu pakai Pool dari pg
// Bisa atur:
// max koneksi
// timeout
// reuse koneksi

// 👉 Ini penting banget buat:

// performa
// hemat resource
// hindari error “too many connections”

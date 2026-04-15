import { Client } from "@upstash/qstash";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  token: process.env.QSTASH_TOKEN!,
});

async function createSchedule() {
  const res = await client.schedules.create({
    destination: "https://warungkuu-api.vercel.app/jobs/low-stock",
    cron: "* * * * *",
  });

  console.log("Schedule created:", res);
}

createSchedule();

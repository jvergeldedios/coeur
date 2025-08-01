import { z } from "zod";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z
    .url()
    .default("postgresql://postgres:postgres@localhost:5432/coeur"),
  REDIS_URL: z.url().default("redis://:redis@localhost:6379"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables", parsedEnv.error);
  process.exit(1);
}

export const config = parsedEnv.data;

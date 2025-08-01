import { z } from "zod";
import dotenv from "dotenv";

if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: ".env.test", quiet: true });
} else {
  dotenv.config({ quiet: true });
}

const envSchema = z.object({
  NODE_ENV: z
    .enum(["test", "development", "production"])
    .default("development"),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z
    .url()
    .default("postgresql://postgres:postgres@localhost:5432/coeur"),
  REDIS_URL: z.url().default("redis://:redis@localhost:6379"),
  LOG_LEVEL: z
    .enum(["silent", "debug", "info", "warn", "error"])
    .default("info"),
  LOG_DATABASE_QUERIES: z.stringbool().default(true),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables", parsedEnv.error);
  process.exit(1);
}

export const setValue = (key: string, value: any) => {
  config[key as keyof typeof config] = value as never;
};

export const config = parsedEnv.data;

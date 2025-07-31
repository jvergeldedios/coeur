import { version } from "./package.json";
import { getLogger } from "./src/logging";
import { config } from "./src/config";
import { app } from "./src/server";
import { db } from "./src/db";
import { sql } from "drizzle-orm";

const logger = getLogger();
logger.info(`Starting Coeur v${version}`);
logger.info("Config initialized:", JSON.stringify(config));
logger.info("Environment:", config.NODE_ENV);

try {
  await db.execute(sql`SELECT 1`);
  logger.info("Database initialized");
} catch (error) {
  logger.error("Database initialization failed:", JSON.stringify(error));
  process.exit(1);
}

logger.info(`💗 Coeur is beating at port ${config.PORT}`);

export default {
  fetch: app.fetch,
  port: config.PORT,
};

import { SQL } from "bun";
import { drizzle } from "drizzle-orm/bun-sql";
import type { Logger } from "drizzle-orm";

import { config } from "../config";
import { getLogger } from "../logging";

class DBLogger implements Logger {
  logQuery(query: string, params: unknown[]) {
    getLogger()
      .child()
      .withContext({
        query,
        params,
      })
      .info("Executing query");
  }
}

export const db = drizzle({
  client: new SQL(config.DATABASE_URL),
  logger: new DBLogger(),
});

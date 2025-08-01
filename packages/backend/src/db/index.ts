import { SQL } from "bun";
import { drizzle } from "drizzle-orm/bun-sql";
import type { Logger } from "drizzle-orm";

import { config } from "@/config";
import { getLogger } from "@/logging";
import * as schema from "@/db/schema";

class QueryLogger implements Logger {
  logQuery(query: string, params: unknown[]) {
    if (config.NODE_ENV !== "test") {
      getLogger()
        .child()
        .withContext({
          query,
          params,
        })
        .info("Executing query");
    }
  }
}

export const db = drizzle(new SQL(config.DATABASE_URL), {
  logger: new QueryLogger(),
  schema,
});

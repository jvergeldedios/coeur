import { drizzle } from "drizzle-orm/bun-sql";
import { SQL } from "bun";

import { config } from "../config";

export const db = drizzle(new SQL(config.DATABASE_URL));

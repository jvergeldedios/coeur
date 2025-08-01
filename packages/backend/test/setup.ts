import { beforeAll, beforeEach } from "bun:test";
import { getLogger } from "../src/logging";
import { resetDatabase, truncateAllTables } from "backend/src/db/util";

beforeAll(async () => {
  getLogger().info("Preparing test database");
  await resetDatabase();
});

beforeEach(async () => {
  await truncateAllTables();
});

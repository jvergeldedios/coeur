import { beforeAll, beforeEach } from "bun:test";
import { getLogger } from "@/logging";
import { resetDatabase, truncateAllTables } from "@/db/util";

beforeAll(async () => {
  getLogger().info("Preparing test database");
  await resetDatabase();
});

beforeEach(async () => {
  await truncateAllTables();
});

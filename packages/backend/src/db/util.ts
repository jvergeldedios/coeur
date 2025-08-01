import { SQL } from "bun";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { config } from "../config";
import { getLogger } from "../logging";
import { db } from ".";
import * as schema from "./schema";
import { type ExtractTablesWithRelations } from "drizzle-orm";

type Schema = typeof schema;
type TableNames = keyof ExtractTablesWithRelations<Schema>;

const databaseConfig = parseDatabaseUrl();
const { database } = databaseConfig;

function parseDatabaseUrl() {
  const parsedUrl = new URL(config.DATABASE_URL);
  return {
    host: parsedUrl.hostname,
    port: parseInt(parsedUrl.port),
    user: parsedUrl.username,
    password: parsedUrl.password,
    database: parsedUrl.pathname.slice(1),
  };
}

function getUtilClient() {
  const { host, port, user, password } = parseDatabaseUrl();
  return new SQL({ host, port, user, password });
}

export async function dropDatabase() {
  const sql = getUtilClient();
  getLogger().info(`Dropping database ${database}`);
  await sql`DROP DATABASE IF EXISTS ${sql(database)}`;
  getLogger().info(`Database ${database} dropped`);
}

export async function createDatabase() {
  const sql = getUtilClient();
  getLogger().info(`Creating database ${database}`);
  await sql`CREATE DATABASE ${sql(database)}`;
  getLogger().info(`Database ${database} created`);
}

export async function resetDatabase() {
  await dropDatabase();
  await createDatabase();
  await migrate(db, { migrationsFolder: "./drizzle" });
}

export async function truncateAllTables() {
  const sql = new SQL(config.DATABASE_URL);
  getLogger().info(`Truncating all tables in database ${database}`);
  const tableNames = Object.keys(schema) as TableNames[];
  for (const tableName of tableNames) {
    await sql`TRUNCATE TABLE ${sql(tableName)} RESTART IDENTITY CASCADE`;
  }
  getLogger().info(`All tables in database ${database} truncated`);
}

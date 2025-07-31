import { SQL } from "bun";
import { config } from "../config";
import { getLogger } from "../logging";

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
  const { database } = parseDatabaseUrl();
  getLogger().info(`Dropping database ${database}`);
  await sql`DROP DATABASE IF EXISTS ${sql(database)}`;
  getLogger().info(`Database ${database} dropped`);
}

export async function createDatabase() {
  const sql = getUtilClient();
  const { database } = parseDatabaseUrl();
  getLogger().info(`Creating database ${database}`);
  await sql`CREATE DATABASE ${sql(database)}`;
  getLogger().info(`Database ${database} created`);
}

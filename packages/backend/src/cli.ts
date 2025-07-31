import { Command } from "commander";
import { createDatabase, dropDatabase } from "./db/util";

const program = new Command();

const dbCommands = program.command("db");

dbCommands.command("drop").action(async () => {
  await dropDatabase();
});

dbCommands.command("create").action(async () => {
  await createDatabase();
});

dbCommands.command("reset").action(async () => {
  await dropDatabase();
  await createDatabase();
});

program.parse(process.argv);

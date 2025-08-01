import { Command } from "commander";
import { createDatabase, dropDatabase, resetDatabase } from "@/db/util";
import { defaultQueue } from "@/queues/default";
import { getLogger } from "@/logging";
import { setValue } from "@/config";

setValue("LOG_DATABASE_QUERIES", false);

const program = new Command();

const dbCommands = program.command("db");
dbCommands.command("drop").action(async () => {
  await dropDatabase();
});
dbCommands.command("create").action(async () => {
  await createDatabase();
});
dbCommands.command("reset").action(async () => {
  await resetDatabase();
  getLogger().info("Database reset");
});

program.command("routes").action(async () => {
  const { app } = await import("./server");
  app.routes.forEach((route) => {
    console.log(route.method, route.path);
  });
});

const jobCommands = program.command("jobs");
const jobEnqueueCommands = jobCommands.command("enqueue");
jobEnqueueCommands
  .command("post")
  .argument("<postId>")
  .action(async (postId) => {
    defaultQueue.add("post", {
      postId,
    });
  });

program.command("why").action(() => {
  console.log("what");
});

await program.parseAsync(process.argv);
process.exit(0);

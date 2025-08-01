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

program.command("routes").action(async () => {
  const { app } = await import("./server");
  const { redis } = await import("./queues/connection");
  app.routes.forEach((route) => {
    console.log(route.method, route.path);
  });
  redis.quit();
});

const jobCommands = program.command("jobs");
const jobEnqueueCommands = jobCommands.command("enqueue");
jobEnqueueCommands
  .command("post")
  .argument("<postId>")
  .action(async (postId) => {
    const { PostService } = await import("./services/post");
    const { redis } = await import("./queues/connection");
    await PostService.enqueuePostJob(postId);
    redis.quit();
  });

program.command("why").action(() => {
  console.log("what");
});

program.parse(process.argv);

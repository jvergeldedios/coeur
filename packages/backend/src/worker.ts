import { Worker } from "bullmq";

import { redis } from "./queues/connection";
import { getLogger } from "./logging";
import { asyncLocalStorage } from "./logging/async-local-storage";
import { humanizeDuration } from "./util/time";

const worker = new Worker(
  "default",
  async (job) => {
    const logger = getLogger().child().withContext({
      jobId: job.id,
      jobName: job.name,
      jobData: job.data,
    });
    const start = process.hrtime.bigint();
    await asyncLocalStorage.run({ logger }, async () => {
      logger.info("Do some work...");
    });
    const duration = Number(process.hrtime.bigint() - start);
    logger
      .withContext({ duration })
      .info(`Job took ${humanizeDuration(duration)}`);
    return "done";
  },
  { connection: redis }
);

worker.on("ready", () => {
  getLogger().info(
    `Coeur worker ready and listening on the "${worker.name}" queue`
  );
});

worker.on("active", (job) => {
  getLogger()
    .child()
    .withContext({
      jobId: job.id,
      jobName: job.name,
      jobData: job.data,
    })
    .info(`Starting job with ID "${job.id}"`);
});

worker.on("completed", (job) => {
  getLogger()
    .child()
    .withContext({
      jobId: job.id,
      jobName: job.name,
      jobData: job.data,
    })
    .info(`Finished job with ID "${job.id}"`);
});

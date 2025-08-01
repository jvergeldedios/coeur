import { Queue } from "bullmq";
import { redis } from "@/queues/connection";

export const defaultQueue = new Queue("default", { connection: redis });

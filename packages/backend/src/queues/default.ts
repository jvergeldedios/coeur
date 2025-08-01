import { Queue } from "bullmq";
import { redis } from "./connection";

export const defaultQueue = new Queue("default", { connection: redis });

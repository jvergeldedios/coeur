import { createMiddleware } from "hono/factory";
import { asyncLocalStorage } from "./async-local-storage";
import { getLogger } from ".";

export const loggerMiddleware = createMiddleware(async (c, next) => {
  const logger = getLogger()
    .child()
    .withContext({
      reqId: crypto.randomUUID(),
      method: c.req.method,
      path: c.req.path,
      params: c.req.param(),
      query: c.req.query(),
      clientIp: c.req.header("x-forwarded-for") || c.req.header("x-real-ip"),
    });

  c.set("logger", logger);

  logger.info("Request received");
  const start = process.hrtime.bigint();

  await asyncLocalStorage.run({ logger }, next);

  const duration = Number(process.hrtime.bigint() - start);
  logger
    .withContext({
      duration,
    })
    .info(`Request completed in ${humanizeDuration(duration)}`);
});

function humanizeDuration(duration: number) {
  if (duration >= 1_000_000) {
    return `${(duration / 1_000_000).toFixed(1)}ms`;
  }
  if (duration >= 1_000) {
    return `${(duration / 1_000).toFixed(1)}µs`;
  }
  return `${duration}ns`;
}

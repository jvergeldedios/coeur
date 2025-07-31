import { createMiddleware } from "hono/factory";
import { asyncLocalStorage } from "./async-local-storage";
import { getLogger } from ".";
import { humanizeDuration } from "../util/time";

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
  const loggerWithContext = logger.withContext({
    duration,
    status: c.res.status,
  });

  if (c.res.status >= 500) {
    loggerWithContext.error(`Request failed in ${humanizeDuration(duration)}`);
  } else {
    loggerWithContext.info(
      `Request completed in ${humanizeDuration(duration)}`
    );
  }
});

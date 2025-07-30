import { Elysia } from "elysia";
import { ip } from "elysia-ip";

import { getLogger } from ".";

export const loggerMiddleware = () => {
  return new Elysia({
    name: "@coeur/logger",
  })
    .use(ip())
    .derive({ as: "global" }, ({ request, ip }) => {
      const loggerWithContext = getLogger().withContext({
        reqId: crypto.randomUUID(),
        method: request.method,
        path: request.url,
        body: request.body,
        clientIp: ip,
        userAgent: request.headers.get("user-agent"),
      });
      return {
        logger: loggerWithContext,
        startTime: process.hrtime.bigint(),
      };
    })
    .onBeforeHandle({ as: "global" }, ({ logger }) => {
      logger.info("Request received");
    })
    .onAfterHandle({ as: "global" }, ({ logger, startTime }) => {
      const duration = process.hrtime.bigint() - startTime;
      logger
        .withContext({
          duration,
        })
        .info(`Request completed in ${humanizeDuration(duration)}`);
    });
};

function humanizeDuration(duration: bigint) {
  const ms = Number(duration) / 1000000;
  if (ms >= 0.1) {
    return `${ms.toFixed(1)}ms`;
  }
  return `${(ms * 1000).toFixed(1)}μs`;
}

import { Elysia } from "elysia";
import { ip } from "elysia-ip";
import { LogLayer } from "loglayer";
import { pino } from "pino";
import { PinoTransport } from "@loglayer/transport-pino";
import {
  getSimplePrettyTerminal,
  moonlight,
} from "@loglayer/transport-simple-pretty-terminal";

import { config } from "./config";

const pinoLogger = pino({
  level: config.NODE_ENV === "development" ? "debug" : "info",
});

export const logger = new LogLayer({
  transport: [
    new PinoTransport({
      logger: pinoLogger,
      enabled: config.NODE_ENV === "production",
    }),
    getSimplePrettyTerminal({
      enabled: config.NODE_ENV === "development",
      viewMode: "expanded",
      runtime: "node",
      theme: moonlight,
    }),
  ],
});

export const loggerMiddleware = () => {
  return new Elysia({
    name: "@coeur/logger",
  })
    .use(ip())
    .derive({ as: "global" }, ({ request, ip }) => {
      const loggerWithContext = logger.withContext({
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
      logger.info(`Request completed in ${timeInMs(duration)}`);
    });
};

function timeInMs(duration: bigint) {
  const ms = Number(duration) / 1000000;
  if (ms >= 0.1) {
    return `${ms.toFixed(1)}ms`;
  }
  return `${(ms * 1000).toFixed(1)}μs`;
}

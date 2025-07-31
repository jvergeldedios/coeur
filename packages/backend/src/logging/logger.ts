import {
  getSimplePrettyTerminal,
  moonlight,
} from "@loglayer/transport-simple-pretty-terminal";
import { PinoTransport } from "@loglayer/transport-pino";
import { pino } from "pino";
import { LogLayer } from "loglayer";
import { config } from "../config";
import { serializeError } from "serialize-error";

export function createLogger() {
  const pinoLogger = pino({
    level: config.NODE_ENV === "development" ? "debug" : "info",
  });

  const transport = [
    {
      enabled: config.NODE_ENV === "production",
      transport: new PinoTransport({
        logger: pinoLogger,
      }),
    },
    {
      enabled: config.NODE_ENV === "development",
      transport: getSimplePrettyTerminal({
        viewMode: "inline",
        runtime: "node",
        theme: moonlight,
      }),
    },
  ]
    .filter((t) => t.enabled)
    .map((t) => t.transport);
  return new LogLayer({
    errorSerializer: serializeError,
    transport,
  });
}

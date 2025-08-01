import {
  getSimplePrettyTerminal,
  moonlight,
} from "@loglayer/transport-simple-pretty-terminal";
import { PinoTransport } from "@loglayer/transport-pino";
import { pino } from "pino";
import { LogLayer, ConsoleTransport } from "loglayer";
import { config } from "@/config";
import { serializeError } from "serialize-error";

export function createLogger() {
  const pinoLogger = pino({
    level: config.LOG_LEVEL,
  });

  const transport = [
    new PinoTransport({
      enabled: config.NODE_ENV === "production",
      logger: pinoLogger,
    }),
    getSimplePrettyTerminal({
      viewMode: "inline",
      runtime: "node",
      theme: moonlight,
      enabled: config.NODE_ENV === "development",
    }),
  ];

  return new LogLayer({
    errorSerializer: serializeError,
    transport,
  });
}

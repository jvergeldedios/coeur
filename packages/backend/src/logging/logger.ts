import {
  getSimplePrettyTerminal,
  moonlight,
} from "@loglayer/transport-simple-pretty-terminal";
import { PinoTransport } from "@loglayer/transport-pino";
import { pino } from "pino";
import { LogLayer, ConsoleTransport } from "loglayer";
import { config } from "../config";
import { serializeError } from "serialize-error";

const getLogLevel = () => {
  if (config.NODE_ENV === "test") {
    return "silent";
  }
  return config.NODE_ENV === "development" ? "debug" : "info";
};

export function createLogger() {
  const pinoLogger = pino({
    level: getLogLevel(),
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
    new ConsoleTransport({
      logger: console,
      enabled: config.NODE_ENV === "test" && getLogLevel() !== "silent",
    }),
  ];

  return new LogLayer({
    errorSerializer: serializeError,
    transport,
  });
}

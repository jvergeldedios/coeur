import {
  getSimplePrettyTerminal,
  moonlight,
} from "@loglayer/transport-simple-pretty-terminal";
import { PinoTransport } from "@loglayer/transport-pino";
import { pino } from "pino";
import { LogLayer, type ILogLayer } from "loglayer";
import { config } from "../config";
import { asyncLocalStorage } from "./async-local-storage";

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
    transport,
  });
}

const defaultLogger = createLogger();

export function getLogger(): ILogLayer {
  const store = asyncLocalStorage.getStore();

  if (!store) {
    return defaultLogger;
  }

  return store.logger;
}

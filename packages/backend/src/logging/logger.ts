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

  return new LogLayer({
    transport: [
      new PinoTransport({
        logger: pinoLogger,
        // enabled: config.NODE_ENV === "production",
      }),
      // getSimplePrettyTerminal({
      //   enabled: config.NODE_ENV === "development",
      //   viewMode: "expanded",
      //   runtime: "node",
      //   theme: moonlight,
      // }),
    ],
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

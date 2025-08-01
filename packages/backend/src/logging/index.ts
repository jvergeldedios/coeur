import { asyncLocalStorage } from "@/logging/async-local-storage";
import { createLogger } from "@/logging/logger";

const logger = createLogger();

export function getLogger() {
  const store = asyncLocalStorage.getStore();

  if (!store) {
    return logger;
  }

  return store.logger;
}

export { loggerMiddleware } from "./middleware";

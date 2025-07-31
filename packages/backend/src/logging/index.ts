import { asyncLocalStorage } from "./async-local-storage";
import { createLogger } from "./logger";

const logger = createLogger();

export function getLogger() {
  const store = asyncLocalStorage.getStore();

  if (!store) {
    return logger;
  }

  return store.logger;
}

export { loggerMiddleware } from "./middleware";

import Elysia from "elysia";

import { config } from "./config";
import { getLogger, loggerMiddleware } from "./logging";

import { controllers } from "./controllers";

export const startServer = () => {
  const logger = getLogger();
  const app = new Elysia();

  app.use(loggerMiddleware());
  app.get("/", () => "Hello World");

  app.group("/api", (app) => {
    controllers.forEach((controller) => {
      app.use(controller);
    });
    return app;
  });

  app.listen(config.PORT, () => {
    logger.info(`Environment: ${config.NODE_ENV}`);
    logger.info(`Coeur is beating at port ${config.PORT}`);
  });
};

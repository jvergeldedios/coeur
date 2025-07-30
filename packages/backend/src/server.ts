import Elysia from "elysia";

import { config } from "./config";
import { logger, loggerMiddleware } from "./logging";

import { controllers } from "./controllers";

export const startServer = () => {
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
    logger.info(`Coeur is beating at port ${config.PORT}`);
    logger.info(`Environment: ${config.NODE_ENV}`);
  });
};

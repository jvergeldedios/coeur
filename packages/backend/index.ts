import { version } from "./package.json";
import { getLogger } from "./src/logging";
import { config } from "./src/config";
import { app } from "./src/server";

const logger = getLogger();
logger.info(`Starting Coeur v${version}`);
logger.info("Config initialized:", JSON.stringify(config));
logger.info("Environment:", config.NODE_ENV);
logger.info(`💗 Coeur is beating at port ${config.PORT}`);

export default {
  fetch: app.fetch,
  port: config.PORT,
};

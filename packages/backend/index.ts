import { startServer } from "./src/server";
import { config } from "./src/config";
import { getLogger } from "./src/logging";
import { version } from "./package.json";

const logger = getLogger();

logger.info(`Starting Coeur v${version}`);
logger.info("Environment initialized", JSON.stringify(config));

startServer();

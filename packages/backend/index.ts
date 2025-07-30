import { startServer } from "./src/server";
import { config } from "./src/config";
import { getLogger } from "./src/logging";

getLogger().info("Environment initialized", JSON.stringify(config));

startServer();

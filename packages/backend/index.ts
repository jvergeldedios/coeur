import { startServer } from "./src/server";
import { config } from "./src/config";

startServer({ port: config.PORT });

import { Hono } from "hono";
import type { ILogLayer } from "loglayer";
import { loggerMiddleware } from "./logging";
import { api } from "./api";

type Variables = {
  logger: ILogLayer;
};
const app = new Hono<{ Variables: Variables }>();

app.use("*", loggerMiddleware);

app.get("/", (c) => c.text("Hello World"));
app.get("/healthz", (c) => c.text("OK"));
app.route("/api", api);

export { app };

import express, { type Response } from "express";

interface StartServerOptions {
  port: number;
}

export const startServer = (options: StartServerOptions = { port: 3000 }) => {
  const app = express();

  app.get("/", (_, res: Response) => {
    res.send("Hello World");
  });

  app.listen(options.port, () => {
    console.log(`Server is running on port ${options.port}`);
  });
};

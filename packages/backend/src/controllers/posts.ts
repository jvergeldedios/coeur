import Elysia from "elysia";
import { getLogger } from "../logging/logger";

export const postsController = new Elysia().group("/posts", (app) =>
  app
    .get("/", () => {
      getLogger().info("List of posts");
      return "List of posts";
    })
    .get("/:id", ({ params }) => `Post ${params.id}`)
    .post("/", () => "Create a post")
    .put("/:id", () => "Update a post")
    .delete("/:id", () => "Delete a post")
);

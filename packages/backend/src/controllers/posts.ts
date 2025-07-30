import Elysia from "elysia";
import { getLogger } from "../logging/logger";
import { PostService } from "../services/post";

export const postsController = new Elysia().group("/posts", (app) =>
  app
    .get("/", () => {
      PostService.getPosts();
      return "List of posts";
    })
    .get("/:id", ({ params }) => `Post ${params.id}`)
    .post("/", () => "Create a post")
    .put("/:id", () => "Update a post")
    .delete("/:id", () => "Delete a post")
);

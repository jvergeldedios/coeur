import Elysia from "elysia";

export const postsController = new Elysia().group("/posts", (app) =>
  app
    .get("/", () => "List of posts")
    .get("/:id", ({ params }) => `Post ${params.id}`)
    .post("/", () => "Create a post")
    .put("/:id", () => "Update a post")
    .delete("/:id", () => "Delete a post")
);

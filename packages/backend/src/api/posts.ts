import { Hono } from "hono";
import { PostService } from "@/services/post";

const posts = new Hono();
posts
  .get("/", (c) => {
    PostService.getPosts();
    return c.text("List of posts");
  })
  .get("/:id", (c) => c.text(`Post ${c.req.param("id")}`))
  .post("/", (c) => c.text("Create a post"))
  .put("/:id", (c) => c.text("Update a post"))
  .delete("/:id", (c) => c.text("Delete a post"));

export { posts };

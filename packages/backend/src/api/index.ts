import { Hono } from "hono";
import { posts } from "@/api/posts";

const api = new Hono();
api.route("/posts", posts);

export { api };

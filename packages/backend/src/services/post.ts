import { eq } from "drizzle-orm";
import { getLogger } from "@/logging";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { type NewPost, type User, type Post } from "@/types";

interface CreatePostProps {
  author: User;
  post: NewPost;
}

export class PostService {
  public static getPosts() {
    getLogger().info("Getting posts");
  }

  public static async createPost(props: CreatePostProps): Promise<Post> {
    const [post] = await db
      .insert(posts)
      .values({
        ...props.post,
        authorId: props.author.id,
      })
      .returning();
    if (!post) {
      throw new Error("Failed to create post");
    }
    return post;
  }

  public static async getPostsByAuthor(author: User): Promise<Post[]> {
    const fetchedPosts = await db.query.posts.findMany({
      where: eq(posts.authorId, author.id),
    });
    if (!fetchedPosts) {
      throw new Error("Failed to get posts");
    }
    return fetchedPosts;
  }
}

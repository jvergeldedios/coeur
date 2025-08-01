import { Factory } from "fishery";
import { posts } from "../../src/db/schema";
import { db } from "../../src/db";
import { faker } from "@faker-js/faker";
import type { NewPost, Post } from "../../src/types";

export const postFactory = Factory.define<NewPost, any, Post>(
  ({ onCreate, params }) => {
    onCreate(async (post: NewPost) => {
      const [createdPost] = await db.insert(posts).values(post).returning();
      if (!createdPost) {
        throw new Error("Failed to create post");
      }
      return createdPost;
    });
    return {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      ...params,
    };
  }
);

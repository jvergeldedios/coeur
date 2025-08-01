import { Factory } from "fishery";
import { faker } from "@faker-js/faker";

import { posts } from "@/db/schema";
import { db } from "@/db";
import type { NewPost, Post } from "@/types";

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

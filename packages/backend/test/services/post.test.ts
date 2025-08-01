import { describe, it, expect, beforeEach } from "bun:test";
import { faker } from "@faker-js/faker";

import type { User } from "../../src/types";

import { PostService } from "../../src/services/post";
import { userFactory } from "../factories/user.factory";
import { postFactory } from "../factories/post.factory";

describe("PostService", () => {
  let author: User;

  beforeEach(async () => {
    author = await userFactory.create();
  });

  it("should be defined", () => {
    expect(PostService).toBeDefined();
  });

  describe("createPost", () => {
    it("should create a post", async () => {
      const title = faker.lorem.sentence();
      const content = faker.lorem.paragraph();
      const post = await PostService.createPost({
        author,
        post: {
          title,
          content,
        },
      });
      expect(post).toBeDefined();
      expect(post.id).toBeDefined();
      expect(post.title).toBe(title);
      expect(post.content).toBe(content);
      expect(post.createdAt).toBeDefined();
      expect(post.updatedAt).toBeDefined();
    });
  });

  describe("getPostsByAuthor", () => {
    beforeEach(async () => {
      await postFactory.createList(3, { authorId: author.id });
    });

    it("should get all posts by author", async () => {
      const posts = await PostService.getPostsByAuthor(author);
      expect(posts).toBeDefined();
      expect(posts.length).toBe(3);
      for (const post of posts) {
        expect(post.authorId).toBe(author.id);
      }
    });
  });
});

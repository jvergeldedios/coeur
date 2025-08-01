import { Factory } from "fishery";
import { users } from "../../src/db/schema";
import { db } from "../../src/db";
import { faker } from "@faker-js/faker";
import type { NewUser, User } from "../../src/types";

export const userFactory = Factory.define<NewUser, any, User>(
  ({ onCreate }) => {
    onCreate(async (user: NewUser) => {
      const [createdUser] = await db.insert(users).values(user).returning();
      if (!createdUser) {
        throw new Error("Failed to create user");
      }
      return createdUser;
    });
    return {
      email: faker.internet.email(),
    };
  }
);

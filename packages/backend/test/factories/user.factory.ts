import { Factory } from "fishery";
import { faker } from "@faker-js/faker";

import { users } from "@/db/schema";
import { db } from "@/db";
import type { NewUser, User } from "@/types";

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

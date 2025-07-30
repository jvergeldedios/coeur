import { getLogger } from "../logging";

export class PostService {
  public static getPosts() {
    getLogger().info("Getting posts");
  }
}

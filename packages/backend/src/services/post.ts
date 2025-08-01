import { getLogger } from "../logging";
import { defaultQueue } from "../queues/default";

export class PostService {
  public static getPosts() {
    getLogger().info("Getting posts");
  }
  public static async enqueuePostJob(postId: string) {
    await defaultQueue.add("post", {
      postId,
    });
  }
}

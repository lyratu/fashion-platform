import { User } from "./user";

export interface comment {
  id: number;
  content: string;

  images: string[];

  userId: number;

  objectId: number;

  parentId: number;

  rootId: number;

  likeCount: number;

  replyCount: number;

  type: number;
  createTime: string;

  user: User;
}

import { topic } from "./topic";
import { User } from "./user";

export interface post {
  id?: number;
  userId?: number;
  content: string;
  images: string[];
  topics: topic[];
  user?: User;
  createTime?: string;
  likeCount?: number;
  commentCount?: number;
}

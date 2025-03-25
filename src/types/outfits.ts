import { User } from "./user";

export interface outfits {
  id: number;
  coverImage: string;
  title: string;
  description: string;
  content: string;
  category: number;
  season: number;
  viewNmber: number;
  likeCount: number;
  collectCount: number;
  authorId: number;
  createTime: string;
  user: User;
  isFeature: number;
}

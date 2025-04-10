import { User } from "./user";

type tag = {
  id: number;
  name: string;
  outfitId: number;
};

export interface outfits {
  id: number;
  coverImage: string;
  title: string;
  description: string;
  content: string;
  category: number;
  categoryText: {
    name: string;
    typeId: number;
    value: string;
  };
  likeStatus: number;
  collectStatus: number;
  season: number;
  viewNmber: number;
  likeCount: number;
  collectCount: number;
  commentCount: number;
  authorId: number;
  createTime: string;
  user: User;
  isFeature: number;
  tags: Array<tag>;
}

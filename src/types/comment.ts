export interface comment {
  id?: number;
  content: string;

  userId?: number;

  objectId?: number;

  parentId?: number;

  rootId?: number;

  likeCount: number;
  likeStatus?: number;
  replyCount?: number;

  type?: number;
  createTime?: string;
  replyTo?: string;
  isLike?: boolean;
  children: Array<comment>;
  user: { id?: number; nickName: string; avatarUrl: string };
}

export interface commentForm {
  objectId: number;
  content: string;
  parentId?: number;
  replyTo?: string;
}

export interface replyStatus {
  parentId?: number;
  replyTo?: string;
  content: string;
  status: boolean;
  nickName: string;
}

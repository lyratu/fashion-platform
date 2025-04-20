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
  replyToId?: number;
  isLike?: boolean;
  children: Array<comment>;
  user: { id?: number; nickName: string; avatarUrl: string };
}

export interface commentForm {
  objectId: number;
  content: string;
  parentId?: number;
  replyTo?: string;
  replyToId?: number;
}

export interface replyStatus {
  parentId?: number;
  replyTo?: string;
  replyToId?: number;
  content: string;
  status: boolean;
  nickName: string;
}

export interface pageComment {
  list: Array<comment>;
  total: number;
}

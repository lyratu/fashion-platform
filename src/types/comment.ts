export interface comment {
  id?: number;
  content: string;

  userId?: number;

  objectId?: number;

  parentId?: number;

  rootId?: number;

  likeCount?: number;

  replyCount?: number;

  type?: number;
  createTime?: string;

  user: { id?: number; nickName: string; avatarUrl: string };
}

export interface commentForm {
  objectId: number;
  content: string;
  parentId?: number;
  rootId?: number;
}

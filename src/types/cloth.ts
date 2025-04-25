export interface cloth {
  id: number;
  category: string;
  picture: string;
  remark: string;
  color: number[];
  status: number;
  season: number[];
  createUserId: number;
}

export interface suit {
  id: number;
  photo: string;

  temperature: number[];

  season: number[];

  scene: string;

  style: string;

  tags: string[];

  remark: string;

  config: string;
  createTime: string;
  nickName: string;
  avatarUrl: string;
}

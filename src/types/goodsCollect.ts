import { goods } from "./goods";

export interface goodsCollect {
  id: number;

  goodsId: number;

  goods: goods;

  userId: number;

  collectStatus: number;

  operateTime: Date;
}

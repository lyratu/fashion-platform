import { goods } from "./goods";

export interface CartItem {
  id?: number;
  goodsId: number;
  color?: string;
  size?: string;
  price?: number;
  count: number;
  checked?: number; // 0 表示未选中，1 表示选中
  goods?: goods;
}

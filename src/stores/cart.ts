import { CartItem } from "@/types/cart";
import { create } from "zustand";

// 定义购物车 store 接口
interface CartStore {
  cartItems: CartItem[];
  // 添加购物车项，如果已存在相同的商品（根据 goodsId, color, size 判断），则更新数量
  addItem: (item: CartItem) => void;
  // 根据 goodsId、color、size 删除购物车项
  removeItem: (goodsId: number, color?: string, size?: string) => void;
  // 更新指定购物车项的属性，例如数量或选中状态
  updateItem: (
    goodsId: number,
    updates: Partial<CartItem>,
    color?: string,
    size?: string
  ) => void;
  // 清空购物车
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],

  addItem: (item) =>
    set((state) => {
      // 根据 goodsId, color, size 进行唯一标识
      const exists = state.cartItems.find(
        (cartItem) =>
          cartItem.goodsId === item.goodsId &&
          cartItem.color === item.color &&
          cartItem.size === item.size
      );
      if (exists) {
        // 如果已存在，则更新数量
        return {
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.goodsId === item.goodsId &&
            cartItem.color === item.color &&
            cartItem.size === item.size
              ? { ...cartItem, count: cartItem.count + item.count }
              : cartItem
          ),
        };
      } else {
        // 不存在则直接添加新的购物车项
        return { cartItems: [...state.cartItems, item] };
      }
    }),

  removeItem: (goodsId, color, size) =>
    set((state) => ({
      cartItems: state.cartItems.filter(
        (item) =>
          !(
            item.goodsId === goodsId &&
            (color ? item.color === color : true) &&
            (size ? item.size === size : true)
          )
      ),
    })),

  updateItem: (goodsId, updates, color, size) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) => {
        if (
          item.goodsId === goodsId &&
          (color ? item.color === color : true) &&
          (size ? item.size === size : true)
        ) {
          return { ...item, ...updates };
        }
        return item;
      }),
    })),

  clearCart: () => set({ cartItems: [] }),
}));

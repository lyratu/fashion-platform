import { create } from "zustand";

interface CartQuantityStore {
  // 购物车商品数量列表
  items: number[];
  // 新增初始化方法
  initializeCart: (items: number[]) => void;
  // 增加指定商品的数量（仅当ID不存在时添加）
  incrementQuantity: (id: number) => void;

  // 减少指定商品的数量（直接减1）
  decrementQuantity: (id: number) => void;

  // 获取购物车总数量
  getTotalQuantity: () => number;
}

export const useCartQuantityStore = create<CartQuantityStore>((set, get) => ({
  // 初始化为空数组
  items: [],

  // 新增初始化方法
  initializeCart: (items) =>
    set(() => ({
      items: items,
    })),

  // 增加指定商品的数量（仅当ID不存在时添加）
  incrementQuantity: (id) =>
    set((state) => {
      // 检查是否已存在该商品
      if (!state.items.includes(id)) {
        // 如果不存在，添加新的商品ID
        return {
          items: [...state.items, id],
        };
      }

      // 如果已存在，直接返回原状态
      return state;
    }),

  // 减少指定商品的数量（直接减1）
  decrementQuantity: (id) =>
    set((state) => ({
      items: state.items.filter((itemId) => itemId !== id),
    })),

  // 获取购物车总数量
  getTotalQuantity: () => {
    return get().items.length;
  },
}));

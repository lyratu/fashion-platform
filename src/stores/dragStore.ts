// stores/dragStore.ts
import { cloth, suit } from "@/types/cloth";
import { create } from "zustand";

interface DragState {
  isDragging: boolean;
  draggedItem: cloth | suit | null; // 存储被拖拽元素的数据
}

interface DragActions {
  /**
   * 当拖拽开始时调用。
   * @param itemData - 正在被拖拽的元素的相关数据。
   */
  startDrag: (itemData: cloth|suit) => void;

  /**
   * 当拖拽结束 (无论是放下还是取消) 时调用。
   */
  endDrag: () => void;
}

type DragStore = DragState & DragActions;

export const useDragStore = create<DragStore>((set) => ({
  // 初始状态
  isDragging: false,
  draggedItem: null,

  // Actions 实现
  startDrag: (itemData) =>
    set({
      isDragging: true,
      draggedItem: itemData,
    }),

  endDrag: () =>
    set({
      isDragging: false,
      draggedItem: null,
    }),
}));

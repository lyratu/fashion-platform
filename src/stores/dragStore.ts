// stores/dragStore.ts
import { create } from "zustand";

// 1. 定义你想要在拖拽时存储的数据的类型。
//    请将 'unknown' 替换为你实际拖拽的元素的数据类型。
//    例如: interface DraggableItemData { id: string; type: string; name: string; /* ... */ }
export type DraggableItemData = {
  id: number;
  category: string;
  remark: string;
  picture: string;
};

// 2. 定义 Store 的状态类型
interface DragState {
  isDragging: boolean;
  draggedItem: DraggableItemData | null; // 存储被拖拽元素的数据
}

// 3. 定义 Store 的 Actions 类型
interface DragActions {
  /**
   * 当拖拽开始时调用。
   * @param itemData - 正在被拖拽的元素的相关数据。
   */
  startDrag: (itemData: DraggableItemData) => void;

  /**
   * 当拖拽结束 (无论是放下还是取消) 时调用。
   */
  endDrag: () => void;

  // 你可能还需要一个 action 来处理 drop 事件，
  // 但通常 drop 的逻辑更复杂，可能涉及目标区域的数据，
  // 所以很多时候 drop 逻辑是放在 drop 目标组件内部处理的，
  // 并在 drop 成功后可能调用 endDrag()。
  // 如果你的 drop 逻辑也需要在 store 中集中处理，可以添加一个 action 如下：
  // handleDrop: (targetData: any) => void; // targetData 是放置目标的数据类型
}

// 4. 合并状态和 Actions 类型
type DragStore = DragState & DragActions;

// 5. 创建 Zustand Store
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

  // 如果需要实现 handleDrop:
  // handleDrop: (targetData) => set(state => {
  //     if (state.isDragging && state.draggedItem) {
  //         console.log('Dropped', state.draggedItem, 'onto', targetData);
  //         // ... 在这里执行实际的放置逻辑，例如更新其他状态 ...
  //         return {
  //             isDragging: false,
  //             draggedItem: null,
  //         };
  //     }
  //     return state; // 如果没有拖拽，状态不变
  // }),
}));

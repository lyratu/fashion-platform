// stores/canvasStore.ts
import { create } from "zustand";

// 1. 定义代表画布内容的 State 类型。
//    现在我们将存储画布的 Base64 图片字符串。
interface CanvasState {
  /**
   * 画布当前内容的 Base64 编码图片字符串。
   * 通常是由 canvas.toDataURL() 生成的。
   * 如果画布为空或尚未初始化，可能为 undefined 或 null。
   */
  canvasBase64Image: string | undefined; // 或者 string | null;

  // 如果需要，你可以在这里添加其他画布级别的状态
  // 例如：lastUpdatedTimestamp: number;
}

// 2. 定义 Store 的 Actions 类型
interface CanvasActions {
  /**
   * 使用画布生成的 Base64 图片字符串更新 Store 中的状态。
   * 这个 action 通常会在 CanvasComponent 中，当画布内容变化或需要保存时调用。
   * @param base64String - 画布内容的 Base64 图片字符串。
   */
  updateCanvasImage: (base64String: string | undefined) => void;
}

// 3. 合并 State 和 Actions 类型
type CanvasStore = CanvasState & CanvasActions;

// 4. 创建 Zustand Store
export const UseCanvasStore = create<CanvasStore>((set) => ({
  // 初始状态
  canvasBase64Image: undefined, // 初始时没有图片

  // Actions 实现
  updateCanvasImage: (base64String) =>
    set({
      canvasBase64Image: base64String,
    }),

  // 如果你想在 Store 中触发生成 Base64 图片的操作（不太常见，通常在 CanvasComponent 中处理 Fabric API 调用）
  // generateAndStoreBase64: () => set(state => {
  //    // 在 CanvasComponent 中订阅此 action，并在 Fabric 实例上调用 toDataURL()
  //    // 然后使用 updateCanvasImage 来实际更新状态
  //    console.log('Store 接收到生成并存储 Base64 图片的指令');
  //    // 这里不能直接访问 Fabric 实例，所以这个 action 更多是作为一种意图
  //    // 实际生成 Base64 的逻辑需要在能够访问 Fabric 实例的地方（如 React 组件的 useEffect 或事件处理函数）
  //    return state; // 不直接修改状态，等待组件调用 updateCanvasImage
  // }),
}));

import { Save, Download, Share2, Trash2, Plus, Layers2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useState, useRef, useEffect } from "react"; // 导入 React
import * as fabric from "fabric"; // v6 版本 Fabric.js 导入方式
import { useDragStore, DraggableItemData } from "@/stores/dragStore"; // 导入你的 Zustand store 和类型
import { toast } from "sonner";
import { UseCanvasStore, FabricObjectSerialized } from "@/stores/canvasStore";
import { cloth } from "@/types/cloth";
import { useSaveSuit } from "@/services/clothes";
import { upload } from "@/services/base";
// 注意: 原始代码中的 ClothingItem 类型现在本质上就是 DraggableItemData
// 当一个物品被添加到画布上时，它的状态由 Fabric.js 对象管理。
interface AssistantProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
export default function Creator({ className }: AssistantProps) {
  const diyAreaRef = useRef<HTMLDivElement>(null); // 用于引用 DIY 区域的 DOM 元素的 Ref
  const canvasRef = useRef<fabric.Canvas | null>(null); // 用于存储 Fabric canvas 实例的 Ref
  const [objectCount, setObjectCount] = useState(0); // 用于跟踪对象数量的状态，以便显示空状态消息
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(
    null
  ); // 用于跟踪选中的对象的状态，以便启用删除按钮

  /* api */
  const { saveSuitFn } = useSaveSuit();
  // 从 Zustand store 获取状态和 action
  // isDragging 状态指示一个物品是否正在从*外部*被拖拽到这个区域
  // draggedItem 存储被拖拽物品的数据
  // endDrag 用于在拖拽结束时重置 store 状态
  const { isDragging, draggedItem, endDrag } = useDragStore();
  const updateCanvasImage = UseCanvasStore((state) => state.updateCanvasImage);
  // 编辑器上元素
  const [clothes, setClothes] = useState<cloth[]>([]);
  // --- Fabric.js 画布初始化和尺寸处理 ---
  useEffect(() => {
    const container = diyAreaRef.current; // 获取 DIY 区域容器的 DOM 元素
    let canvas: fabric.Canvas | null = null;

    if (container) {
      // 以编程方式创建一个 canvas 元素
      const canvasElement = document.createElement("canvas");
      // 将 canvas 元素添加到 ref 容器中
      container.appendChild(canvasElement);

      // 初始化 Fabric.js 画布
      // 根据容器当前尺寸设置初始大小
      canvas = new fabric.Canvas(canvasElement, {
        width: container.clientWidth, // 设置初始宽度
        height: container.clientHeight, // 设置初始高度
        selection: true, // 默认启用选择
        controlsAboveGrouping: true, // 可选: 分组时保持控制柄可见
        hoverCursor: "pointer", // 可选: 悬停时改变光标样式
      });

      canvasRef.current = canvas; // 将画布实例存储到 ref 中
      const handleCanvasChange = () => {
        if (canvas) {
          const base64 = canvas.toDataURL({
            format: "png",
            multiplier: 1, // 根据需要调整倍数
          });
          updateCanvasImage(base64); // 调用 store action 更新状态
        }
      };
      // --- Fabric 事件监听器 ---
      // 监听对象选择事件，更新 selectedObject 状态
      canvas.on("object:added", (e) => {
        setSelectedObject(e.target);
        handleCanvasChange();
        setObjectCount(canvasRef.current?.getObjects().length || 0);
      });
      canvas.on("object:removed", () => {
        handleCanvasChange();
        setObjectCount(canvasRef.current?.getObjects().length || 0);
      });
      canvas.on("object:modified", () => {
        handleCanvasChange();
      }); // 修改对象
      canvas.on("selection:cleared", () => {
        handleCanvasChange();
        setSelectedObject(null);
      });

      // 初次检查对象数量
      setObjectCount(canvas.getObjects().length);

      // --- 尺寸观察器 ---
      // 使用 ResizeObserver 在容器尺寸变化时自动调整画布尺寸
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.target === container && canvasRef.current) {
            const { width, height } = entry.contentRect;
            canvasRef.current.setWidth(width);
            canvasRef.current.setHeight(height);
            canvasRef.current.renderAll(); // 调整尺寸后重新渲染
          }
        }
      });
      // 观察 DIY 区域容器
      resizeObserver.observe(container);

      // --- 清理函数 ---
      return () => {
        if (canvasRef.current) {
          // 移除画布事件监听器
          canvasRef.current.off("selection:created");
          canvasRef.current.off("selection:updated");
          canvasRef.current.off("selection:cleared");
          canvasRef.current.off("object:added");
          canvasRef.current.off("object:removed");

          // 销毁 Fabric canvas 实例以防止内存泄漏
          canvasRef.current.dispose();
          canvasRef.current = null;
        }
        // 从 DOM 中移除 canvas 元素
        if (canvasElement.parentNode === container) {
          container.removeChild(canvasElement);
        }
        // 断开 ResizeObserver 连接
        resizeObserver.disconnect();
      };
    }
    // 如果 diyAreaRef.current 初始为 null (例如在服务器端渲染期间)，
    // effect 将在首次渲染后分配 ref 时再次运行。
    return () => {
      /* 如果 ref 为 null，则无需清理 */
    };
  }, []); // 空依赖数组确保此 useEffect 只在组件挂载时运行一次，并在卸载时进行清理

  // --- 放置处理 (从外部来源使用 store) ---
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // 允许放置的关键

    // 可选: 在拖拽悬停时为放置区域添加视觉反馈
    if (isDragging && draggedItem) {
      e.currentTarget.classList.add("border-blue-500", "border-dashed"); // 添加边框样式
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    // 可选: 在拖拽离开时移除视觉反馈
    e.currentTarget.classList.remove("border-blue-500", "border-dashed");
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // 阻止默认浏览器行为
    e.currentTarget.classList.remove("border-blue-500", "border-dashed"); // 移除高亮

    const canvas = canvasRef.current;

    if (canvas && isDragging && draggedItem) {
      // 从 Zustand store 获取物品数据
      const droppedItem: DraggableItemData = draggedItem;
      console.log("从 store 放置的物品:", droppedItem);
      setClothes([...clothes, droppedItem]);
      // 计算相对于画布的放置位置
      // 注意: e.clientX/Y 是相对于视口的
      // rect.left/top 是 canvas 元素相对于视口的位置
      const rect = canvas.getElement().getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // 使用 droppedItem.picture 作为图片 URL
      // 使用 Fabric.js 加载图片
      const relativePath = droppedItem.picture;
      const origin = window.location.origin;
      const img = await fabric.FabricImage.fromURL(`${origin}${relativePath}`, {
        // 可选: 用于跨域图片的 crossOrigin 设置
        // 如果后续需要导出画布，则需要此设置
        crossOrigin: "anonymous",
        // 可选: 如果需要，在这里指定图片选项，例如滤镜
      });
      img.on("selected", (e) => setSelectedObject(e.target));
      img.scale(canvas.width / 3 / img.width);
      img.set({
        left: x - img.getScaledWidth() / 2,
        top: y - img.getScaledHeight() / 2,
        // 可选: 也可以设置 originX/Y 来实现中心对齐
        // originX: 'center',
        // originY: 'center',
        // left: x,
        // top: y,
        cacheKey: droppedItem.id,
      });

      // 将 DraggableItemData 的自定义属性存储到 fabric 对象上
      // Fabric 的 toJSON 可以配置包含这些属性
      // 使用你 store 定义中的属性名称
      img.set({
        customId: droppedItem.id, // 使用数字 ID
        customCategory: droppedItem.category,
        customRemark: droppedItem.remark, // 使用 remark 属性
        customPictureUrl: droppedItem.picture, // 如果需要在 JSON 中包含 URL，则存储它
      });

      // 将图片对象添加到画布
      canvas.add(img);

      // 可选: 选中新添加的对象
      canvas.setActiveObject(img);

      canvas.renderAll(); // 重新渲染画布
    } else {
      console.warn(
        "发生了放置事件，但 store 中没有跟踪物品或 draggedItem 为 null。"
      );
    }

    // 放置尝试后总是调用 endDrag，无论成功与否
    // 这会重置 store 状态，表示拖拽已完成
    endDrag();
  };

  // --- Fabric 画布操作 (与按钮关联) ---

  // 移除当前选中的物品
  const removeSelectedItem = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const activeObject = canvas.getActiveObject() as fabric.FabricImage;
      const activeGroup = canvas.getActiveObjects(); // 如果选中了多个对象，则获取所有选中的对象

      if (activeGroup && activeGroup.length > 1) {
        // 如果选中了多个对象（组）
        activeGroup.forEach((obj) => canvas.remove(obj));
      } else if (activeObject) {
        // 如果选中了单个对象
        canvas.remove(activeObject);
        setClothes(
          clothes.filter((e) => e.id.toString() != activeObject.cacheKey)
        );
      } else {
        console.log("没有选中对象可移除。");
      }

      canvas.discardActiveObject(); // 取消所有选中状态
      canvas.renderAll(); // 重新渲染画布
      // object:removed 监听器将更新 objectCount 状态
    }
  };

  // 清除所有物品
  const clearDIY = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.clear(); // 从画布中清除所有对象
      setClothes([]);
    }
  };

  // 保存穿搭 (将画布状态序列化为 JSON)
  const saveOutfit = async () => {
    const canvas = canvasRef.current;
    if (canvas) {
      // const json = canvas.toJSON([
      //   "customId",
      //   "customCategory",
      //   "customRemark",
      //   "customPictureUrl",
      // ]);
      // console.log("保存穿搭 (Fabric JSON):", JSON.stringify(json, null, 2));
      // console.log("[ clothes ] >", clothes);
      const config = JSON.stringify(canvas.toJSON());
      const blob = await canvas.toBlob({
        format: "png",
        quality: 1.0,
        multiplier: 2,
      });
      const formData = new FormData();
      if (blob) formData.append("file", blob, `${new Date()}.png`);
      const imgUrl = await upload(formData);
      await saveSuitFn({ config, photo: imgUrl });
      toast.success("保存穿搭成功~", { duration: 1000 });
    }
  };

  // 导出画布为图片 (PNG)
  const exportImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      // 使用 canvas.toDataURL() 或 canvas.toBlob() 获取图片数据
      // 如果需要更高分辨率的导出，请考虑设置 multiplier
      const dataUrl = canvas.toDataURL({
        format: "png", // 'png' 或 'jpeg'
        quality: 1.0, // jpeg 格式的质量，0 到 1.0
        multiplier: 2, // 以当前画布尺寸的 2 倍导出
      });

      // 创建一个临时链接元素来触发下载
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "my_outfit.png"; // 建议的文件名
      document.body.appendChild(link); // Firefox 需要此步骤
      link.click(); // 模拟点击
      document.body.removeChild(link); // 清理
    }
  };

  // 分享功能 (占位符)
  // const shareOutfit = () => {
  //   console.log("分享穿搭 (占位符)");
  //   // 在此实现分享逻辑 (例如，使用 Web Share API 或分享服务)
  //   alert("分享功能待实现");
  // };
  // 置顶选中
  const handleBringToFront = () => {
    const canvas = canvasRef.current;
    if (canvas && selectedObject) {
      canvas.bringObjectToFront(selectedObject);
      canvas.discardActiveObject();
      canvas.renderAll();
      toast.success("选中衣物已被置顶~");
    }
  };

  return (
    // 确保容器尺寸根据你的网格布局正确设置
    <div className={`${className}`}>
      <Card className="h-full">
        <CardContent className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">穿搭编辑器</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={saveOutfit}>
                <Save className="h-4 w-4" />
                保存
              </Button>
              <Button variant="outline" size="sm" onClick={exportImage}>
                <Download className="h-4 w-4" />
                导出
              </Button>
              <Button
                disabled={!selectedObject}
                variant="outline"
                size="sm"
                onClick={handleBringToFront}
              >
                <Layers2 className="h-4 w-4" />
                置顶
              </Button>
              {/* 移除选中物品的按钮 */}
              <Button
                variant="outline"
                size="sm"
                onClick={removeSelectedItem}
                disabled={!selectedObject} // 如果没有选中对象，则禁用按钮
              >
                <Trash2 className="h-4 w-4" />
                删除选中
              </Button>
              {/* 可选: 清除所有物品的按钮 */}
              <Button variant="outline" size="sm" onClick={clearDIY}>
                <Trash2 className="h-4 w-4" />
                清除全部
              </Button>
            </div>
          </div>

          {/* DIY 区域容器 - Fabric.js 画布将在此内部 */}
          {/* 此 div 会包含 Fabric.js 的 <canvas> 元素 */}
          <div
            ref={diyAreaRef}
            className={`flex-1 bg-muted/30 rounded-lg relative overflow-hidden flex items-center justify-center
                       ${
                         isDragging
                           ? "border-2 border-blue-500 border-dashed"
                           : ""
                       } `} // 拖拽悬停时的视觉反馈
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            // Fabric.js 处理画布本身上的所有鼠标事件，
            // 因此我们移除了手动鼠标处理函数 (onMouseMove, onMouseUp, onMouseLeave)
          >
            {/* Fabric.js 会在 useEffect 内部将 <canvas> 元素添加到这里 */}

            {/* 空状态消息覆盖层 */}
            {/* 如果画布上没有对象，则显示此消息 */}
            {objectCount === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground pointer-events-none">
                {/* pointer-events-none 确保此 div 不会阻止下方画布上的鼠标/放置事件 */}
                <div className="text-center">
                  <Plus className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>在这里拖放物品以创建您的穿搭</p>
                </div>
              </div>
            )}

            {/* 注意: 移除了单个物品的渲染循环 (diyItems.map)，
                  因为 Fabric.js 负责在画布上渲染和管理物品。 */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

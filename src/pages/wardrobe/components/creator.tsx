import { Save, Download, Share2, Trash2, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

export default function Creator() {
  // Define clothing item types
  type ClothingItem = {
    id: string;
    type: string;
    category: string;
    name: string;
    image: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    dragging?: boolean;
  };

  const diyAreaRef = useRef<HTMLDivElement>(null);

  const [diyItems, setDiyItems] = useState<ClothingItem[]>([]);
  const [draggingItem, setDraggingItem] = useState<ClothingItem | null>(null);

  // Handle moving items within DIY area
  const handleMouseDown = (index: number) => {
    const updatedItems = [...diyItems];
    updatedItems[index] = { ...updatedItems[index], dragging: true };
    setDiyItems(updatedItems);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (diyAreaRef.current) {
      const rect = diyAreaRef.current.getBoundingClientRect();
      const updatedItems = diyItems.map((item) => {
        if (item.dragging) {
          return {
            ...item,
            x: e.clientX - rect.left - 50,
            y: e.clientY - rect.top - 50,
          };
        }
        return item;
      });
      setDiyItems(updatedItems);
    }
  };

  // Handle drag over DIY area
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Handle drop in DIY area
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggingItem && diyAreaRef.current) {
      const rect = diyAreaRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - 50; // Center the item (half of width)
      const y = e.clientY - rect.top - 50; // Center the item (half of height)

      const newItem = {
        ...draggingItem,
        x,
        y,
      };

      setDiyItems([...diyItems, newItem]);
      setDraggingItem(null);
    }
  };

  const handleMouseUp = () => {
    const updatedItems = diyItems.map((item) => ({
      ...item,
      dragging: false,
    }));
    setDiyItems(updatedItems);
  };

  // Remove item from DIY area
  const removeItem = (id: string) => {
    setDiyItems(diyItems.filter((item) => item.id !== id));
  };

  // Clear all items from DIY area
  const clearDIY = () => {
    setDiyItems([]);
  };

  // Save outfit (in a real app, this would save to a database)
  const saveOutfit = () => {
    console.log("Saving outfit:", diyItems);
    // Implementation would depend on your backend
  };

  return (
    <div className="md:col-span-2">
      <Card className="h-full">
        {" "}
        {/* Match the combined height of right side components */}
        <CardContent className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">穿搭编辑器</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={saveOutfit}>
                <Save className="h-4 w-4 " />
                保存
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 " />
                导出
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 " />
                分享
              </Button>
              <Button variant="outline" size="sm" onClick={clearDIY}>
                <Trash2 className="h-4 w-4 " />
                清除
              </Button>
            </div>
          </div>

          <div
            ref={diyAreaRef}
            className="flex-1 bg-muted/30 rounded-lg relative overflow-hidden"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {diyItems.map((item, index) => (
              <div
                key={item.id}
                className="absolute cursor-move"
                style={{
                  left: `${item.x}px`,
                  top: `${item.y}px`,
                  width: `${item.width}px`,
                  height: `${item.height}px`,
                  zIndex: item.dragging ? 100 : 10,
                }}
                onMouseDown={() => handleMouseDown(index)}
              >
                <div className="relative h-full w-full">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="object-contain"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
            {diyItems.length === 0 && (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <Plus className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>在这里拖放物品以创建您的穿搭</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

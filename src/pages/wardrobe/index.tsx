import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Save,
  Download,
  Share2,
  Trash2,
  Plus,
  ShirtIcon as Tshirt,
  PenIcon as Pants,
  ShoppingBag,
  FootprintsIcon as Shoe,
} from "lucide-react";

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

export default function WardrobePage() {
  const [activeTab, setActiveTab] = useState("tops");
  const [myItems, setMyItems] = useState<ClothingItem[]>([]);
  const [diyItems, setDiyItems] = useState<ClothingItem[]>([]);
  const [draggingItem, setDraggingItem] = useState<ClothingItem | null>(null);
  const diyAreaRef = useRef<HTMLDivElement>(null);

  // Sample clothing items
  const clothingItems: ClothingItem[] = [
    {
      id: "top1",
      type: "clothing",
      category: "tops",
      name: "White T-Shirt",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "top2",
      type: "clothing",
      category: "tops",
      name: "Blue Button-Up",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "top3",
      type: "clothing",
      category: "tops",
      name: "Black Sweater",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "top4",
      type: "clothing",
      category: "tops",
      name: "Striped Blouse",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "bottom1",
      type: "clothing",
      category: "bottoms",
      name: "Blue Jeans",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "bottom2",
      type: "clothing",
      category: "bottoms",
      name: "Black Pants",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "bottom3",
      type: "clothing",
      category: "bottoms",
      name: "Pleated Skirt",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "bottom4",
      type: "clothing",
      category: "bottoms",
      name: "Shorts",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "outerwear1",
      type: "clothing",
      category: "outerwear",
      name: "Denim Jacket",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "outerwear2",
      type: "clothing",
      category: "outerwear",
      name: "Trench Coat",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "outerwear3",
      type: "clothing",
      category: "outerwear",
      name: "Blazer",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "accessory1",
      type: "clothing",
      category: "accessories",
      name: "Gold Necklace",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "accessory2",
      type: "clothing",
      category: "accessories",
      name: "Leather Belt",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "accessory3",
      type: "clothing",
      category: "accessories",
      name: "Scarf",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "shoe1",
      type: "clothing",
      category: "shoes",
      name: "White Sneakers",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "shoe2",
      type: "clothing",
      category: "shoes",
      name: "Black Boots",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "shoe3",
      type: "clothing",
      category: "shoes",
      name: "Sandals",
      image: "/placeholder.svg?height=200&width=200",
    },
  ];

  // Initialize my wardrobe with some items
  useEffect(() => {
    setMyItems(clothingItems);
  }, []);

  // Handle drag start
  const handleDragStart = (item: ClothingItem) => {
    const newItem = {
      ...item,
      id: `${item.id}-${Date.now()}`, // Create a new unique ID
      width: 100,
      height: 100,
    };
    setDraggingItem(newItem);
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">虚拟衣橱</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* DIY Area - Left Side */}
        <div className="md:col-span-2">
          <Card className="h-[600px]">
            <CardContent className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">穿搭编辑器</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={saveOutfit}>
                    <Save className="h-4 w-4 mr-1" />
                    保存
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    导出
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    分享
                  </Button>
                  <Button variant="outline" size="sm" onClick={clearDIY}>
                    <Trash2 className="h-4 w-4 mr-1" />
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
                      <p>在这里拖放物品以创建您的服装</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Wardrobe - Right Side */}
        <div>
          <Card className="h-[600px]">
            <CardContent className="p-4 h-full flex flex-col">
              <h2 className="text-xl font-bold mb-4">我的衣柜</h2>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="flex-1 flex flex-col"
              >
                <TabsList className="grid grid-cols-5">
                  <TabsTrigger value="tops">
                    <Tshirt className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="bottoms">
                    <Pants className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="outerwear">
                    <ShoppingBag className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="accessories">
                    <Plus className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="shoes">
                    <Shoe className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>

                {["tops", "bottoms", "outerwear", "accessories", "shoes"].map(
                  (category) => (
                    <TabsContent
                      key={category}
                      value={category}
                      className="flex-1 mt-0"
                    >
                      <ScrollArea className="h-[480px]">
                        <div className="grid grid-cols-2 gap-3 p-1">
                          {myItems
                            .filter((item) => item.category === category)
                            .map((item) => (
                              <div
                                key={item.id}
                                className="border rounded-md p-2 cursor-grab hover:bg-muted/50 transition-colors"
                                draggable
                                onDragStart={() => handleDragStart(item)}
                              >
                                <div className="relative h-24 mb-2">
                                  <img
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    className="object-contain"
                                  />
                                </div>
                                <p className="text-xs text-center truncate">
                                  {item.name}
                                </p>
                              </div>
                            ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                  )
                )}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Plus,
  ShirtIcon as Tshirt,
  PenIcon as Pants,
  ShoppingBag,
  FootprintsIcon as Shoe,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export default function MyWardrobe() {
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

  const [activeTab, setActiveTab] = useState("tops");
  const [myItems, setMyItems] = useState<ClothingItem[]>([]);
  // Handle drag start
  const handleDragStart = (item: ClothingItem) => {
    const newItem = {
      ...item,
      id: `${item.id}-${Date.now()}`, // Create a new unique ID
      width: 100,
      height: 100,
    };
    // setDraggingItem(newItem);
  };
  const saveOutfit = () => {};
  return (
    <Card className=" aspect-[1/1]">
      {" "}
      {/* Reduced height to make room for AI assistant */}
      <CardContent className="p-4 h-full flex flex-col">
        <div className="flex justify-between items-center  mb-4">
          <span className="text-xl font-bold">我的衣柜</span>
          <Button variant="outline" size="sm" onClick={saveOutfit}>
            <Upload className="h-4 w-4 " />
            上传
          </Button>
        </div>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col"
        >
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="tops" className="cursor-pointer">
              <Tshirt className="h-4 w-4 " />
            </TabsTrigger>
            <TabsTrigger value="bottoms" className="cursor-pointer">
              <Pants className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="outerwear" className="cursor-pointer">
              <ShoppingBag className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="accessories" className="cursor-pointer">
              <Plus className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="shoes" className="cursor-pointer">
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
                <ScrollArea className="h-[230px]">
                  {" "}
                  {/* Reduced height */}
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
  );
}

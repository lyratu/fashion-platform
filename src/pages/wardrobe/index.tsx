import { useState, useRef, useEffect } from "react";

import Creator from "./creator";
import MyWardrobe from "./myWardrobe";
import Assistant from "./assistant";

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

// Define chat message type
type ChatMessage = {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
};

export default function WardrobePage() {
  const [myItems, setMyItems] = useState<ClothingItem[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      content:
        "Hello! I'm your fashion assistant. Ask me for styling tips or outfit suggestions based on your wardrobe items.",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

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

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">虚拟衣橱</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* DIY Area - Left Side */}
        <Creator />
        {/* Right Side Column - Wardrobe + AI Assistant */}
        <div className="flex flex-col gap-6">
          {/* My Wardrobe - Top Right */}
          <MyWardrobe />
          {/* AI Fashion Assistant - Bottom Right */}
          <Assistant />
        </div>
      </div>
    </div>
  );
}

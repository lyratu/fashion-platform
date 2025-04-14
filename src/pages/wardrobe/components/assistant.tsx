import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Sparkles } from "lucide-react";
import { useState, useRef } from "react";

export default function Assistant() {
  // Define chat message type
  type ChatMessage = {
    id: string;
    content: string;
    sender: "user" | "assistant";
    timestamp: Date;
  };
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [inputMessage, setInputMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      content:
        "你好！我是你的时装助手。请让我根据您的衣柜物品询问造型技巧或服装建议。",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  // Handle Enter key press in input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Handle sending a message to the AI assistant
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };
    setChatMessages([...chatMessages, userMessage]);
    setInputMessage("");

    // Simulate AI response (in a real app, this would call an AI API)
    setTimeout(() => {
      const aiResponses = [
        "这个问题很棒！根据你的衣橱，我建议用白T恤搭配蓝色牛仔裤，打造经典休闲造型。",
        "如果是正式场合，可以尝试用黑色长裤搭配蓝色纽扣衬衫和西装外套。",
        "牛仔外套搭配黑色长裤和白色运动鞋会很适合休闲出行。",
        "你的衣橱里有很多百搭单品！用现有的衣服至少可以搭配出10种不同造型。",
        "夏季推荐用白T恤搭配短裤和凉鞋。",
        "金色项链能很好地衬托你的黑色毛衣，营造更优雅的造型。",
        "有没有考虑过在衣橱里增加些彩色配饰？它们能让整体穿搭焕然一新。",
        "你现在的穿搭很棒！颜色搭配非常协调。",
      ];

      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        content: randomResponse,
        sender: "assistant",
        timestamp: new Date(),
      };
      setChatMessages((prevMessages) => [...prevMessages, assistantMessage]);
    }, 1000);
  };

  return (
    <Card className=" aspect-[1/1]">
      <CardContent className="p-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">AI时尚助手</h2>
          <Sparkles className="h-5 w-5 text-primary" />
        </div>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 pr-4 mb-4">
          <div className="space-y-4">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-start gap-2 max-w-[80%]">
                  {message.sender === "assistant" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="AI"
                      />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg px-3 py-2 text-sm ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="User"
                      />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </ScrollArea>

        {/* Chat Input */}
        <div className="flex gap-2">
          <Input
            placeholder="询问穿搭建议..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

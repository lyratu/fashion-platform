import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { message, useSend } from "@/lib/visonModel";
import Markdown from "markdown-to-jsx";
import { UseCanvasStore } from "@/stores/canvasStore";
import { toast } from "sonner";
interface AssistantProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
export default function Assistant({ className }: AssistantProps) {
  const canvasBase64Image = UseCanvasStore((state) => state.canvasBase64Image);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const { sendFn } = useSend();
  const [inputMessage, setInputMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<message[]>([
    {
      role: "assistant",
      content: [
        {
          type: "text",
          text: `你好！我是你的时装助手。
根据你衣柜里的物品，我可以为你提供造型技巧和穿搭建议。
请告诉我你有什么，或者你有什么想解决的穿搭问题。`,
        },
      ],
    },
  ]);
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [chatMessages]);

  // Handle Enter key press in input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Handle sending a message to the AI assistant
  const handleSendMessage = async () => {
    console.log("[ canvasObjects ] >", canvasBase64Image);
    if (!inputMessage.trim()) return;
    const msgList = [];
    const userMessage: message = {
      role: "user",
      content: [{ type: "text", text: inputMessage }],
    };
    if (canvasBase64Image)
      userMessage.content.unshift({
        type: "image_url",
        image_url: { url: canvasBase64Image as string },
      });
    msgList.push(userMessage);
    setChatMessages([...chatMessages, ...msgList]);
    setInputMessage("");
    const res = await sendFn(
      [
        ...msgList,
        // {
        //   role: "assistant",
        //   content: [
        //     {
        //       type: "text",
        //       text: "一个时装助手，不是图片检测，根据用户对话的内容，以下一条内容为重点,如果存在图片，以内容中的图片作为参考，注意你应该回复给user",
        //     },
        //   ],
        // },
      ],
      {
        onError: (e) => toast.error(e.message),
      }
    );
    const data: { role: "user" | "assistant"; content: string } =
      res.choices[0].message;
    const assistantMessage: message = {
      role: data.role,
      content: [{ type: "text", text: data.content }],
    };
    msgList.push(assistantMessage);
    setChatMessages([...chatMessages, ...msgList]);
  };

  return (
    <Card className={`${className}`}>
      <CardContent className="p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">AI时尚助手</h2>
          <Sparkles className="h-5 w-5 text-primary" />
        </div>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 pr-4 mb-4 aspect-square">
          <div className="space-y-4">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-start gap-2 max-w-[80%]">
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="AI"
                        className=" object-contain"
                      />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg px-3 py-2 text-sm ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {message.content.map((item, index) =>
                      item.type == "text" ? (
                        <Markdown
                          key={index}
                          // Markdown 文本作为 children 或 markdown prop 传入
                          children={item.text}
                          // 或者 markdown={markdownText}
                          // 配置选项
                          options={{
                            forceBlock: false, // 根据需要设置是否强制所有内容为块级元素
                            // 其他选项...
                          }}
                        />
                      ) : null
                    )}
                  </div>
                  {message.role === "user" && (
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

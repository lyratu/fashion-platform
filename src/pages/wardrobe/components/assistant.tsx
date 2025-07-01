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
import { log } from "console";
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
  const typingRef = useRef<{ buffer: string; index: number; full: string }>({ buffer: "", index: 0, full: "" });
  const typingFrame = useRef<number | null>(null);
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
    if (!inputMessage.trim()) return;

    const userMessage: message = {
      role: "user",
      content: [{ type: "text", text: inputMessage }],
    };
    if (canvasBase64Image)
      userMessage.content.unshift({
        type: "image_url",
        image_url: { url: canvasBase64Image as string },
      });

    // 先加入用户消息
    setChatMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    // 先插入一条空的 assistant 消息用于打字机效果
    setChatMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: [{ type: "text" as const, text: "" }],
      },
    ]);

    try {
      const msgList = [
        ...chatMessages,
        userMessage,
      ];
      const res = await sendFn(msgList, {
        onError: (e) => toast.error(e.message),
      });
      const reader = res?.getReader();
      if (!reader) throw new Error("无法获取流");
      let done = false;
      let fullText = "";
      // 打字机动画
      const typeWriter = () => {
        if (typingRef.current.buffer.length > 0) {
          // 每帧输出一个字符
          typingRef.current.index++;
          fullText += typingRef.current.buffer[0];
          typingRef.current.buffer = typingRef.current.buffer.slice(1);
          setChatMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last.role === "assistant") {
              // 只更新最后一条 assistant 消息
              const updated = {
                ...last,
                content: [{ type: "text" as const, text: fullText }],
              };
              return [...prev.slice(0, -1), updated];
            }
            return prev;
          });
        }
        if (typingRef.current.buffer.length > 0 || !done) {
          typingFrame.current = requestAnimationFrame(typeWriter);
        } else {
          typingFrame.current = null;
        }
      };
      // 读取流
      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;
        if (value) {
          const chunk = new TextDecoder("utf-8").decode(value);
          // 处理多行 data: {json}\n
          const lines = chunk.split(/\r?\n/).filter(Boolean);
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const jsonStr = line.replace("data: ", "").trim();
              if (!jsonStr || jsonStr === "[DONE]") continue;
              try {
                const data = JSON.parse(jsonStr);
                const deltaContent = data.choices?.[0]?.delta?.content;
                if (typeof deltaContent === "string") {
                  typingRef.current.buffer += deltaContent;
                  // 启动打字机动画
                  if (!typingFrame.current) {
                    typingRef.current.index = 0;
                    typingFrame.current.full = fullText;
                    typingFrame.current = requestAnimationFrame(typeWriter);
                  }
                }
              } catch (e) {
                // 忽略解析失败的行
              }
            }
          }
        }
      }
      // 收尾：确保剩余 buffer 输出
      if (typingRef.current.buffer.length > 0 && !typingFrame.current) {
        typingFrame.current = requestAnimationFrame(typeWriter);
      }
    } catch {
      toast.error("处理流式响应时出错，请稍后再试。");
    }
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
                    {message.content.map((item, idx) =>
                      item.type === "text" ? (
                        <Markdown
                          key={idx}
                          children={item.text}
                          options={{
                            forceBlock: false,
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
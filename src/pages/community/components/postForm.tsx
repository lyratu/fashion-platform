import {
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  Command,
} from "@/components/ui/command";

import { Send, Frame, ImagePlus, Trash2, Keyboard } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUpload } from "@/services/base";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { topic } from "@/types/topic";
import debounce from "lodash/debounce";
import { useGetTopic } from "@/services/community";
import { ChangeEvent, useRef, useState } from "react";
import { User } from "@/types/user";
import { post } from "@/types/post";

interface childProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: User;
  handleSubmit: (post: post) => void;
}

export const PostForm: React.FC<childProps> = ({ user, handleSubmit }) => {
  const [newPostContent, setNewPostContent] = useState("");

  /* 话题输入 */
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const [topicList, setTopicList] = useState<topic[]>([]);
  const { data: topic } = useGetTopic("");

  /* 话题搜索 */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value) {
      // 当用户按下回车键时，执行某些操作
      // 此处可以添加你需要执行的逻辑，比如提交表单等
    }
  };

  // 使用 useRef 保存 debounce 函数实例，确保在整个组件生命周期内只创建一次
  const debouncedSearch = useRef(
    debounce((searchTerm) => {
      // 这里可以替换成你的查询数据库或 API 请求的逻辑
      // setTopic([{ label: searchTerm, value: "1" }]);
    }, 300)
  ).current;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  };

  /* 引入图片上传接口 */
  const { uploadFn } = useUpload();
  /* 图片上传 */
  const [imgList, setImgList] = useState<string[]>([]);

  const delImg = (i: number) => {
    setImgList((prevList) => prevList.filter((_, index) => index !== i));
  };
  const upload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      uploadFn(formData, {
        onSuccess: (url: string) => {
          setImgList([...imgList, url]);
        },
      });
    }
  };

  /* 重置表单 */
  const resetForm = () => {
    setImgList([]);
    setTopicList([]);
    setNewPostContent("");
  };

  /* 删除话题 */
  const delTopic = (i: number) => {
    setTopicList((prevList) => prevList.filter((_, index) => index !== i));
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <h2 className="text-lg font-medium">分享你的想法</h2>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src={user?.avatarUrl} alt="Your avatar" />
            <AvatarFallback>YA</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="您今天对时尚有什么想法？"
              className="mb-3"
              value={newPostContent}
              maxLength={1000}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
            <ScrollArea className="whitespace-nowrap">
              <div className="flex space-x-2">
                {imgList.map((url: string, index) => (
                  <div key={index} className="shrink-0 relative mb-4">
                    <div className="flex items-center justify-center left-0 top-0 absolute w-full h-full hover:bg-black/40 rounded-md group">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          delImg(index);
                        }}
                        className="opacity-0 hover:bg-red group-hover:opacity-100 cursor-pointer"
                      >
                        <Trash2 className="text-white" />
                      </Button>
                    </div>
                    <img
                      src={url}
                      className="rounded-md border h-64 aspect-[1/1] object-cover"
                    />
                  </div>
                ))}
              </div>
              <ScrollBar
                orientation="horizontal"
                className=" cursor-col-resize"
              />
            </ScrollArea>
            <ScrollArea className="">
              <div className="flex space-x-2">
                {topicList.map((item, index) => (
                  <div key={index} className="shrink-0 relative mb-4">
                    <div className="flex items-center justify-center left-0 top-0 absolute w-full h-full hover:bg-black/40 rounded-md group">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          delTopic(index);
                        }}
                        className="opacity-0 hover:bg-red group-hover:opacity-100 cursor-pointer"
                      >
                        <Trash2 className="text-white" />
                      </Button>
                    </div>
                    <span className="p-2 text-[#1d9bf0] text-sm ">
                      #{item.name}
                    </span>
                  </div>
                ))}
              </div>
              <ScrollBar
                orientation="horizontal"
                className=" cursor-col-resize"
              />
            </ScrollArea>
            <div className="flex gap-4">
              <div>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size={"sm"}
                      className=" cursor-pointer"
                    >
                      <Frame />
                      话题
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="搜索话题..."
                        className="h-9"
                        onChangeCapture={handleChange}
                        onKeyDown={handleKeyDown}
                      />
                      <CommandList>
                        {value ? (
                          <CommandEmpty className="p-2">
                            <div className="flex text-md text-blue-500">
                              <Keyboard className="mr-2" />
                              按回车添加话题
                            </div>
                          </CommandEmpty>
                        ) : null}
                        <CommandGroup>
                          {topic?.list.map((item) => (
                            <CommandItem
                              key={item.id}
                              value={item.name}
                              className=" cursor-pointer"
                              onSelect={(currentValue) => {
                                setTopicList([
                                  ...topicList,
                                  { id: item.id, name: currentValue },
                                ]);
                                setValue("");
                                setOpen(false);
                              }}
                            >
                              {item.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <Button variant="outline" size={"sm"} asChild>
                <Label htmlFor="picture" className="cursor-pointer">
                  <ImagePlus />
                  <Input
                    id="picture"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChangeCapture={upload}
                  />
                </Label>
              </Button>
              <Button
                size={"sm"}
                type="submit"
                className=" ml-auto cursor-pointer"
                disabled={!newPostContent.trim()}
                onClick={() => {
                  handleSubmit({
                    content: newPostContent,
                    images: imgList,
                    topics: topicList,
                  });
                  resetForm();
                }}
              >
                <Send className="h-4 w-4 mr-2" />
                发表
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

import { ChangeEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  MessageCircle,
  Share2,
  Send,
  Frame,
  ImagePlus,
  Trash2,
  Keyboard,
} from "lucide-react";
import {
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  Command,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpload } from "@/services/base";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import debounce from "lodash/debounce";
import { useGetTopic } from "@/services/community";
import { Badge } from "@/components/ui/badge";
import { post } from "@/types/post";
import { topic } from "@/types/topic";
import UseScrollToBottom from "@/hooks/use-scroll";
import { useAddPost, useGetPostList } from "@/services/community/post";
import { useQueryClient } from "@tanstack/react-query";
import { useGetMyInfo } from "@/services/profile";
import { Close } from "@radix-ui/react-popover";

export default function CommunityPage() {
  const [newPostContent, setNewPostContent] = useState("");
  const { addPostFn } = useAddPost();
  const { data: userInfo } = useGetMyInfo();
  const { data: posts, fetchNextPage } = useGetPostList({
    order: "createTime",
    page: 1,
    size: 20,
    sort: "desc",
  });
  const queryClient = useQueryClient();

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: post = {
      content: newPostContent,
      images: imgList,
      topics: topicList,
    };
    addPostFn(data);
    queryClient.invalidateQueries({ queryKey: ["postPage"] });
    setNewPostContent("");
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
      console.log("选中的文件：", file);
      const formData = new FormData();
      formData.append("file", file);
      uploadFn(formData, {
        onSuccess: (url: string) => {
          setImgList([...imgList, url]);
        },
      });
    }
  };

  /* 话题输入 */
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const [topicList, setTopicList] = useState<topic[]>([]);
  const { data: topic } = useGetTopic("");
  // 使用 useRef 保存 debounce 函数实例，确保在整个组件生命周期内只创建一次
  const debouncedSearch = useRef(
    debounce((searchTerm) => {
      // 这里可以替换成你的查询数据库或 API 请求的逻辑
      console.log("发起搜索请求：", searchTerm);

      // setTopic([{ label: searchTerm, value: "1" }]);
    }, 300)
  ).current;
  const delTopic = (i: number) => {
    setTopicList((prevList) => prevList.filter((_, index) => index !== i));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value) {
      // 当用户按下回车键时，执行某些操作
      console.log("用户按下回车键，输入值为：", value);
      // 此处可以添加你需要执行的逻辑，比如提交表单等
    }
  };

  UseScrollToBottom(() => {
    fetchNextPage();
  });
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main content */}
        <div className="flex-1">
          {/* New post form */}

          <Card className="mb-4">
            <CardHeader className="pb-3">
              <h2 className="text-lg font-medium">分享你的想法</h2>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={userInfo?.avatarUrl} alt="Your avatar" />
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
                        <figure key={index} className="shrink-0 relative mb-4">
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
                            className="rounded-md border h-32 aspect-[1/1] object-cover"
                          />
                        </figure>
                      ))}
                    </div>
                    <ScrollBar
                      orientation="horizontal"
                      className=" cursor-col-resize"
                    />
                  </ScrollArea>
                  <ScrollArea>
                    <div className="flex space-x-2">
                      {topicList.map((item, index) => (
                        <figure key={index} className="shrink-0 relative mb-4">
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
                          <Badge>{item.name}</Badge>
                        </figure>
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
                      onClick={handlePostSubmit}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      发表
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts tabs */}
          <div>
            {posts?.pages.map((arr) =>
              arr?.list.map((item) => (
                <Card key={item.id} className="mb-4">
                  <CardHeader className="pb-3">
                    {item.user && (
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage
                            src={item.user.avatarUrl}
                            alt={item.user.nickName}
                          />
                          <AvatarFallback>
                            {item.user.nickName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex gap-2 items-start">
                            <div>
                              <h4 className="font-medium">
                                {item.user.nickName}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                {item.user.position}
                              </p>
                            </div>
                            <div>
                              {userInfo?.id == item.user?.id ? (
                                <Badge
                                  variant="outline"
                                  className=" align-super"
                                >
                                  自己
                                </Badge>
                              ) : null}
                            </div>
                            <span className="text-xs text-muted-foreground ml-auto">
                              {item.createTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="mb-2">{item.content}</p>
                    <div className=" grid md:grid-cols-2 gap-2 xl:grid-cols-3">
                      {item.images.map((url) => (
                        <img
                          src={url}
                          alt="Post image"
                          className=" rounded-md border object-cover w-full object-top aspect-[1/1]"
                        />
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className=" border-t flex justify-between pb-0 py-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className=" cursor-pointer"
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      {item.likeCount}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className=" cursor-pointer"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {item.commentCount}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className=" cursor-pointer"
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                    </Button>
                    {userInfo?.id == item.user?.id ? (
                      <Popover>
                        <PopoverTrigger>
                          <Trash2 className="h-4 w-4 cursor-pointer" />
                        </PopoverTrigger>
                        <PopoverContent className=" w-fit space-y-2 ">
                          <div>确认删除此文章？</div>
                          <Button
                            size="sm"
                            className="h-8 px-2 cursor-pointer mr-4"
                            onClick={() => {}}
                          >
                            确认
                          </Button>
                          <Close>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2 cursor-pointer"
                            >
                              取消
                            </Button>
                          </Close>
                        </PopoverContent>
                      </Popover>
                    ) : null}
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-80 space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium">流行趋势</h2>
            </CardHeader>
            <CardContent className="pb-3">
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-primary hover:underline">
                    #可持续时尚
                  </Link>
                  <p className="text-xs text-muted-foreground">1.2k 篇</p>
                </li>
                <li>
                  <Link to="#" className="text-primary hover:underline">
                    #春季穿搭
                  </Link>
                  <p className="text-xs text-muted-foreground">856 篇</p>
                </li>
                <li>
                  <Link to="#" className="text-primary hover:underline">
                    #简洁风
                  </Link>
                  <p className="text-xs text-muted-foreground">723 篇</p>
                </li>
                <li>
                  <Link to="#" className="text-primary hover:underline">
                    #田园风
                  </Link>
                  <p className="text-xs text-muted-foreground">689 篇</p>
                </li>
                <li>
                  <Link to="#" className="text-primary hover:underline">
                    #搭配指南
                  </Link>
                  <p className="text-xs text-muted-foreground">542 篇</p>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium">活跃用户</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="Jessica T."
                    />
                    <AvatarFallback>JT</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">皇上</p>
                    <p className="text-xs text-muted-foreground">@jesstylist</p>
                  </div>
                  {/* <Button variant="outline" size="sm" className="ml-auto">
                    关注
                  </Button> */}
                </div>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="Marcus W."
                    />
                    <AvatarFallback>MW</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">壬氏</p>
                    <p className="text-xs text-muted-foreground">@marcstyle</p>
                  </div>
                  {/* <Button variant="outline" size="sm" className="ml-auto">
                    Follow
                  </Button> */}
                </div>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="Sophia L."
                    />
                    <AvatarFallback>SL</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">猫猫</p>
                    <p className="text-xs text-muted-foreground">
                      @sophialooks
                    </p>
                  </div>
                  {/* <Button variant="outline" size="sm" className="ml-auto">
                    Follow
                  </Button> */}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium">社区指南</h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>尊重和支持他人</li>
                <li>没有垃圾邮件或自我宣传</li>
                <li>信用原始内容创作者</li>
                <li>继续讨论与时尚相关的</li>
                <li>报告不适当的内容</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import UseScrollToBottom from "@/hooks/use-scroll";
import {
  Plus,
  ShirtIcon as Tshirt,
  PenIcon as Pants,
  Shirt,
  FootprintsIcon as Shoe,
  Upload,
  BriefcaseBusiness,
  Trash2,
  Loader,
  Edit,
  Luggage,
} from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpload } from "@/services/base";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  useDelCloth,
  useGetClothes,
  useGetMySuit,
  useUploadCloth,
} from "@/services/clothes";
import { useQueryClient } from "@tanstack/react-query";
import { useDragStore } from "@/stores/dragStore";
import { toast } from "sonner";
import cap from "@/assets/resource/cap.svg";
import skirt from "@/assets/resource/skirt.svg";
import { cloth, suit } from "@/types/cloth";
/* 表单 */
const formSchema = z.object({
  img: z.string().min(1, { message: "图片不能为空" }),
  type: z.string().min(1, { message: "请选择分类" }),
});
interface AssistantProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
export default function MyWardrobe({ className }: AssistantProps) {
  const types = [
    { name: "上衣", value: "0" },
    { name: "下装", value: "1" },
    { name: "鞋子", value: "2" },
    { name: "包包", value: "3" },
    { name: "帽子", value: "4" },
  ];

  const [isOpForm, setIsOpForm] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      img: "",
      type: "",
    },
  });

  const { uploadClothFn } = useUploadCloth();
  const queryClient = useQueryClient();
  const loadRef = useRef(null);
  const [activeTab, setActiveTab] = useState("0");
  const [isEdit, setIsEdit] = useState(false);

  const {
    data: clothes,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetClothes({
    order: "createTime",
    category: activeTab,
    page: 1,
    size: 5,
    sort: "desc",
  });

  const suitLoadRef = useRef(null);
  const {
    data: suits,
    isFetchingNextPage: suitIsFetchingNextPage,
    hasNextPage: suitHasNextPage,
    fetchNextPage: suitFetchNextPage,
  } = useGetMySuit({
    order: "createTime",
    page: 1,
    size: 6,
    sort: "desc",
  });

  const { delClothFn } = useDelCloth();
  /* 拖拽 */
  const { startDrag, endDrag } = useDragStore();
  // 开始拖拽
  const handleDragStart = (item: cloth | suit) => {
    startDrag(item);
  };
  // 结束拖拽
  const handleDragEnd = () => {
    endDrag();
  };
  /* 触底刷新list */
  UseScrollToBottom(loadRef, () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  });
  /* 触底刷新suitList */
  UseScrollToBottom(suitLoadRef, () => {
    if (suitHasNextPage && !suitIsFetchingNextPage) suitFetchNextPage();
  });
  /* 删除衣服 */
  const handleDel = async (id: number) => {
    await delClothFn([id]);
    toast.success("删除成功！");
    queryClient.invalidateQueries({ queryKey: ["clothes"] });
  };
  /* 图片上传 */
  const [uploadImg, setUploadImg] = useState<string>("");
  const saveOutfit = async (values: z.infer<typeof formSchema>) => {
    const { img, type } = values;
    await uploadClothFn({ picture: img, category: type });
    setUploadImg("");
    setIsOpForm(false);
    form.reset();
    queryClient.invalidateQueries({ queryKey: ["clothes"] });
  };
  /* 引入图片上传接口 */
  const { uploadFn } = useUpload();
  const upload = (
    e: ChangeEvent<HTMLInputElement>,
    callback: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsEdit(false);
      const formData = new FormData();
      formData.append("file", file);
      uploadFn(formData, {
        onSuccess: (url: string) => {
          setUploadImg(url);
          callback(url);
        },
      });
    }
  };
  const openForm = (open: boolean) => {
    setIsOpForm(open);
    if (!open) {
      setUploadImg("");
      form.reset();
    }
  };
  return (
    <Card className={`${className}`}>
      {/* Reduced height to make room for AI assistant */}
      <CardContent className="p-4 h-full flex flex-col">
        <div className="flex items-center  mb-4">
          <span className="text-xl font-bold">我的衣柜</span>
          <Dialog onOpenChange={openForm} open={isOpForm}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto">
                <Upload />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>上传衣物</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(saveOutfit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="img"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>图片</FormLabel>
                        <FormControl>
                          {uploadImg ? (
                            <div className="group relative">
                              <img
                                src={uploadImg}
                                className=" h-128 object-cover rounded-md"
                              />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/60 rounded-md">
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  onClick={() => setUploadImg("")}
                                >
                                  <Trash2 className="h-4 w-4 text-white" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <Label
                              htmlFor="picture"
                              className=" hover:border rounded-t-md text-muted-foreground bg-muted w-32 h-32 cursor-pointer flex justify-center items-center"
                            >
                              <Upload />
                              <Input
                                id="picture"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  upload(e, (url) => {
                                    field.onChange(url);
                                  })
                                }
                              />
                            </Label>
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>分类</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger className="w-[180px] cursor-pointer">
                              <SelectValue placeholder="请选择分类" />
                            </SelectTrigger>
                            <SelectContent>
                              {types.map((type) => (
                                <SelectItem
                                  key={type.value}
                                  className=" cursor-pointer"
                                  value={type.value}
                                >
                                  {type.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">确认</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            size="sm"
            className="ml-2"
            onClick={() => setIsEdit(!isEdit)}
          >
            <Edit />
          </Button>
        </div>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col"
        >
          <TabsList className="grid grid-cols-6">
            <TabsTrigger value="0" className="cursor-pointer">
              <Tshirt className="h-4 w-4 " />
            </TabsTrigger>
            <TabsTrigger value="1" className="cursor-pointer">
              <img src={skirt} className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="2" className="cursor-pointer">
              <Shoe className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="3" className="cursor-pointer">
              <BriefcaseBusiness className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="4" className="cursor-pointer">
              <img src={cap} className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="5" className="cursor-pointer">
              <Luggage className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value={activeTab != "5" ? activeTab : ""}
            className="flex-1 mt-0"
          >
            <ScrollArea className="aspect-square">
              {/* Reduced height */}
              <div className="columns-2 md:columns-2 gap-3 p-1 ">
                {clothes?.pages.map((e) =>
                  e.list.map((item) => (
                    <div
                      key={item.id}
                      className={`${
                        isEdit ? " border-blue-400" : ""
                      } group relative mb-2 border rounded-md p-2 cursor-grab hover:bg-muted/50 transition-colors`}
                      draggable={!isEdit}
                      onDragEnd={handleDragEnd}
                      onDragStart={() => handleDragStart(item)}
                    >
                      <img
                        src={item.picture || "/placeholder.svg"}
                        className="object-cover pointer-events-none block"
                      />
                      <div
                        className={`${
                          isEdit ? "opacity-100" : ""
                        } absolute inset-0 flex items-center justify-center opacity-0 transition-opacity bg-background/60 rounded-md`}
                      >
                        <Button
                          variant="destructive"
                          size="icon"
                          disabled={!isEdit}
                          onClick={() => handleDel(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-white" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
                <div ref={loadRef}>
                  {isFetchingNextPage ? (
                    <div className="flex items-center justify-center text-sm">
                      <Loader className="animate-spin" />
                      <span>加载中...</span>
                    </div>
                  ) : !hasNextPage ? (
                    <div className="text-center text-gray-500"></div>
                  ) : null}
                </div>
              </div>

              {(clothes && clothes?.pages[0].list.length > 0) || (
                <div className="flex flex-col items-center justify-center p-4">
                  <Shirt className="h-12 w-12 mx-auto text-muted-foreground/40" />
                  <h2 className="text-sm font-medium mt-1 text-muted-foreground">
                    暂无衣物
                  </h2>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value={"5"} className="flex-1 mt-0">
            <ScrollArea className="aspect-square">
              {/* Reduced height */}
              <div className="columns-2 md:columns-2 gap-3 p-1 ">
                {suits?.pages.map((e) =>
                  e.list.map((item) => (
                    <div
                      key={item.id}
                      className={`${
                        isEdit ? " border-blue-400" : ""
                      } group relative mb-2 border rounded-md p-2 cursor-grab hover:bg-muted/50 transition-colors`}
                      draggable={!isEdit}
                      onDragEnd={handleDragEnd}
                      onDragStart={() => handleDragStart(item)}
                    >
                      <img
                        src={item.photo || "/placeholder.svg"}
                        className="object-cover pointer-events-none block"
                      />
                      <div
                        className={`${
                          isEdit ? "opacity-100" : ""
                        } absolute inset-0 flex items-center justify-center opacity-0 transition-opacity bg-background/60 rounded-md`}
                      >
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDel(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-white" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
                <div ref={suitLoadRef}>
                  {suitIsFetchingNextPage ? (
                    <div className="flex items-center justify-center text-sm">
                      <Loader className="animate-spin" />
                      <span>加载中...</span>
                    </div>
                  ) : !suitHasNextPage ? (
                    <div className="text-center text-gray-500"></div>
                  ) : null}
                </div>
              </div>

              {(suits && suits?.pages[0].list.length > 0) || (
                <div className="flex flex-col items-center justify-center p-4">
                  <Luggage className="h-12 w-12 mx-auto text-muted-foreground/40" />
                  <h2 className="text-sm font-medium mt-1 text-muted-foreground">
                    暂无搭配
                  </h2>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

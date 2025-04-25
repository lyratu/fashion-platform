import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useDelSuit, useEditSuit, useGetMySuit } from "@/services/clothes";
import dateTool from "@/utils/dateTool";
import { Copy, Loader } from "lucide-react";
import UseScrollToBottom from "@/hooks/use-scroll";
import { useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { suit } from "@/types/cloth";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isNull } from "lodash";

export const MyClothesPage = () => {
  const { delSuitFn } = useDelSuit();
  const { editSuitFn } = useEditSuit();
  const [remark, setRemark] = useState("");
  const [editItem, setEditItem] = useState<suit | null>(null);
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useGetMySuit(
    {
      order: "createTime",
      page: 1,
      size: 6,
      sort: "desc",
    }
  );
  const loadRef = useRef(null);
  const queryClient = useQueryClient();
  /* 触底刷新list */
  UseScrollToBottom(loadRef, () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  });

  const handleDel = (id: number) => {
    delSuitFn([id], {
      onSuccess: () => {
        toast.success("删除成功~", { duration: 1000 });
        queryClient.invalidateQueries({ queryKey: ["suits"] });
      },
    });
  };
  const handleDownload = (url: string, item: Partial<suit>) => {
    // 创建一个临时链接元素来触发下载
    const link = document.createElement("a");
    link.href = url;
    link.download = `${item.nickName}_${item.createTime}.png`; // 建议的文件名
    document.body.appendChild(link); // Firefox 需要此步骤
    link.click(); // 模拟点击
    document.body.removeChild(link); // 清理
  };
  const handleEdit = () => {
    if (editItem) {
      if (remark.length > 50)
        return toast.error("字数不超过50字符", {
          duration: 1500,
        });
      editSuitFn(
        { id: editItem.id, remark },
        {
          onSuccess: () => {
            toast.success("设置成功~", {
              duration: 1000,
            });
            setEditItem(null);
            queryClient.invalidateQueries({ queryKey: ["suits"] });
          },
        }
      );
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>我的搭配</CardTitle>
        <CardDescription>衣橱编辑器中保存的穿搭套装</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog
          open={!isNull(editItem)}
          onOpenChange={(e) => {
            if (!e) setEditItem(null);
          }}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>设置备注</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input
                  id="link"
                  defaultValue={editItem?.remark}
                  onBlur={(e) => setRemark(e.currentTarget.value)}
                />
              </div>
              <Button
                type="submit"
                size="sm"
                className="px-3"
                onClick={handleEdit}
              >
                确认
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <ScrollArea className="h-210">
          <div className=" grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {data?.pages.map((page) =>
              page.list.map((item) => (
                <div className=" border rounded-sm h-fit">
                  <img src={item.photo} />
                  <Separator />
                  <div className=" space-y-2 p-2">
                    {item.remark ? (
                      <>
                        <div className="">{item.remark}</div>
                      </>
                    ) : null}
                    <div className=" flex text-sm text-muted-foreground">
                      <span>创建时间：</span>
                      <span className=" ml-auto">
                        {dateTool.formattedDate(item.createTime)}
                      </span>
                    </div>
                    <div className=" text-sm flex  items-center gap-3">
                      <span
                        className=" hover:underline cursor-pointer"
                        onClick={() => setEditItem(item)}
                      >
                        备注
                      </span>
                      <span
                        className=" hover:underline cursor-pointer ml-auto"
                        onClick={() => handleDownload(item.photo, item)}
                      >
                        下载
                      </span>
                      <span
                        className=" hover:underline cursor-pointer"
                        onClick={() => handleDel(item.id)}
                      >
                        删除
                      </span>
                    </div>
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
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

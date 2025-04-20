import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useDoCollect as oCollect } from "@/services/outfits";
import { useDoCollect as gCollect } from "@/services/mall";
import { useGetGoodsCollect, useGetOutfitsCollect } from "@/services/profile";
import { PackageOpen, ShoppingBag, SquareRoundCorner, Trash2, View } from "lucide-react";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

export const CollectPage = () => {
  const queryClient = useQueryClient();
  const { data: wishlist } = useGetGoodsCollect({
    order: "createTime",
    page: 1,
    size: 6,
    sort: "desc",
  });

  const { data: outfits } = useGetOutfitsCollect({
    order: "createTime",
    page: 1,
    size: 6,
    sort: "desc",
  });
  const { doCollectFn: oFn } = oCollect();
  const { doCollectFn: gFn } = gCollect();
  const navigate = useNavigate();
  const handleCancel = async (id: number, type: 0 | 1) => {
    if (type) {
      await oFn(id);
      queryClient.invalidateQueries({ queryKey: ["outfitsCollect"] });
    } else {
      await gFn(id);
      queryClient.invalidateQueries({ queryKey: ["goodsCollect"] });
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>我的收藏</CardTitle>
        <CardDescription>来自穿搭分享或商城</CardDescription>
      </CardHeader>
      <CardContent className="flex">
        <div className="flex-1">
          <p className="text-md font-bold text-center p-1">商品收藏</p>
          <Separator className="mb-2" />
          <ScrollArea className="rounded-md">
            <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center">
              {wishlist?.pages.map((pages) =>
                pages.list.map((item) => (
                  <div key={item.id} className="relative group">
                    <div className="relative h-32 aspect-[1/1] overflow-hidden rounded-md border">
                      <img
                        src={item.goods.mainImage || "/placeholder.svg"}
                        alt={item.goods.title}
                        className="object-cover object-top"
                      />
                      {/* {!item.inStock && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <span className="text-sm font-medium text-muted-foreground">
                        缺货
                      </span>
                    </div>
                  )} */}
                    </div>
                    <div className="mt-2">
                      <h3 className="font-medium">{item.goods.title}</h3>
                      <p className="text-muted-foreground">
                        ￥{item.goods.price}
                      </p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/60 rounded-md">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="mr-1"
                        onClick={() =>
                          navigate(`/mall/product/${item.goodsId}`)
                        }
                      >
                        <ShoppingBag className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleCancel(item.goodsId, 0)}
                      >
                        <Trash2 className="h-4 w-4 text-white" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
          {(wishlist && wishlist?.pages[0].list.length > 0) || (
            <div className=" flex flex-col items-center">
              <div className="mb-4 p-4">
                <PackageOpen  className="h-16 w-16 mx-auto text-muted-foreground opacity-40"/>
              </div>
              <h2 className="text-xl font-medium mb-2">暂无商品收藏</h2>
              <p className="text-muted-foreground mb-6">
                看起来您还没有收藏任何商品。
              </p>
            </div>
          )}
        </div>
        <div className="mx-auto">
          <Separator orientation="vertical" className=" mx-1" />
        </div>
        <div className="flex-1">
          <p className=" text-md font-bold text-center p-1">穿搭文章收藏</p>
          <Separator className=" mb-2" />
          <ScrollArea className="rounded-md">
            <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center">
              {outfits?.pages.map((pages) =>
                pages.list.map((item) => (
                  <div key={item.id} className="relative group">
                    <div className="relative h-32 aspect-[1/1] overflow-hidden rounded-md border">
                      <img
                        src={item.coverImage || "/placeholder.svg"}
                        alt={item.title}
                        className="object-cover object-top"
                      />
                      {/* {!item.inStock && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <span className="text-sm font-medium text-muted-foreground">
                        缺货
                      </span>
                    </div>
                  )} */}
                    </div>
                    <div className="mt-2">
                      <h3 className="font-medium">{item.title}</h3>
                      {/* <p className="text-muted-foreground">
                        ￥{item.goods.price}
                      </p> */}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/60 rounded-md">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="mr-1"
                        onClick={() => navigate(`/outfits/${item.outfitsId}`)}
                      >
                        <View className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleCancel(item.outfitsId, 1)}
                      >
                        <Trash2 className="h-4 w-4 text-white" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
          {(outfits && outfits?.pages[0].list.length > 0) || (
            <div className=" flex flex-col items-center">
              <div className="mb-4 p-4">
                <PackageOpen  className="h-16 w-16 mx-auto text-muted-foreground opacity-40"/>
              </div>
              <h2 className="text-xl font-medium mb-2">暂无文章收藏</h2>
              <p className="text-muted-foreground mb-6">
                看起来您还没有收藏任何文章。
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

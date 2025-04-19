import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetGoodsCollect } from "@/services/profile";
import { ShoppingBag, SquareRoundCorner, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

export const CollectPage = () => {
  const { data: wishlist } = useGetGoodsCollect({
    order: "createTime",
    page: 1,
    size: 6,
    sort: "desc",
  });
  console.log(
    "%c [ wishlist ]-14",
    "font-size:13px; background:pink; color:#bf2c9f;",
    wishlist
  );
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader>
        <CardTitle>我的收藏</CardTitle>
        <CardDescription>来自穿搭分享或商城</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <h2 className="py-2 text-md font-bold">商品收藏</h2>
          <ScrollArea className="h-72 rounded-md border">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {wishlist?.pages.map((pages) =>
                pages.list.map((item) => (
                  <div key={item.id} className="relative group">
                    <div className="relative h-48 w-full overflow-hidden rounded-md border">
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
                      <Button variant="destructive" size="icon">
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
                <SquareRoundCorner className="h-16 w-16 mx-auto text-muted-foreground" />
              </div>
              <h2 className="text-xl font-medium mb-2">暂无商品收藏</h2>
              <p className="text-muted-foreground mb-6">
                看起来您还没有收藏任何商品。
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

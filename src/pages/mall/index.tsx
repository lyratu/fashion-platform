import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Loader, ShoppingCart } from "lucide-react";
import { useGetGoods } from "@/services/mall";
import { useGetDictInfo } from "@/services/dict";
import { useCartQuantityStore } from "@/stores/cart";
import { CartItem } from "@/types/cart";
import { useAddCard } from "@/services/mall/cart";
import { goods } from "@/types/goods";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import UseScrollToBottom from "@/hooks/use-scroll";
export default function MallPage() {
  const { data: types } = useGetDictInfo(["goodsType"]);
  const [type, setType] = useState("0");
  const [searchText, setSearchText] = useState("");
  const [inputText, setInputText] = useState("");
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useGetGoods({
    order: "createTime",
    page: 1,
    size: 12,
    type,
    title: searchText,
    sort: "desc",
  });
  const queryClient = useQueryClient();

  const { addCardFn } = useAddCard();

  const loadRef = useRef(null);
  /* 触底刷新list */
  UseScrollToBottom(loadRef, () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  });

  const { incrementQuantity, getTotalQuantity } = useCartQuantityStore();
  const totalQuantity = getTotalQuantity();
  // 示例：添加商品到购物车
  const handleAddItem = (goods: goods) => {
    const newItem: CartItem = {
      goodsId: goods.id,
      count: 1,
      color: goods.color[0].label,
      size: goods.size[0].label,
    };
    addCardFn(newItem, {
      onSuccess: () => {
        console.log("[ add ] >", goods.id);
        incrementQuantity(goods.id);
        queryClient.invalidateQueries({ queryKey: ["myCartCount"] });
        toast.success("添加购物车成功！", {
          position: "top-center",
          duration: 1000,
          closeButton: true,
        });
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">时尚商城</h1>
          <p className="text-muted-foreground">
            购物的最新趋势，完成您的完美外观
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/mall/cart">
              <ShoppingCart className="h-4 w-4 mr-2" />
              购物车 ({totalQuantity})
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/mall/wishlist">
              <Heart className="h-4 w-4 mr-2" />
              意愿清单
            </Link>
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs defaultValue="0" onValueChange={(i) => setType(i)}>
        <TabsList className="mb-2 flex flex-wrap h-auto">
          <TabsTrigger key={0} value={"0"} className="mb-1 cursor-pointer">
            全部
          </TabsTrigger>
          {types?.goodsType.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.value}
              className="mb-1 cursor-pointer"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex justify-end">
          <div className="flex w-full max-w-sm items-center space-x-2 mb-6">
            <Input
              type="email"
              value={inputText}
              placeholder="请输入关键词..."
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputText(e.target.value)
              }
            />
            <Button
              className=" cursor-pointer"
              onClick={() => {
                setSearchText(inputText);
              }}
            >
              搜索
            </Button>
            {inputText.trim() && (
              <Button
                variant="secondary"
                className="cursor-pointer"
                onClick={() => {
                  setSearchText("");
                  setInputText("");
                }}
              >
                重置
              </Button>
            )}
          </div>
        </div>

        <TabsContent value={type} className="mt-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.pages.map((arr) =>
              arr?.list.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative">
                    <div className="relative h-64 w-full">
                      <img
                        src={product.mainImage || "/placeholder.svg"}
                        alt={product.title}
                        className="h-full  object-cover object-top w-full"
                      />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium line-clamp-1">
                      {product.title}
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center">
                        <span className="font-bold">￥{product.price}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {product.collectCount} 收藏
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      asChild
                    >
                      <Link to={`/mall/product/${product.id}`}>详情</Link>
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 cursor-pointer"
                      onClick={() => {
                        handleAddItem(product);
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      加入
                    </Button>
                  </CardFooter>
                </Card>
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
        </TabsContent>

        {/* Other category tabs */}
        {/* {categories?.slice(1).map((category) => (
          <TabsContent key={category.id} value={category.name} className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products
                .filter((product) => product.category === category)
                .map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="relative">
                      <div className="relative h-64 w-full">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="object-cover object-top"
                        />
                      </div>
                      {product.isNew && (
                        <Badge className="absolute top-2 left-2">New</Badge>
                      )}
                      {product.isSale && (
                        <Badge
                          variant="destructive"
                          className="absolute top-2 right-2"
                        >
                          Sale
                        </Badge>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80"
                        style={{ top: product.isSale ? "40px" : "8px" }}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center">
                          {product.isSale ? (
                            <>
                              <span className="text-muted-foreground line-through mr-2">
                                ${product.price}
                              </span>
                              <span className="font-bold text-destructive">
                                ${product.salePrice}
                              </span>
                            </>
                          ) : (
                            <span className="font-bold">${product.price}</span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {product.rating} ★ ({product.reviews})
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        asChild
                      >
                        <Link to={`/mall/product/${product.id}`}>Details</Link>
                      </Button>
                      <Button size="sm" className="flex-1">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))} */}
      </Tabs>
    </div>
  );
}

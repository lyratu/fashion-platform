import type React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ArrowLeft, CreditCard } from "lucide-react";
import {
  useDeleteGoods,
  useGetCart,
  useUpdateChecked,
  useUpdateGoods,
} from "@/services/mall";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { Close, PopoverTrigger } from "@radix-ui/react-popover";
import { useQueryClient } from "@tanstack/react-query";
import { CartItem } from "@/types/cart";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useCartQuantityStore } from "@/stores/cart";

export default function CartPage() {
  const { data: cartItems } = useGetCart();
  const { deleteGoodsFn } = useDeleteGoods();
  const navigate = useNavigate();
  const { updateGoodsFn, updateLoading } = useUpdateGoods();
  const { updateCheckedFn } = useUpdateChecked();
  const queryClient = useQueryClient();
  const { decrementQuantity } = useCartQuantityStore();

  const deleteItem = (id: number, goodsId: number) => {
    deleteGoodsFn(id, {
      onSuccess: () => {
        decrementQuantity(goodsId);
        queryClient.invalidateQueries({ queryKey: ["myCart"] });
      },
    });
  };
  const updateQuantity = ({ id }: CartItem, newCount: number) => {
    if (newCount < 1) return;
    updateGoodsFn(
      { id: id as number, count: newCount },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["myCart"] });
        },
      }
    );
  };

  const changCheck = (checked: number, id: number) => {
    updateCheckedFn(
      { ids: [id], checked },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["myCart"] });
        },
      }
    );
  };

  const handleSubmit = () => {
    const isNull = cartItems?.list.findIndex((e) => e.checked);
    if (isNull == -1) return toast.error("购物车中没有选中商品！");

    navigate("/mall/cart/checkout");
  };

  const subtotal = cartItems?.list.reduce(
    (sum, item) => (item.checked == 1 ? sum + item.price * item.count : sum),
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link to="/mall">
            <ArrowLeft className="h-4 w-4 mr-2" />
            继续购物
          </Link>
        </Button>
        <h1 className="text-xl font-bold">购物车</h1>
      </div>

      {cartItems?.list.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="mb-4">
              <ShoppingBagIcon className="h-16 w-16 mx-auto text-muted-foreground opacity-40" />
            </div>
            <h2 className="text-xl font-medium mb-2">你的购物车是空的</h2>
            <p className="text-muted-foreground mb-6">
              看起来您还没有在购物车中添加任何东西。
            </p>
            <Button asChild>
              <Link to="/mall">开始购物</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>商品 ({cartItems?.pagination.total})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems?.list.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <Checkbox
                      className=" w-6 h-6 cursor-pointer"
                      id="check"
                      onCheckedChange={(e) => {
                        changCheck(e ? 1 : 0, item.id);
                      }}
                      checked={item.checked == 1}
                    />
                    <div
                      className="relative w-20 flex-shrink-0 cursor-pointer"
                      onClick={() => navigate(`/mall/product/${item.goodsId}`)}
                    >
                      <img
                        src={item.mainImage || "/placeholder.svg"}
                        alt={item.title}
                        className="object-cover object-top rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="font-bold">￥{item.price}</p>
                      </div>
                      <div className="text-sm text-muted-foreground select-none mb-2">
                        {item.size && (
                          <span className="mr-2">尺码: {item.size}</span>
                        )}
                        {item.color && <span>颜色: {item.color}</span>}
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={updateLoading}
                            className="h-8 w-8 rounded-none cursor-pointer"
                            onClick={() => {
                              updateQuantity(item, item.count - 1);
                            }}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.count}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={updateLoading}
                            className="h-8 w-8 rounded-none cursor-pointer"
                            onClick={() => {
                              updateQuantity(item, item.count + 1);
                            }}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <Popover>
                          <PopoverTrigger>
                            <Trash2 className="h-4 w-4 cursor-pointer" />
                          </PopoverTrigger>
                          <PopoverContent className=" w-fit space-y-2 ">
                            <div>确认删除此商品？</div>
                            <Button
                              size="sm"
                              className="h-8 px-2 cursor-pointer mr-4"
                              onClick={() => {
                                deleteItem(item.id, item.goodsId);
                              }}
                            >
                              确认
                            </Button>
                            <Close className="text-sm cursor-pointer border px-2 py-1 rounded-md">
                              取消
                            </Close>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>总计</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>价格</span>
                  <span>￥{subtotal?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>运费</span>
                  {(subtotal as number) >= 200 ? (
                    <div>
                      <span className="line-through text-xs mr-2">￥20</span>
                      <span>￥0</span>
                    </div>
                  ) : (
                    <span>￥20</span>
                  )}
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>合计</span>
                  {/* <span>￥{total.toFixed(2)}</span> */}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full cursor-pointer"
                  size="lg"
                  onClick={handleSubmit}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  结账
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

// Shopping bag icon component
function ShoppingBagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

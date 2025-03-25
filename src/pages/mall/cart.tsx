import type React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ArrowLeft, CreditCard } from "lucide-react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "宽松棉质衬衫",
      price: 49.99,
      image: "/placeholder.svg?height=200&width=150",
      quantity: 1,
      size: "M码",
      color: "白色",
    },
    {
      id: 2,
      name: "高腰牛仔裤",
      price: 79.99,
      image: "/placeholder.svg?height=200&width=150",
      quantity: 1,
      size: "28码",
      color: "蓝色",
    },
    {
      id: 5,
      name: "皮革斜挎包",
      price: 129.99,
      image: "/placeholder.svg?height=200&width=150",
      quantity: 1,
      color: "黑色",
    },
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 4.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link to="/mall">
            <ArrowLeft className="h-4 w-4 mr-2" />
            继续购物
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">购物车</h1>
      </div>

      {cartItems.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="mb-4">
              <ShoppingBagIcon className="h-16 w-16 mx-auto text-muted-foreground" />
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
                <CardTitle>商品 ({cartItems.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-24 w-20 flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="font-bold">
                          ￥{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
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
                            className="h-8 w-8 rounded-none"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          移除
                        </Button>
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
                  <span>￥{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>运费</span>
                  <span>￥{shipping.toFixed(2)}</span>
                </div>
                {/* <div className="flex justify-between">
                  <span>Tax</span>
                  <span>￥{tax.toFixed(2)}</span>
                </div> */}
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>合计</span>
                  <span>￥{total.toFixed(2)}</span>
                </div>

                <div className="pt-4">
                  <p className="text-sm mb-2">促销码</p>
                  <div className="flex gap-2">
                    <Input placeholder="请输入促销码" className="flex-1" />
                    <Button variant="outline">应用</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg">
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

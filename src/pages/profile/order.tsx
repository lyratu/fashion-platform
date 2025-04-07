import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { Badge, Package } from "lucide-react";

export const OrderPage = () => {
  // Mock orders data
  const orders = [
    {
      id: "ORD-12345",
      date: "May 15, 2025",
      total: 129.98,
      status: "Delivered",
      items: [
        {
          id: 1,
          name: "Oversized Cotton Shirt",
          price: 49.99,
          image: "/placeholder.svg?height=80&width=60",
          quantity: 1,
          color: "White",
          size: "M",
        },
        {
          id: 2,
          name: "High-Waisted Jeans",
          price: 79.99,
          image: "/placeholder.svg?height=80&width=60",
          quantity: 1,
          color: "Blue",
          size: "28",
        },
      ],
    },
    {
      id: "ORD-12346",
      date: "April 28, 2025",
      total: 199.99,
      status: "Delivered",
      items: [
        {
          id: 5,
          name: "Wool Blend Coat",
          price: 199.99,
          image: "/placeholder.svg?height=80&width=60",
          quantity: 1,
          color: "Camel",
          size: "M",
        },
      ],
    },
    {
      id: "ORD-12347",
      date: "May 20, 2025",
      total: 89.99,
      status: "Processing",
      items: [
        {
          id: 3,
          name: "Floral Midi Dress",
          price: 89.99,
          image: "/placeholder.svg?height=80&width=60",
          quantity: 1,
          color: "Multicolor",
          size: "S",
        },
      ],
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>订单历史</CardTitle>
        <CardDescription>查看和跟踪您的订单</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">订单 {order.id}</h3>
                    <Badge
                      variant={
                        order.status === "Delivered" ? "outline" : "default"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground select-none">
                    {order.date}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    跟踪订单
                  </Button>
                  <Button variant="outline" size="sm">
                    查看详情
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-20 w-16 flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="object-cover object-top rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <div className="text-sm text-muted-foreground select-none">
                          <p>
                            尺码: {item.size} | 颜色: {item.color}
                          </p>
                          <p>质量: {item.quantity}</p>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0 text-sm"
                          >
                            再次购买
                          </Button>
                          <Separator
                            orientation="vertical"
                            className="h-4 my-auto"
                          />
                          <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0 text-sm"
                          >
                            写评论
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground select-none">
                      总数
                    </p>
                    <p className="font-medium">${order.total.toFixed(2)}</p>
                  </div>
                  {order.status === "Delivered" && (
                    <Button variant="outline" size="sm">
                      <Package className="h-4 w-4 mr-2" />
                      退回商品
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

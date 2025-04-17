import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useGetOrderList } from "@/services/mall";
import { Separator } from "@radix-ui/react-separator";
import { useNavigate } from "react-router";

export const OrderPage = () => {
  const { data: orders } = useGetOrderList({
    order: "createTime",
    page: 1,
    size: 20,
    sort: "desc",
  });
  const status = ["待支付", "已支付", "已发货", "已完成", "已取消"];
  // nav
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader>
        <CardTitle>订单历史</CardTitle>
        <CardDescription>查看和跟踪您的订单</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {orders?.list.map((order) => (
            <div key={order.id} className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">订单 {order.orderNumber}</h3>
                    <Badge
                    // variant={
                    //   order.status === "Delivered" ? "outline" : "default"
                    // }
                    >
                      {status[order.payStatus]}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground select-none">
                    {order.createTime}
                  </p>
                </div>
                <div className="flex gap-2">
                  {order.payStatus == 0 ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigate("/payment", {
                          state: {
                            secretData: {
                              type: order.paymentType,
                              orderNumber: order.orderNumber,
                            },
                          },
                        });
                      }}
                    >
                      支付
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      跟踪订单
                    </Button>
                  )}
                  {/* <Button variant="outline" size="sm">
                    查看详情
                  </Button> */}
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {order.orderItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-20 w-16 flex-shrink-0">
                        <img
                          src={item?.mainImage || "/placeholder.svg"}
                          alt={item?.title}
                          className="object-cover object-top rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{item?.title}</h4>
                          <p className="font-medium">￥{item?.price}</p>
                        </div>
                        <div className="text-sm text-muted-foreground select-none">
                          <p>{item.goodsSpecification}</p>
                          <p>数量: {item.count}件</p>
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
                      合计
                    </p>
                    <p className="font-medium">￥{order.totalAmount}</p>
                  </div>
                  {/* {order.status === "Delivered" && (
                    <Button variant="outline" size="sm">
                      <Package className="h-4 w-4 mr-2" />
                      退回商品
                    </Button>
                  )} */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

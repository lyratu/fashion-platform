import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import UseScrollToBottom from "@/hooks/use-scroll";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useConfirmGoods,
  useGetLocation,
  useGetOrderList,
} from "@/services/mall";
import { Separator } from "@radix-ui/react-separator";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { Timeline } from "antd";
import { TimeLineItemProps } from "antd/es/timeline/TimelineItem";
import { useQueryClient } from "@tanstack/react-query";
// import { Input } from "@/components/ui/input";

export const OrderPage = () => {
  const loadRef = useRef(null);
  const [timeLine, setTimeLine] = useState(false);
  const [items, setItems] = useState<TimeLineItemProps[]>([]);
  const {
    data: orders,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetOrderList({
    order: "createTime",
    page: 1,
    size: 4,
    sort: "desc",
  });
  const { confirmGoodsFn } = useConfirmGoods();
  const { getLocationFn } = useGetLocation();
  const queryClient = useQueryClient();
  const status = ["待支付", "已支付", "已发货", "已完成", "已取消"];
  const colorStatus = ["blue", "green", "red"];

  // nav
  const navigate = useNavigate();
  /* 触底刷新list */
  UseScrollToBottom(loadRef, () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>订单历史</CardTitle>
        <CardDescription className="flex justify-between items-end">
          <div>查看和跟踪您的订单</div>
          {/* <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="email" placeholder="请输入关键字..." />
            <Button type="submit">搜索</Button>
          </div> */}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-210">
          <div className="space-y-6">
            {orders?.pages.map((list) =>
              list.list.map((order) => (
                <div
                  key={order.id}
                  className="border rounded-lg overflow-hidden"
                >
                  <div className="bg-muted p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">
                          订单 {order.orderNumber}
                        </h3>
                        <Badge
                        // variant={
                        //   order.status === "Delivered" ? "outline" : "default"
                        // }
                        >
                          {order.payStatus == 2 && order.logisticsStatus == 1
                            ? "已签收"
                            : status[order.payStatus]}
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
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={async () => {
                              await getLocationFn(
                                {
                                  order: "createTime",
                                  page: 1,
                                  size: 120,
                                  sort: "desc",
                                  logisticsNumber: order.trackingNumber || "-1",
                                },
                                {
                                  onSuccess: (list) => {
                                    if (list.list.length > 0) {
                                      setItems(
                                        list.list.flatMap((e) => ({
                                          color: colorStatus[e.status],
                                          label: e.recordTime.toString(),
                                          children: (
                                            <>
                                              <p>{e.detailedAddress}</p>
                                              <p
                                                style={{
                                                  color:
                                                    e.status == 2
                                                      ? "#F56C6C"
                                                      : "",
                                                }}
                                              >
                                                {e.locationDescription}
                                              </p>
                                            </>
                                          ),
                                        }))
                                      );
                                    } else {
                                      setItems([
                                        {
                                          label: order.createTime,
                                          children: "订单确认，已通知商家配货",
                                        },
                                      ]);
                                    }
                                    setTimeLine(true);
                                  },
                                }
                              );
                            }}
                          >
                            快递详情
                          </Button>
                          {order.logisticsStatus == 1 &&
                          order.payStatus != 3 ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                confirmGoodsFn(order.id, {
                                  onSuccess: () => {
                                    queryClient.invalidateQueries({
                                      queryKey: ["getOrderList"],
                                    });
                                  },
                                });
                              }}
                            >
                              确认收货
                            </Button>
                          ) : null}
                        </>
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
                              {order.payStatus == 3 ? (
                                <Button
                                  variant="link"
                                  size="sm"
                                  className="h-auto p-0 text-sm"
                                  onClick={() =>
                                    navigate(`/mall/product/${item.goodsId}`)
                                  }
                                >
                                  再次购买
                                </Button>
                              ) : null}
                              <Separator
                                orientation="vertical"
                                className="h-4 my-auto"
                              />
                              {/* <Button
                                variant="link"
                                size="sm"
                                className="h-auto p-0 text-sm"
                              >
                                写评论
                              </Button> */}
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
        <Dialog open={timeLine} onOpenChange={setTimeLine}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>运输信息</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <Timeline items={items} mode={"left"} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useGetOrderList } from "@/services/mall";
import { SquareRoundCorner } from "lucide-react";

interface order extends React.HTMLAttributes<HTMLDivElement> {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}
export const RecentOrder: React.FC<order> = ({ setActiveTab }) => {
  // Mock orders data
  const status = ["待支付", "已支付", "已发货", "已完成", "已取消"];
  // 最近订单
  const { data: orders } = useGetOrderList({
    order: "createTime",
    page: 1,
    size: 5,
    sort: "desc",
  });
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>最近订单</CardTitle>
          <Button
            variant="link"
            size="sm"
            className="text-sm"
            onClick={() => setActiveTab("orders")}
          >
            查看全部
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-4">
          {orders?.list.map((order) => (
            <div key={order.id} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-md border">
                  <img
                    src={order.orderItems[0].mainImage || "/placeholder.svg"}
                    alt={order.orderItems[0].title}
                    className="object-cover object-top"
                  />
                  {order.orderItems.length > 1 && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <span className="text-xs font-medium">
                        +{order.orderItems.length}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium">{order.orderNumber}</p>
                  <p className="text-xs text-muted-foreground">
                    {order.createTime}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">￥{order.totalAmount}</p>
                <Badge
                  // variant={order.status === "Delivered" ? "outline" : "default"}
                  className="text-xs"
                >
                  {status[order.payStatus]}
                </Badge>
              </div>
            </div>
          ))}
          {(orders?.list && orders.list.length > 0) || (
            <div className=" flex flex-col items-center">
              <div className="mb-4 p-4">
                <SquareRoundCorner className="h-16 w-16 mx-auto text-muted-foreground" />
              </div>
              <h2 className="text-xl font-medium mb-2">暂无购物订单</h2>
              <p className="text-muted-foreground mb-6">
                看起来您还没有购买任何东西。
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

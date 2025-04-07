import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "lucide-react";

interface order extends React.HTMLAttributes<HTMLDivElement> {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}
export const RecentOrder: React.FC<order> = ({ setActiveTab }) => {
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
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>最近订单</CardTitle>
          <Button
            variant="link"
            size="sm"
            className="text-sm"
            onClick={() => setActiveTab("orders")}
          >
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-4">
          {orders.slice(0, 2).map((order) => (
            <div key={order.id} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-md border">
                  <img
                    src={order.items[0].image || "/placeholder.svg"}
                    alt={order.items[0].name}
                    className="object-cover object-top"
                  />
                  {order.items.length > 1 && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <span className="text-xs font-medium">
                        +{order.items.length}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-xs text-muted-foreground">{order.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${order.total.toFixed(2)}</p>
                <Badge
                  variant={order.status === "Delivered" ? "outline" : "default"}
                  className="text-xs"
                >
                  {order.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

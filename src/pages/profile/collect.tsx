import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ShoppingBag, Trash2 } from "lucide-react";

export const CollectPage = () => {
  // Mock wishlist data
  const wishlist = [
    {
      id: 4,
      name: "Leather Crossbody Bag",
      price: 129.99,
      image: "/placeholder.svg?height=120&width=100",
      inStock: true,
    },
    {
      id: 6,
      name: "Chunky Ankle Boots",
      price: 119.99,
      image: "/placeholder.svg?height=120&width=100",
      inStock: true,
    },
    {
      id: 7,
      name: "Gold Hoop Earrings",
      price: 39.99,
      image: "/placeholder.svg?height=120&width=100",
      inStock: false,
    },
    {
      id: 8,
      name: "Cashmere Sweater",
      price: 149.99,
      image: "/placeholder.svg?height=120&width=100",
      inStock: true,
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>我的收藏</CardTitle>
        <CardDescription>保存的物品</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlist.map((item) => (
            <div key={item.id} className="relative group">
              <div className="relative h-48 w-full overflow-hidden rounded-md border">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="object-cover object-top"
                />
                {!item.inStock && (
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                    <span className="text-sm font-medium text-muted-foreground">
                      缺货
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-2">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-muted-foreground">${item.price}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/60 rounded-md">
                <Button disabled={!item.inStock} className="mr-2">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  添加购物车
                </Button>
                <Button variant="destructive" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

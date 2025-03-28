import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import { useGetGoods } from "@/services/home/goods";
import { useNavigate } from "react-router";

export default function TrendingGoods() {
  const { data } = useGetGoods();
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data?.map((outfit) => (
        <Card
          key={outfit.id}
          className="overflow-hidden cursor-pointer"
          onClick={() => {
            navigate("/mall/product/1");
          }}
        >
          <div className="relative h-64 w-full">
            <img
              src={outfit.mainImage || "/placeholder.svg"}
              alt={outfit.title}
              className="object-cover object-top w-full h-full"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full"
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full"
              >
                <ShoppingBag className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardContent className="p-3">
            <h3 className="font-medium">{outfit.title}</h3>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{outfit.collectCount} 收藏</span>
              <span>{outfit.sales} 已售</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import { useGetGoodsRec } from "@/services/mall";
import { useNavigate } from "react-router";

export default function TrendingGoods() {
  const { data } = useGetGoodsRec();
  const navigate = useNavigate();
  return (
    <div className="grid  sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {data?.map((outfit) => (
        <Card
          key={outfit.id}
          className="overflow-hidden cursor-pointer"
          onClick={() => {
            navigate(`/mall/product/${outfit.id}`);
          }}
        >
          <div className="relative w-full">
            <img loading="lazy" 
              src={outfit.mainImage || "/placeholder.svg"}
              alt={outfit.title}
              className="object-cover object-top aspect-[1/1] w-full"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              {/* <Button
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
              </Button> */}
            </div>
          </div>
          <CardContent className="p-3">
            <h3 className="font-medium">{outfit.title}</h3>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{outfit.collectCount} 收藏</span>
              {/* <span>{outfit.sales} 已售</span> */}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

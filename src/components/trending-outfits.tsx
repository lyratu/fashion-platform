import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";

export default function TrendingOutfits() {
  const outfits = [
    {
      id: 1,
      title: "Casual Weekend",
      image: "/placeholder.svg?height=400&width=300",
      likes: 245,
      items: 4,
    },
    {
      id: 2,
      title: "Office Chic",
      image: "/placeholder.svg?height=400&width=300",
      likes: 189,
      items: 5,
    },
    {
      id: 3,
      title: "Evening Elegance",
      image: "/placeholder.svg?height=400&width=300",
      likes: 312,
      items: 3,
    },
    {
      id: 4,
      title: "Workout Ready",
      image: "/placeholder.svg?height=400&width=300",
      likes: 156,
      items: 4,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {outfits.map((outfit) => (
        <Card key={outfit.id} className="overflow-hidden">
          <div className="relative h-64 w-full">
            <img
              src={outfit.image || "/placeholder.svg"}
              alt={outfit.title}
              className="object-cover"
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
              <span>{outfit.likes} likes</span>
              <span>{outfit.items} items</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

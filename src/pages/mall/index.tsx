import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ShoppingCart } from "lucide-react";

export default function MallPage() {
  const categories = [
    "全部",
    "上衣",
    "下装",
    "裙子",
    "穿戴",
    "配饰",
    "鞋子",
  ];

  let products = [
    {
      id: 1,
      name: "Oversized Cotton Shirt",
      price: 49.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "Tops",
      isNew: true,
      isSale: false,
      rating: 4.5,
      reviews: 28,
    },
    {
      id: 2,
      name: "High-Waisted Jeans",
      price: 79.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "Bottoms",
      isNew: false,
      isSale: true,
      salePrice: 59.99,
      rating: 4.8,
      reviews: 42,
    },
    {
      id: 3,
      name: "Floral Midi Dress",
      price: 89.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "Dresses",
      isNew: true,
      isSale: false,
      rating: 4.2,
      reviews: 15,
    },
    {
      id: 4,
      name: "Leather Crossbody Bag",
      price: 129.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "Accessories",
      isNew: false,
      isSale: false,
      rating: 4.7,
      reviews: 36,
    },
    {
      id: 5,
      name: "Wool Blend Coat",
      price: 199.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "Outerwear",
      isNew: false,
      isSale: true,
      salePrice: 149.99,
      rating: 4.6,
      reviews: 23,
    },
    {
      id: 6,
      name: "Chunky Ankle Boots",
      price: 119.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "Shoes",
      isNew: false,
      isSale: false,
      rating: 4.4,
      reviews: 19,
    },
    {
      id: 7,
      name: "Ribbed Knit Sweater",
      price: 69.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "Tops",
      isNew: false,
      isSale: false,
      rating: 4.3,
      reviews: 31,
    },
    {
      id: 8,
      name: "Wide-Leg Trousers",
      price: 89.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "Bottoms",
      isNew: true,
      isSale: false,
      rating: 4.1,
      reviews: 12,
    },
    {
      id: 9,
      name: "Statement Earrings",
      price: 29.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "Accessories",
      isNew: false,
      isSale: false,
      rating: 4.9,
      reviews: 47,
    },
  ];
  products = products.filter((e) => e.id == -1);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">时尚商城</h1>
          <p className="text-muted-foreground">
            购物的最新趋势，完成您的完美外观
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/mall/cart">
              <ShoppingCart className="h-4 w-4 mr-2" />
              购物车 (0)
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/mall/wishlist">
              <Heart className="h-4 w-4 mr-2" />
              意愿清单
            </Link>
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs defaultValue="All" className="mb-8">
        <TabsList className="mb-6 flex flex-wrap h-auto">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="mb-1">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="All" className="mt-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="relative">
                  <div className="relative h-64 w-full">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="object-cover"
                    />
                  </div>
                  {product.isNew && (
                    <Badge className="absolute top-2 left-2">New</Badge>
                  )}
                  {product.isSale && (
                    <Badge
                      variant="destructive"
                      className="absolute top-2 right-2"
                    >
                      Sale
                    </Badge>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80"
                    style={{ top: product.isSale ? "40px" : "8px" }}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium line-clamp-1">{product.name}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center">
                      {product.isSale ? (
                        <>
                          <span className="text-muted-foreground line-through mr-2">
                            ${product.price}
                          </span>
                          <span className="font-bold text-destructive">
                            ${product.salePrice}
                          </span>
                        </>
                      ) : (
                        <span className="font-bold">${product.price}</span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {product.rating} ★ ({product.reviews})
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <Link to={`/mall/product/${product.id}`}>Details</Link>
                  </Button>
                  <Button size="sm" className="flex-1">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Other category tabs */}
        {categories.slice(1).map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products
                .filter((product) => product.category === category)
                .map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="relative">
                      <div className="relative h-64 w-full">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="object-cover"
                        />
                      </div>
                      {product.isNew && (
                        <Badge className="absolute top-2 left-2">New</Badge>
                      )}
                      {product.isSale && (
                        <Badge
                          variant="destructive"
                          className="absolute top-2 right-2"
                        >
                          Sale
                        </Badge>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80"
                        style={{ top: product.isSale ? "40px" : "8px" }}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center">
                          {product.isSale ? (
                            <>
                              <span className="text-muted-foreground line-through mr-2">
                                ${product.price}
                              </span>
                              <span className="font-bold text-destructive">
                                ${product.salePrice}
                              </span>
                            </>
                          ) : (
                            <span className="font-bold">${product.price}</span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {product.rating} ★ ({product.reviews})
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        asChild
                      >
                        <Link to={`/mall/product/${product.id}`}>Details</Link>
                      </Button>
                      <Button size="sm" className="flex-1">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

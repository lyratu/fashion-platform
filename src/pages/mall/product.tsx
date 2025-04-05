import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ShoppingCart,
  Share2,
  Star,
  Truck,
  RotateCcw,
  Shield,
} from "lucide-react";
import { useGetGoodsDet } from "@/services/mall/detail";

// Mock product data - in a real app, this would come from an API or database
const products = [
  {
    id: "1",
    name: "Oversized Cotton Shirt",
    price: 49.99,
    images: [
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
    ],
    colors: ["White", "Black", "Blue", "Beige"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "This oversized cotton shirt offers both comfort and style. Made from 100% organic cotton, it features a relaxed fit with dropped shoulders and a classic collar. Perfect for casual everyday wear or dressed up with accessories for a more polished look.",
    details: [
      "100% organic cotton",
      "Relaxed, oversized fit",
      "Button-up front",
      "Classic collar",
      "Dropped shoulders",
      "Machine washable",
    ],
    category: "Tops",
    isNew: true,
    isSale: false,
    rating: 4.5,
    reviews: 28,
    sku: "TS-OSC-001",
  },
  {
    id: "2",
    name: "High-Waisted Jeans",
    price: 79.99,
    images: [
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
    ],
    colors: ["Blue", "Black", "Light Wash"],
    sizes: ["24", "25", "26", "27", "28", "29", "30", "31", "32"],
    description:
      "These high-waisted jeans are designed to flatter your figure with their slim fit and stretchy denim fabric. The high rise sits at your natural waist, elongating your legs and providing all-day comfort. Versatile enough to pair with any top in your wardrobe.",
    details: [
      "98% cotton, 2% elastane",
      "High-rise waist",
      "Slim fit through hip and thigh",
      "Five-pocket styling",
      "Button and zip fly closure",
      "Machine washable",
    ],
    category: "Bottoms",
    isNew: false,
    isSale: true,
    salePrice: 59.99,
    rating: 4.8,
    reviews: 42,
    sku: "BT-HWJ-002",
  },
];

// Related products
const relatedProducts = [
  {
    id: "3",
    name: "Floral Midi Dress",
    price: 89.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Dresses",
  },
  {
    id: "4",
    name: "Leather Crossbody Bag",
    price: 129.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Accessories",
  },
  {
    id: "5",
    name: "Wool Blend Coat",
    price: 199.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Outerwear",
    isSale: true,
    salePrice: 149.99,
  },
  {
    id: "6",
    name: "Chunky Ankle Boots",
    price: 119.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Shoes",
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const { data } = useGetGoodsDet(productId);

  // Find the product by ID
  const product = products.find((p) => p.id === "1") || products[0];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]); // Default to Medium or middle size
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    console.log("Added to cart:", {
      product,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
    // In a real app, this would dispatch to a cart state manager or API
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 text-sm breadcrumbs">
        <ul className="flex items-center gap-2 text-muted-foreground">
          <li>
            <Link to="/mall" className="hover:text-primary">
              商城
            </Link>
          </li>
          {/* <li>/</li>
          <li>
            <Link
              to={`/mall?category=${product.category}`}
              className="hover:text-primary"
            >
              {product.category}
            </Link>
          </li> */}
          <li>/</li>
          <li className="text-foreground font-medium truncate max-w-[200px]">
            {data?.title}
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border">
            <img
              src={data?.mainImage || "/placeholder.svg"}
              alt={product.name}
              className="object-cover object-top"
            />
            {product.isNew && (
              <Badge className="absolute top-4 left-4">New</Badge>
            )}
            {product.isSale && (
              <Badge variant="destructive" className="absolute top-4 right-4">
                Sale
              </Badge>
            )}
          </div>
          <div className="flex gap-2 overflow-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border ${
                  selectedImage === index ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="object-cover object-top"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{data?.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              {/* <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted-foreground"
                    }`}
                  />
                ))}
              </div> */}
              {/* <span className="text-sm text-muted-foreground select-none">
                {product.rating} ({product.reviews} reviews)
              </span> */}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {product.isSale ? (
              <>
                <span className="text-3xl font-bold text-destructive">
                  ${product.salePrice}
                </span>
                <span className="text-xl text-muted-foreground line-through">
                  ${product.price}
                </span>
                <Badge variant="destructive">
                  {Math.round(
                    ((product.price - product.price) / product.price) * 100
                  )}
                  % OFF
                </Badge>
              </>
            ) : (
              <span className="text-3xl font-bold">￥{data?.price}</span>
            )}
          </div>

          <Separator />

          {/* Color Selection */}
          <div>
            <h3 className="text-sm font-medium mb-3">颜色: {selectedColor}</h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`h-10 w-10 rounded-full border ${
                    selectedColor === color
                      ? "ring-2 ring-primary ring-offset-2"
                      : ""
                  }`}
                  style={{
                    backgroundColor:
                      color.toLowerCase() === "white"
                        ? "#ffffff"
                        : color.toLowerCase() === "black"
                        ? "#000000"
                        : color.toLowerCase() === "blue"
                        ? "#3b82f6"
                        : color.toLowerCase() === "beige"
                        ? "#f5f5dc"
                        : color.toLowerCase() === "light wash"
                        ? "#a0c4ff"
                        : "#cccccc",
                  }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <div className="flex justify-between mb-3">
              <h3 className="text-sm font-medium">尺码: {selectedSize}</h3>
              {/* <button className="text-sm text-primary hover:underline">
                Size Guide
              </button> */}
            </div>
            <RadioGroup
              value={selectedSize}
              onValueChange={setSelectedSize}
              className="flex flex-wrap gap-2"
            >
              {product.sizes.map((size) => (
                <div key={size}>
                  <RadioGroupItem
                    id={`size-${size}`}
                    value={size}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={`size-${size}`}
                    className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border ${
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input hover:bg-muted"
                    }`}
                  >
                    {size}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium">数量:</h3>
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              添加到购物车
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Product Info */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="h-4 w-4" />
              <span>订单满200元免配送费</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <RotateCcw className="h-4 w-4" />
              <span>7天无理由退款</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4" />
              <span>1年质量保证</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mb-16">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
          <TabsTrigger
            value="description"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            描述
          </TabsTrigger>
          <TabsTrigger
            value="details"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            详情
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            评论 ({data?.collectCount})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="pt-4">
          <p className="text-muted-foreground">{data?.description}</p>
        </TabsContent>
        <TabsContent value="details" className="pt-4">
          <div className="">
            <div>
              <h3 className="font-medium mb-2">产品详情</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.detail as string,
                }}
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="pt-4">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold">{product.rating}</div>
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground select-none mt-1">
                  {product.reviews} reviews
                </div>
              </div>
              <div className="flex-1">
                <div className="space-y-1">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2">
                      <div className="text-sm w-2">{star}</div>
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{
                            width: `${
                              star === 5
                                ? 70
                                : star === 4
                                ? 20
                                : star === 3
                                ? 5
                                : star === 2
                                ? 3
                                : 2
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground w-8">
                        {star === 5
                          ? 70
                          : star === 4
                          ? 20
                          : star === 3
                          ? 5
                          : star === 3
                          ? 3
                          : 2}
                        %
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            {/* Sample Reviews */}
            <div className="space-y-6">
              <ReviewItem
                name="Sarah J."
                date="2 weeks ago"
                rating={5}
                review="This shirt is exactly what I was looking for! The material is soft and comfortable, and the oversized fit is perfect. I ordered my usual size and it fits as expected. Highly recommend!"
              />
              <Separator />
              <ReviewItem
                name="Michael T."
                date="1 month ago"
                rating={4}
                review="Great quality shirt, very comfortable. The only reason I'm giving 4 stars instead of 5 is because the color is slightly different than what's shown in the photos. Still very happy with my purchase though."
              />
              <Separator />
              <ReviewItem
                name="Emma L."
                date="2 months ago"
                rating={5}
                review="I love everything about this shirt! The fabric is high quality and it washes well without shrinking. I've already ordered another one in a different color."
              />

              <div className="text-center pt-4">
                <Button variant="outline">Load More Reviews</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Review Item Component
function ReviewItem({
  name,
  date,
  rating,
  review,
}: {
  name: string;
  date: string;
  rating: number;
  review: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <div>
          <h4 className="font-medium">{name}</h4>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < rating
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">{date}</span>
          </div>
        </div>
      </div>
      <p className="text-muted-foreground">{review}</p>
    </div>
  );
}

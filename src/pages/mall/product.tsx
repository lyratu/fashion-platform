import { useEffect, useState } from "react";
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
import { toast } from "sonner";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const { data, isSuccess } = useGetGoodsDet(productId);

  // Find the product by ID
  const [selectedImage, setSelectedImage] = useState(0);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isSuccess) {
      setSelectedColor(data.color[0].value);
      setSelectedSize(data.size[0].value);
      if (!data.subPics) data.subPics = [];
      if (!data.subPics.includes(data.mainImage))
        data.subPics = [data.mainImage, ...data.subPics];
    }
  }, [isSuccess, data]);

  // const handleAddToCart = () => {
  //   console.log("Added to cart:", {
  //     product,
  //     color: selectedColor,
  //     size: selectedSize,
  //     quantity,
  //   });
  //   // In a real app, this would dispatch to a cart state manager or API
  // };

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
              src={
                (data?.subPics && data?.subPics[selectedImage]) ||
                "/placeholder.svg"
              }
              alt={data?.title}
              className="object-cover object-top h-full"
            />
          </div>
          <div className="flex gap-2 overflow-auto pb-2">
            {data?.subPics &&
              data?.subPics.map((image, index) => (
                <button
                  key={index}
                  className={` cursor-pointer relative ml-1 mt-1 h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border ${
                    selectedImage === index ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image || "/placeholder.svg"}
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
            <span className="text-3xl font-bold">￥{data?.price}</span>
          </div>

          <Separator />

          {/* Color Selection */}
          <div>
            <h3 className="text-sm font-medium mb-3">
              颜色: {data?.color.find((e) => e.value == selectedColor)?.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              <RadioGroup
                value={selectedColor}
                onValueChange={setSelectedColor}
                className="flex flex-wrap gap-2"
              >
                {data?.color.map((size) => (
                  <div key={size.value}>
                    <RadioGroupItem
                      id={`color-${size.value}`}
                      value={size.value}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={`color-${size.value}`}
                      className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border ${
                        selectedColor === size.value
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input hover:bg-muted"
                      }`}
                    >
                      {size.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <div className="flex justify-between mb-3">
              <h3 className="text-sm font-medium">
                尺码: {data?.size.find((e) => e.value == selectedSize)?.label}
              </h3>
            </div>
            <RadioGroup
              value={selectedSize}
              onValueChange={setSelectedSize}
              className="flex flex-wrap gap-2"
            >
              {data?.size.map((size) => (
                <div key={size.value}>
                  <RadioGroupItem
                    id={`size-${size.value}`}
                    value={size.value}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={`size-${size.value}`}
                    className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border ${
                      selectedSize === size.value
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input hover:bg-muted"
                    }`}
                  >
                    {size.label}
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
            <Button className="flex-1 cursor-pointer">
              <ShoppingCart className="h-4 w-4 mr-2 " />
              添加到购物车
            </Button>
            <Button variant="outline" size="icon" className="cursor-pointer">
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("已复制分享链接，请分享给好友吧~", {
                  duration: 1500,
                });
              }}
            >
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
      </Tabs>
    </div>
  );
}

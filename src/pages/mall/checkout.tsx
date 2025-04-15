import type React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  ArrowLeft,
  Truck,
  Home,
  Building,
  Plus,
  Shield,
  CheckCircle2,
  MapPin,
  Clock,
} from "lucide-react";
import { useGetCart } from "@/services/mall/cart";
import { useGetMyAddress } from "@/services/profile";
import { getMyAddress } from "./../../services/profile/address";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AddressForm } from "../profile/components/addressForm";
import zfb from "@/assets/resource/zhifubaoPay.png";
import wx from "@/assets/resource/wechatPay.png";

export default function CheckoutPage() {
  const { data: cartItems } = useGetCart();
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [currentStep, setCurrentStep] = useState("shipping");
  const [selectedAddress, setSelectedAddress] = useState<number>(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // api
  const { data: address } = useGetMyAddress();

  // Calculate order summary
  const subtotal = cartItems?.list.reduce(
    (sum, item) => (item.checked == 1 ? sum + item.price * item.count : sum),
    0
  );

  const handleContinueToPayment = () => {
    setCurrentStep("payment");
  };

  const handleContinueToReview = () => {
    setCurrentStep("review");
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    // Simulate API call to place order
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      setOrderNumber(`ORD-${Math.floor(100000 + Math.random() * 900000)}`);

      toast.success("您的订单已被下达，并将很快处理.");
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link to="/mall/cart">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回
          </Link>
        </Button>
        <h1 className="text-xl font-bold">确认订单</h1>
      </div>

      {orderComplete ? (
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">下单成功！</CardTitle>
            <CardDescription>
              谢谢您的购买。您的订单已下达，将很快进行处理。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">订单号:</span>
                <span>{orderNumber}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">下单时间:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">商品总数:</span>
                {/* <span>${total.toFixed(2)}</span> */}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">订单详情</h3>
              <div className="space-y-3">
                {cartItems?.list
                  .filter((e) => e.checked)
                  .map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative h-16 w-16 flex-shrink-0">
                        <img
                          src={item.mainImage || "/placeholder.svg"}
                          alt={item.title}
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.size && `Size: ${item.size} | `}
                          {item.color && `Color: ${item.color} | `}
                          Qty: {item.count}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ${(item.price * item.count).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* <div className="border-t pt-4">
              <h3 className="font-medium mb-2">快递信息</h3>
              <p>{address?.name}</p>
              <p>{address?.street}</p>
              {address?.apt && <p>{address.apt}</p>}
              <p>
                {address?.city}, {address?.state} {address?.zip}
              </p>
              <p>{address?.country}</p>
              <p>{address?.phone}</p>
            </div> */}

            <div className="flex items-center gap-2 bg-muted/50 p-4 rounded-lg">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm">
                您将在订单发货后收到带有订单详细信息和跟踪信息的电子邮件确认。
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" asChild>
              <Link to="/profile?tab=orders">查看历史订单</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/mall">继续购物</Link>
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Flow */}
          <div className="lg:col-span-2">
            <Tabs value={currentStep} className="w-full">
              <TabsList className="grid grid-cols-3 w-full mb-8">
                <TabsTrigger
                  value="shipping"
                  disabled={currentStep === "cart" || currentStep === "review"}
                >
                  地址
                </TabsTrigger>
                <TabsTrigger
                  value="payment"
                  disabled={
                    currentStep === "cart" ||
                    currentStep === "shipping" ||
                    currentStep === "review"
                  }
                >
                  支付
                </TabsTrigger>
                <TabsTrigger value="review" disabled={currentStep !== "review"}>
                  详情
                </TabsTrigger>
              </TabsList>

              {/* Shipping Step */}
              <TabsContent value="shipping" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>收货地址</CardTitle>
                    <CardDescription>选择或添加一个收货地址</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup
                      value={String(selectedAddress)}
                      onValueChange={(value) =>
                        setSelectedAddress(Number(value))
                      }
                    >
                      {address?.map((address) => (
                        <div
                          key={address.id}
                          className="flex items-start space-x-3"
                        >
                          <RadioGroupItem
                            value={String(address.id)}
                            id={`address-${address.id}`}
                            className="mt-1"
                          />
                          <div className="grid gap-1.5 leading-none">
                            {address.isDefault && (
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">默认</Badge>
                              </div>
                            )}
                            <Label htmlFor={`address-${address.id}`}>
                              <div className="text-sm text-muted-foreground mt-1">
                                <p>{address.contact}</p>
                                <p>{address.phone}</p>
                                <p>
                                  {address.province}, {address.city}{" "}
                                  {address.district}
                                </p>
                                <p>{address.address}</p>
                              </div>
                            </Label>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                  <CardFooter className=" justify-between">
                    <Dialog
                      open={isAddingAddress}
                      onOpenChange={setIsAddingAddress}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" className=" cursor-pointer">
                          <Plus className="h-4 w-4 mr-2" />
                          添加新地址
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <AddressForm
                          isAddingAddress={isAddingAddress}
                          setIsAddingAddress={setIsAddingAddress}
                        />
                      </DialogContent>
                    </Dialog>

                    <Button
                      className=" cursor-pointer px-10"
                      onClick={handleContinueToPayment}
                    >
                      下一步
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Payment Step */}
              <TabsContent value="payment" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>支付方式</CardTitle>
                    <CardDescription>请选择一种支付方式</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup
                      value={String(selectedPaymentMethod)}
                      onValueChange={(value) =>
                        setSelectedPaymentMethod(Number(value))
                      }
                    >
                      <div className="flex items-start space-x-3">
                        <RadioGroupItem
                          value={"0"}
                          id={`payment-`}
                          className="mt-1"
                        />
                        <div className="grid gap-1.5 leading-none w-full">
                          <div className="flex justify-between items-center">
                            <Label
                              htmlFor={`payment-`}
                              className="flex items-center gap-2 ml-4"
                            >
                              <img
                                src={zfb}
                                alt="支付宝"
                                className="w-8 h-auto"
                              />
                              <span className="font-medium capitalize">
                                支付宝
                              </span>
                            </Label>
                          </div>
                          <p className="text-sm text-muted-foreground"></p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <RadioGroupItem
                          value={"0"}
                          id={`payment-`}
                          className="mt-1"
                        />
                        <div className="grid gap-1.5 leading-none w-full">
                          <div className="flex justify-between items-center">
                            <Label
                              htmlFor={`payment-`}
                              className="flex items-center gap-2 ml-4"
                            >
                              <img src={wx} alt="微信" className="w-8 h-auto" />
                              <span className="font-medium capitalize">
                                微信
                              </span>
                            </Label>
                          </div>
                          <p className="text-sm text-muted-foreground"></p>
                        </div>
                      </div>
                    </RadioGroup>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-fit ml-auto px-10"
                      onClick={handleContinueToReview}
                    >
                      下一步
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Review Step */}
              <TabsContent value="review" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>订单详情</CardTitle>
                    <CardDescription>
                      请在下订单之前查看您的订单详细信息
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Order Items */}
                    <div>
                      <h3 className="font-medium mb-2">商品项</h3>
                      <div className="space-y-3">
                        {cartItems?.list.map((item) => (
                          <div key={item.id} className="flex gap-3">
                            <div className="relative h-16 w-16 flex-shrink-0">
                              <img
                                src={item.mainImage || "/placeholder.svg"}
                                alt={item.title}
                                className="object-cover rounded-md"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{item.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {item.size && `Size: ${item.size} | `}
                                {item.color && `Color: ${item.color} | `}
                                Qty: {item.count}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                ${(item.price * item.count).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-fit px-10 ml-auto"
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "下单中..." : "下单"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>订单详情</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cartItems?.list
                    .filter((e) => e.checked)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <span>
                          {item.title} × {item.count}
                        </span>
                        <span>￥{(item.price * item.count).toFixed(2)}</span>
                      </div>
                    ))}
                </div>

                <Separator />

                {subtotal && (
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>总计</span>
                      <span>￥{subtotal?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>运费</span>
                      <span>
                        ￥{parseFloat(subtotal?.toFixed(2)) >= 200 ? "0" : "20"}
                      </span>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      订单满200免运费
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      由湖北武汉发货
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

// Credit Card Icon Component
function CreditCardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

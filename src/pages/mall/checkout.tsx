import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { ArrowLeft, Truck, Plus, MapPin } from "lucide-react";
import { useGetCart } from "@/services/mall/cart";
import { useGetMyAddress } from "@/services/profile";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AddressForm } from "../profile/components/addressForm";
import zfb from "@/assets/resource/zhifubaoPay.png";
import wx from "@/assets/resource/wechatPay.png";
import { useCreateOrder } from "@/services/mall";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { data: cartItems } = useGetCart();
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [currentStep, setCurrentStep] = useState("shipping");
  const [selectedAddress, setSelectedAddress] = useState<number>(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>(1);

  // api
  const { data: address } = useGetMyAddress();
  const { createOrderFn } = useCreateOrder();

  // nav
  const navigate = useNavigate();

  // effect
  useEffect(() => {
    if (address && address.length > 0) setSelectedAddress(address[0].id);
  }, [address]);

  // Calculate order summary
  const subtotal = cartItems?.list.reduce(
    (sum, item) => (item.checked == 1 ? sum + item.price * item.count : sum),
    0
  );

  // shipping
  const shipping = subtotal && subtotal >= 200 ? 0 : 20;

  const handlePlaceOrder = async () => {
    // setIsProcessing(true);
    const addr = address?.filter((e) => e.id == selectedAddress)[0];
    const res = await createOrderFn({
      totalAmount: Number(((subtotal as number) + shipping).toFixed(2)),
      address:
        addr?.province +
        "" +
        addr?.city +
        "" +
        addr?.district +
        "" +
        addr?.address,
      contactNumber: addr?.contact + ":" + addr?.phone,
      paymentType: selectedPaymentMethod,
    });
    if (res)
      navigate("/payment", {
        state: {
          secretData: {
            type: selectedPaymentMethod,
            orderNumber: res.orderNumber,
          },
        },
      });
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
                    onValueChange={(value) => setSelectedAddress(Number(value))}
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
                            <div className="text-sm text-muted-foreground mt-1 cursor-pointer">
                              <p>{address.contact}</p>
                              <p>{address.phone}</p>
                              <p>
                                {address.province}-{address.city}-
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
                    onClick={() => {
                      if (!selectedAddress || (address && address.length < 1))
                        return toast.error("未选择收货地址");
                      setCurrentStep("payment");
                    }}
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
                        value={"1"}
                        id={`payment-1`}
                        className="mt-1"
                      />
                      <Label
                        htmlFor={`payment-1`}
                        className="flex items-center gap-2 ml-4 cursor-pointer"
                      >
                        <img loading="lazy"  src={zfb} alt="支付宝" className="w-8 h-auto" />
                        <span className="font-medium capitalize">支付宝</span>
                      </Label>
                    </div>
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem
                        value={"2"}
                        id={`payment-2`}
                        className="mt-1"
                      />
                      <Label
                        htmlFor={`payment-2`}
                        className="flex items-center gap-2 ml-4 cursor-pointer"
                      >
                        <img loading="lazy"  src={wx} alt="微信" className="w-8 h-auto" />
                        <span className="font-medium capitalize">微信</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep("shipping")}
                  >
                    上一步
                  </Button>

                  <Button
                    className="w-fit ml-auto px-10"
                    onClick={() => setCurrentStep("review")}
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
                      {cartItems?.list
                        .filter((e) => e.checked)
                        .map((item) => (
                          <div key={item.id} className="flex gap-3">
                            <div className="relative h-16 w-16 flex-shrink-0">
                              <img loading="lazy" 
                                src={item.mainImage || "/placeholder.svg"}
                                alt={item.title}
                                className="object-cover rounded-md"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{item.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {item.size && `尺码: ${item.size} | `}
                                {item.color && `颜色: ${item.color} | `}
                                数量: {item.count}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                ￥{(item.price * item.count).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">收货地址</h3>
                    <div className="text-sm text-muted-foreground mt-1">
                      {address
                        ?.filter((e) => e.id == selectedAddress)
                        .map((item) => (
                          <div
                            key={item.id}
                            className="text-sm text-muted-foreground mt-1 space-y-1"
                          >
                            <p>{item.contact}</p>
                            <p>{item.phone}</p>
                            <p>
                              {item.province}-{item.city}-{item.district}
                            </p>
                            <p>{item.address}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">支付方式</h3>
                    <div className="text-sm text-muted-foreground mt-1">
                      {selectedPaymentMethod == 1 ? (
                        <>
                          <img loading="lazy"  src={zfb} className="w-8 h-auto" />
                          <span className="font-medium capitalize">支付宝</span>
                        </>
                      ) : (
                        <>
                          <img loading="lazy"  src={wx} className="w-8 h-auto" />
                          <span className="font-medium capitalize">微信</span>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep("payment")}
                  >
                    上一步
                  </Button>
                  <Button
                    className="w-fit px-10 ml-auto"
                    onClick={handlePlaceOrder}
                  >
                    下单
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
                    <div key={item.id} className="flex justify-between text-sm">
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
                    <span>合计</span>
                    <span>￥{subtotal?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>运费</span>
                    <span>￥{shipping.toFixed(2)}</span>
                  </div>
                </div>
              )}

              <Separator />

              {subtotal && (
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>总价</span>
                    <span>￥{(subtotal + shipping).toFixed(2)}</span>
                  </div>
                </div>
              )}
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
    </div>
  );
}

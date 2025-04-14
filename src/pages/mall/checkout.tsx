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

// Mock payment methods
const paymentMethods = [
  {
    id: 1,
    type: "credit_card",
    isDefault: true,
    cardType: "visa",
    lastFour: "4242",
    expiryDate: "12/25",
    cardholderName: "Jessica Thompson",
  },
  {
    id: 2,
    type: "credit_card",
    isDefault: false,
    cardType: "mastercard",
    lastFour: "8888",
    expiryDate: "09/26",
    cardholderName: "Jessica Thompson",
  },
];

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

      toast("Your order has been placed and will be processed shortly.");
    }, 2000);
  };

  // Get selected address and payment method
  const paymentMethod = paymentMethods.find(
    (method) => method.id === selectedPaymentMethod
  );

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
            <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
            <CardDescription>
              Thank you for your purchase. Your order has been placed and will
              be processed shortly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Order Number:</span>
                <span>{orderNumber}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Order Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Order Total:</span>
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

            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Shipping Information</h3>
              {/* <p>{address?.name}</p>
              <p>{address?.street}</p>
              {address?.apt && <p>{address.apt}</p>}
              <p>
                {address?.city}, {address?.state} {address?.zip}
              </p>
              <p>{address?.country}</p>
              <p>{address?.phone}</p> */}
            </div>

            <div className="flex items-center gap-2 bg-muted/50 p-4 rounded-lg">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm">
                You will receive an email confirmation with order details and
                tracking information once your order ships.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" asChild>
              <Link to="/profile/orders">View Order History</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/mall">Continue Shopping</Link>
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
                  预览
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
                      className=" cursor-pointer"
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
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>
                      Select a payment method or add a new one
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup
                      value={String(selectedPaymentMethod)}
                      onValueChange={(value) =>
                        setSelectedPaymentMethod(Number(value))
                      }
                    >
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className="flex items-start space-x-3"
                        >
                          <RadioGroupItem
                            value={String(method.id)}
                            id={`payment-${method.id}`}
                            className="mt-1"
                          />
                          <div className="grid gap-1.5 leading-none w-full">
                            <div className="flex justify-between">
                              <Label
                                htmlFor={`payment-${method.id}`}
                                className="flex items-center gap-2"
                              >
                                <CreditCardIcon className="h-4 w-4" />
                                <span className="font-medium capitalize">
                                  {method.cardType === "visa"
                                    ? "Visa"
                                    : "Mastercard"}{" "}
                                  •••• {method.lastFour}
                                </span>
                                {method.isDefault && (
                                  <Badge variant="outline" className="ml-2">
                                    默认
                                  </Badge>
                                )}
                              </Label>
                              <span className="text-sm text-muted-foreground">
                                Expires {method.expiryDate}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {method.cardholderName}
                            </p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>

                    <Button variant="outline" className="w-full mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Payment Method
                    </Button>

                    <div className="flex items-center space-x-2 mt-4">
                      <Checkbox id="billing-same" defaultChecked />
                      <label
                        htmlFor="billing-same"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Billing address same as shipping address
                      </label>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={handleContinueToReview}>
                      Continue to Review
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Review Step */}
              <TabsContent value="review" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Review Your Order</CardTitle>
                    <CardDescription>
                      Please review your order details before placing your order
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Shipping Information */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Shipping Information</h3>
                        <Button
                          variant="link"
                          size="sm"
                          className="h-auto p-0"
                          onClick={() => setCurrentStep("shipping")}
                        >
                          Edit
                        </Button>
                      </div>
                      {/* <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="font-medium capitalize">
                          {address?.type}
                        </p>
                        <p>{address?.name}</p>
                        <p>{address?.street}</p>
                        {address?.apt && <p>{address.apt}</p>}
                        <p>
                          {address?.city}, {address?.state} {address?.zip}
                        </p>
                        <p>{address?.country}</p>
                        <p>{address?.phone}</p>
                      </div> */}
                    </div>

                    {/* Shipping Method */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Shipping Method</h3>
                        <Button
                          variant="link"
                          size="sm"
                          className="h-auto p-0"
                          onClick={() => setCurrentStep("shipping")}
                        >
                          Edit
                        </Button>
                      </div>
                      {/* <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="font-medium">
                          {
                            shippingMethods.find(
                              (method) => method.id === selectedShippingMethod
                            )?.name
                          }
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {
                            shippingMethods.find(
                              (method) => method.id === selectedShippingMethod
                            )?.description
                          }
                        </p>
                      </div> */}
                    </div>

                    {/* Payment Method */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Payment Method</h3>
                        <Button
                          variant="link"
                          size="sm"
                          className="h-auto p-0"
                          onClick={() => setCurrentStep("payment")}
                        >
                          Edit
                        </Button>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="font-medium">
                          {paymentMethod?.cardType === "visa"
                            ? "Visa"
                            : "Mastercard"}{" "}
                          •••• {paymentMethod?.lastFour}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Expires {paymentMethod?.expiryDate}
                        </p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h3 className="font-medium mb-2">Order Items</h3>
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

                    <div className="flex items-center gap-2 bg-primary/10 p-4 rounded-lg">
                      <Shield className="h-5 w-5 text-primary" />
                      <p className="text-sm">
                        Your payment information is encrypted and secure. We
                        never store your full credit card details.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Place Order"}
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

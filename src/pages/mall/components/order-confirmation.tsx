import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Clock } from "lucide-react";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface Address {
  name: string;
  street: string;
  apt?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

interface OrderConfirmationProps {
  orderNumber: string;
  orderDate: string;
  orderTotal: number;
  items: OrderItem[];
  shippingAddress: Address;
}

export function OrderConfirmation({
  orderNumber,
  orderDate,
  orderTotal,
  items,
  shippingAddress,
}: OrderConfirmationProps) {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
        <CardDescription>
          Thank you for your purchase. Your order has been placed and will be
          processed shortly.
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
            <span>{orderDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Order Total:</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Order Details</h3>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="relative h-16 w-16 flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.size && `Size: ${item.size} | `}
                    {item.color && `Color: ${item.color} | `}
                    Qty: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-medium mb-2">Shipping Information</h3>
          <p>{shippingAddress.name}</p>
          <p>{shippingAddress.street}</p>
          {shippingAddress.apt && <p>{shippingAddress.apt}</p>}
          <p>
            {shippingAddress.city}, {shippingAddress.state}{" "}
            {shippingAddress.zip}
          </p>
          <p>{shippingAddress.country}</p>
          <p>{shippingAddress.phone}</p>
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
          <Link href="/profile/orders">View Order History</Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/mall">Continue Shopping</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

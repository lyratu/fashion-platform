import zfb from "@/assets/resource/zfbCode.jpg";
import zfbLogo from "@/assets/resource/zhifubaoPay.png";
import wxLogo from "@/assets/resource/wechatPay.png";
import codeTips from "@/assets/resource/codeTips.png";
import scan from "@/assets/resource/scan.png";
import wx from "@/assets/resource/wxCode.png";
import { Separator } from "@/components/ui/separator";
import { Link, useLocation } from "react-router";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock } from "lucide-react";

const Payment = () => {
  const location = useLocation();
  const secretData = location.state?.secretData;
  const type = secretData?.type || 0;
  const price = secretData?.price || 0;
  const [isComplete, setIsComplete] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const orderNumber = 0;
  setTimeout(() => {
    setIsComplete(true);
  }, 5000);
  return (
    <div>
      {orderComplete ? (
        <Card className="max-w-3xl mx-auto mt-32">
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
              {/* <div className="space-y-3">
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
                          {item.size && `尺码: ${item.size} | `}
                          {item.color && `颜色: ${item.color} | `}
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
              </div> */}
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
        <div className=" bg-[#eff0f1] h-screen">
          <div className=" bg-white h-16 py-2 border border-b-[#d9d9d9] mb-12">
            <div className="flex h-full items-center container mx-auto">
              {type == 2 ? (
                <>
                  <img src={wxLogo} alt="" className="h-10 w-auto" />
                  <div className=" text-3xl font-bold ml-2">微信</div>
                </>
              ) : (
                <>
                  <img src={zfbLogo} alt="" className="h-10 w-auto" />
                  <div className=" text-3xl font-bold ml-2">支付宝</div>
                </>
              )}

              <Separator orientation="vertical" className="mx-4" />
              <div className=" self-end text-gray-500">我的收银台</div>
            </div>
          </div>
          <div className=" bg-white container mx-auto">
            <div className=" relative p-32 flex flex-col  justify-center items-center border-2 border-t-[#b3b3b3] border-b-[#b3b3b3]">
              <div>扫一扫付款（元）</div>
              <div className=" text-3xl font-bold text-[#ff6600]">
                {price.toFixed(2)}
              </div>
              <div className="mt-4 p-2 relative shadow shadow-[#ccc] border border-[#d3d3d3]">
                {type == 2 ? (
                  <img src={wx} alt="" className=" w-48 aspect-[1/1]" />
                ) : (
                  <img src={zfb} alt="" className=" w-48 aspect-[1/1]" />
                )}

                <img
                  src={codeTips}
                  alt=""
                  className=" absolute h-32 top-[40%] left-[100%] transform -translate-y-full"
                />
                <div className=" flex items-center justify-center my-1">
                  <img src={scan} className="h-full" />
                  <div className=" text-sm ml-2">
                    <div>打开手机{type == 2 ? "微信" : "支付宝"}</div>
                    <div>扫一扫继续付款</div>
                  </div>
                </div>
              </div>
              {isComplete ? (
                <div className="mt-4">
                  <span className=" text-sm">付款成功？</span>
                  <Button variant="link" onClick={() => setOrderComplete(true)}>
                    点击确认已支付完成
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import bear from "@/assets/resource/bear.png";
import { Venus, Mars, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger, TabsContent, Tabs } from "@/components/ui/tabs";
export default function OtherProfile() {
  const location = useLocation();
  const userId = location.state.userId;
  const navigate = useNavigate();
  return (
    <div className="container mx-auto relative px-4 py-8">
      <div>
        <Button
          variant="ghost"
          size="sm"
          className="mb-4 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回
        </Button>
      </div>
      <div className=" flex justify-center">
        <img
          src={bear}
          className=" rounded-full border w-35 h-35 object-cover object-center"
        />
        <div className="flex flex-col ml-12 space-y-1.5">
          <div className=" text-2xl font-semibold flex items-center space-x-1">
            <span>好好桃</span>
            <Venus className=" text-red-300" />
            <Mars className=" text-blue-300" />
          </div>

          <div>还没有简介</div>

          <div>
            <Badge variant="secondary">程序员</Badge>
          </div>

          <div>
            <span>3919</span>
            <span className="text-muted-foreground"> 获赞</span>
          </div>
        </div>
      </div>
      <Tabs defaultValue="account" className="w-full mt-10">
        <TabsList className="flex justify-center w-full bg-red">
          <TabsTrigger value="account" className=" cursor-pointer">
            发布
          </TabsTrigger>
          <TabsTrigger value="password" className=" cursor-pointer">
            收藏
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}

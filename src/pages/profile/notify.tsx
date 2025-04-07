import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const NotifyPage = () => {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList>
        <TabsTrigger value="account" className=" cursor-pointer">
          评论
        </TabsTrigger>
        <TabsTrigger value="password" className=" cursor-pointer">
          点赞
        </TabsTrigger>
      </TabsList>
      <Separator className="my-4" />
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
};

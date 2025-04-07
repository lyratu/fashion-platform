import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export const AccountSetPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>账号设置</CardTitle>
        <CardDescription>管理你的账号信息</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current-password">当前密码</Label>
          <Input id="current-password" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password">新密码</Label>
          <Input id="new-password" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">确认密码</Label>
          <Input id="confirm-password" type="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button>更新</Button>
      </CardFooter>
    </Card>
  );
};

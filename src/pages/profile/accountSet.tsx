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
import { useUpdatePassword } from "@/services/profile";
import { Label } from "@radix-ui/react-label";

export const AccountSetPage = () => {
  const { updatePasswordFn } = useUpdatePassword();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formdata = new FormData(form);
    const currentPwd = formdata.get("currentPwd") as string;
    const newPwd = formdata.get("newPwd") as string;
    updatePasswordFn({ currentPwd, newPwd });
  };
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>账号设置</CardTitle>
          <CardDescription>管理你的账号信息</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 w-1/2">
          <div className="space-y-2">
            <Label htmlFor="current-password">当前密码</Label>
            <Input id="current-password" type="password" name="currentPwd" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">新密码</Label>
            <Input id="new-password" type="password" name="newPwd" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">确认密码</Label>
            <Input id="confirm-password" type="password" name="rePwd" />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">更新</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdatePassword } from "@/services/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const AccountSetPage = () => {
  const { updatePasswordFn } = useUpdatePassword();

  const formSchema = z.object({
    currentPwd: z
      .string()
      .min(6, {
        message: "密码不能少于6个字符",
      })
      .max(18, {
        message: "密码不能超过18个字符",
      }),
    newPwd: z
      .string()
      .min(6, {
        message: "密码不能少于6个字符",
      })
      .max(18, {
        message: "密码不能超过18个字符",
      }),
    rePwd: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPwd: "",
      newPwd: "",
      rePwd: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { currentPwd, newPwd, rePwd } = values;
    if (newPwd !== rePwd)
      return form.setError("rePwd", {
        type: "manual",
        message: "两次密码输入不一致",
      });
    updatePasswordFn(
      { currentPwd, newPwd },
      {
        onSuccess: () => {
          form.reset();
          form.clearErrors();
          toast.success("密码更新成功~", {
            duration: 1000,
          });
        },
      }
    );
  };
  return (
    <Card>
      {/* <form onSubmit={handleSubmit}> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>账号设置</CardTitle>
            <CardDescription>管理你的账号信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 w-1/2">
            <FormField
              control={form.control}
              name="currentPwd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>当前密码</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPwd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>新密码</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rePwd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>确认密码</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">更新</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateUser } from "@/services/profile";
import { User } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface userInfo {
  user?: {
    gender: string;
    nickName: string;
    phone: string;
    position: string;
    description: string;
  };
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserInfoPage = ({ user, isEdit, setIsEdit }: userInfo) => {
  const { updateUserFn } = useUpdateUser();
  const queryClient = useQueryClient();
  const formSchema = z.object({
    nickName: z
      .string({ message: "用户名不能为空" })
      .min(2, { message: "用户名最少两个字符" })
      .max(15, { message: "用户名最大15个字符" }),
    gender: z.string(),
    phone: z.string(),
    position: z.string(),
    description: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickName: user?.nickName,
      gender: user?.gender.toString(),
      phone: user?.phone,
      position: user?.position || "",
      description: user?.description || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    updateUserFn(values as User, {
      onSuccess: () => {
        toast.success("修改个人资料成功～");
        queryClient.invalidateQueries({ queryKey: ["getMyInfo"] });
        setIsEdit(false);
      },
    });
  }

  return (
    <Card>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onReset={() => {
            setIsEdit(!isEdit);
          }}
        >
          <CardHeader>
            <CardTitle>个人信息</CardTitle>
            <CardDescription>
              {isEdit ? "更新你的个人信息" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nickName"
                disabled={!isEdit}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>用户名</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                disabled={!isEdit}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>性别</FormLabel>
                    <FormControl>
                      <RadioGroup
                        id="gender"
                        className=" flex"
                        orientation="horizontal"
                        disabled={!isEdit}
                        defaultValue={field.value}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="0" id="r1" />
                          <Label htmlFor="r1">男</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1" id="r2" />
                          <Label htmlFor="r2">女</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                disabled={true}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span>手机号</span>
                      {isEdit ? (
                        <span className=" ml-4 text-red-600">
                          *手机号不可修改
                        </span>
                      ) : null}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="position"
                disabled={!isEdit}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>职业</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              disabled={!isEdit}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>个人介绍</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="关于你自己..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isEdit ? (
              <div className="flex justify-end gap-2">
                <Button type="submit" className=" cursor-pointer">
                  保存
                </Button>
                <Button
                  variant="outline"
                  type="reset"
                  className=" cursor-pointer"
                >
                  取消
                </Button>
              </div>
            ) : null}
          </CardContent>
        </form>
      </Form>
    </Card>
  );
};

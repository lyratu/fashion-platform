import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useLogin } from "@/services/auth";
import { useRegister } from "@/services/auth";

import "./index.scss";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import WaveAnimation from "./components/svg";

const formSchema = z.object({
  phone: z.string().regex(/^(?:(?:\+|00)86)?1[3-9]\d{9}$/, {
    message: "请输入一个正确的手机号",
  }),
  password: z
    .string()
    .min(1, {
      message: "密码是必填项",
    })
    .min(6, {
      message: "密码不能少于6个字符",
    })
    .max(18, {
      message: "密码不能超过18个字符",
    })
    .regex(/^[A-Za-z0-9]+$/, { message: "密码只能是数字和字母组成" }),
  rePassword: z.string(),
  rememberMe: z.boolean().optional(),
});

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(false);
  const { login, logLoading } = useLogin();
  const { register, regLoading, data } = useRegister();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "15629122270",
      password: "123123123",
      rePassword: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isLogin) {
      if (values.rePassword !== values.password)
        form.setError("rePassword", {
          type: "manual",
          message: "两次密码输入不一致",
        });
      await register(values);
      if (data?.status == 200) {
        setIsLogin(true);
        form.reset();
        toast.success("注册成功，请登录~");
      }
    } else await login(values);
  }
  return (
    <div className="bg-[#ecf0f3] w-screen h-screen flex justify-center items-center">
      <WaveAnimation
        color="rgba(58, 83, 155, 0.6)"
        duration={25}
        blurAmount={1}
        waveCount={3}
      />
      <div className="loginCard">
        <div className={`flex-1 z-99 ${isLogin ? "toRight" : "recovery"}`}>
          <div className="px-12 tips">
            <div className="text-xl font-bold">
              {" "}
              {isLogin ? "你好朋友！" : "时尚穿搭交流平台"}
            </div>
            <div className="py-6 text-sm text-center text-gray-500">
              {isLogin
                ? "创建您的时尚账户，开始您的时尚之旅~"
                : "登录您的时尚账户，继续您的时尚之旅~"}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setIsLogin(!isLogin);
                  form.reset();
                }}
                type="submit"
                className="w-fit"
                disabled={logLoading || regLoading}
              >
                {isLogin ? "注册账号" : "登录账号"}
              </Button>
              <Button
                className="w-fit"
                variant="outline"
                onClick={() => navigate("/")}
              >
                返回首页
              </Button>
            </div>
          </div>
        </div>

        <div className={`flex-2 z-0 ${isLogin ? "toLeft" : "recovery"}`}>
          <div className="p-20">
            <div className="text-2xl  font-bold mb-6">
              {isLogin ? "登录" : "创建账号"}
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>手机号</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="请输入手机号"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>密码</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="请输入密码"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {isLogin ? (
                  ""
                ) : (
                  <FormField
                    control={form.control}
                    name="rePassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>确认密码</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="请再次输入密码"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {isLogin ? (
                  <div className="flex items-center justify-between">
                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            记住我
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                ) : (
                  ""
                )}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={logLoading || logLoading}
                >
                  {logLoading || logLoading ? "确认中..." : "确认"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

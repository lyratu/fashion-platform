import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Cascader, ConfigProvider } from "antd";
import { city } from "@/utils/pca-code";
import {
  getOneAddress,
  useAddAddress,
  useUpdateAddress,
} from "@/services/profile";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Option {
  code: string;
  name: string;
  children?: Option[];
}

interface options {
  addressId?: number;
  isAddingAddress: boolean;
  setIsAddingAddress: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditingAddress?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddressForm = ({
  addressId,
  isAddingAddress,
  setIsAddingAddress,
  setIsEditingAddress,
}: options) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addAddressFn } = useAddAddress();
  const { updateAddressFn } = useUpdateAddress();
  const queryClient = useQueryClient();
  const options: Option[] = city;
  const formSchema = z.object({
    contact: z
      .string({ message: "收货人不能为空" })
      .min(2, {
        message: "收货人姓名至少2个字符",
      })
      .max(8, {
        message: "收货人姓名最多8个字符",
      }),
    city: z.array(z.string(), { message: "地址不能为空" }),
    address: z.string({ message: "详细地址不能为空" }),
    phone: z
      .string({ message: "手机号不能为空" })
      .regex(/^(?:(?:\+|00)86)?1[3-9]\d{9}$/, { message: "手机号格式不正确" }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { contact: "", city: [], address: "", phone: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (isAddingAddress) {
      handleAddAddress(values);
    } else {
      handleEditAddress(values);
    }
  }

  useEffect(() => {
    if (addressId) {
      const getAddress = async (id: number) => {
        const { phone, contact, province, city, district, address } =
          await getOneAddress(id);
        form.setValue("phone", phone);
        form.reset({
          phone,
          contact,
          address,
          city: [province, city, district],
        });
      };
      getAddress(addressId);
    }
  }, [addressId, form]);

  const handleEditAddress = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    const { contact, phone, city, address } = values;
    const data = {
      id: addressId,
      contact,
      phone,
      address,
      province: city[0],
      city: city[1],
      district: city[2],
    };
    try {
      await updateAddressFn(data);
      setIsSubmitting(false);
      toast.success("修改地址成功！");
      if (setIsEditingAddress) setIsEditingAddress(false);
      queryClient.invalidateQueries({ queryKey: ["getMyAddress"] });
    } catch (e) {
      toast.error(e as string);
    }
  };
  const handleAddAddress = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    const { contact, phone, city, address } = values;
    const data = {
      contact,
      phone,
      address,
      province: city[0],
      city: city[1],
      district: city[2],
    };
    try {
      await addAddressFn(data);
      setIsSubmitting(false);
      toast.success("添加地址成功！");
      setIsAddingAddress(false);
      queryClient.invalidateQueries({ queryKey: ["getMyAddress"] });
    } catch (e) {
      toast.error(e as string);
    }
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle>
          {!isAddingAddress && setIsEditingAddress ? "编辑地址" : "添加新地址"}
        </DialogTitle>
        <DialogDescription>
          {!isAddingAddress && setIsEditingAddress
            ? "修改已添加的地址信息"
            : "为您的账号添加新的收货地址"}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 space-y-4">
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>收货人</FormLabel>
                <FormControl>
                  <Input placeholder="收货人姓名" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>手机号</FormLabel>
                <FormControl>
                  <Input placeholder="收货人手机号" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>地址选择</FormLabel>
                <FormControl>
                  <ConfigProvider
                    theme={{
                      components: {
                        Cascader: {
                          /* 这里是你的组件 token */
                          controlWidth: "100%",
                        },
                      },
                    }}
                  >
                    <Cascader
                      getPopupContainer={(triggerNode) =>
                        triggerNode.parentNode as HTMLElement
                      }
                      options={options}
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                      fieldNames={{ label: "name", value: "name" }}
                      placeholder="请选择..."
                    />
                  </ConfigProvider>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>详细地址</FormLabel>
                <FormControl>
                  <Input
                    placeholder="如街道、门牌号、小区、乡镇、村等"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsAddingAddress(false);
                if (setIsEditingAddress) setIsEditingAddress(false);
              }}
            >
              取消
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "保存中..." : "确认"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};

import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
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

interface options {
  isAddingAddress: boolean;
  setIsAddingAddress: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddressForm = ({
  isAddingAddress,
  setIsAddingAddress,
}: options) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    // setTimeout(() => {
    //   setIsSubmitting(false);
    //   setIsAddingAddress(false);
    //   // Add new address to the list (in a real app, this would come from the API)
    //   const newAddress = {
    //     id: addresses.length + 1,
    //     type: "home",
    //     isDefault: false,
    //     name: "Jessica Thompson",
    //     street: "789 New Street",
    //     apt: "",
    //     city: "Brooklyn",
    //     state: "NY",
    //     zip: "11201",
    //     country: "United States",
    //     phone: "+1 (555) 123-4567",
    //   };
    //   setAddresses([...addresses, newAddress]);
    //   toast({
    //     title: "Address added",
    //     description: "Your new address has been added successfully.",
    //   });
    // }, 1500);
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle>添加新地址</DialogTitle>
        <DialogDescription>为您的账号添加新的收货地址</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 space-y-4">
          <FormField
            control={form.control}
            name="username"
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
            name="username"
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
            name="username"
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
              onClick={() => setIsAddingAddress(false)}
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

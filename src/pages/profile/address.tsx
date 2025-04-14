import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
  useDelAddress,
  useGetMyAddress,
  useUpdateAddress,
} from "@/services/profile";
import { AddressForm } from "./components/addressForm";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useQueryClient } from "@tanstack/react-query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Close } from "@radix-ui/react-popover";

export default function AddressesPage() {
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<null | number>(null);
  const { updateAddressFn } = useUpdateAddress();
  const { delAddressFn } = useDelAddress();
  const queryClient = useQueryClient();
  const handleDeleteAddress = async (id: number) => {
    await delAddressFn(id);
    queryClient.invalidateQueries({ queryKey: ["getMyAddress"] });
  };

  const handleSetDefault = async (id: number) => {
    await updateAddressFn({ id, isDefault: true });
    queryClient.invalidateQueries({ queryKey: ["getMyAddress"] });
    toast.success("已设置为默认地址！");
  };

  const { data: addresses } = useGetMyAddress();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">收货地址</h1>
          <p className="text-muted-foreground">管理你的常用收货地址</p>
        </div>
        {/* 添加弹窗 */}
        <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
          <DialogTrigger asChild>
            <Button className=" cursor-pointer">
              <Plus className="h-4 w-4 mr-2" />
              添加新地址
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <AddressForm
              isAddingAddress={isAddingAddress}
              setIsAddingAddress={setIsAddingAddress}
              setIsEditingAddress={setIsEditingAddress}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses?.map((address) => (
          <Card key={address.id} className="relative">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                {address.isDefault ? <Badge>默认</Badge> : null}
                {/* 编辑弹窗 */}
                <Dialog
                  open={isEditingAddress}
                  onOpenChange={setIsEditingAddress}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-auto cursor-pointer"
                      onClick={() => setEditingAddress(address.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <AddressForm
                      addressId={editingAddress as number}
                      isAddingAddress={isAddingAddress}
                      setIsAddingAddress={setIsAddingAddress}
                      setIsEditingAddress={setIsEditingAddress}
                    />
                  </DialogContent>
                </Dialog>

                {address.isDefault ? null : (
                  <Popover>
                    <PopoverTrigger>
                      <Trash2 className="h-4 w-4 cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-fit space-y-2">
                      <div>确认删除此地址？</div>
                      <Button
                        size="sm"
                        className="h-8 px-2 cursor-pointer mr-4"
                        onClick={() => {
                          handleDeleteAddress(address.id);
                        }}
                      >
                        确认
                      </Button>
                      <Close className="text-sm cursor-pointer border px-2 py-1 rounded-md">
                        取消
                      </Close>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm">
                <p className="font-medium">{address.contact}</p>
                <p>{address.phone}</p>
                <p>
                  {address.province} · {address.city} · {address.district}
                </p>
                <p>{address.address}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
              {!address.isDefault ? (
                <Button
                  variant="outline"
                  size="sm"
                  className=" cursor-pointer"
                  onClick={() => handleSetDefault(address.id)}
                >
                  设为默认地址
                </Button>
              ) : (
                <div></div>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

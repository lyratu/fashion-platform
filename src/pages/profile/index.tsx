import type React from "react";

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Settings,
  ShoppingBag,
  Heart,
  LogOut,
  Edit,
  Trash2,
  Shirt,
  Bell,
  CreditCard,
  SquareRoundCorner,
  PackageOpen,
} from "lucide-react";
import { UserInfoPage } from "./userInfo";
import { OrderPage } from "./order";
import { CollectPage } from "./collect";
import { useGetMyGoodsCollect, useGetMyInfo } from "@/services/profile";
import { RecentOrder } from "./components/recent-order";
import { AccountSetPage } from "./accountSet";
import AddressesPage from "./address";
import { MyClothesPage } from "./myClothes";
import { AvatarUpload } from "./components/avatarUpload";
import { toast } from "sonner";
import { NotifyPage } from "./notify";
import { useQueryClient } from "@tanstack/react-query";
import { useDoCollect } from "@/services/mall";

export default function ProfilePage() {
  const router = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "overview";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const { data: wishlist } = useGetMyGoodsCollect();

  // api
  const { doCollectFn } = useDoCollect();

  const { data: user } = useGetMyInfo();
  const [isEdit, setIsEdit] = useState(false);

  const [userAvatar, setUserAvatar] = useState("");
  useEffect(() => {
    if (user) setUserAvatar(user?.avatarUrl);
    setSearchParams({ tab: activeTab });
  }, [user, activeTab, setSearchParams]);

  const editInfo = () => {
    setIsEdit(!isEdit);
    setActiveTab("overview");
  };

  const handleAvatarChange = async (newAvatarUrl: string) => {
    setUserAvatar(newAvatarUrl);
    toast("个人头像更新成功！");
  };
  const handleCancel = async (id: number) => {
    await doCollectFn(id);
    queryClient.invalidateQueries({ queryKey: ["getMyGoodsCollect"] });
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  {user ? (
                    <AvatarUpload
                      currentAvatar={userAvatar}
                      username={user?.nickName}
                      size="lg"
                      onAvatarChange={handleAvatarChange}
                    />
                  ) : null}
                </div>
                <h2 className="text-xl font-bold">{user?.nickName}</h2>
                {/* <p className="text-sm text-muted-foreground select-none mb-2">
                  @{user?.phone}
                </p> */}
                <p className="text-sm text-muted-foreground select-none mb-4">
                  职业：{user?.position}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full cursor-pointer"
                  onClick={editInfo}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  编辑资料
                </Button>
              </div>

              <Separator className="my-4" />
            </CardContent>
          </Card>

          <div className="hidden md:block">
            <nav className="space-y-1">
              <NavItem
                icon={<User className="h-4 w-4" />}
                label="预览"
                active={activeTab === "overview"}
                onClick={() => setActiveTab("overview")}
              />
              <NavItem
                icon={<ShoppingBag className="h-4 w-4" />}
                label="订单"
                active={activeTab === "orders"}
                onClick={() => setActiveTab("orders")}
              />
              <NavItem
                icon={<Heart className="h-4 w-4" />}
                label="收藏"
                active={activeTab === "wishlist"}
                onClick={() => setActiveTab("wishlist")}
              />
              {/* <NavItem
                icon={<Bell className="h-4 w-4" />}
                label="通知"
                active={activeTab === "notifications"}
                onClick={() => setActiveTab("notifications")}
              /> */}
              <NavItem
                icon={<CreditCard className="h-4 w-4" />}
                label="收货地址"
                active={activeTab === "address"}
                onClick={() => setActiveTab("address")}
              />
              <NavItem
                icon={<Shirt className="h-4 w-4" />}
                label="我的搭配"
                active={activeTab === "wardrobe"}
                onClick={() => setActiveTab("suit")}
              />
              <NavItem
                icon={<Settings className="h-4 w-4" />}
                label="账号设置"
                active={activeTab === "settings"}
                onClick={() => setActiveTab("settings")}
              />
              <NavItem
                icon={<LogOut className="h-4 w-4" />}
                label="退出登录"
                onClick={() => {
                  localStorage.removeItem("token");
                  queryClient.clear();
                  router("/auth");
                }}
              />
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="md:hidden mb-6"
          >
            <TabsList className="grid grid-cols-3 h-auto">
              <TabsTrigger value="overview">个人信息</TabsTrigger>
              <TabsTrigger value="orders">订单</TabsTrigger>
              <TabsTrigger value="wishlist">收藏</TabsTrigger>
            </TabsList>
          </Tabs>
          {/* 预览 Tab */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsContent value="overview" className="mt-0 space-y-6">
              {user && (
                <UserInfoPage
                  user={user}
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                />
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 最近订单 */}
                <RecentOrder setActiveTab={setActiveTab} />
                {/* 商品收藏 */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle>商品收藏</CardTitle>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-sm"
                        onClick={() => setActiveTab("wishlist")}
                      >
                        查看全部
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {wishlist?.map((item) => (
                        <div key={item.id} className="relative group">
                          <div className="relative h-32 w-full overflow-hidden rounded-md border">
                            <img
                              src={item.goods.mainImage || "/placeholder.svg"}
                              alt={item.goods.title}
                              className="object-cover object-top"
                            />
                            {/* {!item.inStock && (
                              <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                                <span className="text-xs font-medium text-muted-foreground">
                                  缺货
                                </span>
                              </div>
                            )} */}
                          </div>
                          <div className="mt-1">
                            <p className="text-sm font-medium truncate">
                              {item.goods.title}
                            </p>
                            <p className="text-sm text-muted-foreground select-none">
                              ￥{item.goods.price}
                            </p>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/60 rounded-md">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="mr-1"
                              onClick={() =>
                                router(`/mall/product/${item.goodsId}`)
                              }
                            >
                              <ShoppingBag className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleCancel(item.goodsId)}
                            >
                              <Trash2 className="h-4 w-4 text-white" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    {(wishlist && wishlist.length > 0) || (
                      <div className=" flex flex-col items-center">
                        <div className="mb-4 p-4">
                          <PackageOpen className="h-16 w-16 mx-auto text-muted-foreground opacity-40 opacity-40" />
                        </div>
                        <h2 className="text-xl font-medium mb-2">
                          暂无商品收藏
                        </h2>
                        <p className="text-muted-foreground mb-6">
                          看起来您还没有收藏任何商品。
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* 订单 Tab */}
            <TabsContent value="orders" className="mt-0">
              <OrderPage />
            </TabsContent>
            {/* 收藏 Tab */}
            <TabsContent value="wishlist" className="mt-0">
              <CollectPage />
            </TabsContent>
            {/* 通知 Tab */}
            <TabsContent value="notifications" className="mt-0">
              <NotifyPage />
            </TabsContent>

            {/* 收获地址 Tab */}
            <TabsContent value="address" className="mt-0">
              <AddressesPage />
            </TabsContent>
            {/* 我的搭配 Tab */}
            <TabsContent value="suit" className="mt-0">
              <MyClothesPage />
            </TabsContent>

            {/* 设置 Tab */}
            <TabsContent value="settings" className="mt-0 space-y-6">
              <AccountSetPage />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

// Navigation Item Component
function NavItem({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={` cursor-pointer flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted"
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

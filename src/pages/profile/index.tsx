import type React from "react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Settings,
  ShoppingBag,
  Heart,
  Clock,
  LogOut,
  Edit,
  Camera,
  Trash2,
  Package,
  Shirt,
  Bell,
  CreditCard,
  MessageCircle,
} from "lucide-react";
import { UserInfoPage } from "./userInfo";
import { OrderPage } from "./order";
import { CollectPage } from "./collect";
import { useGetMyInfo } from "@/services/profile";
import { RecentOrder } from "./components/recent-order";
import { AccountSetPage } from "./accountSet";
import AddressesPage from "./address";
import { AvatarUpload } from "./components/avatarUpload";
import { toast } from "sonner";
import { NotifyPage } from "./notify";
import { useQueryClient } from "@tanstack/react-query";

export default function ProfilePage() {
  const router = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock recently viewed items
  const recentlyViewed = [
    {
      id: 9,
      name: "Silk Blouse",
      price: 89.99,
      image: "/placeholder.svg?height=120&width=100",
    },
    {
      id: 10,
      name: "Leather Belt",
      price: 49.99,
      image: "/placeholder.svg?height=120&width=100",
    },
    {
      id: 11,
      name: "Pleated Skirt",
      price: 69.99,
      image: "/placeholder.svg?height=120&width=100",
    },
  ];
  // Mock wishlist data
  const wishlist = [
    {
      id: 4,
      name: "Leather Crossbody Bag",
      price: 129.99,
      image: "/placeholder.svg?height=120&width=100",
      inStock: true,
    },
    {
      id: 6,
      name: "Chunky Ankle Boots",
      price: 119.99,
      image: "/placeholder.svg?height=120&width=100",
      inStock: true,
    },
    {
      id: 7,
      name: "Gold Hoop Earrings",
      price: 39.99,
      image: "/placeholder.svg?height=120&width=100",
      inStock: false,
    },
    {
      id: 8,
      name: "Cashmere Sweater",
      price: 149.99,
      image: "/placeholder.svg?height=120&width=100",
      inStock: true,
    },
  ];

  // Mock activity data
  const activities = [
    {
      id: 1,
      type: "post",
      content: "Shared a new outfit in the community",
      date: "2 days ago",
      link: "/community/post/123",
    },
    {
      id: 2,
      type: "like",
      content: "Liked @marcstyle's outfit post",
      date: "3 days ago",
      link: "/community/post/456",
    },
    {
      id: 3,
      type: "comment",
      content: "Commented on a discussion about sustainable fashion",
      date: "5 days ago",
      link: "/community/post/789",
    },
    {
      id: 4,
      type: "wardrobe",
      content: "Added 3 new items to your virtual wardrobe",
      date: "1 week ago",
      link: "/wardrobe",
    },
  ];
  const { data: user } = useGetMyInfo();
  const [isEdit, setIsEdit] = useState(false);

  const [userAvatar, setUserAvatar] = useState(
    "/placeholder.svg?height=200&width=200"
  );

  const editInfo = () => {
    setIsEdit(!isEdit);
  };

  const handleAvatarChange = (newAvatarUrl: string) => {
    console.log('[ newAvatarUrl ] >', newAvatarUrl)
    setUserAvatar(newAvatarUrl);
    // In a real app, you would make an API call to update the user's avatar in the database
    toast("Your profile picture has been updated successfully.");
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
                      currentAvatar={user?.avatarUrl}
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

              {/* <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="font-bold">{user.posts}</p>
                  <p className="text-xs text-muted-foreground">文章</p>
                </div>
                <div>
                  <p className="font-bold">{user.followers}</p>
                  <p className="text-xs text-muted-foreground">收藏</p>
                </div>
                <div>
                  <p className="font-bold">{user.following}</p>
                  <p className="text-xs text-muted-foreground">购买</p>
                </div>
              </div> */}
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

              <NavItem
                icon={<Bell className="h-4 w-4" />}
                label="通知"
                active={activeTab === "notifications"}
                onClick={() => setActiveTab("notifications")}
              />
              <NavItem
                icon={<CreditCard className="h-4 w-4" />}
                label="收货地址"
                active={activeTab === "address"}
                onClick={() => setActiveTab("address")}
              />
              <NavItem
                icon={<Shirt className="h-4 w-4" />}
                label="我的衣柜"
                active={activeTab === "wardrobe"}
                onClick={() => router("/wardrobe")}
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
                      {wishlist.slice(0, 4).map((item) => (
                        <div key={item.id} className="relative group">
                          <div className="relative h-32 w-full overflow-hidden rounded-md border">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="object-cover object-top"
                            />
                            {!item.inStock && (
                              <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                                <span className="text-xs font-medium text-muted-foreground">
                                  缺货
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="mt-1">
                            <p className="text-sm font-medium truncate">
                              {item.name}
                            </p>
                            <p className="text-sm text-muted-foreground select-none">
                              ${item.price}
                            </p>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/60 rounded-md">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="mr-1"
                            >
                              <ShoppingBag className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
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

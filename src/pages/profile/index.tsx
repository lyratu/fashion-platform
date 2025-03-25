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
  Star,
  Shirt,
  Bell,
  CreditCard,
  Plus,
  MessageCircle,
} from "lucide-react";

export default function ProfilePage() {
  const router = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock user data
  const user = {
    name: "用户信息",
    username: "@jesstylist",
    email: "jessica@example.com",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Fashion enthusiast and style blogger. Love discovering new trends and sharing outfit ideas.",
    location: "湖北-武汉",
    joined: "March 2023",
    followers: 245,
    following: 182,
    posts: 37,
  };

  // Mock orders data
  const orders = [
    {
      id: "ORD-12345",
      date: "May 15, 2025",
      total: 129.98,
      status: "Delivered",
      items: [
        {
          id: 1,
          name: "Oversized Cotton Shirt",
          price: 49.99,
          image: "/placeholder.svg?height=80&width=60",
          quantity: 1,
          color: "White",
          size: "M",
        },
        {
          id: 2,
          name: "High-Waisted Jeans",
          price: 79.99,
          image: "/placeholder.svg?height=80&width=60",
          quantity: 1,
          color: "Blue",
          size: "28",
        },
      ],
    },
    {
      id: "ORD-12346",
      date: "April 28, 2025",
      total: 199.99,
      status: "Delivered",
      items: [
        {
          id: 5,
          name: "Wool Blend Coat",
          price: 199.99,
          image: "/placeholder.svg?height=80&width=60",
          quantity: 1,
          color: "Camel",
          size: "M",
        },
      ],
    },
    {
      id: "ORD-12347",
      date: "May 20, 2025",
      total: 89.99,
      status: "Processing",
      items: [
        {
          id: 3,
          name: "Floral Midi Dress",
          price: 89.99,
          image: "/placeholder.svg?height=80&width=60",
          quantity: 1,
          color: "Multicolor",
          size: "S",
        },
      ],
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                  >
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">改变头像</span>
                  </Button>
                </div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-sm text-muted-foreground mb-2">
                  {user.username}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {user.location}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Edit className="h-4 w-4 mr-2" />
                  编辑资料
                </Button>
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-3 gap-4 text-center">
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
              </div>
            </CardContent>
          </Card>

          <div className="hidden md:block">
            <nav className="space-y-1">
              <NavItem
                icon={<User className="h-4 w-4" />}
                label="个人信息"
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
                label="商品收藏"
                active={activeTab === "wishlist"}
                onClick={() => setActiveTab("wishlist")}
              />
              <NavItem
                icon={<Clock className="h-4 w-4" />}
                label="最近浏览"
                active={activeTab === "recently-viewed"}
                onClick={() => setActiveTab("recently-viewed")}
              />
              <NavItem
                icon={<Shirt className="h-4 w-4" />}
                label="我的衣柜"
                active={activeTab === "wardrobe"}
                onClick={() => router("/wardrobe")}
              />
              <NavItem
                icon={<Bell className="h-4 w-4" />}
                label="通知"
                active={activeTab === "notifications"}
                onClick={() => setActiveTab("notifications")}
              />
              <NavItem
                icon={<CreditCard className="h-4 w-4" />}
                label="支付方式"
                active={activeTab === "payment"}
                onClick={() => setActiveTab("payment")}
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

          {/* Overview Tab */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="md:hidden mb-6"
          >
            <TabsContent value="overview" className="mt-0 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>个人信息</CardTitle>
                  <CardDescription>更新你的个人信息</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">用户名</Label>
                      <Input id="username" defaultValue={user.username} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">手机号</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user.email}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">位置</Label>
                      <Input id="location" defaultValue={user.location} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">生日</Label>
                    <textarea
                      id="bio"
                      className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                      defaultValue={user.bio}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>保存</Button>
                </CardFooter>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle>最近订单</CardTitle>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-sm"
                        onClick={() => setActiveTab("orders")}
                      >
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-4">
                      {orders.slice(0, 2).map((order) => (
                        <div
                          key={order.id}
                          className="flex justify-between items-center"
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 overflow-hidden rounded-md border">
                              <img
                                src={order.items[0].image || "/placeholder.svg"}
                                alt={order.items[0].name}
                                className="object-cover"
                              />
                              {order.items.length > 1 && (
                                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                                  <span className="text-xs font-medium">
                                    +{order.items.length}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{order.id}</p>
                              <p className="text-xs text-muted-foreground">
                                {order.date}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              ${order.total.toFixed(2)}
                            </p>
                            <Badge
                              variant={
                                order.status === "Delivered"
                                  ? "outline"
                                  : "default"
                              }
                              className="text-xs"
                            >
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Wishlist Preview */}
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
                              className="object-cover"
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
                            <p className="text-sm text-muted-foreground">
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

                {/* Recent Activity */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>最近活动</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-3"
                        >
                          <div className="mt-0.5">
                            <ActivityIcon type={activity.type} />
                          </div>
                          <div>
                            <p className="text-sm">{activity.content}</p>
                            <p className="text-xs text-muted-foreground">
                              {activity.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Style Stats */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>衣橱收藏</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <p className="text-sm">衣橱项目</p>
                          <p className="text-sm font-medium">24</p>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: "60%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <p className="text-sm">文章创建</p>
                          <p className="text-sm font-medium">12</p>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: "30%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <p className="text-sm">风格分享</p>
                          <p className="text-sm font-medium">450</p>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: "45%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <p className="text-sm">社区参与</p>
                          <p className="text-sm font-medium">75%</p>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: "75%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Orders Tab */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="md:hidden mb-6"
          >
            <TabsContent value="orders" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>订单历史</CardTitle>
                  <CardDescription>查看和跟踪您的订单</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border rounded-lg overflow-hidden"
                      >
                        <div className="bg-muted p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">订单 {order.id}</h3>
                              <Badge
                                variant={
                                  order.status === "Delivered"
                                    ? "outline"
                                    : "default"
                                }
                              >
                                {order.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {order.date}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              跟踪订单
                            </Button>
                            <Button variant="outline" size="sm">
                              查看详情
                            </Button>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="space-y-4">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex gap-4">
                                <div className="relative h-20 w-16 flex-shrink-0">
                                  <img
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    className="object-cover rounded-md"
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between">
                                    <h4 className="font-medium">{item.name}</h4>
                                    <p className="font-medium">
                                      ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    <p>
                                      尺码: {item.size} | 颜色: {item.color}
                                    </p>
                                    <p>质量: {item.quantity}</p>
                                  </div>
                                  <div className="flex gap-2 mt-2">
                                    <Button
                                      variant="link"
                                      size="sm"
                                      className="h-auto p-0 text-sm"
                                    >
                                      再次购买
                                    </Button>
                                    <Separator
                                      orientation="vertical"
                                      className="h-4 my-auto"
                                    />
                                    <Button
                                      variant="link"
                                      size="sm"
                                      className="h-auto p-0 text-sm"
                                    >
                                      写评论
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <Separator className="my-4" />
                          <div className="flex justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                总数
                              </p>
                              <p className="font-medium">
                                ${order.total.toFixed(2)}
                              </p>
                            </div>
                            {order.status === "Delivered" && (
                              <Button variant="outline" size="sm">
                                <Package className="h-4 w-4 mr-2" />
                                退回商品
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Wishlist Tab */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="md:hidden mb-6"
          >
            <TabsContent value="wishlist" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>我的收藏</CardTitle>
                  <CardDescription>保存的物品</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {wishlist.map((item) => (
                      <div key={item.id} className="relative group">
                        <div className="relative h-48 w-full overflow-hidden rounded-md border">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="object-cover"
                          />
                          {!item.inStock && (
                            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                              <span className="text-sm font-medium text-muted-foreground">
                                缺货
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="mt-2">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-muted-foreground">${item.price}</p>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/60 rounded-md">
                          <Button disabled={!item.inStock} className="mr-2">
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            添加购物车
                          </Button>
                          <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Recently Viewed Tab */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="md:hidden mb-6"
          >
            <TabsContent value="recently-viewed" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>最近浏览</CardTitle>
                  <CardDescription>你最近浏览的商品</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {recentlyViewed.map((item) => (
                      <Link key={item.id} to={`/mall/product/${item.id}`}>
                        <div className="group">
                          <div className="relative h-48 w-full overflow-hidden rounded-md border">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="mt-2">
                            <h3 className="font-medium group-hover:text-primary transition-colors">
                              {item.name}
                            </h3>
                            <p className="text-muted-foreground">
                              ${item.price}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Settings Tab */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="md:hidden mb-6"
          >
            <TabsContent value="settings" className="mt-0 space-y-6">
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

              {/* <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Control what notifications you receive
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <NotificationSetting
                      title="Order Updates"
                      description="Receive notifications about your orders"
                      defaultChecked={true}
                    />
                    <NotificationSetting
                      title="New Arrivals"
                      description="Be notified when new products arrive"
                      defaultChecked={true}
                    />
                    <NotificationSetting
                      title="Sales & Promotions"
                      description="Receive notifications about sales and special offers"
                      defaultChecked={true}
                    />
                    <NotificationSetting
                      title="Community Activity"
                      description="Be notified about likes, comments, and follows"
                      defaultChecked={true}
                    />
                    <NotificationSetting
                      title="Style Recommendations"
                      description="Receive personalized style suggestions"
                      defaultChecked={false}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card> */}

              {/* <Card>
                <CardHeader>
                  <CardTitle>Delete Account</CardTitle>
                  <CardDescription>
                    Permanently delete your account and all data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    This action cannot be undone. Once you delete your account,
                    all your data will be permanently removed.
                  </p>
                  <Button variant="destructive">Delete Account</Button>
                </CardContent>
              </Card> */}
            </TabsContent>
          </Tabs>

          {/* Payment Methods Tab */}
          {/* <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="md:hidden mb-6"
          >
            <TabsContent value="payment" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>
                    Manage your saved payment methods
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-14 bg-muted rounded-md flex items-center justify-center">
                          <CreditCardIcon className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-xs text-muted-foreground">
                            Expires 12/25
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge>Default</Badge>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-14 bg-muted rounded-md flex items-center justify-center">
                          <CreditCardIcon className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-medium">
                            Mastercard ending in 8888
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Expires 09/26
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Set as Default
                        </Button>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs> */}

          {/* Notifications Tab */}
          {/* <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="md:hidden mb-6"
          >
            <TabsContent value="notifications" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Your recent notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <NotificationItem
                      icon={<Package className="h-5 w-5" />}
                      title="Your order has been delivered"
                      description="Order #ORD-12345 was delivered successfully."
                      time="2 hours ago"
                      read={false}
                    />
                    <NotificationItem
                      icon={<Heart className="h-5 w-5" />}
                      title="@marcstyle liked your outfit"
                      description="Your 'Summer Casual' outfit received a like."
                      time="Yesterday"
                      read={false}
                    />
                    <NotificationItem
                      icon={<Star className="h-5 w-5" />}
                      title="New items from your favorite brands"
                      description="Check out the latest arrivals from brands you follow."
                      time="2 days ago"
                      read={true}
                    />
                    <NotificationItem
                      icon={<ShoppingBag className="h-5 w-5" />}
                      title="Sale alert: 30% off summer collection"
                      description="Limited time offer on seasonal items."
                      time="3 days ago"
                      read={true}
                    />
                    <NotificationItem
                      icon={<User className="h-5 w-5" />}
                      title="New follower"
                      description="Sophia L. started following you."
                      time="1 week ago"
                      read={true}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Mark All as Read
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs> */}
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
      className={`flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md transition-colors ${
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

// Activity Icon Component
function ActivityIcon({ type }: { type: string }) {
  switch (type) {
    case "post":
      return (
        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
          <Edit className="h-3 w-3 text-primary" />
        </div>
      );
    case "like":
      return (
        <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center">
          <Heart className="h-3 w-3 text-red-500" />
        </div>
      );
    case "comment":
      return (
        <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
          <MessageCircle className="h-3 w-3 text-blue-500" />
        </div>
      );
    case "wardrobe":
      return (
        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
          <Shirt className="h-3 w-3 text-green-500" />
        </div>
      );
    default:
      return (
        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
          <Bell className="h-3 w-3" />
        </div>
      );
  }
}

// Notification Setting Component
function NotificationSetting({
  title,
  description,
  defaultChecked,
}: {
  title: string;
  description: string;
  defaultChecked: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center h-6">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          defaultChecked={defaultChecked}
        />
      </div>
    </div>
  );
}

// Notification Item Component
function NotificationItem({
  icon,
  title,
  description,
  time,
  read,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  read: boolean;
}) {
  return (
    <div className={`flex gap-4 p-3 rounded-lg ${read ? "" : "bg-muted"}`}>
      <div className="mt-1">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className={`font-medium ${read ? "" : "font-semibold"}`}>
            {title}
          </h4>
          <p className="text-xs text-muted-foreground">{time}</p>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      {!read && (
        <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
      )}
    </div>
  );
}

// Credit Card Icon Component
function CreditCardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

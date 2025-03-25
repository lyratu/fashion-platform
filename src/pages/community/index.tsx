import type React from "react";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Share2, Send } from "lucide-react";

export default function CommunityPage() {
  const [newPostContent, setNewPostContent] = useState("");

  const categories = [
    "全部",
    "热门",
    "穿搭建议",
    "穿搭展示",
    "购物发现",
    "时尚新闻",
  ];

  const posts = [
    {
      id: 1,
      user: {
        name: "Jessica T.",
        username: "@jesstylist",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content:
        "Just found the perfect jeans after months of searching! Check out this brand if you're petite like me. They actually fit without needing alterations!",
      image: "/placeholder.svg?height=500&width=500",
      likes: 42,
      comments: 8,
      time: "2 hours ago",
      category: "Shopping Finds",
    },
    {
      id: 2,
      user: {
        name: "Marcus W.",
        username: "@marcstyle",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content:
        "What's everyone's thoughts on oversized blazers this season? Too much or just right? I've been seeing them everywhere but not sure if they're worth investing in.",
      image: null,
      likes: 37,
      comments: 15,
      time: "5 hours ago",
      category: "Style Advice",
    },
    {
      id: 3,
      user: {
        name: "Sophia L.",
        username: "@sophialooks",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content:
        "Just posted my spring capsule wardrobe in the wardrobe section. Would love your feedback! I'm trying to be more intentional with my purchases this year.",
      image: "/placeholder.svg?height=500&width=500",
      likes: 64,
      comments: 11,
      time: "8 hours ago",
      category: "Outfit Showcase",
    },
    {
      id: 4,
      user: {
        name: "Fashion Weekly",
        username: "@fashionweekly",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content:
        "Breaking: Major designer announces collaboration with sustainable materials lab to create biodegradable sequins. This could be a game-changer for eco-friendly eveningwear!",
      image: "/placeholder.svg?height=500&width=500",
      likes: 128,
      comments: 23,
      time: "1 day ago",
      category: "Fashion News",
    },
    {
      id: 5,
      user: {
        name: "Alex K.",
        username: "@alexkstyle",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content:
        "Today's outfit for the office. I've been experimenting with mixing patterns lately. What do you think?",
      image: "/placeholder.svg?height=500&width=500",
      likes: 89,
      comments: 17,
      time: "1 day ago",
      category: "Outfit Showcase",
    },
  ];

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send the post to your backend
    console.log("New post:", newPostContent);
    setNewPostContent("");
    // Then add the new post to the posts array
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main content */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">社区</h1>

          {/* New post form */}
          <Card className="mb-8">
            <CardHeader className="pb-3">
              <h2 className="text-lg font-medium">分享你的想法</h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePostSubmit}>
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="Your avatar"
                    />
                    <AvatarFallback>YA</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="您今天对时尚有什么想法？"
                      className="mb-3"
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <Button type="submit" disabled={!newPostContent.trim()}>
                        <Send className="h-4 w-4 mr-2" />
                        发表
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Posts tabs */}
          <Tabs defaultValue="All">
            <TabsList className="mb-6 flex flex-wrap h-auto">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="mb-1">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent
                key={category}
                value={category}
                className="mt-0 space-y-6"
              >
                {posts
                  .filter(
                    (post) => category === "All" || post.category === category
                  )
                  .map((post) => (
                    <Card key={post.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage
                              src={post.user.avatar}
                              alt={post.user.name}
                            />
                            <AvatarFallback>
                              {post.user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h4 className="font-medium">
                                  {post.user.name}
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  {post.user.username}
                                </p>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {post.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <p className="mb-4">{post.content}</p>
                        {post.image && (
                          <div className="relative h-80 w-full rounded-md overflow-hidden mb-4">
                            <img
                              src={post.image || "/placeholder.svg"}
                              alt="Post image"
                              className="object-cover"
                            />
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="border-t pt-3 flex justify-between">
                        <Button variant="ghost" size="sm">
                          <Heart className="h-4 w-4 mr-1" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-80 space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium">流行主题</h2>
            </CardHeader>
            <CardContent className="pb-3">
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-primary hover:underline">
                    #可持续时尚
                  </Link>
                  <p className="text-xs text-muted-foreground">1.2k 篇</p>
                </li>
                <li>
                  <Link to="#" className="text-primary hover:underline">
                    #春季穿搭
                  </Link>
                  <p className="text-xs text-muted-foreground">856 篇</p>
                </li>
                <li>
                  <Link to="#" className="text-primary hover:underline">
                    #简洁风
                  </Link>
                  <p className="text-xs text-muted-foreground">723 篇</p>
                </li>
                <li>
                  <Link to="#" className="text-primary hover:underline">
                    #田园风
                  </Link>
                  <p className="text-xs text-muted-foreground">689 篇</p>
                </li>
                <li>
                  <Link to="#" className="text-primary hover:underline">
                    #搭配指南
                  </Link>
                  <p className="text-xs text-muted-foreground">542 篇</p>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium">活跃用户</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="Jessica T."
                    />
                    <AvatarFallback>JT</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">皇上</p>
                    <p className="text-xs text-muted-foreground">@jesstylist</p>
                  </div>
                  {/* <Button variant="outline" size="sm" className="ml-auto">
                    关注
                  </Button> */}
                </div>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="Marcus W."
                    />
                    <AvatarFallback>MW</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">壬氏</p>
                    <p className="text-xs text-muted-foreground">@marcstyle</p>
                  </div>
                  {/* <Button variant="outline" size="sm" className="ml-auto">
                    Follow
                  </Button> */}
                </div>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="Sophia L."
                    />
                    <AvatarFallback>SL</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">猫猫</p>
                    <p className="text-xs text-muted-foreground">
                      @sophialooks
                    </p>
                  </div>
                  {/* <Button variant="outline" size="sm" className="ml-auto">
                    Follow
                  </Button> */}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium">社区指南</h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>尊重和支持他人</li>
                <li>没有垃圾邮件或自我宣传</li>
                <li>信用原始内容创作者</li>
                <li>继续讨论与时尚相关的</li>
                <li>报告不适当的内容</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

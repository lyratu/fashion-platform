import { useLocation, useNavigate } from "react-router";
import { Venus, Mars, ArrowLeft, Loader } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger, TabsContent, Tabs } from "@/components/ui/tabs";
import { useGetOtherInfo } from "@/services/profile";
import { useGetUserPost, useLikeCount } from "@/services/community";
import { useRef } from "react";
import UseScrollToBottom from "@/hooks/use-scroll";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dateTool from "@/utils/dateTool";
import { Separator } from "@/components/ui/separator";

export default function OtherProfile() {
  const location = useLocation();
  const { userId } = location.state;
  const navigate = useNavigate();
  const { data } = useGetOtherInfo(userId);
  const { data: likeCount } = useLikeCount(userId);
  const {
    data: posts,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetUserPost({
    order: "createTime",
    page: 1,
    size: 6,
    sort: "desc",
    id: userId,
  });
  const loadRef = useRef(null);
  /* 触底刷新list */
  UseScrollToBottom(loadRef, () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  });

  return (
    data && (
      <div className="container mx-auto relative px-4 py-8">
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="mb-4 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回
          </Button>
        </div>
        <div className=" flex justify-center">
          <Avatar className="rounded-full border w-35 h-35 object-cover object-center">
            <AvatarImage
              src={data.avatarUrl}
              alt={data.nickName}
              className=" object-contain"
            />
            <AvatarFallback>{data.nickName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col ml-12 space-y-1.5">
            <div className=" text-2xl font-semibold flex items-center space-x-1">
              <span>{data.nickName}</span>
              {data.gender ? (
                <Venus className=" text-red-300" />
              ) : (
                <Mars className=" text-blue-300" />
              )}
            </div>

            <div className="max-w-80">{data.description || "还没有简介"}</div>

            <div>
              {data.position ? (
                <Badge variant="secondary">{data.position}</Badge>
              ) : null}
            </div>
            {likeCount ? (
              <div>
                <span>{likeCount.count}</span>
                <span className="text-muted-foreground"> 获赞</span>
              </div>
            ) : null}
          </div>
        </div>
        <Tabs defaultValue="account" className="w-full mt-10">
          <TabsList className="flex justify-center w-full bg-red">
            <TabsTrigger value="account" className=" cursor-pointer">
              发布
            </TabsTrigger>
            {/* <TabsTrigger value="password" className=" cursor-pointer">
              收藏
            </TabsTrigger> */}
          </TabsList>
          <TabsContent value="account">
            <div className=" grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
              {posts?.pages.map((page) =>
                page.list.map((item) => (
                  <div
                    key={item.id}
                    className=" border rounded-sm p-2 cursor-pointer"
                    onClick={() => navigate(`/community/post/${item.id}`)}
                  >
                    {item.images.length > 0 ? (
                      <img loading="lazy" 
                        src={item.images[0]}
                        className="border rounded w-full aspect-square object-cover"
                      />
                    ) : null}
                    <div className={` py-2 `}>
                      <span className=" line-clamp-2 overflow-hidden text-ellipsis">
                        {item.content}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex flex-wrap mt-2 text-muted-foreground">
                      <div>{data.nickName}</div>
                      <div className=" ml-auto">
                        {dateTool.formattedDate(item.createTime as string)}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={loadRef}>
                {isFetchingNextPage ? (
                  <div className="flex items-center justify-center text-sm">
                    <Loader className="animate-spin" />
                    <span>加载中...</span>
                  </div>
                ) : !hasNextPage ? (
                  <div className="text-center text-gray-500"></div>
                ) : null}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    )
  );
}

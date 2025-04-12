import { Link, useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { ArrowLeft, Heart, Share2, MoreHorizontal, Trash2 } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useGetPostDet, useLikeOrUnlike } from "@/services/community";
import { CommentSection } from "./components/comment-section";
import { queryClient } from "@/lib/query-client";

export default function PostDetailPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { data: post } = useGetPostDet(params.id as string);

  // const formatDate = (dateString: string) => {
  //   return new Date(dateString).toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "short",
  //     day: "numeric",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   });
  // };

  /* 文章点赞 */
  const { likeOrUnlikeFn } = useLikeOrUnlike();
  const handlePostLike = (postId: number) => {
    likeOrUnlikeFn(postId, {
      onSuccess: (res) => {
        if (post) {
          post.likeCount = res.likeCount;
          post.likeStatus = res.likeStatus;
          queryClient.invalidateQueries({ queryKey: ["postPage"] });
          queryClient.invalidateQueries({ queryKey: ["postDet"] });
        }
      },
    });
  };
  /* 文章分享 */
  const handleSharePost = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("已复制分享链接，请分享给好友吧~", {
      duration: 1500,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div>
        <Button
          variant="ghost"
          size="sm"
          className="mb-4 cursor-pointer"
          onClick={() => navigate("/community")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回社区
        </Button>
      </div>

      {post && (
        <>
          {/* 主要内容 */}
          <Card className="mb-8">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <Link to={`/profile/${post.user?.nickName}`}>
                  <Avatar className="h-10 w-10 cursor-pointer">
                    <AvatarImage
                      src={post.user?.avatarUrl}
                      alt={post.user?.nickName}
                    />
                    <AvatarFallback>
                      {post.user?.nickName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <Link
                        to={`/profile/${post.user?.nickName}`}
                        className="hover:underline"
                      >
                        <h4 className="font-medium">{post.user?.nickName}</h4>
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {post.user?.nickName}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {post.createTime}
                      </span>
                      {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 cursor-pointer"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">更多选项</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className=" cursor-pointer"
                            onClick={() => {}}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            删除文章
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu> */}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <p className="mb-4 whitespace-pre-line">{post.content}</p>
              {post.topics && post.topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.topics.map((topic, index) => (
                    <Link
                      key={index}
                      to={`/community/tag/${topic.name.replace("#", "")}`}
                      className="text-[#1d9bf0] text-sm hover:underline mr-2"
                    >
                      #{topic.name}
                    </Link>
                  ))}
                </div>
              )}
              {post.images &&
                post.images.map((url) => (
                  <div className="relative w-full rounded-md overflow-hidden mb-4">
                    <img
                      src={url || "/placeholder.svg"}
                      alt="Post image"
                      className="object-cover"
                    />
                  </div>
                ))}
            </CardContent>
            <CardFooter className="border-t flex justify-end pb-0 py-2">
              <Button
                variant="ghost"
                size="sm"
                className="cursor-pointer"
                onClick={() => {
                  handlePostLike(post.id as number);
                }}
              >
                <Heart
                  className={`h-4 w-4 mr-1  ${
                    post?.likeStatus ? "fill-chart-1 text-chart-1" : ""
                  }`}
                />
                {post.likeCount}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="cursor-pointer"
                onClick={handleSharePost}
              >
                <Share2 className="h-4 w-4 mr-1" />
                分享
              </Button>
            </CardFooter>
          </Card>

          {/* 评论列表 */}
          <CommentSection />
        </>
      )}
    </div>
  );
}

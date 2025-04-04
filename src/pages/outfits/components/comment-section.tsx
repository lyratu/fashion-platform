import type React from "react";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader, ThumbsUp } from "lucide-react";
import { useParams } from "react-router";
import { useGetPageComment, useSend } from "@/services/comment";
import { useQueryClient } from "@tanstack/react-query";
import UseScrollToBottom from "@/hooks/use-scroll";
import { comment } from "@/types/comment";
export function CommentSection() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const { data, fetchNextPage, isFetchingNextPage } = useGetPageComment(
    id as string,
    5
  );

  const [reply, setReply] = useState({
    status: false,
    id: -1,
    content: "",
    nickName: "",
  });
  const { sendFn } = useSend();

  const [commentText, setCommentText] = useState("");
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>(
    {}
  );

  const handleLike = (commentId: number) => {
    setLikedComments((prev) => {
      const wasLiked = prev[commentId];
      return { ...prev, [commentId]: !wasLiked };
    });

    // setDisplayedComments((prev) =>
    //   prev.map((comment) =>
    //     comment.id === commentId
    //       ? {
    //           ...comment,
    //           likeCount: likedComments[commentId]
    //             ? comment.likeCount - 1
    //             : comment.likeCount + 1,
    //         }
    //       : comment
    //   )
    // );
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    sendFn(
      { objectId: parseInt(id as string), content: commentText },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [`commentPage${id}`] });
          setCommentText("");
        },
      }
    );
  };

  // 触底加载评论
  UseScrollToBottom(() => {
    fetchNextPage();
    // if (data?.list.length === data?.total) return;
    // setPage((prev) => prev + 1);
    // queryClient.invalidateQueries({ queryKey: [`commentPage${id}`] });
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">
        {/* 评论 ({data?.total}) */}
      </h2>

      {/* Comments List */}
      <div className="space-y-6">
        {data?.pages.map((page, pageIndex) =>
          page.list.map((comment, index) => {
            const formattedDate = new Date(
              comment.createTime as string
            ).toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            });
            return (
              <div key={comment.id} className="flex gap-4">
                <Avatar>
                  <AvatarImage
                    src={comment.user.avatarUrl}
                    alt={comment.user.nickName}
                  />
                  <AvatarFallback>
                    {comment.user.nickName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{comment.user.nickName}</p>
                      <p className="text-xs text-muted-foreground">
                        {formattedDate}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 cursor-pointer"
                      onClick={() => handleLike(comment.id as number)}
                    >
                      <ThumbsUp
                        className={`h-4 w-4 ${
                          comment?.likeCount ? "fill-chart-1 text-chart-1" : ""
                        }`}
                      />
                    </Button>
                    <span className="text-sm text-muted-foreground select-none select-none">
                      {comment.likeCount}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className=" cursor-pointer h-8 px-2"
                      onClick={() =>
                        setReply({
                          status: !reply.status,
                          id: comment.id as number,
                          content: comment.content,
                          nickName: comment.user.nickName,
                        })
                      }
                    >
                      回复
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
        {isFetchingNextPage ? (
          <div className="flex items-center justify-center text-sm">
            <Loader />
            <span>加载中...</span>
          </div>
        ) : null}
      </div>

      {/* Comment Form */}
      <form
        onSubmit={handleSubmitComment}
        className="space-y-2 sticky bottom-0 bg-white z-10 py-2"
      >
        <Textarea
          placeholder="输入评论..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="min-h-[50px]"
        />
        {reply.status ? (
          <>
            <span className=" text-gray-400 text-sm">
              回复 {reply.nickName}
            </span>
            <span className=" text-gray-700 text-sm block">
              {reply.content}
            </span>
            <Button
              className=" cursor-pointer"
              type="submit"
              disabled={!commentText.trim()}
            >
              发送
            </Button>
            <Button
              className=" cursor-pointer ml-2"
              type="reset"
              onClick={() =>
                setReply({ status: false, id: -1, content: "", nickName: "" })
              }
            >
              取消
            </Button>
          </>
        ) : (
          <Button
            className=" cursor-pointer"
            type="submit"
            disabled={!commentText.trim()}
          >
            发送
          </Button>
        )}
      </form>
    </div>
  );
}

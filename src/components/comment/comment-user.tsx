import React from "react";
import { comment, replyStatus } from "@/types/comment";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { queryClient } from "@/lib/query-client";
import { ThumbsUp, Trash2, MoreHorizontal } from "lucide-react";
import { useDel, useDoLike } from "@/services/comment";

interface ChildProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  comment: comment;
  parentId?: number;
  setCommentText: React.Dispatch<React.SetStateAction<string>>;
  setReply: React.Dispatch<React.SetStateAction<replyStatus>>;
}

export const CommentUser: React.FC<ChildProps> = ({
  comment,
  id,
  setReply,
  className,
  setCommentText,
  parentId,
}) => {
  // 格式化评论创建时间
  const formattedDate = new Date(
    comment.createTime as string
  ).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const { delFn } = useDel();
  const { doLikeFn } = useDoLike();
  const user = useAuthStore((state) => state.user);

  return (
    <div className={`flex gap-4 ${className || ""}`}>
      {/* 头像 */}
      <Avatar>
        <AvatarImage src={comment.user.avatarUrl} alt={comment.user.nickName} />
        <AvatarFallback>{comment.user.nickName.charAt(0)}</AvatarFallback>
      </Avatar>

      {/* 评论主体 */}
      <div className="flex-1 space-y-2">
        {/* 用户名、日期与删除操作 */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">{comment.user.nickName}</p>
            <p className="text-xs text-muted-foreground">{formattedDate}</p>
          </div>
          {comment.user.id === user?.id ? (
            <DropdownMenu>
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
                  onClick={() => {
                    delFn(comment.id as number, {
                      onSuccess: () => {
                        queryClient.invalidateQueries({
                          queryKey: [`commentPage`, id],
                        });
                      },
                    });
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  删除评论
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>

        {/* 评论内容 */}
        <p className="text-sm">
          {comment.replyTo && <span>回复 {comment.replyTo}：</span>}
          {comment.content}
        </p>

        {/* 点赞与回复操作 */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 cursor-pointer"
            onClick={() => {
              doLikeFn(comment.id as number, {
                onSuccess: ({ likeStatus, likeCount }) => {
                  comment.likeStatus = likeStatus;
                  comment.likeCount = likeCount;
                },
              });
            }}
          >
            <ThumbsUp
              className={`h-4 w-4 mr-1 ${
                comment.likeStatus ? "fill-chart-1 text-chart-1" : ""
              }`}
            />
            <span>{comment.likeCount}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 cursor-pointer"
            onClick={() => {
              setReply({
                parentId: parentId ? parentId : comment.id,
                status: true,
                nickName: comment.user.nickName,
                content: comment.content,
                replyTo: parentId ? comment.user.nickName : undefined,
              });
              setCommentText("");
            }}
          >
            回复
          </Button>
        </div>
      </div>
    </div>
  );
};

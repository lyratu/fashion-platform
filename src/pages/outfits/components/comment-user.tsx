import { comment, replyStatus } from "@/types/comment";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuthStore } from "@/stores/auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Close } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { queryClient } from "@/lib/query-client";
import { ThumbsUp, Trash2 } from "lucide-react";
import { useDel, useDoLike } from "@/services/comment";
import { Badge } from "@/components/ui/badge";

interface ChildProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  comment: comment;
  parentId?: number;
  setCommentText: React.Dispatch<React.SetStateAction<string>>;
  setReply: React.Dispatch<React.SetStateAction<replyStatus>>;
}

export const CommentUser: React.FC<ChildProps> = (params) => {
  const { comment, id, setReply, className, setCommentText, parentId } = params;
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
    <div key={comment.id} className={`flex gap-4 ${className || ""}`}>
      <Avatar>
        <AvatarImage src={comment.user.avatarUrl} alt={comment.user.nickName} />
        <AvatarFallback>{comment.user.nickName.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <div className=" font-medium ">
            <span>{comment.user.nickName} </span>
            {user?.id == comment.user.id ? (
              <Badge
                variant="secondary"
                className=" align-text-top text-gray-600"
              >
                作者
              </Badge>
            ) : null}

            <p className="text-xs text-muted-foreground">{formattedDate}</p>
          </div>
        </div>
        <p className="text-sm">
          <span>{comment.replyTo && `回复 ${comment.replyTo}：`}</span>
          {comment.content}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 cursor-pointer"
            onClick={() => {
              doLikeFn(comment.id as number);
              if (comment && comment.likeStatus) {
                comment.likeStatus = 0;
                comment.likeCount--;
              } else {
                comment.likeStatus = 1;
                comment.likeCount++;
              }
            }}
          >
            <ThumbsUp
              className={`h-4 w-4 ${
                comment.likeStatus ? "fill-chart-1 text-chart-1" : ""
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
      <div>
        {comment.user.id == user?.id ? (
          <Popover>
            <PopoverTrigger>
              <Trash2 className="h-4 w-4 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className=" w-fit space-y-2 ">
              <div>确认删除此评论？</div>
              <Button
                size="sm"
                className="h-8 px-2 cursor-pointer mr-4"
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
                确认
              </Button>
              <Close className="text-sm cursor-pointer border px-2 py-1 rounded-md">
                取消
              </Close>
            </PopoverContent>
          </Popover>
        ) : null}
      </div>
    </div>
  );
};

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";
import { useParams } from "react-router";
import { useGetPageComment, useSend } from "@/services/comment";
import { useQueryClient } from "@tanstack/react-query";
import UseScrollToBottom from "@/hooks/use-scroll";

import { CommentUser } from "./comment-user";
import { replyStatus } from "@/types/comment";

export function CommentSection() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data, fetchNextPage, isFetchingNextPage } = useGetPageComment(
    id as string,
    5
  );

  const [reply, setReply] = useState<replyStatus>({
    parentId: undefined,
    replyTo: undefined,
    status: false,
    nickName: "",
    content: "",
  });
  const { sendFn } = useSend();

  const [commentText, setCommentText] = useState("");

  const sendBreak = () => {
    queryClient.invalidateQueries({ queryKey: [`commentPage${id}`] });
    setCommentText("");
    reply.status = false;
    setReply(reply);
  };
  // 发送文章评论
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    if (reply.status) {
      const { parentId } = reply;
      sendFn(
        {
          content: commentText,
          parentId,
          objectId: parseInt(id as string),
          replyTo: reply.replyTo,
        },
        {
          onSuccess: sendBreak,
        }
      );
    } else {
      sendFn(
        { objectId: parseInt(id as string), content: commentText },
        {
          onSuccess: sendBreak,
        }
      );
    }
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
        {data?.pages.map((page) =>
          page.list.map((comment) => (
            <div key={comment.id}>
              <CommentUser
                id={id as string}
                comment={comment}
                setReply={setReply}
                setCommentText={setCommentText}
              />
              {comment.children.length > 0
                ? comment.children.map((rComment) => (
                    <CommentUser
                      key={rComment.id}
                      className="ml-14"
                      id={id as string}
                      comment={rComment}
                      parentId={comment.id as number}
                      setReply={setReply}
                      setCommentText={setCommentText}
                    />
                  ))
                : null}
            </div>
          ))
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
            <span className=" text-gray-400 text-sm  ">
              回复 {reply.nickName}
            </span>
            <span className=" text-gray-600 text-sm block truncate">
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
              onClick={() => {
                setReply({
                  parentId: undefined,
                  replyTo: undefined,
                  status: false,
                  nickName: "",
                  content: "",
                });
                setCommentText("");
              }}
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

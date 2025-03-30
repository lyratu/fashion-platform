import type React from "react";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp } from "lucide-react";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  publishedAt: string;
  likeCount: number;
}

interface CommentSectionProps {
  comments: Comment[];
}

export function CommentSection({ comments }: CommentSectionProps) {
  const [commentText, setCommentText] = useState("");
  const [displayedComments, setDisplayedComments] = useState(comments);
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>(
    {}
  );

  const handleLike = (commentId: string) => {
    setLikedComments((prev) => {
      const wasLiked = prev[commentId];
      return { ...prev, [commentId]: !wasLiked };
    });

    setDisplayedComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              likeCount: likedComments[commentId]
                ? comment.likeCount - 1
                : comment.likeCount + 1,
            }
          : comment
      )
    );
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    // In a real app, this would send the comment to an API
    const newComment: Comment = {
      id: `c${displayedComments.length + 1}`,
      author: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: commentText,
      publishedAt: new Date().toISOString(),
      likeCount: 0,
    };

    setDisplayedComments([...displayedComments, newComment]);
    setCommentText("");
  };

  return (
    <div className="space-y-6">
      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="space-y-4">
        <Textarea
          placeholder="输入评论..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="min-h-[100px]"
        />
        <Button type="submit" disabled={!commentText.trim()}>
          发送
        </Button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {displayedComments.map((comment) => {
          const formattedDate = new Date(
            comment.publishedAt
          ).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          return (
            <div key={comment.id} className="flex gap-4">
              <Avatar>
                <AvatarImage
                  src={comment.author.avatar}
                  alt={comment.author.name}
                />
                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{comment.author.name}</p>
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
                    className="h-8 px-2"
                    onClick={() => handleLike(comment.id)}
                  >
                    <ThumbsUp
                      className={`h-4 w-4 mr-1 ${
                        likedComments[comment.id]
                          ? "fill-primary text-primary"
                          : ""
                      }`}
                    />
                    <span>{comment.likeCount}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

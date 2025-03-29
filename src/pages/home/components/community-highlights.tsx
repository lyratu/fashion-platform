import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useGetCommentRec } from "@/services/comment";
import dateTool from "@/utils/dateTool";
import { MessageCircle, Heart } from "lucide-react";

export default function CommunityHighlights() {
  const { data } = useGetCommentRec();

  return (
    <div className="space-y-4">
      {data?.map((post) => (
        <Card key={post.id}>
          <CardContent className="p-4 cursor-pointer">
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarImage
                  src={post.user.avatarUrl}
                  alt={post.user.avatarUrl}
                />
                <AvatarFallback>{post.user.nickName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">{post.user.nickName}</h4>
                  <span className="text-xs text-muted-foreground">
                    {dateTool.formattedDate(post?.createTime as string)}
                  </span>
                </div>
                <p className="mt-1 mb-3">{post.content}</p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-sm">
                    <Heart className="h-4 w-4" />
                    <span>{post.likeCount}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.replyCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

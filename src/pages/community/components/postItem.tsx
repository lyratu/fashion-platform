import { Close } from "@radix-ui/react-popover";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/user";
import { post } from "@/types/post";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

interface childProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: User;
  item: post;
  handleDel: (ids: number[]) => void;
  handleLike: (postId: number) => void;
}

export const PostItem: React.FC<childProps> = ({
  user,
  item,
  handleDel,
  handleLike,
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <Card key={item.id} className="mb-4">
      <CardHeader className="pb-3">
        {item.user && (
          <div className="flex items-start gap-3">
            <Avatar>
              <AvatarImage src={item.user.avatarUrl} alt={item.user.nickName} />
              <AvatarFallback>{item.user.nickName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex gap-2 items-start">
                <div>
                  <h4 className="font-medium">{item.user.nickName}</h4>
                  <p className="text-xs text-muted-foreground">
                    {item.user.position}
                  </p>
                </div>
                <div>
                  {user?.id == item.user?.id ? (
                    <Badge variant="outline" className=" align-super">
                      自己
                    </Badge>
                  ) : null}
                </div>
                <span className="text-xs text-muted-foreground ml-auto">
                  {item.createTime}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent className="pb-3">
        <p className="mb-2">{item.content}</p>
        <div>
          {item.topics &&
            item.topics.map((topic, index) => (
              <Link
                key={index}
                to={`/community/tag/${topic.name.replace("#", "")}`}
                className="text-[#1d9bf0] text-sm hover:underline mr-2"
              >
                #{topic.name}
              </Link>
            ))}
        </div>
        <div className=" grid md:grid-cols-2 gap-2 xl:grid-cols-3 mt-2">
          {item.images.map((url, index) => (
            <img
              src={url}
              key={index}
              alt="Post image"
              className=" rounded-md border object-cover w-full object-top aspect-[1/1]"
            />
          ))}
        </div>
      </CardContent>
      <CardFooter className=" border-t flex justify-between pb-0 py-2">
        <Button
          variant="ghost"
          size="sm"
          className=" cursor-pointer"
          onClick={() => {
            handleLike(item.id as number);
          }}
        >
          <Heart
            className={`h-4 w-4 mr-1 ${
              item?.likeStatus ? "fill-chart-1 text-chart-1" : ""
            }`}
          />
          {item.likeCount}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className=" cursor-pointer"
          onClick={() => navigate(`/community/post/${item.id}`)}
        >
          <MessageCircle className="h-4 w-4 mr-1" />
          {item.commentCount}
        </Button>
        <Button variant="ghost" size="sm" className=" cursor-pointer">
          <Share2 className="h-4 w-4 mr-1" />
        </Button>
        {user?.id == item.user?.id ? (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
              <Trash2 className="h-4 w-4 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className=" w-fit space-y-2 ">
              <div>确认删除此文章？</div>
              <Button
                size="sm"
                className="h-8 px-2 cursor-pointer mr-4"
                onClick={() => {
                  handleDel([item.id as number]);
                  setOpen(false);
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
      </CardFooter>
    </Card>
  );
};

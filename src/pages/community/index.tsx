import UseScrollToBottom from "@/hooks/use-scroll";
import { useAddPost, useGetPostList } from "@/services/community/post";
// import { useGetMyInfo } from "@/services/profile";

import { PostForm } from "./components/postForm";
import { PostItem } from "./components/postItem";
import { Sidebar } from "./components/sidebar";
import { useQueryClient } from "@tanstack/react-query";
import { post } from "@/types/post";
import { useDelPost } from "@/services/community/post";
import { useLikeOrUnlike } from "@/services/community/like";
import { like } from "@/types/like";
import { ChevronLeft, Loader } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth";
import { User } from "@/types/user";

export default function CommunityPage() {
  // const { data: userInfo } = useGetMyInfo();
  const userInfo = useAuthStore((state) => state.user);
  const [topicName, setTopicName] = useState("");
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPostList({
    order: "createTime",
    name: topicName,
    page: 1,
    size: 6,
    sort: "desc",
  });

  const { delPostFn } = useDelPost();
  const { addPostFn } = useAddPost();
  const { likeOrUnlikeFn } = useLikeOrUnlike();
  const queryClient = useQueryClient();

  /* 文章点赞 */
  const handlePostLike = (postId: number, callback: (res: like) => void) => {
    likeOrUnlikeFn(postId, {
      onSuccess: (res) => {
        callback(res);
        queryClient.invalidateQueries({ queryKey: ["postPage"] });
      },
    });
  };
  /* 文章删除 */
  const handlePostDel = (ids: number[]) => {
    delPostFn(ids, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["postPage"] });
      },
    });
  };
  /* 发布文章 */
  const handlePostSubmit = (post: post) => {
    const { content, images, topics } = post;
    const data: post = {
      content,
      images,
      topics,
    };
    addPostFn(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["postPage"] });
      },
    });
  };

  const loadRef = useRef(null);
  /* 触底刷新list */
  UseScrollToBottom(loadRef, () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* 主体 */}
        <div className="flex-1">
          {/* 文章发布 */}
          <PostForm user={userInfo as User} handleSubmit={handlePostSubmit} />
          {topicName ? (
            <Button
              variant="outline"
              size="icon"
              className="my-2"
              onClick={() => setTopicName("")}
            >
              <ChevronLeft />
            </Button>
          ) : (
            <div className="my-4"></div>
          )}

          {/* 文章列表 */}
          <div>
            {posts?.pages.map((arr) =>
              arr?.list.map((item) => (
                <PostItem
                  key={item.id}
                  user={userInfo as User}
                  item={item}
                  handleDel={handlePostDel}
                  handleLike={handlePostLike}
                />
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
        </div>

        {/* 侧边功能区 */}
        <Sidebar setTopic={setTopicName} />
      </div>
    </div>
  );
}

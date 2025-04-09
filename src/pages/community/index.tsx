import UseScrollToBottom from "@/hooks/use-scroll";
import { useAddPost, useGetPostList } from "@/services/community/post";
import { useGetMyInfo } from "@/services/profile";

import { PostForm } from "./components/postForm";
import { PostItem } from "./components/postItem";
import { Sidebar } from "./components/sidebar";
import { useQueryClient } from "@tanstack/react-query";
import { post } from "@/types/post";
import { useDelPost } from "@/services/community/post";
import { useLikeOrUnlike } from "@/services/community/like";

export default function CommunityPage() {
  const { data: userInfo } = useGetMyInfo();

  const { data: posts, fetchNextPage } = useGetPostList({
    order: "createTime",
    page: 1,
    size: 20,
    sort: "desc",
  });

  const { delPostFn } = useDelPost();
  const { addPostFn } = useAddPost();
  const { likeOrUnlikeFn } = useLikeOrUnlike();
  const queryClient = useQueryClient();

  /* 文章点赞 */
  const handlePostLike = (postId: number) => {
    likeOrUnlikeFn(postId, {
      onSuccess: () => {
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

  /* 触底刷新list */
  UseScrollToBottom(() => {
    fetchNextPage();
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* 主体 */}
        <div className="flex-1">
          {/* 文章发布 */}
          <PostForm user={userInfo} handleSubmit={handlePostSubmit} />
          {/* 文章列表 */}
          <div>
            {posts?.pages.map((arr) =>
              arr?.list.map((item) => (
                <PostItem
                  key={item.id}
                  user={userInfo}
                  item={item}
                  handleDel={handlePostDel}
                  handleLike={handlePostLike}
                />
              ))
            )}
          </div>
        </div>

        {/* 侧边功能区 */}
        <Sidebar />
      </div>
    </div>
  );
}

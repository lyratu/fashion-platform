import axios from "@/lib/axios";
import { pageQuery, pageQueryResponse } from "@/types/pageQuery";
import { post } from "@/types/post";
import { topic } from "@/types/topic";
import { User } from "@/types/user";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

export const addPost = async (form: post) => {
  const response = await axios.post<pageQueryResponse<topic>>(
    "/app/community/post/add",
    form
  );
  return response.data;
};

export const useAddPost = () => {
  const {
    error,
    data,
    mutateAsync: addPostFn,
  } = useMutation({
    mutationFn: addPost,
  });

  return { addPostFn, data, error };
};

/* 删除个人文章 */
export const delPost = async (ids: number[]) => {
  const response = await axios.post<pageQueryResponse<topic>>(
    "/app/community/post/delete",
    { ids }
  );
  return response.data;
};
export const useDelPost = () => {
  const {
    error,
    data,
    mutateAsync: delPostFn,
  } = useMutation({
    mutationFn: delPost,
  });

  return { delPostFn, data, error };
};

/* 获取社区活跃用户 */
type activeInfo = {
  activityCount: string;
  commentCount: string;
  postCount: string;
  user: User;
  userId: number;
};
export const getActiveUser = async () => {
  const response = await axios.get<Array<activeInfo>>(
    "/app/community/post/getActiveUser",
    {}
  );
  return response.data;
};
export const useGetActiveUser = () => {
  return useQuery({
    queryKey: ["activeUser"],
    queryFn: getActiveUser,
  });
};

/* 滚动分页请求社区文章 */

type pagePost = {
  list: Array<post>;
  total: number;
};

export const getPostList = async (data: pageQuery) => {
  const response = await axios.post<pagePost>(`/app/community/post/page`, data);
  return response.data;
};

export const useGetPostList = (data: pageQuery) => {
  return useInfiniteQuery<pagePost, Error>({
    queryKey: ["postPage"],
    queryFn: ({ pageParam }) =>
      getPostList({ ...data, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loadedArticles = allPages.reduce(
        (acc, page) => acc + page.list.length,
        0
      );
      if (loadedArticles < lastPage.total) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });
};

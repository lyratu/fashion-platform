import axios from "@/lib/axios";
import { pageQuery, pageQueryResponse } from "@/types/pageQuery";
import { post } from "@/types/post";
import { topic } from "@/types/topic";
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
    onSuccess: () => {},
    onError: () => {},
  });

  return { addPostFn, data, error };
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
    queryKey: ["postPage", data],
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

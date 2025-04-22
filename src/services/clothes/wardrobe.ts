import axios from "@/lib/axios";
import { cloth } from "@/types/cloth";
import { comment } from "@/types/comment";
import { pageQuery, pageQueryResponse } from "@/types/pageQuery";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

/* 上传衣物 */
export const uploadCloth = async (data: Partial<cloth>) => {
  const response = await axios.post<Array<comment>>(
    `/app/clothes/item/add`,
    data
  );
  return response.data;
};

export const useUploadCloth = () => {
  const {
    error,
    data,
    mutateAsync: uploadClothFn,
  } = useMutation({
    mutationFn: uploadCloth,
  });
  return { uploadClothFn, data, error };
};

/* 删除衣物 */
export const delCloth = async (ids: number[]) => {
  const response = await axios.post(`/app/clothes/item/delete`, { ids });
  return response.data;
};

export const useDelCloth = () => {
  const {
    error,
    data,
    mutateAsync: delClothFn,
  } = useMutation({
    mutationFn: delCloth,
  });
  return { delClothFn, data, error };
};

/* 获取衣柜所有衣物 */
export const getClothes = async (data: pageQuery) => {
  const response = await axios.post<pageQueryResponse<cloth>>(
    `/app/clothes/item/page`,
    data
  );
  return response.data;
};

export const useGetClothes = (data: pageQuery) => {
  return useInfiniteQuery<pageQueryResponse<cloth>, Error>({
    queryKey: ["clothes", data],
    queryFn: ({ pageParam }) =>
      getClothes({ ...data, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loadedArticles = allPages.reduce(
        (acc, page) => acc + page.list.length,
        0
      );
      if (loadedArticles < lastPage.pagination.total) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });
};

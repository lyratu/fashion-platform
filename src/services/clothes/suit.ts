import axios from "@/lib/axios";
import { cloth, suit } from "@/types/cloth";
import { comment } from "@/types/comment";
import { pageQuery, pageQueryResponse } from "@/types/pageQuery";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

/* 保存套装 */
export const saveSuit = async (data: Partial<suit>) => {
  const response = await axios.post<Array<comment>>(
    `/app/clothes/suit/add`,
    data
  );
  return response.data;
};

export const useSaveSuit = () => {
  const {
    error,
    data,
    mutateAsync: saveSuitFn,
  } = useMutation({
    mutationFn: saveSuit,
  });
  return { saveSuitFn, data, error };
};

/* 套装备注 */
export const editSuit = async (date: { id: number; remark: string }) => {
  const response = await axios.post<Array<comment>>(
    `/app/clothes/suit/update`,
    date
  );
  return response.data;
};

export const useEditSuit = () => {
  const {
    error,
    data,
    mutateAsync: editSuitFn,
  } = useMutation({
    mutationFn: editSuit,
  });
  return { editSuitFn, data, error };
};

/* 删除套装 */
export const delSuit = async (ids: number[]) => {
  const response = await axios.post<Array<comment>>(
    `/app/clothes/suit/delete`,
    {
      ids,
    }
  );
  return response.data;
};

export const useDelSuit = () => {
  const {
    error,
    data,
    mutateAsync: delSuitFn,
  } = useMutation({
    mutationFn: delSuit,
  });
  return { delSuitFn, data, error };
};

/* 获取衣柜所有衣物 */
export const getMySuit = async (data: pageQuery) => {
  const response = await axios.post<pageQueryResponse<suit>>(
    `/app/clothes/suit/page`,
    data
  );
  return response.data;
};

export const useGetMySuit = (data: pageQuery) => {
  return useInfiniteQuery<pageQueryResponse<suit>, Error>({
    queryKey: ["suits", data],
    queryFn: ({ pageParam }) =>
      getMySuit({ ...data, page: pageParam as number }),
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

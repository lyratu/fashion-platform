import axios from "@/lib/axios";
import { ApiResponse } from "@/types/apiResponse";
import { location, order } from "@/types/order";
import { pageQuery, pageQueryResponse } from "@/types/pageQuery";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
type response = {
  orderNumber: number;
};
export const createOrder = async (data: Partial<order>) => {
  const response = await axios.post<response>(
    `/app/order/order/createOrder`,
    data
  );
  return response.data;
};

export const useCreateOrder = () => {
  const {
    error,
    data,
    mutateAsync: createOrderFn,
  } = useMutation({
    mutationFn: createOrder,
  });

  return { createOrderFn, data, error };
};

/* 获取订单信息 */
export const getOrderInfo = async (id: string) => {
  const response = await axios.get<order>(`/app/order/order/info?id=${id}`, {});
  return response.data;
};
export const useGetOrderInfo = (id: string) => {
  return useQuery({
    queryKey: [`getOrderInfo`, id],
    queryFn: () => getOrderInfo(id),
  });
};
/* 获取历史订单 */
export const getOrderList = async (params: pageQuery) => {
  const response = await axios.post<pageQueryResponse<order>>(
    `/app/order/order/page`,
    params
  );
  return response.data;
};
export const useGetOrderList = (data: pageQuery) => {
  return useInfiniteQuery<pageQueryResponse<order>, Error>({
    queryKey: ["getOrderList", data],
    queryFn: ({ pageParam }) =>
      getOrderList({ ...data, page: pageParam as number }),
    initialPageParam: 1,
    staleTime: 0,
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

/*  确认订单 */
export const confirmPayment = async (id: number) => {
  const response = await axios.post<response>(
    `/app/order/order/confirmPayment?id=${id}`,
    {}
  );
  return response.data;
};

export const useConfirmPayment = () => {
  const {
    error,
    data,
    mutateAsync: confirmPaymentFn,
  } = useMutation({
    mutationFn: confirmPayment,
  });

  return { confirmPaymentFn, data, error };
};

/* 确认收货 */
export const confirmGoods = async (id: number) => {
  const response = await axios.post<response>(
    `/app/order/order/confirmGoods?id=${id}`,
    {}
  );
  return response.data;
};

export const useConfirmGoods = () => {
  const {
    error,
    data,
    mutateAsync: confirmGoodsFn,
  } = useMutation({
    mutationFn: confirmGoods,
  });

  return { confirmGoodsFn, data, error };
};

/* 获取快递信息 */
type locationItems = {
  list: location[];
  total: number;
};

export const getLocation = async (data: pageQuery) => {
  const response = await axios.post<locationItems>(
    `/app/order/logisticsLocation/page`,
    data
  );
  return response.data;
};
export const useGetLocation = () => {
  const {
    error,
    data,
    mutateAsync: getLocationFn,
  } = useMutation({
    mutationFn: getLocation,
  });

  return { getLocationFn, data, error };
};

import axios from "@/lib/axios";
import { order } from "@/types/order";
import { pageQuery, pageQueryResponse } from "@/types/pageQuery";
import { useMutation, useQuery } from "@tanstack/react-query";
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

export const getOrderList = async (params: pageQuery) => {
  const response = await axios.post<pageQueryResponse<order>>(
    `/app/order/order/page`,
    params
  );
  return response.data;
};
export const useGetOrderList = (params: pageQuery) => {
  return useQuery({
    queryKey: [`getOrderList`],
    queryFn: () => getOrderList(params),
  });
};

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

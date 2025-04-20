import axios from "@/lib/axios";
import { ApiResponse } from "@/types/apiResponse";
import { CartItem } from "@/types/cart";
import { goods } from "@/types/goods";
import { pageQueryResponse } from "@/types/pageQuery";
import { useMutation, useQuery } from "@tanstack/react-query";
const token = localStorage.getItem("token");

export const addCard = async (data: CartItem) => {
  const response = await axios.post<ApiResponse<goods>>(
    `/app/cart/cart/add`,
    data
  );
  return response.data;
};

export const useAddCard = () => {
  const {
    error,
    data,
    mutateAsync: addCardFn,
  } = useMutation({
    mutationFn: addCard,
  });

  return { addCardFn, data, error };
};

export const updateGoods = async (data: {
  id: number;
  count?: number;
  size?: string;
  color?: string;
  checked?: number;
}) => {
  const response = await axios.post<ApiResponse<goods>>(
    `/app/cart/cart/updateGoodsInfo`,
    data
  );
  return response.data;
};

export const useUpdateGoods = () => {
  const {
    error,
    isPending: updateLoading,
    data,
    mutateAsync: updateGoodsFn,
  } = useMutation({
    mutationFn: updateGoods,
  });

  return { updateGoodsFn, updateLoading, data, error };
};

export const updateChecked = async (data: {
  ids: number[];
  checked: number;
}) => {
  const response = await axios.post<ApiResponse<goods>>(
    `/app/cart/cart/updateChecked`,
    data
  );
  return response.data;
};

export const useUpdateChecked = () => {
  const {
    error,
    data,
    mutateAsync: updateCheckedFn,
  } = useMutation({
    mutationFn: updateChecked,
  });

  return { updateCheckedFn, data, error };
};

export const deleteGoods = async (id: number) => {
  const response = await axios.post<ApiResponse<goods>>(
    `/app/cart/cart/deleteGoods?id=${id}`,
    {}
  );
  return response.data;
};

export const useDeleteGoods = () => {
  const {
    error,
    data,
    mutateAsync: deleteGoodsFn,
  } = useMutation({
    mutationFn: deleteGoods,
  });

  return { deleteGoodsFn, data, error };
};

export const getCart = async () => {
  const response = await axios.post<pageQueryResponse<goods & CartItem>>(
    `/app/cart/cart/page`,
    {}
  );
  return response.data;
};

export const useGetCart = () => {
  return useQuery({
    queryKey: [`myCart`],
    queryFn: getCart,
    staleTime: 0,
  });
};

export const getCartCount = async () => {
  const response = await axios.get<number[]>(`/app/cart/cart/getCartCount`, {});
  return response.data;
};

export const useGetCartCount = () => {
  return useQuery({
    queryKey: [`myCartCount`],
    queryFn: getCartCount,
    enabled: !!token,
  });
};

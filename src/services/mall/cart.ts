import axios from "@/lib/axios";
import { ApiResponse } from "@/types/apiResponse";
import { CartItem } from "@/types/cart";
import { goods } from "@/types/goods";
import { pageQueryResponse } from "@/types/pageQuery";
import { useMutation, useQuery } from "@tanstack/react-query";

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
    onSuccess: () => {},
    onError: () => {},
  });

  return { addCardFn, data, error };
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

import axios from "@/lib/axios";
import { address } from "@/types/address";
import { useMutation, useQuery } from "@tanstack/react-query";

export const getMyAddress = async () => {
  const response = await axios.post<Array<address>>(
    `/app/user/address/list`,
    {}
  );
  return response.data;
};

export const useGetMyAddress = () => {
  return useQuery({
    queryKey: [`getMyAddress`],
    queryFn: getMyAddress,
  });
};

export const getOneAddress = async (id: number) => {
  const response = await axios.get<address>(
    `/app/user/address/info?id=${id}`,
    {}
  );
  return response.data;
};

export const useGetOneAddress = (id: number) => {
  return useQuery({
    queryKey: [`getOneAddress`, id],
    queryFn: () => {
      getOneAddress(id);
    },
  });
};

export const addAddress = async (params: Partial<address>) => {
  const response = await axios.post<address>(`/app/user/address/add`, params);
  return response.data;
};

export const useAddAddress = () => {
  const {
    error,
    data,
    mutateAsync: addAddressFn,
  } = useMutation({
    mutationFn: addAddress,
  });
  return { addAddressFn, data, error };
};

export const updateAddress = async (params: Partial<address>) => {
  const response = await axios.post<address>(
    `/app/user/address/update`,
    params
  );
  return response.data;
};

export const useUpdateAddress = () => {
  const {
    error,
    data,
    mutateAsync: updateAddressFn,
  } = useMutation({
    mutationFn: updateAddress,
  });
  return { updateAddressFn, data, error };
};

export const delAddress = async (id: number) => {
  const response = await axios.post<address>(`/app/user/address/delete`, {
    ids: [id],
  });
  return response.data;
};

export const useDelAddress = () => {
  const {
    error,
    data,
    mutateAsync: delAddressFn,
  } = useMutation({
    mutationFn: delAddress,
  });
  return { delAddressFn, data, error };
};

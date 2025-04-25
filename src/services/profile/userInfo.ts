import axios from "@/lib/axios";
import { User } from "@/types/user";
import { useMutation, useQuery } from "@tanstack/react-query";

export const getMyInfo = async () => {
  const response = await axios.get<User>(`/app/user/info/person`, {});
  return response.data;
};

export const useGetMyInfo = () => {
  return useQuery({
    queryKey: [`getMyInfo`],
    queryFn: getMyInfo,
  });
};

export const updateUser = async (params: Partial<User>) => {
  const response = await axios.post<User>(
    `/app/user/info/updatePerson`,
    params
  );
  return response.data;
};

export const useUpdateUser = () => {
  const {
    error,
    data,
    mutateAsync: updateUserFn,
  } = useMutation({
    mutationFn: updateUser,
  });
  return { updateUserFn, data, error };
};

export const updatePassword = async (form: {
  currentPwd: string;
  newPwd: string;
}) => {
  const response = await axios.post<User>(
    `/app/user/info/updatePassword`,
    form
  );
  return response.data;
};

export const useUpdatePassword = () => {
  const {
    error,
    data,
    mutateAsync: updatePasswordFn,
  } = useMutation({
    mutationFn: updatePassword,
  });
  return { updatePasswordFn, data, error };
};

export const getOtherInfo = async (id: number) => {
  const response = await axios.get<User>(
    `/app/user/info/otherPerson?id=${id}`,
    {}
  );
  return response.data;
};

export const useGetOtherInfo = (id: number) => {
  return useQuery({
    queryKey: [`getOtherInfo`],
    queryFn: () => getOtherInfo(id),
    staleTime: 0,
  });
};

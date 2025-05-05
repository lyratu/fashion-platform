import axios from "@/lib/axios";
import { loginForm, loginResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

export const register = async (data: loginForm) => {
  const response = await axios.post<loginResponse>(
    "/app/user/register/password",
    data
  );
  return response;
};

export const useRegister = () => {
  const {
    error,
    isPending: regLoading,
    mutateAsync: registerFn,
  } = useMutation({
    mutationFn: register,
  });

  return { register: registerFn, regLoading, error };
};

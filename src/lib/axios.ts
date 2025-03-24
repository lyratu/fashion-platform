import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";
import { toast } from "sonner";
import { ApiResponse } from "@/types/apiResponse";

// 创建axios实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      (config.headers as AxiosHeaders).set("Authorization", `${token}`);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { data } = response;
    // 业务状态码判断
    if (data.code === 1000) {
      // 返回重构后的 AxiosResponse 对象
      return {
        ...response,
        data: data.data, // 将业务数据提升到顶层
      };
    } else {
      // handleBusinessError(data.code, data.message);
      toast.error(data.message || "请求失败", { duration: 1500 });
      console.log(
        "%c [  ]-45",
        "font-size:13px; background:pink; color:#bf2c9f;"
      );

      return Promise.reject(new Error(data.message || "请求失败"));
    }
  },
  (error: AxiosError) => {
    // handleNetworkError(error);
    toast.error(`服务器请求异常，错误信息：${error.message}`, {
      duration: 2000,
    });
    return Promise.reject(error);
  }
);

export default instance;

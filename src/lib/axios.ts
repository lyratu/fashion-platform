import axios, {
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";

// 定义严格的响应类型
interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

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
      return Promise.reject(new Error(data.message || "Request Failed"));
    }
  },
  (error: AxiosError) => {
    // handleNetworkError(error);
    return Promise.reject(error);
  }
);

// 封装GET请求（更新返回类型）
// export const get = <T = unknown>(
//   url: string,
//   params?: Record<string, unknown>,
//   config?: AxiosRequestConfig
// ): Promise<T> => {
//   return instance.get<T>(url, { params, ...config }).then((res) => res.data);
// };

export default instance;

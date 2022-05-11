import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

interface ResponseData<T> {
  code?: number;
  data: T;
  msg?: string;
}

// 指定 axios 请求类型

axios.defaults.headers = {
  'Content-Type': 'application/json;charset=utf-8',
};


// 添加请求拦截器
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// 添加响应拦截器，拦截登录过期或者没有权限

axios.interceptors.response.use(
  (response: AxiosResponse<ResponseData<any>>) => {
    if (!response.data) {
      return Promise.resolve(response);
    }

    // 请求成功
    if (response.data.code) {
      return response.data as any;
    }

    return Promise.reject(new Error(response.data.msg));
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// 统一发起请求的函数
export function request<T>(options: AxiosRequestConfig) {
  return axios.request<T>(options);
}

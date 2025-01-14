/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/ban-types */
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

import { storageService } from "./storage.service";

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_CORE_ENGINE_URL;
axios.defaults.withCredentials = false;

const responseBody = (response: AxiosResponse): any => response.data;

axios.interceptors.request.use((config: any) => {
  const token = storageService.getFromLocalStorage("jwtToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response: any) => response,
  (error: AxiosError) => {
    const { data, status }: any = error?.response!;
    switch (status) {
      case 400:
        toast.error(data?.message);
        break;
      case 401:
        console.log("Logout user...");
        break;
      case 403:
        toast.error("You are not allowed to do that!");
        break;
      case 500:
        toast.error(data?.message);
        break;
      default:
        break;
    }
    return Promise.reject(error?.response);
  }
);

const multipartHeaders = {
  headers: { "Content-type": "multipart/form-data" }
};

export const apiService = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, data: FormData) =>
    axios.post(url, data, multipartHeaders).then(responseBody),
  putForm: (url: string, data: FormData) =>
    axios.put(url, data, multipartHeaders).then(responseBody)
};

export function createFormData(item: any) {
  const formData: FormData = new FormData();
  for (const key in item) {
    formData.append(key, item[key]);
  }
  return formData;
}

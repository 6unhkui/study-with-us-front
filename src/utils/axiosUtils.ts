import { ResponseDTO } from "@/api/dto/common.dto";
import { getCurrentLanguage } from "@/i18nConfig";
import axios, { AxiosRequestConfig } from "axios";
import { tokenStore } from "./tokenUtils";
import toQueryString from "./toQueryString";

const baseURL = process.env.REACT_APP_API_SERVER_URI;
export const baseHeader = (): { Authorization: string } => ({ Authorization: `Bearer ${tokenStore.getAccessToken()}` });

const axiosInstance = axios.create({ baseURL, paramsSerializer: toQueryString });

axiosInstance.interceptors.request.use(
    req => ({
        ...req,
        headers: { ...req.headers, ...baseHeader() },
        params: { ...req.params, lang: getCurrentLanguage() }
    }),
    error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    res => res,
    error => {
        if (error.response && error.response.status === 401) {
            tokenStore.removeAccessToken();
            window.location.replace("/login");
        }
        return Promise.reject(error);
    }
);

export async function fetcher<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.request<ResponseDTO<T>>(config).then(res => res.data?.data);
    return response;
}

import axios from "axios";
import { SERVER_URI, ACCESS_TOKEN, BEARER_TOKEN_PREFIX, MULTI_LANG } from "constants/index";

export const header = () => ({
    Authorization: `${BEARER_TOKEN_PREFIX} ${localStorage.getItem(ACCESS_TOKEN) ? localStorage.getItem(ACCESS_TOKEN) : ""}`
});

/**
 * Axios Interceptor - s /////////////////////////////////////
 */
const instance = axios.create({
    baseURL: SERVER_URI,
    timeout: 1000
});

instance.interceptors.request.use(
    config => ({
        ...config,
        headers: {
            Authorization: `${BEARER_TOKEN_PREFIX} ${
                localStorage.getItem(ACCESS_TOKEN) ? localStorage.getItem(ACCESS_TOKEN) : undefined
            }`
        },
        params: { ...config.params, lang: localStorage.getItem(MULTI_LANG) ? window.localStorage.i18nextLng : "ko" }
    }),
    error => Promise.reject(error)
);

// Response Interceptor
instance.interceptors.response.use(
    // Http Statu가 200인 경우
    response => response,

    // Http Statu가 200이 경우 : 에러 처리
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem(ACCESS_TOKEN);
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export const http = instance;
// Axios Interceptor - e /////////////////////////////////////

export function makeParameter(obj) {
    return Object.entries(obj)
        .reduce((acc, [key, value]) => {
            if (!value) return acc;
            if ((typeof value === "string" || Array.isArray(value)) && value.length === 0) return acc;

            if (Array.isArray(value)) {
                acc.push(`${key}=${value.join(",")}`);
            } else {
                acc.push(`${key}=${value}`);
            }

            return acc;
        }, [])
        .join("&");
}

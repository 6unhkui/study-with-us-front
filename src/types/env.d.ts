declare namespace NodeJS {
    interface ProcessEnv {
        REACT_APP_WEB_URI: string;
        REACT_APP_API_SERVER_URI: string;
        REACT_APP_OAUTH2_REDIRECT_URI: string;
        REACT_APP_OAUTH2_PROVIDER_GOOGLE_URL: string;
        REACT_APP_OAUTH2_PROVIDER_NAVER_URL: string;
    }
}

import { isProd } from "@/constants";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-xhr-backend";

export type LanguageKeys = "ko" | "en";

export const availableLanguages: Record<LanguageKeys, string> = {
    ko: "한국어",
    en: "English"
};

export const availableLanguageKeys: string[] = Object.keys(availableLanguages);

export const getCurrntLanguage = (): LanguageKeys => i18n.language || window.localStorage.i18nextLng || availableLanguageKeys[0];

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .use(Backend)
    .init({
        lng: getCurrntLanguage(),
        fallbackLng: availableLanguageKeys[0],
        whitelist: availableLanguageKeys,
        debug: !isProd,
        interpolation: {
            escapeValue: false
        }
    });

i18n.on("languageChanged", (lng: string) => {
    document.documentElement.setAttribute("lang", lng);
});

export default i18n;

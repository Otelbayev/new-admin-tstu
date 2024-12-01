import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttppApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttppApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["uz", "en", "ru"],
    fallbackLng: "uz",
    debug: false,
    backend: {
      loadPath: "/lib/locales/{{lng}}/translation.json",
    },

    detection: {
      order: ["cookie", "localStorage", "path", "subdomain"],
      caches: ["cookie"],
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import translationEN from "./languages/en.json";
// import translationAR from "./languages/ar.json";
import LanguageDetector from "i18next-browser-languagedetector";
import { useTranslation } from "react-i18next";
const resources = {
  en: {
    // translation: translationEN,
  },
  ar: {
    // translation: translationAR,
  },
};
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ar",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
export default i18n;

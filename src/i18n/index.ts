import i18next from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import es from "./es.json";

const languageAvailability: { [key: string]: string } = {
  en: "en",
  es: "es",
};

i18next
  .use(detector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      es: {
        translation: es,
      },
    },
    lng: languageAvailability[localStorage.getItem("i18nextLng") ?? "en"],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;

import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  lng: "en",
  resources: {},
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  detection: {
    caches: null,
  },
});

export default i18next;

import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  lng: "en",
  resources: {},
  interpolation: {
    escapeValue: false,
  },
  react: {
    bindI18n: "languageChanged added",
    bindI18nStore: "added",
  },
});

export default i18next;

import { EThemesEnum } from "/lib/records/ThemeRecord";

export const THEME_STORAGE_KEY = "THEME";

export default {
  type: EThemesEnum.LIGHT,
  styles: {
    App: {
      backgroundColor: "#fff",
      color: "#000",
      border: "1px solid #000",
    },
  },
};

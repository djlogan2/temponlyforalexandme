import dark from "./dark";
import light from "./light";
import { EThemesEnum } from "/lib/records/ThemeRecord";

export default {
  [EThemesEnum.DARK]: dark,
  [EThemesEnum.LIGHT]: light,
};

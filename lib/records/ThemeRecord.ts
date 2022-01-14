import dark from "/imports/themes/dark";

export enum EThemesEnum {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

export default interface ThemeRecord {
  id?: string;
  theme: {
    type: EThemesEnum.DARK | EThemesEnum.LIGHT;
    styles: typeof dark.styles;
  };
}

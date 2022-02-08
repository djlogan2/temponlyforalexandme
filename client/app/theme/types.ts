export interface IThemeService {
  isReady: boolean;
  getTheme: () => Object | undefined;
  events: {
    on: (
      eventName: "themechanged" | "ready",
      fn: (...args: any[]) => void,
    ) => void;
    off: (
      eventName: "themechanged" | "ready",
      fn: (...args: any[]) => void,
    ) => void;
  };
}

export interface IThemeContextValue {
  theme: Object | undefined;
  isReady: boolean;
}

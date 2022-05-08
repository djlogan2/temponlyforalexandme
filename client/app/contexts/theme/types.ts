export type ThemeService = {
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
};

export type ThemeContextValue = {
  theme: Object | undefined;
  isReady: boolean;
};

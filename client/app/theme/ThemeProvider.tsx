import React, { FC, ReactNode, useEffect, useMemo, useState } from "react";
import ThemeContext from "./Context";
import { IThemeService } from "./types";

interface IThemeProvider {
  themeService: IThemeService;
}

const ThemeProvider: FC<IThemeProvider> = ({ themeService, children }) => {
  const [theme, setTheme] = useState<Object | undefined>(undefined);
  const themeValue = useMemo(() => ({ theme, isReady: !!theme }), [theme]);

  useEffect(() => {
    const handleTheme = () => setTheme(themeService.getTheme());

    themeService.events.on("ready", handleTheme);
    themeService.events.on("themechanged", handleTheme);

    return () => {
      themeService.events.off("ready", handleTheme);
      themeService.events.off("themechanged", handleTheme);
    };
  }, []);

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;

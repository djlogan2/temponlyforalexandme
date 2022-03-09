import React, { FC, ReactNode, useEffect, useMemo, useState } from "react";
import ThemeContext from "./Context";
import { IThemeService } from "./types";

interface IThemeProvider {
  themeService: IThemeService;
}

const ThemeProvider: FC<IThemeProvider> = ({ themeService, children }) => {
  const [theme, setTheme] = useState<Object | undefined>(() =>
    themeService.getTheme(),
  );

  const themeValue = useMemo(() => ({ theme, isReady: !!theme }), [theme]);

  useEffect(() => {
    const handleTheme = () => setTheme(themeService.getTheme());

    // Update the theme if changed
    themeService.events.on("themechanged", handleTheme);

    return () => themeService.events.off("themechanged", handleTheme);
  }, []);

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;

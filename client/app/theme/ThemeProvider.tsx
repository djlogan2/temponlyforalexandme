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
    const handleTheme = (t?: any) => {
      console.log("Theme changed or initialized", t);
      setTheme(themeService.getTheme());
    };

    const destroy: Function[] = [];

    if (!themeService.isReady) {
      const destroyReadyHandler = () =>
        themeService.events.off("ready", handleThemeReady);
      const handleThemeReady = () => {
        handleTheme();
        destroyReadyHandler();
        const idx = destroy.indexOf(destroyReadyHandler);
        if (idx !== -1) destroy.splice(idx, 1);
      };

      themeService.events.on("ready", handleThemeReady);
      destroy.push(destroyReadyHandler);
    } else {
      handleTheme();
    }
    // themeService.events.on("themechanged", handleTheme);
    themeService.events.on("themechanged", handleTheme);
    destroy.push(() => themeService.events.off("themechanged", handleTheme));

    return () => destroy.forEach((c) => c());
  }, []);

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;

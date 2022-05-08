import React, { FC, useEffect, useMemo, useState } from "react";

import { ThemeContextProvider } from "./context";
import { ThemeContextValue, ThemeService } from "./types";

type ThemeProviderProps = {
  themeService: ThemeService;
};

const themeToStr = (theme: any) => {
  if (theme) {
    const userId = globalThis.icc.connection?.user?.id;
    const variablesStr = theme.variables
      ? Object.keys(theme.variables)
          .map((key) => `--${key}: ${theme.variables[key]};`)
          .join("\n")
      : "";

    const cssStr = theme.css || "";

    const staticResourcesStr = theme.staticResources
      ? Object.keys(theme.staticResources)
          .map(
            (key) =>
              `--resource_${key}: url('${theme.staticResources[key]}--${userId}');`,
          )
          .join("\n")
      : "";

    return [
      "/* THEME OVERRIDE */",
      "/* VARIABLES */",
      `:root {\n${variablesStr}\n}`,
      "/* STATIC RESOURCES */",
      `:root {\n${staticResourcesStr}\n}`,
      "/* CUSTOM CSS */",
      cssStr,
    ].join("\n\n");
  }

  return "";
};

export const ThemeProvider: FC<ThemeProviderProps> = ({
  themeService,
  children,
}) => {
  const [theme, setTheme] = useState<Object | undefined>(() =>
    themeService.getTheme(),
  );

  const contextValue: ThemeContextValue = useMemo(
    () => ({ theme, isReady: !!theme }),
    [theme],
  );

  const themeStrings = useMemo(() => themeToStr(theme), [theme]);

  useEffect(() => {
    const handleTheme = () => setTheme(themeService.getTheme());

    // Update the theme if changed
    themeService.events.on("themechanged", handleTheme);

    return () => themeService.events.off("themechanged", handleTheme);
  }, []);

  return (
    <ThemeContextProvider value={contextValue}>
      <style>{themeStrings}</style>
      {children}
    </ThemeContextProvider>
  );
};

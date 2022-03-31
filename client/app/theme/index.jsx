import React, { useContext, useMemo } from 'react';
import ThemeContext from './Context';
import ThemeProvider from './ThemeProvider';

const useTheme = () => useContext(ThemeContext);

const themeToStr = (theme) => {
  if (theme) {
    const userId = globalThis.icc.connection?.user?.id;
    const variablesStr = theme.variables ? Object.keys(theme.variables).map(
      key => `--${key}: ${theme.variables[key]};`
    ).join('\n') : '';

    const cssStr = theme.css || '';

    const staticResourcesStr = theme.staticResources ? Object.keys(theme.staticResources).map(
      key => `--resource_${key}: url('${theme.staticResources[key]}--${userId}');`
    ).join('\n') : '';

    return [
      '/* THEME OVERRIDE */',
      '/* VARIABLES */',
      `:root {\n${variablesStr}\n}`,
      '/* STATIC RESOURCES */',
      `:root {\n${staticResourcesStr}\n}`,
      '/* CUSTOM CSS */',
      cssStr,
    ].join('\n\n');
  }

  return '';
};

const Theme = () => {
  const { theme } = useTheme();

  const themeStrings = useMemo(() => themeToStr(theme), [theme]);

  return (
    <style>
      {themeStrings || null}
    </style>
  );
};




export default Theme;
export { useTheme, ThemeProvider }

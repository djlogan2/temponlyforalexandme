import React, { useContext, useMemo } from 'react';
import ThemeContext from './Context';
import ThemeProvider from './ThemeProvider';

const useTheme = () => useContext(ThemeContext);

const themeToStr = (theme) => {
  if (theme) {
    const variablesStr = theme.variables ? Object.keys(theme.variables).map(
      key => `--${key}: ${theme.variables[key]};`
    ).join('\n') : '';

    const cssStr = theme.css || '';

    return {
      variablesStr,
      cssStr,
    };
  }

  return '';
};

const Theme = () => {
  const { theme } = useTheme();

  const themeStrings = useMemo(() => themeToStr(theme), [theme]);

  return (
    <style>
      {themeStrings ? (
        `/* THEME OVERRIDE */\n\n:root {\n${themeStrings.variablesStr}\n}\n${themeStrings.cssStr}`
      ) : null}
    </style>
  );
};




export default Theme;
export { useTheme, ThemeProvider }

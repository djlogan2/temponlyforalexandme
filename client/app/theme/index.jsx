import React, { useContext, useEffect } from 'react';
import ThemeContext from './Context';

const useTheme = () => useContext(ThemeContext);

const Theme = () => {
  const theme = useTheme();

  useEffect(() => {
    theme.events.on('ready', (t) => console.log('Theme ready', t));
    theme.events.on('change', (t) => console.log('Theme change', t));
  }, []);

  console.log('__________________');
  console.log(theme);
  console.log('__________________');

  // return '';

  const str = '';

  // const str = theme?.variables ? Object.keys(theme.variables).map(
  //   key => `--${key}: ${theme.variables[key]};`
  // ).join('\n') : '';

  return (
    <style>
      {`:root body {\n${str}\n}`}
    </style>
  );
};




export default Theme;
export { useTheme, ThemeContext }

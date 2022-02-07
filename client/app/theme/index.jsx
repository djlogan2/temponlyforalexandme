import React, { useContext, useEffect } from 'react';
import ThemeContext from './Context';

const useTheme = () => useContext(ThemeContext);

const Theme = () => {
  const theme = useTheme();

  console.log('__________________');
  console.log(theme);
  console.log('__________________');

  useEffect(() => {
    // Here we need to get the current user theme
    console.log(theme.getTheme());
  }, [])

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

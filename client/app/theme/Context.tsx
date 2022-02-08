import { createContext } from "react";
import { IThemeContextValue } from "./types";

const ThemeContext = createContext<IThemeContextValue | null>(null);

export default ThemeContext;

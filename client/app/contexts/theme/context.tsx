import { createGenericContext } from "../utils";

import { ThemeContextValue } from "./types";

export const [ThemeContextProvider, useTheme] =
  createGenericContext<ThemeContextValue | null>();

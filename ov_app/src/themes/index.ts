// src/themes/index.ts
import light from "./color-themes/light";
import dark from "./color-themes/dark";
import mono from "./color-themes/mono";
import notNS from "./color-themes/notNs";

export type Scheme = "dark" | "light" | "mono" | "notNS";

// Each import MUST be a `Theme` (from createTheme)
export const themes = {
  light,
  dark,
  mono,
  notNS,
} as const;

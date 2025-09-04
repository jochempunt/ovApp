// src/themes/index.ts
import light from "./color-themes/light";
import dark from "./color-themes/dark";
import mono from "./color-themes/mono";
import notNS from "./color-themes/notNs";
import aurora from "./color-themes/aurora";
import notArriva from "./color-themes/notArriva";

export type Scheme = "dark" | "light" | "mono" | "notNS" | "aurora" | "notArriva";

// Each import MUST be a `Theme` (from createTheme)
export const themes = {
  light,
  dark,
  mono,
  notNS,
  aurora,
  notArriva,
} as const;

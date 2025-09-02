import { createContext } from "react";
import type { Scheme } from "./index";

export type ThemeControllerContextType = {
  scheme: Scheme;
  setScheme: (scheme: Scheme) => void;
};

// Create the context, with null default
export const ThemeControllerContext = createContext<ThemeControllerContextType | null>(null);

// themes/useThemeController.ts
import { useContext } from "react";
import { ThemeControllerContext } from "../themes/themeControllerContext";

export function useThemeController() {
  const ctx = useContext(ThemeControllerContext);
  if (!ctx) throw new Error("useThemeController must be used inside ThemeControllerProvider");
  return ctx;
}

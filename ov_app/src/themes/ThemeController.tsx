// themes/ThemeControllerProvider.tsx
import React, { useEffect, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { themes, type Scheme } from "./index";
import { ThemeControllerContext } from "./themeControllerContext";

export function ThemeControllerProvider({ children }: { children: React.ReactNode }) {
  const [scheme, setScheme] = useState<Scheme>(() => {
    return (localStorage.getItem("scheme") as Scheme) || "dark";
  });

  useEffect(() => {
    localStorage.setItem("scheme", scheme);
  }, [scheme]);

  return (
    <ThemeControllerContext.Provider value={{ scheme, setScheme }}>
      <ThemeProvider theme={themes[scheme]}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeControllerContext.Provider>
  );
}

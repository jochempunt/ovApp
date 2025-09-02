// dark.ts
import { createTheme, alpha } from "@mui/material/styles";

export default createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#60A5FA" }, // blue-400 accent
    secondary: { main: "#385ef8ff" }, // supporting accent (use sparingly)

    background: {
      default: "#0B0F14", // near-black with a hint of blue
      paper: "#111827", // slate-900-ish
    },

    text: {
      primary: "#E6EDF3", // softer than pure white
      secondary: "#9AA4B2", // slate-400/500
    },

    divider: alpha("#fff", 0.1), // subtle separators

    surface: {
      main: "#0F172A", // card/list background
      alt: "#0B1220", // slightly deeper alt surface
    },
  },

  shape: { borderRadius: 10 },
  typography: { fontFamily: '"Inter", sans-serif' },

  components: {
    MuiListItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.surface.main,
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.divider}`,
          "& + .MuiListItem-root": { marginTop: theme.spacing(1) },
        }),
      },
    },
    MuiChip: { styleOverrides: { root: { borderRadius: 6, fontWeight: 600 } } },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&:hover": {
            backgroundColor: theme.palette.action.hover, // nice, theme-aware
          },
          "&.Mui-selected": {
            backgroundColor: theme.palette.action.selected,
          },
          "&.Mui-selected:hover": {
            backgroundColor: theme.palette.action.selected,
          },
        }),
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.divider}`,
        }),
      },
    },
  },
});

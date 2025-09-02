// light.ts
import { createTheme, alpha } from "@mui/material/styles";

export default createTheme({
  palette: {
    mode: "light",
    primary: { main: "#2563EB" }, // unified blue accent
    secondary: { main: "#508fe6ff" }, // subtle supporting accent (use sparingly)
    background: { default: "#F6F8FC", paper: "#FFFFFF" }, // soft canvas + white surfaces
    text: { primary: "#0F172A", secondary: "#475569" }, // strong headings, calmer secondary
    divider: alpha("#000", 0.12), // crisp but light borders

    surface: {
      main: "#F0F5FF", // gentle card/list tint
      alt: "#E9EEF8", // subtle alternate section
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

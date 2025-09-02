// color-themes/mono.ts
import { alpha, createTheme } from "@mui/material/styles";

export default createTheme({
  palette: {
    mode: "light",

    // keep accents neutral/dark
    primary: { main: "#1A1A1A" }, // near-black
    secondary: { main: "#6B6B6B" }, // mid-gray

    // calm background separation
    background: {
      default: "#FFFFFF",
      paper: "#F5F5F5",
    },

    // readable but not harsh
    text: {
      primary: "#1A1A1A",
      secondary: "#555555",
      disabled: "#9A9A9A",
    },

    // subtle borders
    divider: alpha("#000", 0.35),

    // your custom tokens (see theme.d.ts)
    surface: {
      main: "#EFEFEF",
      alt: "#E6E6E6",
    },
  },

  shape: { borderRadius: 12 },
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

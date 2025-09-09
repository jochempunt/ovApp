// not-arriva.ts (Arriva-inspired dark)
import { createTheme, alpha } from "@mui/material/styles";

export default createTheme({
  palette: {
    mode: "dark",

    // Arriva-ish turquoise accent on deep purple
    primary: { main: "#00D1D2" }, // turquoise button/cta
    secondary: { main: "#7CEEEF" }, // softer cyan accent

    background: {
      default: "#1F1357", // deep indigo/purple
      paper: "#271866", // slightly lighter panel
    },

    text: {
      primary: "#F6F8FF",
      secondary: "#BFD6E6",
    },

    divider: alpha("#FFFFFF", 0.14),

    // Custom surfaces to build list cards etc.
    surface: {
      main: "#2F1E73", // card base
      alt: "#3b2b7cff", // input/menu base
    },
  },

  shape: { borderRadius: 12 },
  typography: { fontFamily: '"Inter", "TASA Orbiter", sans-serif' },

  components: {
    // Card-like list items with subtle gradient + border
    MuiListItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: `linear-gradient(135deg, ${theme.palette.surface.main} 0%, ${alpha(
            theme.palette.primary.main,
            0.06,
          )} 100%)`,
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.divider}`,
          "& + .MuiListItem-root": { marginTop: theme.spacing(1) },
        }),
      },
    },

    // Compact, high-contrast chips; uses color prop if provided
    MuiChip: {
      styleOverrides: {
        root: ({ theme, ownerState }) => {
          const isSecondary = ownerState?.color === "secondary";
          const base = isSecondary ? theme.palette.secondary.main : theme.palette.primary.main;

          return {
            borderRadius: 6,
            fontWeight: 700,
            background: alpha(base, 0.18),
            color: theme.palette.text.primary,
            border: `1px solid ${alpha(base, 0.6)}`,
            ".MuiChip-label": { letterSpacing: 0.3 },
          };
        },
      },
    },

    // Hover/focus ring feels "neon" without being harsh
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: "#FFFFFF",
          borderRadius: theme.shape.borderRadius,
          color: theme.palette.surface.main,
          "& fieldset": { borderColor: theme.palette.divider },
          "&:hover fieldset": { borderColor: theme.palette.primary.main },
          "&.Mui-focused fieldset": {
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.18)}`,
          },
        }),
      },
    },

    // Keep the nice, theme-aware menu item behavior
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&:hover": { backgroundColor: theme.palette.action.hover },
          "&.Mui-selected": { backgroundColor: theme.palette.action.selected },
          "&.Mui-selected:hover": { backgroundColor: theme.palette.action.selected },
        }),
      },
    },
    MuiSelect: {
      defaultProps: { variant: "outlined" },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius,
          color: theme.palette.text.primary,
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
          },
          boxShadow: theme.shadows[1],
        }),
        icon: ({ theme }) => ({
          color: theme.palette.text.primary,
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

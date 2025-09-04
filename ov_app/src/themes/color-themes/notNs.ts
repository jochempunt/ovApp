// ns.ts (NS-inspired light)
import { createTheme, alpha } from "@mui/material/styles";

export default createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1E4BB8" },
    secondary: { main: "#1E4BB8" },

    background: { default: "rgba(255, 216, 76, 1)", paper: "rgba(255, 207, 34, 1)" },

    text: { primary: "#0E1B3D", secondary: "#485470" },

    divider: alpha("#0b238bff", 0.3),

    surface: {
      main: "#fefadbff",
      alt: "#ffffffff",
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
          "& + .MuiListItem-root": { marginTop: theme.spacing(0.5) },
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

    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.surface.alt,
          borderRadius: theme.shape.borderRadius,
          "& fieldset": { borderColor: theme.palette.divider },
          "&:hover fieldset": { borderColor: theme.palette.primary.main },
          "&.Mui-focused fieldset": {
            borderColor: theme.palette.primary.main,
          },
        }),
      },
    },
    MuiSelect: {
      defaultProps: { variant: "outlined" },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius,
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
  },
});

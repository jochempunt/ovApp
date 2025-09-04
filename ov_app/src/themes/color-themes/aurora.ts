// aurora.ts
import { createTheme, alpha } from "@mui/material/styles";

export default createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#76d8dfff" },
    secondary: { main: "#d05ce3" },

    background: {
      default: "#0b0b23ff",
      paper: "#111422",
    },

    text: {
      primary: "#e8fffeff",
      secondary: "#a6f9ffff",
    },

    divider: alpha("#ffffff", 0.08),

    surface: {
      main: "#26143bff",
      alt: "#1e0f2eff",
    },
  },

  shape: { borderRadius: 12 },
  typography: { fontFamily: '"TASA Orbiter", sans-serif' },

  components: {
    MuiListItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: `linear-gradient(135deg, ${theme.palette.surface.main} 0%, #1c2538 100%)`,
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.divider}`,
          "& + .MuiListItem-root": { marginTop: theme.spacing(1) },
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 6,
          fontWeight: 600,
          background: theme.palette.primary.main,
          color: "#0A0B1A",
        }),
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.divider}`,
          background: theme.palette.surface.alt,
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
  },
});

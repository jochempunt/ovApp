// let TS know our custom palette keys exist
import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    surface: {
      main: string; // list items / secondary bg
      alt: string; // optional: zebra rows / subtle alt
    };
  }
  interface PaletteOptions {
    surface?: {
      main?: string;
      alt?: string;
    };
  }
}

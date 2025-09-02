// src/components/ThemeSwitcher.tsx
import { MenuItem, Select, FormControl, InputLabel, ListSubheader } from "@mui/material";
import { useThemeController } from "../../hooks/useThemeController";
import { type Scheme } from "../../themes/index";

export default function ThemeSwitcher() {
  const { scheme, setScheme } = useThemeController();

  // Group themes dynamically by light/dark

  return (
    <FormControl size="small" sx={{ minWidth: 120, alignSelf: "center" }}>
      <InputLabel id="theme-label">Theme</InputLabel>
      <Select
        labelId="theme-label"
        value={scheme}
        label="Theme"
        onChange={(e) => setScheme(e.target.value as Scheme)}
        MenuProps={{
          MenuListProps: { dense: true },
        }}
      >
        <ListSubheader
          disableSticky
          sx={(t) => ({
            fontSize: "0.75rem",
            fontWeight: 500,
            color: t.palette.text.secondary,
            lineHeight: 1.4,
            py: 0.25, // tighter
          })}
        >
          Light ───
        </ListSubheader>
        <MenuItem value="light">Light</MenuItem>
        <MenuItem value="notNS">not NS</MenuItem>
        <MenuItem value="mono">Mono</MenuItem>

        <ListSubheader
          disableSticky
          sx={(t) => ({
            fontSize: "0.75rem",
            fontWeight: 500,
            color: t.palette.text.secondary,
            lineHeight: 1.4,
            py: 0.25,
          })}
        >
          Dark ───
        </ListSubheader>
        <MenuItem value="dark">Dark</MenuItem>
      </Select>
    </FormControl>
  );
}

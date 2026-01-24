import { Typography } from "@mui/material";
import { useNowTime } from "../../hooks/useNowTime";

export default function Clock() {
  const now = useNowTime(1000);

  return (
    // Clock.tsx
    <Typography
      sx={(t) => ({
        fontSize: "clamp(1.75rem, 5vw, 2.75rem)",
        fontWeight: 400,
        fontVariantNumeric: "tabular-nums", // prevents “jumping”
        fontFamily: '"Inter", system-ui, monospace',
        lineHeight: 1,
        color: t.palette.text.primary,
      })}
    >
      {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
    </Typography>
  );
}

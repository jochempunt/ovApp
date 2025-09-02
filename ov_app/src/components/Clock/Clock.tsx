import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
      {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
    </Typography>
  );
}

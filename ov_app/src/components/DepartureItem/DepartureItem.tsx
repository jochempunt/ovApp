import type { OVPass } from "../../types/ovApi.types";
import { formatTime } from "../../utils/format";
import styles from "./DepartureItem.module.css";
import { Box, Chip, ListItem, ListItemText, Typography } from "@mui/material";

type Props = { pass: OVPass; idx: number };

function minutesUntil(time?: string): number {
  if (!time) return 0;
  return Math.max(0, Math.round((new Date(time).getTime() - Date.now()) / 60000));
}

export default function DepartureItem({ pass }: Props) {
  return (
    <ListItem
      disableGutters
      sx={(t) => ({
        bgcolor: t.palette.surface.main,
        borderRadius: 2,
        border: `1px solid ${t.palette.divider}`,
        mb: 1,
        py: 1,
        px: 2,
        display: "flex",
        minHeight: 90,
        maxHeight: 90,
        minWidth: 250,
      })}
    >
      <ListItemText
        primary={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Chip
              label={pass.LinePublicNumber ?? "?"}
              size="small"
              color="primary"
              sx={{ height: 22 }}
            />
            <Typography variant="subtitle1" fontWeight={700}>
              {pass.DestinationName50 ?? "?"}
            </Typography>
          </Box>
        }
        secondary={
          <Typography variant="body2" color="text.secondary" className={styles.minutesUntil}>
            {formatTime(pass.ExpectedDepartureTime)} ({"in " +minutesUntil(pass.ExpectedDepartureTime)}{" "}
            min)
          </Typography>
        }
      />
      {pass.TransportType && (
        <Chip label={pass.TransportType} size="small" variant="outlined" sx={{ ml: 1 }} />
      )}
    </ListItem>
  );
}

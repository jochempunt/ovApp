import { Typography } from "@mui/material";
import type { Stop } from "../../types/ovApi.types";

type StatusBarProps = {
  status: "idle" | "pending" | "success" | "error";
  stop?: Stop;
  error?: Error | null;
};

export default function StatusBar({ status, stop, error }: StatusBarProps) {
  switch (status) {
    case "success":
      return (
        <Typography variant="h5" gutterBottom>
          {stop?.TimingPointName ? (
            <>
              Departures: <b>{stop.TimingPointName}</b>{" "}
              {stop.TimingPointName.includes(stop.TimingPointTown ?? "") ? (
                ""
              ) : (
                <>({stop.TimingPointTown})</>
              )}
            </>
          ) : (
            "Stop not found"
          )}
        </Typography>
      );
      break;

    case "error":
      return (
        <Typography variant="h5" gutterBottom>
          Error: <b>{error?.message ?? "Error fetching departures"}</b>
        </Typography>
      );
      break;

    case "pending":
      return (
        <Typography variant="h5" gutterBottom>
          Loading departures...
        </Typography>
      );
      break;

    default:
      return null;
  }
}

import { Typography } from "@mui/material";

type StatusBarProps = {
  status: "idle" | "pending" | "success" | "error";
  stop: {
    name: string | undefined,
    town: string | undefined,
    code: string | undefined
  } | null;
  error?: Error | null;
  isLoadingDepartures: boolean | null;
};

const shouldShowTown = (name?: string, town?: string) =>
  !!name && !!town && !name.toLowerCase().includes(town.toLowerCase());

export default function StatusBar({ status, stop, error, isLoadingDepartures }: StatusBarProps) {
  if (isLoadingDepartures && stop) {
    return (
      <Typography variant="h5" gutterBottom>
      Departures: <b>{stop.name}</b>{" "}
      {shouldShowTown(stop?.name,stop?.town) && <>({stop.town})</>}
      {"  "}
      <Typography component="span" color="text.secondary">
      Loading...
      </Typography>
      </Typography>
    );
  }
  
  switch (status) {
    case "success":
    return (
      <Typography variant="h5" component="h1" gutterBottom>
      {stop ? (
        <>
        Departures: <b>{stop.name}</b>{" "}
        {shouldShowTown(stop?.name,stop?.town)&& (
          <>({stop.town})</>
        )}
        </>
      ) : (
        "Stop not found"
      )}
      </Typography>
    );
    case "error":
    return (
      <Typography variant="h5" gutterBottom>
      Error: <b>{error?.message ?? "Error fetching departures"}</b>
      </Typography>
    );
    case "pending":
    return (
      <Typography variant="h5" gutterBottom>
      Loading departures...
      </Typography>
    );
    default:
    return null;
  }
}
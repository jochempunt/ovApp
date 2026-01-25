import { Typography, Box, Chip } from "@mui/material";
import WifiOffIcon from '@mui/icons-material/WifiOff';

type StatusBarProps = {
  status: "idle" | "pending" | "success" | "error";
  stop: {
    name: string | undefined,
    town: string | undefined,
    code: string | undefined
  } | null;
  error?: Error | null;
  isLoadingDepartures: boolean | null;
  isOnline?: boolean; 
};

const shouldShowTown = (name?: string, town?: string) =>
  !!name && !!town && !name.toLowerCase().includes(town.toLowerCase());

export default function StatusBar({ status, stop, error, isLoadingDepartures, isOnline = true }: StatusBarProps) {
  if (isLoadingDepartures && stop) {
    return (
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          Departures: <b>{stop.name}</b>{" "}
          {shouldShowTown(stop?.name, stop?.town) && <>({stop.town})</>}
          {"  "}
          <Typography component="span" color="text.secondary">
            Loading...
          </Typography>
        </Typography>
        {!isOnline && (
          <Chip 
            icon={<WifiOffIcon />} 
            label="Offline - Showing cached data" 
            color="warning" 
            size="small"
            sx={{ mt: 1 }}
          />
        )}
      </Box>
    );
  }

  switch (status) {
    case "success":
      return (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            {stop ? (
              <>
                Departures: <b>{stop.name}</b>{" "}
                {shouldShowTown(stop?.name, stop?.town) && (
                  <>({stop.town})</>
                )}
              </>
            ) : (
              "Stop not found"
            )}
          </Typography>
          {!isOnline && (
            <Chip 
              icon={<WifiOffIcon />} 
              label="Offline - Showing cached data" 
              color="warning" 
              size="small"
            />
          )}
        </Box>
      );

    case "error":
      return (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" gutterBottom>
            Error: <b>{error?.message ?? "Error fetching departures"}</b>
          </Typography>
          {!isOnline && (
            <Chip 
              icon={<WifiOffIcon />} 
              label="You're offline" 
              color="warning" 
              size="small"
              sx={{ mt: 1 }}
            />
          )}
        </Box>
      );

    case "pending":
      return (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" gutterBottom>
            Loading departures...
          </Typography>
          {!isOnline && (
            <Chip 
              icon={<WifiOffIcon />} 
              label="You're offline" 
              color="warning" 
              size="small"
              sx={{ mt: 1 }}
            />
          )}
        </Box>
      );

    default:
      return null;
  }
}
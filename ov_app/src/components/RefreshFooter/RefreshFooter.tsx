import { Box, Button, Typography, CircularProgress } from "@mui/material";

type RefreshFooterProps = {
  refetch: () => void;
  dataUpdatedAt: number;
  isFetching?: boolean;
};

export default function RefreshFooter({ refetch, dataUpdatedAt, isFetching }: RefreshFooterProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
      <Button variant="contained" color="secondary" onClick={() => refetch()} disabled={isFetching}>
        {isFetching ? "Refreshing..." : "Refresh"}
      </Button>

      {isFetching ? (
        <CircularProgress size={20} />
      ) : (
        dataUpdatedAt > 0 && (
          <Typography variant="body2" color="text.secondary">
            Last updated:{" "}
            {new Date(dataUpdatedAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </Typography>
        )
      )}
    </Box>
  );
}

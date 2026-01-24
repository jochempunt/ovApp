import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { formatSecondsAgo } from "../../utils/format";
import { useNowTime } from "../../hooks/useNowTime";

type RefreshFooterProps = {
  refetch: () => void;
  dataUpdatedAt: number;
  isFetching?: boolean;
};

export default function RefreshFooter({ refetch, dataUpdatedAt, isFetching }: RefreshFooterProps) {
  const now = useNowTime(5000);
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
            {formatSecondsAgo(dataUpdatedAt, now.getTime())}
          </Typography>
        )
      )}
    </Box>
  );
}

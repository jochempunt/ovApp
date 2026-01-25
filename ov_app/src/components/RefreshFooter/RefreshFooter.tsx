import { Box, Button, Typography, CircularProgress, IconButton, Tooltip, Snackbar, Alert } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { formatSecondsAgo } from "../../utils/format";
import { useNowTime } from "../../hooks/useNowTime";
import { useState } from "react";


type RefreshFooterProps = {
  refetch: () => void;
  dataUpdatedAt: number;
  isFetching?: boolean;
  stopName?: string;
  stopCode?: string;
};

export default function RefreshFooter({ 
  refetch, 
  dataUpdatedAt, 
  isFetching,
  stopName,
  stopCode 
}: RefreshFooterProps) {
  const now = useNowTime(5000);
  const canShare = typeof navigator.share === 'function';
  const [showCopied, setShowCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    const text = stopName ? `Live departures for ${stopName}` : 'Live transit departures';

    if (navigator.share) {
      try {
        await navigator.share({ title: text, url });
        return;
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
      }
    }

    await navigator.clipboard.writeText(url);
    setShowCopied(true);
  };

  return (
    <Box sx={{ 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "space-between",
      gap: 2, 
      mt: 2 
    }}>
      {/* Left side: Refresh button and status */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={() => refetch()} 
          disabled={isFetching}
          startIcon={<RefreshIcon />}
        >
          {isFetching ? "Refreshing..." : "Refresh"}
        </Button>
        
        {isFetching ? (
          <CircularProgress size={20} />
        ) : (
          dataUpdatedAt > 0 && (
            <Typography variant="body2" color="text.secondary">
              Last updated: {formatSecondsAgo(dataUpdatedAt, now.getTime())}
            </Typography>
          )
        )}
      </Box>

      {/* Right side: Share button */}
      {stopCode && (
        <Tooltip title={canShare ? 'Share live departures' : 'Copy link'}>
          <IconButton 
            onClick={handleShare}
            color="primary"
            size="large"
          >
            {canShare ? <ShareIcon /> : <ContentCopyIcon />}
          </IconButton>
        </Tooltip>
      )}

       <Snackbar
              open={showCopied}
              autoHideDuration={1000}
              onClose={() => setShowCopied(false)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              >
              <Alert severity="success">Link copied!</Alert>
              </Snackbar>
      
    </Box>
  );
}
import { useState } from 'react';
import { Button, Snackbar, Alert, Tooltip } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface ShareButtonProps {
  stopCode?: string;
  stopName?: string;
}

export default function ShareButton({ stopCode, stopName }: ShareButtonProps) {
    const canShare = typeof navigator.share === 'function';
  const [showCopied, setShowCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    const text = stopName ? `Live departures for ${stopName}` : 'Live transit departures';

    //native share (mobile)
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
    <>
      <Tooltip title={canShare ? 'Share live departures' : 'Copy link'}>
        <Button
          variant="outlined"
          size="small"
          startIcon={canShare? <ShareIcon /> : <ContentCopyIcon />}
          onClick={handleShare}
        >
          {canShare ? 'Share' : 'Copy Link'}
        </Button>
      </Tooltip>
      
      <Snackbar
        open={showCopied}
        autoHideDuration={2000}
        onClose={() => setShowCopied(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success">Link copied!</Alert>
      </Snackbar>
    </>
  );
}
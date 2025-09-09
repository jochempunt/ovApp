import { ListItem, ListItemButton, Typography, Box } from "@mui/material";
import type { StopAreaItem } from "../../../../hooks/useStopAreaQuery";

type stopItemOptionProps = {
  name: string;
  town?: string;
  stopArea: StopAreaItem;
  onClick?: () => void;
}

export default function StopItemOption({ name, town, stopArea, onClick }: stopItemOptionProps) {
  return (
    <ListItem disablePadding >
      <ListItemButton
        onClick={onClick}

        sx={(t) => ({
          borderRadius: 1,
          '&:hover': {
            backgroundColor: t.palette.surface.alt,
          }
        })}

      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Box >
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {name}
            </Typography>
            {town && (
              <Typography variant="body2" color="text.secondary">
                {town}
              </Typography>
            )}
          </Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              fontFamily: 'monospace',
              backgroundColor: 'action.selected',
              px: 1,
              py: 0.2,
              borderRadius: 1,
              fontSize: '0.75rem'
            }}
          >
            {stopArea.code}
          </Typography>
        </Box>
      </ListItemButton>
    </ListItem>
  );
}
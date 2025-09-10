import { ListItem, ListItemButton, Typography, Box } from "@mui/material";
import { forwardRef } from "react";
import type { StopAreaItem } from "../../../../hooks/useStopAreaQuery";

type stopItemOptionProps = {
  name: string;
  town?: string;
  stopArea: StopAreaItem;
  selected?: boolean;
  onClick?: () => void;
}

const StopItemOption = forwardRef<HTMLLIElement, stopItemOptionProps>(
  ({ name, town, stopArea, selected, onClick }, ref) => {
    return (
      <ListItem disablePadding ref={ref}>
        <ListItemButton
          tabIndex={-1}
          onClick={onClick}
          sx={(t) => ({
            borderRadius: 1,
            backgroundColor: selected ? t.palette.action.hover : 'transparent',
            '&:hover': {
              backgroundColor: selected
                ? t.palette.action.hover
                : t.palette.surface?.alt || t.palette.action.hover,
            }
          })}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Box>
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
);



export default StopItemOption;
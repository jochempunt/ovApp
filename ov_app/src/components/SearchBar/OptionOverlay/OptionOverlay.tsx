import { List, Paper } from "@mui/material";
import { useEffect, useRef } from "react";
import StopItemOption from "./StopItemOption/StopItemOption";
import type { StopAreaItem } from "../../../hooks/useStopAreaQuery";

type OptionOverlayProps = {
  stopAreas: StopAreaItem[];
  onSelectStop?: (stop: StopAreaItem) => void;
  selectedIndex: number;
}

export default function OptionOverlay({ 
  stopAreas, 
  onSelectStop, 
  selectedIndex 
}: OptionOverlayProps) {
  const selectedItemRef = useRef<HTMLLIElement | null>(null);

  // Scroll selected item into view
  useEffect(() => {
    selectedItemRef.current?.scrollIntoView({
      block: 'nearest',
      behavior: 'smooth'
    });
  }, [selectedIndex]);

  return (
    <Paper
      elevation={4}
      sx={(t) => ({
        position: 'absolute',
        zIndex: 1300,
        width: '100%',
        mt: 0.5,
        border: 1,
        borderColor: t.palette.divider,
        borderRadius: 1
      })}
    >
        
      <List sx={{ maxHeight: 280, overflowY: 'auto', p: 0 , borderRadius:1}} dense>
        {stopAreas.map((stop, index) => (
          <StopItemOption
            key={stop.code}
            name={stop.name}
            town={stop.town}
            stopArea={stop}
            onClick={() => onSelectStop?.(stop)}
            selected={index === selectedIndex}
            ref={index === selectedIndex ? selectedItemRef : null}
          />
        ))}
      </List>
    </Paper>
  );
}
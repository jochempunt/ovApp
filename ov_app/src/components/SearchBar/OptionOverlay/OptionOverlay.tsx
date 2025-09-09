import { List, Paper } from "@mui/material";
import StopItemOption from "./StopItemOption/StopItemOption";
import type { StopAreaItem } from "../../../hooks/useStopAreaQuery";

type optionOverlayProps = {
    stopAreas: StopAreaItem[];
    onSelectStop?: (stop: StopAreaItem) => void;
}

export default function OptionOverlay({ stopAreas, onSelectStop }: optionOverlayProps) {
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
            <List sx={{ maxHeight: 280, overflowY: 'auto', p: 0 }}>
                {stopAreas.map((stop) => (
                    <StopItemOption
                        key={stop.code}
                        name={stop.name}
                        town={stop.town}
                        stopArea={stop}
                        onClick={() => onSelectStop?.(stop)}
                    />
                ))}
            </List>
        </Paper>
    );
}
import { List, Paper } from "@mui/material";
import { useEffect, useRef } from "react";
import StopItemOption from "./StopItemOption/StopItemOption";
import type { StopAreaItem } from "../../../hooks/useStopAreaQuery";

type OptionOverlayProps = {
    stopAreas: StopAreaItem[];
    onSelectStop?: (stop: StopAreaItem) => void;
    selectedIndex: number; // Add this prop
}

export default function OptionOverlay({ stopAreas, onSelectStop, selectedIndex }: OptionOverlayProps) {
    const listRef = useRef<HTMLUListElement>(null);
    const selectedItemRefs = useRef<(HTMLLIElement | null)[]>([]);

    // Update refs array when stopAreas change
    useEffect(() => {
        selectedItemRefs.current = selectedItemRefs.current.slice(0, stopAreas.length);
    }, [stopAreas.length]);

    // Scroll selected item into view
    useEffect(() => {
        if (selectedIndex >= 0 && selectedItemRefs.current[selectedIndex]) {
            selectedItemRefs.current[selectedIndex]?.scrollIntoView({
                block: 'nearest',
                behavior: 'smooth'
            });
        }
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
            <List
                ref={listRef}
                sx={{ maxHeight: 280, overflowY: 'auto', p: 0 }}
            >
                {stopAreas.map((stop, index) => (
                    <StopItemOption
                        key={stop.code}
                        name={stop.name}
                        town={stop.town}
                        stopArea={stop}
                        onClick={() => onSelectStop?.(stop)}
                        selected={index === selectedIndex}
                        ref={(el) => {
                            selectedItemRefs.current[index] = el;
                        }}
                    />
                ))}
            </List>
        </Paper>
    );
}
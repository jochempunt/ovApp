import { Box, InputAdornment, TextField } from "@mui/material";
import { useState, useEffect, type ChangeEvent } from "react";
import type { StopAreaItem } from "../../hooks/useStopAreaQuery";
import OptionOverlay from "./OptionOverlay/OptionOverlay";
import SearchIcon from "@mui/icons-material/Search"


type NewSearchBarProps = {
    allStopAreads?: StopAreaItem[];
    setStopCode: (stopCode: string, selectedStop: StopAreaItem) => void;
}

export default function NewSearchBar({ allStopAreads, setStopCode }: NewSearchBarProps) {
    const [userInput, setUserInput] = useState("");
    const [filteredStops, setFilteredStops] = useState<StopAreaItem[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1); // -1 means no selection

    const filterStops = (input: string) => {
        if (!allStopAreads || !input.trim()) return [];
        const lowerInput = input.toLowerCase().trim();
        const parts = lowerInput.split(' ');
        return allStopAreads
            .filter((stop) => {
                const name = stop.name.toLowerCase();
                const town = stop.town.toLowerCase();
                // Single word: match start of name or town, or anywhere in name
                if (parts.length === 1) {
                    return name.startsWith(lowerInput) ||
                        town.startsWith(lowerInput) ||
                        name.includes(lowerInput);
                }
                // Multiple words: check if all parts match somewhere
                return parts.every((part: string) =>
                    name.includes(part) || town.includes(part)
                );
            })
            .sort((a: StopAreaItem, b: StopAreaItem) => {
                const aNameStarts = a.name.toLowerCase().startsWith(lowerInput);
                const bNameStarts = b.name.toLowerCase().startsWith(lowerInput);
                const aTownStarts = a.town.toLowerCase().startsWith(lowerInput);
                const bTownStarts = b.town.toLowerCase().startsWith(lowerInput);
                const aStarts = aNameStarts || aTownStarts;
                const bStarts = bNameStarts || bTownStarts;
                if (aStarts && !bStarts) return -1;
                if (!aStarts && bStarts) return 1;
                if (aStarts && bStarts) {
                    if (aNameStarts && !bNameStarts) return -1;
                    if (!aNameStarts && bNameStarts) return 1;
                }
                return a.name.localeCompare(b.name);
            })
            .slice(0, 10);
    };

    const handleInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        console.log("User input:", value);
        const filtered = filterStops(value);
        console.log("Filtered stops:", filtered);
        setFilteredStops(filtered);
        setUserInput(value);
    };

    // Reset selection when filtered stops change
    useEffect(() => {
        setSelectedIndex(-1);
    }, [filteredStops]);

    const handleSelectStop = (stop: StopAreaItem) => {
        console.log("tadaa:", stop);
        setFilteredStops([]);
        setUserInput(stop.name);
        setStopCode(stop.code, stop);
        setSelectedIndex(-1);
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Only handle keyboard navigation when overlay is open
        if (filteredStops.length === 0) {
            if (e.key === "Enter") {
                // If no overlay, just apply current input (your existing logic)
                console.log("Applying input:", userInput);
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < filteredStops.length - 1 ? prev + 1 : 0
                );
                break;

            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev > 0 ? prev - 1 : filteredStops.length - 1
                );
                break;

            case 'Enter':
                {
                    e.preventDefault();
                    // If no item is selected (selectedIndex === -1), select first item
                    const indexToSelect = selectedIndex === -1 ? 0 : selectedIndex;
                    const selectedStop = filteredStops[indexToSelect];
                    if (selectedStop) {
                        handleSelectStop(selectedStop);
                    }
                    break;
                }

            case 'Escape':
                e.preventDefault();
                setFilteredStops([]);
                setSelectedIndex(-1);
                break;
        }
    };

    return (
        <>
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <TextField
                    variant="outlined"
                    color="primary"
                    value={userInput}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    label="Stop Name"
                    fullWidth
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }
                    }}
                />
            </Box>
            <Box sx={{ position: "relative" }}>
                {filteredStops.length > 0 && (
                    <OptionOverlay
                        onSelectStop={handleSelectStop}
                        stopAreas={filteredStops}
                        selectedIndex={selectedIndex}
                    />
                )}
            </Box>
        </>
    );
}
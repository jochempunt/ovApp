import { Box, TextField } from "@mui/material";
import { useState, type ChangeEvent } from "react";
import type { StopAreaItem } from "../../hooks/useStopAreaQuery";
import OptionOverlay from "./OptionOverlay/OptionOverlay";

type NewSearchBarProps = {
    allStopAreads?: StopAreaItem[];
    setStopCode: (stopCode: string, selectedStop: StopAreaItem) => void;
}

export default function NewSearchBar({ allStopAreads, setStopCode }: NewSearchBarProps) {
    const [userInput, setUserInput] = useState("");
    const [filteredStops, setFilteredStops] = useState<StopAreaItem[]>([]);

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
        console.log("Filtered stops:", filterStops(value));
        setFilteredStops(filterStops(value));
        setUserInput(value);
    };

    const applyStop = () => {
        console.log("Applying input:", userInput);
    };

    const handleSelectStop = (stop: StopAreaItem) => {
        console.log("tadaa:", stop);
        setFilteredStops([]);
        setUserInput(stop.name);
        setStopCode(stop.code, stop); // Pass both values
    }

    return (
        <>
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <TextField
                    variant="outlined"
                    color="primary"
                    value={userInput}
                    onChange={handleInput}
                    label="Stop Name"
                    fullWidth
                    onKeyDown={(e) => {
                        if (e.key === "Enter") applyStop();
                    }}
                />
            </Box>
            <Box sx={{ position: "relative" }}>
                {filteredStops.length > 0 && <OptionOverlay onSelectStop={handleSelectStop} stopAreas={filteredStops} />}
            </Box>
        </>
    );
}
import { Box, InputAdornment, TextField } from "@mui/material";
import { useState, useEffect, type ChangeEvent, useRef } from "react";
import type { StopAreaItem } from "../../hooks/useStopAreaQuery";
import OptionOverlay from "./OptionOverlay/OptionOverlay";
import SearchIcon from "@mui/icons-material/Search";
import { useStopSearch } from "../../hooks/useFilterStops";


type SearchBarProps = {
    allStopAreads?: StopAreaItem[];
    setStopCode: (stopCode: string, selectedStop: StopAreaItem) => void;
}

export default function SearchBar({ allStopAreads, setStopCode }: SearchBarProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const { input, setInput, filteredStops, setFilteredStops } = useStopSearch(allStopAreads);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    
    useEffect(() => {
        setSelectedIndex(-1);
    }, [filteredStops]);
    
    const handleInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInput(event.target.value);
    };
    
    const handleSelectStop = (stop: StopAreaItem) => {
        setFilteredStops([]);
        setInput("");
        setStopCode(stop.code, stop);
        setSelectedIndex(-1);
        inputRef.current?.blur();
    };
    
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (filteredStops.length === 0) {
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
            e.preventDefault();
            const indexToSelect = selectedIndex === -1 ? 0 : selectedIndex;
            const selectedStop = filteredStops[indexToSelect];
            if (selectedStop) {
                handleSelectStop(selectedStop);
            }
            break;
            
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
        inputRef={inputRef}
        variant="outlined"
        color="primary"
        value={input}
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
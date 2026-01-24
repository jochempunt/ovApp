// hooks/useStopSearch.ts
import { useState, useEffect } from "react";
import type { StopAreaItem } from "./useStopAreaQuery";
import { useDebounce } from "./useDebounce";

export function useStopSearch(allStops?: StopAreaItem[], debounceMs = 50) {
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, debounceMs);
  const [filteredStops, setFilteredStops] = useState<StopAreaItem[]>([]);

  useEffect(() => {
    if (!allStops || !debouncedInput.trim()) {
      setFilteredStops([]);
      return;
    }

    const lowerInput = debouncedInput.toLowerCase().trim();
    const parts = lowerInput.split(' ');

    const filtered = allStops
      .filter((stop) => {
        const name = stop.name.toLowerCase();
        const town = stop.town.toLowerCase();

        if (parts.length === 1) {
          return name.startsWith(lowerInput) ||
            town.startsWith(lowerInput) ||
            name.includes(lowerInput);
        }

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

    setFilteredStops(filtered);
  }, [debouncedInput, allStops]);

  return {
    input,
    setInput,
    filteredStops,
    setFilteredStops, 
  };
}
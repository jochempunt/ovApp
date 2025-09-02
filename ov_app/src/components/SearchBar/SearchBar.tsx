import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

type SearchBarProps = {
  stopCode: string;
  onChangeStop: (code: string) => void;
};

export default function SearchBar({ stopCode, onChangeStop }: SearchBarProps) {
  const [input, setInput] = useState(stopCode);

  const applyStop = () => {
    if (input.trim()) {
      onChangeStop(input.trim());
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
      <TextField
        variant="outlined"
        color="primary"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        label="Stop code"
        fullWidth
        onKeyDown={(e) => {
          if (e.key === "Enter") applyStop();
        }}
      />
      <Button
        variant="contained"
        onClick={applyStop}
        disabled={!input.trim() || input === stopCode}
      >
        Set
      </Button>
    </Box>
  );
}

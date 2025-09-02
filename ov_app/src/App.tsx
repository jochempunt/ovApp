import { Box, Container, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchDepartures } from "./services/ovAPI";
import type { OVResponse } from "./types/ovApi.types";
import DepartureList from "./components/DepartureList/DepartureList";
import { parseDepartures, parseStop } from "./utils/parsers";
import { useEffect, useMemo, useState } from "react";
import StatusBar from "./components/StatusBar/StatusBar";
import RefreshFooter from "./components/RefreshFooter/RefreshFooter";
import SearchBar from "./components/SearchBar/SearchBar";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";
import Clock from "./components/Clock/Clock";

export default function App() {
  const [stopCode, setStopCode] = useState(() => {
    return localStorage.getItem("stopCode") || "MttAca";
  });

  useEffect(() => {
    localStorage.setItem("stopCode", stopCode);
  }, [stopCode]);

  const { data, error, status, refetch, dataUpdatedAt, isFetching } = useQuery<OVResponse, Error>({
    queryKey: ["departures", stopCode],
    queryFn: () => fetchDepartures(stopCode),
    refetchInterval: 30000,
    enabled: !!stopCode.trim(),
    placeholderData: (prev) => prev,
    gcTime: 30 * 60 * 1000,
    staleTime: 30_000,
  });

  const stop = data ? parseStop(data) : undefined;

  const departures = useMemo(() => parseDepartures(data, 5), [data]);

  useEffect(() => {
    document.title = stop
      ? `Departures: ${stop.TimingPointName + " " + stop?.TimingPointTown}`
      : "Stop not found";
  }, [stop]);

  return (
    <>
      <Container maxWidth="sm" sx={{ py: 4 }}>
        {/* --- HEADER --- */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <ThemeSwitcher />
          <Clock />
        </Box>
        {/* --- BODY --- */}
        <SearchBar stopCode={stopCode} onChangeStop={setStopCode} />
        <StatusBar status={status} stop={stop} error={error} />
        {departures.length > 0 ? (
          <DepartureList departures={departures} />
        ) : (
          <Typography>No upcoming departures</Typography>
        )}
        {/* --- FOOTER --- */}
        <RefreshFooter refetch={refetch} dataUpdatedAt={dataUpdatedAt} isFetching={isFetching} />
      </Container>
    </>
  );
}

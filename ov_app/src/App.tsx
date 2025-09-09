import { Box, Container, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchDepartures } from "./services/ovAPI";
import type { OVResponse } from "./types/ovApi.types";
import DepartureList from "./components/DepartureList/DepartureList";
import { parseDeparturesAll, parseStopFromAnyTP } from "./utils/parsers";
import { useEffect, useMemo, useState } from "react";
import StatusBar from "./components/StatusBar/StatusBar";
import RefreshFooter from "./components/RefreshFooter/RefreshFooter";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";
import Clock from "./components/Clock/Clock";
import { useStopAreasQuery } from "./hooks/useStopAreaQuery";
import NewSearchBar from "./components/SearchBar/NewSearchBar";
import type { StopAreaItem } from "./hooks/useStopAreaQuery";

export default function App() {
  const [stopCode, setStopCode] = useState(() => {
    return localStorage.getItem("stopCode") || "MttAca";
  });

  const [selectedStop, setSelectedStop] = useState<StopAreaItem | null>(null);

  useEffect(() => {
    localStorage.setItem("stopCode", stopCode);
  }, [stopCode]);

  const {
    data: stopAreasData,
    isLoading: isStopsLoading,
    isError: isStopsError,
  } = useStopAreasQuery();

  useEffect(() => {
    if (stopAreasData) {
      console.log("StopAreas loaded:", {
        count: stopAreasData.index.length,
        sample: stopAreasData.index.slice(0, 5),
      });
    }
  }, [stopAreasData]);

  const { data, error, status, refetch, dataUpdatedAt, isFetching } = useQuery<OVResponse, Error>({
    queryKey: ["departures", stopCode],
    queryFn: () => fetchDepartures(stopCode),
    refetchInterval: 30000,
    enabled: !!stopCode.trim(),
    placeholderData: (prev) => prev,
    gcTime: 30 * 60 * 1000,
    staleTime: 30_000,
  });

  const stop = data ? parseStopFromAnyTP(data) : undefined;
  const departures = useMemo(() => parseDeparturesAll(data, 5), [data]);

  const displayStop = useMemo(() => {
    return selectedStop || (stop ? {
      name: stop.TimingPointName,
      town: stop.TimingPointTown,
      code: stopCode
    } : null);
  }, [selectedStop, stop, stopCode]);

  useEffect(() => {
    document.title = displayStop
      ? `Departures: ${displayStop.name}${displayStop.town ? ` (${displayStop.town})` : ""}`
      : "Stop not found";
  }, [displayStop]);

  const handleStopCodeChange = (newStopCode: string, newSelectedStop: StopAreaItem) => {
    setSelectedStop(newSelectedStop);
    setStopCode(newStopCode);
  };


  const isLoadingDepartures = isFetching && selectedStop && stopCode === selectedStop.code;

  return (
    <>
      <Container maxWidth="md" sx={{ py: 4, mx: "auto" }}>
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
        <NewSearchBar
          allStopAreads={stopAreasData?.index}
          setStopCode={handleStopCodeChange}
        />

        <StatusBar
          status={status}
          stop={displayStop}
          error={error}
          isLoadingDepartures={isLoadingDepartures}
        />

        {isLoadingDepartures ? (
          <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            Loading departures...
          </Typography>
        ) : departures.length > 0 ? (
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
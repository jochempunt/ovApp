import { Alert, Box, Container, Typography } from "@mui/material";
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
import SearchBar from "./components/SearchBar/SearchBar";
import { getInitialStop, readStopFromUrl, saveStopToStorage, writeStopToUrl } from "./utils/storage";
import { useOnlineStatus } from "./hooks/onlineStatus";


export default function App() {
  
  const [stopCode, setStopCode] = useState(() => getInitialStop());
  const isOnline = useOnlineStatus(); 
  
  const {
    data: stopAreasData,
  } = useStopAreasQuery();
  
  const selectedStop = useMemo(() => {
    if (!stopAreasData?.index) return null;
    return stopAreasData.index.find(s => s.code.toLowerCase() === stopCode.toLowerCase()) ?? null;
  }, [stopAreasData, stopCode]);
  
  useEffect(() => {
    if (stopAreasData) {
      console.log("StopAreas loaded:", {
        count: stopAreasData.index.length,
        sample: stopAreasData.index.slice(0, 5),
      });
    }
  }, [stopAreasData]);
  
  useEffect(() => {
    const onPopState = () => {
      const fromUrl = readStopFromUrl();
      if (fromUrl) {
        setStopCode(fromUrl);
        saveStopToStorage(fromUrl); 
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  
  const { data, error, status, refetch, dataUpdatedAt, isFetching } = useQuery<OVResponse, Error>({
    queryKey: ["departures", stopCode],
    queryFn: () => fetchDepartures(stopCode),
    refetchInterval: isOnline ? 30000 : false,
    enabled: !!stopCode.trim(),
    placeholderData: undefined,
    gcTime: 30 * 60 * 1000,
    staleTime: 30_000,
    retry: isOnline ? 2 : 0, 
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
  
  const handleStopCodeChange = (newStopCode: string) => {
    if(isOnline){
      setStopCode(newStopCode);
      writeStopToUrl(newStopCode, "replace");
      saveStopToStorage(newStopCode); 
    }
  };
  
  const isLoadingDepartures = isFetching && !!stop;
  
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
    <SearchBar
    allStopAreads={stopAreasData?.index}
    setStopCode={handleStopCodeChange}
    />
    
    <StatusBar
    status={status}
    stop={displayStop}
    error={error}
    isLoadingDepartures={isLoadingDepartures}
    isOnline={isOnline}
    />
    
    {departures.length > 0 ? (
      <DepartureList departures={departures} />
    ) : (
      <Typography>
      {isLoadingDepartures ? 'Loading departures...' : 'No upcoming departures'}
      </Typography>
    )}
    
    
    <RefreshFooter 
    refetch={refetch} 
    dataUpdatedAt={dataUpdatedAt} 
    isFetching={isFetching}
    stopName={selectedStop?.name}
    stopCode={stopCode}
    />
    </Container>
    </>
  );
}
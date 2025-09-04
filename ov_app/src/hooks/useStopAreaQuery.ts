// src/hooks/useStopAreaQuerys.ts
import { useQuery } from "@tanstack/react-query";
import type { Stop } from "../types/ovApi.types";
import { fetchStops } from "../services/ovAPI";
export type StopAreaItem = {
  code: string; // StopAreaCode
  label: string; // "Town, Name"
  name: string;
  town: string;
  lat: number;
  lon: number;
};

type StopAreaResponse = Record<string, Stop>;

function normalize(map: StopAreaResponse): { index: StopAreaItem[]; map: StopAreaResponse } {
  const index: StopAreaItem[] = Object.values(map)
    .map((s) => ({
      code: s.StopAreaCode ?? "",
      label: `${s.TimingPointTown ?? ""}, ${s.TimingPointName ?? ""}`,
      name: s.TimingPointName ?? "",
      town: s.TimingPointTown ?? "",
      lat: s.Latitude ?? 0,
      lon: s.Longitude ?? 0,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return { index, map };
}

export function useStopAreasQuery() {
  return useQuery({
    queryKey: ["stopareas", "v1"],
    queryFn: fetchStops,
    select: normalize,
    staleTime: 1000 * 60 * 60 * 24, // 24h
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7d
  });
}

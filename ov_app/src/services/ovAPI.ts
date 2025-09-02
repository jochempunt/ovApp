import type { Stop } from "../types/ovApi.types";

const fetchDepartures = async (stopareacode: string) => {
  const queryURL = `/ovapi/stopareacode/${stopareacode}/departures`;
  const res = await fetch(queryURL);
  return res.json();
};

export async function fetchStops(): Promise<Record<string, Stop>> {
  const res = await fetch("/ovapi/stopareacode");
  if (!res.ok) throw new Error("Failed to fetch stops");
  return res.json() as Promise<Record<string, Stop>>;
}
export { fetchDepartures };

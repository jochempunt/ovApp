import type { OVResponse, OVPass, Stop } from "../types/ovApi.types";

export function parseDeparturesAll(data?: OVResponse, amount = 5): OVPass[] {
  if (!data) return [];
  const area = Object.values(data)[0];
  if (!area) return [];

  const all: OVPass[] = [];
  for (const tp of Object.values(area)) {
    const passes = tp?.Passes ? (Object.values(tp.Passes) as OVPass[]) : [];
    for (const p of passes) {
      if (p?.ExpectedDepartureTime) all.push(p);
    }
  }

  return all
    .sort((a, b) => (a.ExpectedDepartureTime ?? "").localeCompare(b.ExpectedDepartureTime ?? ""))
    .slice(0, amount);
}

export function parseStopFromAnyTP(data?: OVResponse): Stop | undefined {
  if (!data) return {};
  const area = Object.values(data)[0];
  if (!area) return {};
  const anyTp = Object.values(area).find((tp) => tp?.Stop) ?? Object.values(area)[0];
  return anyTp?.Stop ?? {};
}

import type { OVResponse, Stop, OVPass } from "../types/ovApi.types";

export function parseDepartures(data?: OVResponse, amount: number = 5): OVPass[] {
  if (!data) return [];

  // take first stopArea
  const stopArea = Object.values(data)[0];
  if (!stopArea) return [];

  // take first timingPoint
  const timingPoint = Object.values(stopArea).find(
    (tp) => tp?.Passes && Object.keys(tp.Passes).length > 0,
  );

  if (!timingPoint) return [];

  // extract passes
  const passesObj = timingPoint.Passes ?? {};
  const departures = Object.values(passesObj)
    .filter((p): p is OVPass => Boolean(p?.ExpectedDepartureTime))
    .sort((a, b) => (a.ExpectedDepartureTime ?? "").localeCompare(b.ExpectedDepartureTime ?? ""))
    .slice(0, amount);

  return departures;
}

export function parseStop(data?: OVResponse): Stop | undefined {
  if (!data) return {};

  // take first stopArea
  const stopArea = Object.values(data)[0];
  if (!stopArea) return {};

  // take first timingPoint
  const timingPoint = Object.values(stopArea).find(
    (tp) => tp?.Passes && Object.keys(tp.Passes).length > 0,
  );
  if (!timingPoint) return {};

  return timingPoint.Stop ?? {};
}

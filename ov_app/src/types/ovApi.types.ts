export type OVPass = {
  LinePublicNumber?: string;
  DestinationName50?: string;
  ExpectedDepartureTime?: string;
  TransportType?: "BUS" | "TRAM" | "METRO" | "TRAIN";
};

export type TimingPoint = {
  Stop?: { TimingPointName?: string };
  Passes?: Record<string, OVPass>;
};

export type Stop = {
  TimingPointName?: string;
  TimingPointTown?: string;
  StopAreaCode?: string;
};

export type StopArea = Record<string, TimingPoint>;
export type OVResponse = Record<string, StopArea>;

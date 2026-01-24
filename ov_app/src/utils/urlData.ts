const STOP_PARAM = "stop";

export function readStopFromUrl(): string | null {
  const url = new URL(window.location.href);
  const stop = url.searchParams.get(STOP_PARAM);
  return stop?.trim() ? stop.trim() : null;
}

export function writeStopToUrl(stopCode: string, mode: "replace" | "push" = "replace") {
  const url = new URL(window.location.href);
  url.searchParams.set(STOP_PARAM, stopCode);

  if (mode === "push") {
    window.history.pushState({}, "", url.toString());
  } else {
    window.history.replaceState({}, "", url.toString());
  }
}

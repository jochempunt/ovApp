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


const STORAGE_KEY = 'selected_stop_code';

export function saveStopToStorage(stopCode: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, stopCode);
  } catch (e) {
    console.error('Failed to save stop to localStorage:', e);
  }
}

export function readStopFromStorage(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to read stop from localStorage:', e);
    return null;
  }
}

export function getInitialStop(): string {
  const fromUrl = readStopFromUrl();
  if (fromUrl) return fromUrl;
  
  const fromStorage = readStopFromStorage();
  if (fromStorage) {
    writeStopToUrl(fromStorage, "replace");
    return fromStorage;
  }
  
  const defaultStop = 'MttAca';
  writeStopToUrl(defaultStop, "replace");
  return defaultStop;
}
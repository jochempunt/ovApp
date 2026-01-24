const formatTime = (s?: string) => {
  if (!s) return "-";
  const fixed = s.replace(/([+-]\d{2})(\d{2})$/, "$1:$2"); // fix +0200 → +02:00
  const d = new Date(fixed);
  return isNaN(d.getTime())
    ? "-"
    : d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};




export function formatSecondsAgo(timestamp: number, nowMs: number = Date.now()) {
  if (!timestamp) return "";

  const diffMs = nowMs - timestamp;
  const seconds = Math.max(0, Math.floor(diffMs / 1000));

  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds}s ago`;

  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ago`;
}





export { formatTime };

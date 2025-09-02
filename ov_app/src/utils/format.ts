const formatTime = (s?: string) => {
  if (!s) return "-";
  const fixed = s.replace(/([+-]\d{2})(\d{2})$/, "$1:$2"); // fix +0200 → +02:00
  const d = new Date(fixed);
  return isNaN(d.getTime())
    ? "-"
    : d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export { formatTime };

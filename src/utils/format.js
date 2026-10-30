// Formats 1000 → "1,000" and 853.02 → "853.02", max 2 decimals
export function formatAmount(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return "0";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  function timeAgo(timestamp, now = Date.now()) {
  const t = new Date(timestamp).getTime(); // works for numbers and ISO strings
  const s = Math.max(0, Math.floor((now - t) / 1000));

  if (s < 10) return "just now";
  if (s < 60) return `${s}s ago`;

  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;

  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;

  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;

  return new Date(t).toLocaleDateString();
}
}

// Formats a rate for display: 0.85302 → "0.8530" (4 decimals like the design)
// export function formatRate(rate) {
//   return Number(rate).toFixed(4);
// }
export function formatRate(rate) {
  const num = Number(rate);
  return Number.isFinite(num) ? num.toFixed(4) : "—";
}
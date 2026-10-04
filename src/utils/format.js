// Formats 1000 → "1,000" and 853.02 → "853.02", max 2 decimals
export function formatAmount(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return "0";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

// Formats a rate for display: 0.85302 → "0.8530" (4 decimals like the design)
export function formatRate(rate) {
  return Number(rate).toFixed(4);
}
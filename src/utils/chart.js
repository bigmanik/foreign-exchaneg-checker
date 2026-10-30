
/// utils/chart.js
export function buildChartPath(
  history,
  W,
  H,
  { padTop = 30, padBottom = 30 } = {}
) {
  if (history.length < 2) {
    return { line: "", area: "", min: 0, max: 0, yFor: () => 0, xFor: () => 0 };
  }

  const rates = history.map((h) => h.rate);
  const min = Math.min(...rates);
  const max = Math.max(...rates);
  const range = max - min || 1;
  const innerH = H - padTop - padBottom;

  const yFor = (v) => padTop + (1 - (v - min) / range) * innerH;
  const xFor = (i) => (i / (history.length - 1)) * W;

  const pts = history.map((h, i) => [xFor(i), yFor(h.rate)]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");
  const area = `${line} L${W},${H} L0,${H} Z`;

  return { line, area, min, max, yFor, xFor };
}

// "2026-09-14" → "Sep 14"  (T00:00:00 guards against timezone off-by-one)
export function shortDate(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
export function buildChartPath(history, width, height, pad = { t: 20, r: 20, b: 10, l: 55 }) {

    if (history.length < 2) {
    return { line: "", area: "", min: 0, max: 0, points: [] };
  }
  const rates = history.map((h) => h.rate);
  const min = Math.min(...rates);
  const max = Math.max(...rates);
  const span = max - min || 1; // guard against a perfectly flat series

  const iw = width - pad.l - pad.r;
  const ih = height - pad.t - pad.b;

  const points = history.map((h, i) => ({
    x: pad.l + (i / (history.length - 1)) * iw,
    y: pad.t + (1 - (h.rate - min) / span) * ih,
  }));

  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");

  const area =
    `${line} L${points[points.length - 1].x},${height - pad.b} ` +
    `L${points[0].x},${height - pad.b} Z`;

  return { line, area, min, max };
}

// "2026-09-14" → "Sep 14"
export function shortDate(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
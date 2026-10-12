// const BASE_URL = "https://api.frankfurter.dev/v1";

// // map each pill to a lookback window in days
// const RANGE_DAYS = { "1D": 7, "1W": 14, "1M": 30, "3M": 90, "1Y": 365, "5Y": 1825 };

// export async function getRate(from, to) {
//   // ... your existing code stays unchanged
// }

// export async function getRateHistory(from, to, range = "1M") {
//   if (from === to) return []; // converting a currency to itself — nothing to chart

//   const end = new Date().toISOString().slice(0, 10);
//   const start = new Date(Date.now() - RANGE_DAYS[range] * 864e5).toISOString().slice(0, 10);

//   const res = await fetch(`${BASE_URL}/${start}..${end}?base=${from}&symbols=${to}`);
//   if (!res.ok) throw new Error("Failed to fetch rate history");

//   const data = await res.json();
//   // Frankfurter returns: { rates: { "2026-09-01": { EUR: 0.85 }, ... } }
//   return Object.entries(data.rates)
//     .map(([date, rates]) => ({ date, rate: rates[to] }))
//     .sort((a, b) => a.date.localeCompare(b.date)); // chronological order
// }

const BASE_URL = "https://api.frankfurter.dev/v1";

// Map each range pill to a lookback window in days
const RANGE_DAYS = { "1D": 7, "1W": 14, "1M": 30, "3M": 90, "1Y": 365, "5Y": 1825 };

// Format a Date as YYYY-MM-DD
const toISODate = (date) => date.toISOString().slice(0, 10);

/**
 * Latest rate for 1 unit of `from` expressed in `to`.
 * Returns a plain number (e.g. 0.8924) and throws on any bad response,
 * so the UI shows a real error instead of rendering NaN.
 */
export async function getRate(from, to) {
  if (from === to) return 1; // same currency, no request needed

  const res = await fetch(`${BASE_URL}/latest?base=${from}&symbols=${to}`);
  if (!res.ok) throw new Error("Failed to fetch exchange rate");

  const data = await res.json();
  // Frankfurter returns: { amount: 1, base: "USD", date: "2026-10-09", rates: { EUR: 0.8924 } }
  const rate = data?.rates?.[to];
  if (typeof rate !== "number") {
    throw new Error(`No rate available for ${from} → ${to}`);
  }

  return rate;
}

/**
 * Historical rates for charting, oldest to newest.
 * Returns: [{ date: "2026-09-10", rate: 0.8609 }, ...]
 */
export async function getRateHistory(from, to, range = "1M") {
  if (from === to) return []; // converting a currency to itself, nothing to chart

  const days = RANGE_DAYS[range] ?? RANGE_DAYS["1M"];
  const end = toISODate(new Date());
  const start = toISODate(new Date(Date.now() - days * 864e5));

  const res = await fetch(`${BASE_URL}/${start}..${end}?base=${from}&symbols=${to}`);
  if (!res.ok) throw new Error("Failed to fetch rate history");

  const data = await res.json();
  // Frankfurter returns: { rates: { "2026-09-01": { EUR: 0.85 }, ... } }
  return Object.entries(data?.rates ?? {})
    .map(([date, rates]) => ({ date, rate: rates[to] }))
    .filter((point) => typeof point.rate === "number") // drop any gaps
    .sort((a, b) => a.date.localeCompare(b.date)); // chronological order
}
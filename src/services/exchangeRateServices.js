

const BASE_URL = "https://api.frankfurter.dev/v1";

// Map each range pill to a lookback window in days
const RANGE_DAYS = { "1D": 7, "1W": 14, "1M": 30, "3M": 90, "1Y": 365, "5Y": 1825 };

// Format a Date as YYYY-MM-DD
const toISODate = (date) => date.toISOString().slice(0, 10);

// Session cache for comparison rates (EOD data, safe to reuse)
const ratesCache = new Map();

export async function getRate(from, to) {
  if (from === to) return 1;

  const res = await fetch(`${BASE_URL}/latest?base=${from}&symbols=${to}`);
  if (!res.ok) throw new Error("Failed to fetch exchange rate");

  const data = await res.json();
  const rate = data?.rates?.[to];
  if (typeof rate !== "number") {
    throw new Error(`No rate available for ${from} → ${to}`);
  }

  return rate;
}

export async function getRatesFor(base) {
  if (ratesCache.has(base)) return ratesCache.get(base);

  const res = await fetch(`${BASE_URL}/latest?base=${base}`);
  if (!res.ok) throw new Error("Failed to fetch comparison rates");

  const data = await res.json();
  if (!data?.rates || typeof data.rates !== "object") {
    throw new Error(`No rates available for ${base}`);
  }

  const rates = Object.fromEntries(
    Object.entries(data.rates).filter(([, rate]) => typeof rate === "number")
  );

  const result = { date: data.date, rates };
  ratesCache.set(base, result);
  return result;
}

export async function getRateHistory(from, to, range = "1M") {
  if (from === to) return [];

  const days = RANGE_DAYS[range] ?? RANGE_DAYS["1M"];
  const end = toISODate(new Date());
  const start = toISODate(new Date(Date.now() - days * 864e5));

  const res = await fetch(`${BASE_URL}/${start}..${end}?base=${from}&symbols=${to}`);
  if (!res.ok) throw new Error("Failed to fetch rate history");

  const data = await res.json();
  return Object.entries(data?.rates ?? {})
    .map(([date, rates]) => ({ date, rate: rates[to] }))
    .filter((point) => typeof point.rate === "number")
    .sort((a, b) => a.date.localeCompare(b.date));
}

// Latest rate + change vs previous published day, for many pairs at once.
// Pairs are grouped by base currency so 5 favourites with the same "from"
// cost 1 request instead of 5.
export async function getPairSnapshots(pairs) {
  const result = {};
  const byBase = {};

  for (const { from, to } of pairs) {
    if (from === to) {
      result[`${from}/${to}`] = { rate: 1, change: 0 };
      continue;
    }
    (byBase[from] ??= new Set()).add(to);
  }

  // 10-day window so weekends/holidays still leave 2+ data points
  const end = toISODate(new Date());
  const start = toISODate(new Date(Date.now() - 10 * 864e5));

  await Promise.allSettled(
    Object.entries(byBase).map(async ([base, tos]) => {
      const symbols = [...tos].join(",");
      const res = await fetch(`${BASE_URL}/${start}..${end}?base=${base}&symbols=${symbols}`);
      if (!res.ok) throw new Error(`Failed to fetch ${base} snapshot`);

      const data = await res.json();
      const days = Object.keys(data?.rates ?? {}).sort();
      if (days.length === 0) return;

      for (const to of tos) {
        const last = data.rates[days.at(-1)]?.[to];
        const prev = data.rates[days.at(-2)]?.[to] ?? last;
        if (typeof last === "number") {
          result[`${base}/${to}`] = {
            rate: last,
            change: prev ? ((last - prev) / prev) * 100 : 0,
          };
        }
      }
    })
  );

  return result;
}
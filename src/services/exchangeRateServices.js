const BASE_URL = "https://api.frankfurter.app";

/**
 * Fetches the exchange rate from `from` to `to`.
 * e.g. getRate("USD", "EUR") → 0.853
 */
export async function getRate(from, to) {
  if (from === to) return 1; // API errors on identical currencies; rate is trivially 1

  const res = await fetch(`${BASE_URL}/latest?from=${from}&to=${to}`);
  if (!res.ok) throw new Error("Failed to fetch exchange rate");

  const data = await res.json();
  const rate = data.rates?.[to];
  if (!rate) throw new Error(`No rate available for ${from} → ${to}`);

  return rate;
}
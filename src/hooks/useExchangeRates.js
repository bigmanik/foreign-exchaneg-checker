import { useEffect, useState } from "react";
import { getRate } from "../services/exchangeRateServices";

/**
 * Watches (from, to) and keeps the live rate + converted amount.
 * amount is converted locally — no network call per keystroke.
 */
export function useExchangeRate(from, to, amount) {
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;          // guard against race conditions on rapid swaps
    setLoading(true);
    setError(null);

    getRate(from, to)
      .then((r) => {
        if (!cancelled) setRate(r);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [from, to]);                   // ← refetch only when currencies change, NOT on every keystroke

  const parsed = parseFloat(amount) || 0;
  const converted = rate !== null ? parsed * rate : null;

  return { rate, converted, loading, error };
}
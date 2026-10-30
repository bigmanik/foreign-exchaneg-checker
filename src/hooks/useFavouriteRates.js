import { useState, useEffect } from "react";
import { getPairSnapshots } from "../services/exchangeRateServices";

export function useFavoriteRates(favourites) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // string key so we only refetch when the SET of pairs changes,
  // not on every render
  const key = favourites.map((f) => `${f.from}/${f.to}`).join(",");

  useEffect(() => {
    if (!key) {
      setData({});
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(false);

    const pairs = key.split(",").map((k) => {
      const [from, to] = k.split("/");
      return { from, to };
    });

    getPairSnapshots(pairs)
      .then((r) => !cancelled && setData(r))
      .catch(() => !cancelled && setError(true))
      .finally(() => !cancelled && setLoading(false));

    return () => { cancelled = true; };
  }, [key]);

  return { data, loading, error };
}
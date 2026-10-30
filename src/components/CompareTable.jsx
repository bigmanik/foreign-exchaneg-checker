import { useEffect, useState } from "react";
import { getRatesFor } from "../services/exchangeRateServices";

export default function CompareTable({ from, amount, favourites, onTogglePair }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setData(null);
    setError(null);
    getRatesFor(from)
      .then((d) => !cancelled && setData(d))
      .catch((e) => !cancelled && setError(e.message));
    return () => {
      cancelled = true;
    };
  }, [from]);

  if (error) return <p className="font-mono text-sm text-red-400">{error}</p>;
  if (!data) return <p className="font-mono text-sm text-zinc-500">Loading rates…</p>;

  const isPinned = (to) => favourites.some((f) => f.from === from && f.to === to);
  const amt = Number(amount) || 0;

  return (
    <div>
      <p className="mb-3 font-mono text-xs tracking-widest text-zinc-500">
        {amt.toLocaleString()} {from} · ECB REFERENCE {data.date}
      </p>
      <div className="space-y-2">
        {Object.entries(data.rates).map(([to, rate]) => (
          <div
            key={to}
            className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-zinc-900/60 px-4 py-3 font-mono text-sm"
          >
            <span className="w-16 tracking-widest text-white">{to}</span>
            <span className="text-lime-400">
              {(amt * rate).toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
            <span className="text-xs text-zinc-500">@ {rate}</span>
            <button
              onClick={() => onTogglePair({ from, to })}
              aria-label={isPinned(to) ? "Unpin pair" : "Pin pair"}
              className={isPinned(to) ? "text-lime-400" : "text-zinc-500 hover:text-white"}
            >
              {isPinned(to) ? "★" : "☆"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import { timeAgo } from "../utils/format";

const fmt = (n) =>
  Number(n).toLocaleString(undefined, { maximumFractionDigits: 2 });

export default function LogList({ log, onClearLog, onDeleteLogEntry }) {
  // re-render every 30s so "2m ago" keeps updating without a page refresh
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  if (log.length === 0) {
    return (
      <p className="font-mono text-sm text-zinc-500">NO CONVERSIONS LOGGED</p>
    );
  }

  return (
    <>
      <div className="mb-3 flex justify-end">
        <button
          onClick={onClearLog}
          className="font-mono text-xs text-zinc-500 hover:text-red-400"
        >
          CLEAR LOG
        </button>
      </div>

      <ul className="flex flex-col divide-y divide-white/[0.06]">
        {log.map((e) => (
          <li
            key={e.id}
            className="flex items-center justify-between gap-4 py-3 font-mono text-sm"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
              <span
                className="w-20 text-xs text-zinc-500"
                title={new Date(e.at).toLocaleString()}
              >
                {timeAgo(e.at, now)}
              </span>
              <span className="text-xs tracking-widest text-lime-400">
                {e.from} → {e.to}
              </span>
              <span className="text-white">
                {fmt(e.amount)} {e.from} → {fmt(e.result)} {e.to}
              </span>
            </div>

            <button
              onClick={() => onDeleteLogEntry(e.id)}
              aria-label="Delete log entry"
              className="text-xs text-zinc-500 hover:text-red-400"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
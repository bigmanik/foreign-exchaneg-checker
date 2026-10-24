import { useState } from "react";

export default function Tabs({ favourites, log, history, onLoadPair, onRemovePair, onClearLog }) {
  const [active, setActive] = useState("HISTORY");

  const tabs = [
    { id: "HISTORY" },
    { id: "COMPARE" },
    { id: "FAVORITES", count: favourites.length },
    { id: "LOG", count: log.length },
  ];

  return (
    <div className="mt-8">
      {/* tab bar — unchanged */}
      <div className="flex gap-6 overflow-x-auto overflow-y-hidden border-b border-white/[0.06] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`-mb-px flex items-center gap-2 whitespace-nowrap border-b-2 pb-3 font-mono text-sm tracking-widest transition-colors ${
              active === t.id
                ? "border-white text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {t.id}
            {t.count > 0 && (
              <span className="rounded-full bg-lime-400/20 px-1.5 text-[10px] text-lime-400">
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {active === "HISTORY" && history}

        {active === "COMPARE" && <div>{/* your Compare panel */}</div>}

        {active === "FAVORITES" && (
          favourites.length === 0 ? (
            <p className="font-mono text-sm text-zinc-500">NO FAVOURITES YET</p>
          ) : (
            <ul className="flex flex-col divide-y divide-white/[0.06]">
              {favourites.map((f) => (
                <li key={`${f.from}-${f.to}`} className="flex items-center justify-between py-3">
                  <button
                    onClick={() => onLoadPair(f)}
                    className="font-mono text-sm text-white hover:text-lime-400"
                  >
                    {f.from} → {f.to}
                  </button>
                  <button
                    onClick={() => onRemovePair(f)}
                    className="text-xs text-zinc-500 hover:text-red-400"
                  >
                    REMOVE
                  </button>
                </li>
              ))}
            </ul>
          )
        )}

        {active === "LOG" && (
          <>
            <div className="mb-3 flex justify-end">
              <button onClick={onClearLog} className="font-mono text-xs text-zinc-500 hover:text-red-400">
                CLEAR LOG
              </button>
            </div>
            {log.length === 0 ? (
              <p className="font-mono text-sm text-zinc-500">NO CONVERSIONS LOGGED</p>
            ) : (
              <ul className="flex flex-col divide-y divide-white/[0.06]">
                {log.map((e) => (
                  <li key={e.id} className="flex items-center justify-between py-3 font-mono text-sm">
                    <span className="text-white">
                      {e.amount} {e.from} → {e.result.toFixed(2)} {e.to}
                    </span>
                    <span className="text-xs text-zinc-500">
                      @{e.rate} · {new Date(e.at).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
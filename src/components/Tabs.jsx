import { useState } from "react";

export default function Tabs({ favourites, log, history }) {
  const [active, setActive] = useState("HISTORY");

  const tabs = [
    { id: "HISTORY" },
    { id: "COMPARE" },
    { id: "FAVORITES", count: favourites.length },
    { id: "LOG", count: log.length },
  ];

  return (
    <div className="mt-8">
      <div className="flex gap-6 border-b border-white/[0.06] overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
        {active === "FAVORITES" && <div>{/* your Favorites list */}</div>}
        {active === "LOG" && <div>{/* your Log list */}</div>}
      </div>
    </div>
  );
}
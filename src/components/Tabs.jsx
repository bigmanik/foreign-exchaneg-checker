import { useState } from "react";

export default function Tabs({ favourites = [], log = [], rates = {} }) {
  const [active, setActive] = useState("HISTORY");

  const tabs = [
    { id: "HISTORY", count: 0 },
    { id: "COMPARE", count: 0 },
    { id: "FAVORITES", count: favourites.length },
    { id: "LOG", count: log.length },
  ];

  return (
    <div>
      {/* tab bar */}
      <nav className="flex gap-8 border-b border-zinc-800 mt-10">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`pb-3 text-sm tracking-widest font-mono border-b-2 -mb-px transition-colors ${
              active === t.id
                ? "text-white border-white"
                : "text-zinc-500 border-transparent hover:text-zinc-300"
            }`}
          >
            {t.id}
            {t.count > 0 && (
              <span className="ml-1.5 bg-lime-400 text-black text-[10px] font-bold rounded-full px-1.5 py-0.5 align-middle">
                {t.count}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* panels — HISTORY shows nothing extra (stats+chart are already above);
          FAVORITES / LOG swap the content below */}
      <div className="mt-6">
        {active === "FAVORITES" && <FavouriteList items={favourites} />}
        {active === "LOG" && <ConversionLog items={log} />}
        {active === "COMPARE" && <CompareList rates={rates} />}
      </div>
    </div>
  );
}
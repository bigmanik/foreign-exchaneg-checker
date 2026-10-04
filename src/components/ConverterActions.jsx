import { useState } from "react";

const FAV_KEY = "fx_favorites";
const LOG_KEY = "fx_log";

const load = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};

function ConverterActions({ from, to, amount, result }) {
  const [favorites, setFavorites] = useState(() => load(FAV_KEY, []));
  const pair = `${from}/${to}`;
  const isFav = favorites.includes(pair);

  const toggleFavorite = () => {
    const next = isFav ? favorites.filter((p) => p !== pair) : [...favorites, pair];
    setFavorites(next);
    localStorage.setItem(FAV_KEY, JSON.stringify(next));
  };

  const logConversion = () => {
    const log = load(LOG_KEY, []);
    const entry = { from, to, amount, result, at: new Date().toISOString() };
    localStorage.setItem(LOG_KEY, JSON.stringify([entry, ...log].slice(0, 50))); // cap at 50
  };

  const btn =
    "rounded-lg border px-4 py-2 font-mono text-xs tracking-widest transition-colors";

  return (
    <div className="flex gap-2">
      <button
        onClick={toggleFavorite}
        className={`${btn} ${
          isFav
            ? "border-[#c8f542] bg-[#c8f542] text-black"
            : "border-white/10 text-gray-400 hover:border-[#c8f542]/50 hover:text-[#c8f542]"
        }`}
      >
        {isFav ? "★ FAVORITED" : "☆ FAVORITE"}
      </button>
      <button
        onClick={logConversion}
        className={`${btn} border-white/10 text-gray-400 hover:border-white/30 hover:text-white`}
      >
        LOG CONVERSION
      </button>
    </div>
  );
}

export default ConverterActions;
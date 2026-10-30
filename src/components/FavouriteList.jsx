import { useFavoriteRates } from "../hooks/useFavouriteRates";

export default function FavoritesList({ favourites, onSelectPair, onRemoveFavourite }) {
  const { data, loading, error } = useFavoriteRates(favourites);

  return (
    <ul className="flex flex-col divide-y divide-white/[0.06]">
      {favourites.map((f) => {
        const snap = data[`${f.from}/${f.to}`];
        const up = snap && snap.change >= 0;

        return (
          <li key={`${f.from}-${f.to}`} className="flex items-center gap-3 py-3">
            {/* whole row is the select target */}
            <button
              onClick={() => onSelectPair(f)}
              className="flex flex-1 items-center justify-between gap-3 text-left font-mono text-sm text-white hover:text-lime-400"
            >
              <span>{f.from} → {f.to}</span>

              {snap ? (
                <span className="flex items-center gap-3 text-xs">
                  <span className="text-zinc-300">{snap.rate.toFixed(4)}</span>
                  <span className={up ? "text-lime-400" : "text-red-400"}>
                    {up ? "▲" : "▼"} {Math.abs(snap.change).toFixed(2)}%
                  </span>
                </span>
              ) : (
                <span className="text-xs text-zinc-600">
                  {loading ? "…" : error ? "—" : ""}
                </span>
              )}
            </button>

            <button
              onClick={() => onRemoveFavourite(f)}
              className="text-xs text-zinc-500 hover:text-red-400"
            >
              REMOVE
            </button>
          </li>
        );
      })}
    </ul>
  );
}
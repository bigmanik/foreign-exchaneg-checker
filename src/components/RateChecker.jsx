import { useState, useEffect } from "react";
import { getRateHistory } from "../services/exchangeRateServices";
import { useLocalStorage } from "../hooks/LocalStorage";
import CurrencyConverter from "./CurrencyConverter";
import RateStats from "./RatesStats";
import RangeSelector from "./RangeSelector";
import HistoryChart from "./HistoryChart";
import Tabs from "./Tabs";

function RateChecker() {
  const [amount, setAmount] = useState("1000");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  // persisted in localStorage, owned here, badges read from here
 

  const normalizeFavs = (raw) =>
  (Array.isArray(raw) ? raw : []).map((f) =>
    typeof f === "string" ? { from: f.split("/")[0], to: f.split("/")[1] } : f
  );

const [favourites, setFavourites] = useLocalStorage("fx_favorites", [], normalizeFavs);

  const [log, setLog] = useLocalStorage("fx_log", []);

  const [range, setRange] = useState("1M");
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    setLoadingHistory(true);
    getRateHistory(fromCurrency, toCurrency, range)
      .then(setHistory)
      .catch(console.error)
      .finally(() => setLoadingHistory(false));
  }, [fromCurrency, toCurrency, range]);

  // const pair = `${fromCurrency}/${to}`;
 
  const pair = `${fromCurrency}/${toCurrency}`;
  
  const isFavorited = favourites.some(
  (f) => f.from === fromCurrency && f.to === toCurrency
);

const handleToggleFavorite = () => {
  setFavourites((prev) =>
    isFavorited
      ? prev.filter((f) => !(f.from === fromCurrency && f.to === toCurrency))
      : [...prev, { from: fromCurrency, to: toCurrency }]
  );
};

const loadPair = (p) => {
  setFromCurrency(p.from);
  setToCurrency(p.to);
};

const clearLog = () => setLog([]);

  const handleLog = (entry) => {
    setLog((prev) => [entry, ...prev].slice(0, 50)); // newest first, cap 50
  };

  const handleRemovePair = (p) => {
  setFavourites((prev) => prev.filter((f) => !(f.from === p.from && f.to === p.to)));
};

  return (
    <section className="mx-auto mt-15 w-full max-w-4xl px-4">
      <h2 className="mb-4 font-mono text-lg tracking-widest text-white">
        CHECK THE RATE
      </h2>

      <div className="w-full rounded-3xl border border-white/[0.06] bg-[#141416] p-6">
        <CurrencyConverter
          amount={amount}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          onAmountChange={setAmount}
          onFromCurrencyChange={setFromCurrency}
          onToCurrencyChange={setToCurrency}
          isFavorited={isFavorited}
          onToggleFavorite={handleToggleFavorite}
          onLog={handleLog}
        />
      </div>
    <Tabs
  favourites={favourites}
  log={log}
  onLoadPair={loadPair}
  onRemovePair={handleRemovePair}   // ← add this
  onClearLog={clearLog}
  history={
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <RateStats history={history} />
        <RangeSelector range={range} onChange={setRange} />
      </div>

      <div className="mt-4">
        {loadingHistory || history.length < 2 ? (
          <div className="flex h-80 animate-pulse items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/70 font-mono text-sm text-zinc-500">
            LOADING {fromCurrency}/{toCurrency} · {range}
          </div>
        ) : (
          <HistoryChart history={history} pair={pair} />
        )}
      </div>
    </>
  }
/>
    </section>
  );
}

export default RateChecker;
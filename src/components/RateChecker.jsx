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
  const [favourites, setFavourites] = useLocalStorage("fx_favorites", []);
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
  const isFavorited = favourites.includes(pair);

  const handleToggleFavorite = () => {
    setFavourites((prev) =>
      prev.includes(pair)
        ? prev.filter((p) => p !== pair)
        : [...prev, pair]
    );
  };

  const handleLog = (entry) => {
    setLog((prev) => [entry, ...prev].slice(0, 50)); // newest first, cap 50
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
      <Tabs favourites={favourites} log={log} />

      <div className="mt-8">
        <RateStats history={history} />
      </div>

      <div className="mt-4 flex justify-end">
        <RangeSelector range={range} onChange={setRange} />
      </div>

      <div className="mt-4">
        {loadingHistory || history.length < 2 ? (
          <div className="flex h-80 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/70 font-mono text-sm text-zinc-500 animate-pulse">
            LOADING {fromCurrency}/{toCurrency} · {range}
          </div>
        ) : (
          <HistoryChart history={history} pair={pair} />
        )}
      </div>

      {/* <Tabs favourites={favourites} log={log} /> */}
    </section>
  );
}

export default RateChecker;
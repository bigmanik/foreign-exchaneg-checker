function ConverterActions({
  from,
  to,
  amount,
  rate,
  result,
  isFavorited,      // ← was isFav, now matches what RateChecker passes
  onToggleFavorite,
  onLog,
}) {
  const btn =
    "rounded-lg border px-4 py-2 font-mono text-xs tracking-widest transition-colors";

  const handleLog = () => {
    if (rate == null || result == null) return;   // don't log NaN/undefined entries
    onLog({
      id: Date.now(),
      from,
      to,
      amount: parseFloat(amount) || 0,            // string "1000" → number 1000
      rate,
      result,
      at: new Date().toISOString(),
    });
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={onToggleFavorite}
        className={`${btn} ${
          isFavorited
            ? "border-[#c8f542] bg-[#c8f542] text-black"
            : "border-white/10 text-gray-400 hover:border-[#c8f542]/50 hover:text-[#c8f542]"
        }`}
      >
        {isFavorited ? "★ FAVORITED" : "☆ FAVORITE"}
      </button>
      <button
        onClick={handleLog}
        disabled={rate == null}
        className={`${btn} border-[#c8f542] text-gray-400 hover:border-white/30 hover:text-white disabled:opacity-40 disabled:hover:border-[#c8f542] disabled:hover:text-gray-400`}
      >
        LOG CONVERSION
      </button>
    </div>
  );
}

export default ConverterActions;
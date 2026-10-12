function ConverterActions({ from, to, amount, result, isFav, onToggleFavorite, onLog }) {
  const btn =
    "rounded-lg border px-4 py-2 font-mono text-xs tracking-widest transition-colors";

  return (
    <div className="flex gap-2">
      <button
        onClick={onToggleFavorite}
        className={`${btn} ${
          isFav
            ? "border-[#c8f542] bg-[#c8f542] text-black"
            : "border-white/10 text-gray-400 hover:border-[#c8f542]/50 hover:text-[#c8f542]"
        }`}
      >
        {isFav ? "★ FAVORITED" : "☆ FAVORITE"}
      </button>
      <button
        onClick={() =>
          onLog({ from, to, amount, result, at: new Date().toISOString() })
        }
        className={`${btn} border-[#c8f542] text-gray-400 hover:border-white/30 hover:text-white`}
      >
        LOG CONVERSION
      </button>
    </div>
  );
}

export default ConverterActions;
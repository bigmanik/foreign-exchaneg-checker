const RANGES = ["1D", "1W", "1M", "3M", "1Y", "5Y"];

export default function RangeSelector({ range, onChange }) {
  return (
    <div className="flex gap-1 bg-zinc-900 rounded-lg p-1 border border-zinc-800">
      {RANGES.map((r) => (
        <button
          key={r}
          onClick={() => onChange(r)}
          className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
            r === range
              ? "bg-zinc-700 text-white font-bold"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          {r}
        </button>
      ))}
    </div>
  );
}
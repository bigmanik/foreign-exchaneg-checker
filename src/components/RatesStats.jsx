
export default function RateStats({ history }) {
  if (history.length < 2) return null;

  const open = history[0].rate;
  const last = history[history.length - 1].rate;
  const change = last - open;
  const pct = (change / open) * 100;
  const up = change >= 0;
  const fmt = (n, d) => n.toFixed(d);
  const tone = up ? "text-green-400" : "text-red-400";

  const stats = [
    { label: "OPEN", value: fmt(open, 4) },
    { label: "LAST", value: fmt(last, 4) },
    { label: "CHANGE", value: `${up ? "+" : ""}${fmt(change, 4)}`, color: tone },
    { label: "% CHANGE", value: `${up ? "▲ +" : "▼ "}${fmt(pct, 2)}%`, color: tone },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:flex">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-zinc-800 bg-zinc-900/70 px-5 py-4 md:w-36"
        >
          <p className="text-xs tracking-wider text-zinc-500">{s.label}</p>
          <p className={`mt-1 font-mono text-xl ${s.color ?? "text-white"}`}>{s.value}</p>
        </div>
      ))}
    </div>
  );
}
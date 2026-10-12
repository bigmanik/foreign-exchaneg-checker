export default function RateStats({ history }) {
  if (history.length < 2) return null;

  const open = history[0].rate;
  const last = history[history.length - 1].rate;
  const change = last - open;
  const pct = (change / open) * 100;
  const up = change >= 0;
  const fmt = (n, d) => n.toFixed(d);

  const stats = [
    { label: "OPEN", value: fmt(open, 4) },
    { label: "LAST", value: fmt(last, 4) },
    { label: "CHANGE", value: `${up ? "+" : ""}${fmt(change, 4)}`, color: up ? "text-green-400" : "text-red-400" },
    { label: "% CHANGE", value: `${up ? "▲" : "▼"} ${up ? "+" : ""}${fmt(pct, 2)}%`, color: up ? "text-green-400" : "text-red-400" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 ">
      {stats.map((s) => (
        <div key={s.label} className="bg-zinc-900/70 border border-zinc-800 rounded-xl px-5 py-4 w-35">
          <p className="text-xs tracking-wider text-zinc-500">{s.label}</p>
          <p className={`text-xl font-mono mt-1 ${s.color ?? "text-white"}`}>{s.value}</p>
        </div>
      ))}
    </div>
  );
}
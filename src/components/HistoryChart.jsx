import { useMemo } from "react";
import { buildChartPath, shortDate } from "../utils/chart";

const W = 900;
const H = 320;

export default function HistoryChart({ history, pair }) {
  const { line, area, min, max } = useMemo(
    () => buildChartPath(history, W, H),
    [history]
  );

  if (!history.length) return null;

  const yTicks = [max, (max + min) / 2, min]; // 0.8612 / 0.8516 / 0.8421 in the design
  const last = history[history.length - 1];

  return (
    <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6">
      <div className="flex justify-between items-baseline mb-4">
        <h3 className="font-mono tracking-widest text-zinc-400">{pair}</h3>
        <span className="font-mono text-xs text-zinc-500">
          {last.rate.toFixed(4)} · {shortDate(last.date)}
        </span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        <defs>
          <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a3e635" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* gridlines + y labels */}
        {yTicks.map((v, i) => {
          const y = 20 + (i / 2) * (H - 40);
          return (
            <g key={i}>
              <line x1="55" x2={W - 20} y1={y} y2={y} stroke="#27272a" strokeDasharray="3 3" />
              <text x="47" y={y + 4} textAnchor="end" fill="#52525b" fontSize="11" fontFamily="monospace">
                {v.toFixed(4)}
              </text>
            </g>
          );
        })}

        <path d={area} fill="url(#fillGrad)" />
        <path d={line} fill="none" stroke="#a3e635" strokeWidth="1.5" />
      </svg>

      <div className="flex justify-between font-mono text-xs text-zinc-600 mt-2 px-14">
        {pickDates(history, 5).map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </div>
  );
}

function pickDates(history, n) {
  const step = Math.max(1, Math.floor((history.length - 1) / (n - 1)));
  return Array.from({ length: n }, (_, i) =>
    shortDate(history[Math.min(i * step, history.length - 1)].date)
  );
}
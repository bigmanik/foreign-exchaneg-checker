

import { useMemo } from "react";
import { buildChartPath, shortDate } from "../utils/chart";

const W = 900;
const H = 320;

export default function HistoryChart({ history, pair }) {
  const { line, area, min, max, yFor, xFor } = useMemo(
    () => buildChartPath(history, W, H),
    [history]
  );

  if (!history.length) return null;

  const yTicks = [max, (max + min) / 2, min];
  const xTicks = pickIndexes(history, 5);
  const last = history[history.length - 1];

  return (
    <div className="bg-[#141414] border border-[#222] rounded-2xl p-6">
      <div className="flex justify-between items-baseline mb-4">
        <h3 className="font-mono tracking-widest text-zinc-400 text-sm">{pair}</h3>
        <span className="font-mono text-xs text-zinc-500">
          {last.rate.toFixed(4)} · {shortDate(last.date)}
          {last.time ? ` ${last.time} CET` : ""}
        </span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full block">
        <defs>
          <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#c8ff00" stopOpacity="0.40" />
            <stop offset="55%"  stopColor="#c8ff00" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#c8ff00" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* area + line first */}
        <path d={area} fill="url(#fillGrad)" />
        <path
          d={line}
          fill="none"
          stroke="#c8ff00"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* gridlines — dashed, on top of the fill so they read through it */}
        {yTicks.map((v) => {
          const y = yFor(v);
          return (
            <line
              key={v}
              x1="0"
              x2={W}
              y1={y}
              y2={y}
              stroke="#222"
              strokeDasharray="3 4"
            />
          );
        })}

        {/* y labels — painted last so the fill never dims them */}
        {yTicks.map((v) => (
          <text
            key={`label-${v}`}
            x="0"
            y={yFor(v) - 6}
            fill="#52525b"
            fontSize="11"
            fontFamily="monospace"
          >
            {v.toFixed(4)}
          </text>
        ))}

        {/* x labels — anchored to real data-point positions */}
        {xTicks.map(({ date, i }) => (
          <text
            key={i}
            x={xFor(i)}
            y={H - 8}
            textAnchor={
              i === 0 ? "start" : i === history.length - 1 ? "end" : "middle"
            }
            fill="#52525b"
            fontSize="11"
            fontFamily="monospace"
          >
            {shortDate(date)}
          </text>
        ))}
      </svg>
    </div>
  );
}

function pickIndexes(history, n) {
  const step = Math.max(1, Math.floor((history.length - 1) / (n - 1)));
  return Array.from({ length: n }, (_, i) => ({
    i: Math.min(i * step, history.length - 1),
    date: history[Math.min(i * step, history.length - 1)].date,
  }));
}
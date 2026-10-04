
import logo from "../assets/logo.svg";

const PAIRS = [
  { pair: "EUR/USD", rate: "1.1723", change: "-0.14%", dir: "down" },
  { pair: "USD/JPY", rate: "157.91", change: "+0.04%", dir: "up" },
  { pair: "GBP/USD", rate: "1.3575", change: "-0.22%", dir: "down" },
  { pair: "USD/CHF", rate: "0.9098", change: "+0.13%", dir: "up" },
  { pair: "EUR/GBP", rate: "0.8633", change: "+0.11%", dir: "up" },
  { pair: "AUD/USD", rate: "0.7208", change: "+0.08%", dir: "up" },
  { pair: "USD/CAD", rate: "1.3815", change: "+0.04%", dir: "up" },
];

function Header() {
  return (
    <header className="bg-black font-mono text-white">
      {/* top bar */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 sm:px-6 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#c9f227]">
            <img src={logo} alt="" className="h-4 w-4" />
          </span>
          <span className="text-sm font-bold tracking-[0.15em]">FX_CHECKER</span>
        </div>

        <p className="text-[7px] tracking-[0.18em] text-white/45 sm:block lg:text-[11px]">
          55 CURRENCIES <span className="mx-1.5">·</span> EOD
          <span className="mx-1.5">·</span> ECB DATA
        </p>
      </div>

   

      {/* ticker strip */}
<div className="flex items-stretch border-b border-white/10 text-[11px]">
  <div className="flex shrink-0 items-center gap-2 bg-accent px-4 py-2.5 font-bold tracking-[0.15em] text-black">
    <span className="h-1.5 w-1.5 rounded-full bg-black" />
    LIVE MARKETS
  </div>

  {/* viewport: clips the overflow */}
  <div className="group flex-1 overflow-hidden">
    {/* track: twice as wide as the content, slides left */}
    <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
      {[...PAIRS, ...PAIRS].map(({ pair, rate, change, dir }, i) => (
        <div
          key={`${pair}-${i}`}
          className="flex shrink-0 items-center gap-2 border-r border-white/10 px-4 py-2.5"
        >
          <span className="tracking-wide text-white/45">{pair}</span>
          <span className="font-bold">{rate}</span>
          <span className={dir === "up" ? "text-[#4ade80]" : "text-[#f87171]"}>
            {dir === "up" ? "▲" : "▼"} {change}
          </span>
        </div>
      ))}
    </div>
  </div>
</div>

    </header>
  );
}

export default Header;
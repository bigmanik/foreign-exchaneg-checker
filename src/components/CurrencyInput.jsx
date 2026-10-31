import { useEffect, useRef, useState } from "react";
import currencies from "../data/currencies";

// Adds thousand separators for display only: "1000.5" -> "1,000.5"
function formatWithCommas(str) {
  if (str === "" || str == null) return "";
  const clean = String(str).replace(/,/g, "");
  const [int, dec] = clean.split(".");
  const withCommas = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return dec !== undefined ? `${withCommas}.${dec}` : withCommas;
}

function CurrencyInput({
  label,
  value,
  onValueChange,
  currency,
  onCurrencyChange,
  readOnly = false,
  className = "",
}) {
  const current = currencies.find((c) => c.code === currency);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={`flex-1 rounded-2xl bg-[#1b1b1e] p-4 sm:p-5 ${className}`}>
      <p className="mb-2 font-mono text-xs tracking-widest text-gray-500">{label}</p>

      {/* Stacked on mobile, inline from sm (640px) up */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Amount field: editable or read-only */}
        <input
          type="text"
          inputMode="decimal"
          value={formatWithCommas(value)}
          readOnly={readOnly}
          onChange={(e) => {
            // Strip commas first, then allow only digits and one dot
            const raw = e.target.value.replace(/,/g, "");
            if (/^\d*\.?\d*$/.test(raw)) onValueChange?.(raw);
          }}
          placeholder="0"
          className="w-full min-w-0 bg-transparent font-mono text-2xl text-white outline-none
                     placeholder:text-gray-600 read-only:text-[#c8f542] sm:text-3xl"
        />

        {/* Custom currency dropdown */}
        <div ref={ref} className="relative w-full shrink-0 sm:w-auto">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className={`flex w-full items-center justify-between gap-2 rounded-lg bg-[#26262b]
                        px-3 py-2 transition-colors hover:bg-[#2e2e34] sm:w-auto
                        ${open ? "ring-1 ring-[#c8f542]/50" : ""}`}
          >
            <span className="flex items-center gap-2">
              {current && (
                <img
                  src={current.flag}
                  alt=""
                  className="h-4 w-6 rounded-sm object-cover"
                />
              )}
              <span className="font-mono text-sm text-white">{currency}</span>
            </span>
            <span
              className={`text-xs text-gray-500 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            >
              ▾
            </span>
          </button>

          {open && (
            <ul
              role="listbox"
              className="absolute left-0 right-0 top-full z-50 mt-2 max-h-64 overflow-y-auto
                         rounded-xl border border-white/5 bg-[#26262b] p-1
                         shadow-2xl shadow-black/50
                         sm:left-auto sm:right-0 sm:w-44
                         [scrollbar-width:thin] [scrollbar-color:#3a3a40_transparent]"
            >
              {currencies.map((c) => {
                const selected = c.code === currency;
                return (
                  <li key={c.code} role="option" aria-selected={selected}>
                    <button
                      type="button"
                      onClick={() => {
                        onCurrencyChange(c.code);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left
                                  font-mono text-sm transition-colors hover:bg-white/5
                                  ${selected ? "text-[#c8f542]" : "text-white"}`}
                    >
                      <img
                        src={c.flag}
                        alt=""
                        className="h-4 w-6 rounded-sm object-cover"
                      />
                      <span>{c.code}</span>
                      {selected && <span className="ml-auto text-xs">✓</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default CurrencyInput;
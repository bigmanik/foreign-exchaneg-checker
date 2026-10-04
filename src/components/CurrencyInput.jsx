import currencies from "../data/currencies";

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

  return (
    <div className={`flex-1 rounded-2xl bg-[#1b1b1e] p-5 ${className}`}>
      <p className="mb-2 font-mono text-xs tracking-widest text-gray-500">{label}</p>

      <div className="flex items-center justify-between gap-3">
        {/* Amount field — editable or read-only */}
        <input
          type="text"
          inputMode="decimal"
          value={value ?? ""}
          readOnly={readOnly}
          onChange={(e) => {
            // Only allow digits, commas, dots
            if (/^[\d,]*\.?\d*$/.test(e.target.value)) {
              onValueChange?.(e.target.value);
            }
          }}
          placeholder="0"
          className="w-full bg-transparent font-mono text-3xl text-white outline-none
                     placeholder:text-gray-600 read-only:text-[#c8f542]"
        />

        {/* Currency selector with flag */}
        <div className="relative flex items-center gap-2 rounded-lg bg-[#26262b] px-3 py-2">
          {current && (
            <img src={current.flag} alt={current.code} className="h-4 w-6 rounded-sm object-cover" />
          )}
          <select
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            className="appearance-none bg-transparent font-mono text-sm text-white outline-none"
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code} className="bg-[#1b1b1e]">
                {c.code}
              </option>
            ))}
          </select>
          <span className="pointer-events-none text-gray-500">▾</span>
        </div>
      </div>
    </div>
  );
}

export default CurrencyInput;
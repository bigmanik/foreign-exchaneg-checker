import { useState } from "react";
import CurrencyInput from "./CurrencyInput";
import SwapButton from "./SwapButton";
import RateLine from "./RateLine";
import ConverterActions from "./ConverterActions";
import { useExchangeRate } from "../hooks/useExchangeRate";
import { formatAmount } from "../utils/format";

function CurrencyConverter() {
  const [amount, setAmount] = useState("1000");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  const { rate, converted, loading, error } = useExchangeRate(fromCurrency, toCurrency, amount);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div>
      {/* Row 1: SEND ↔ swap ↔ RECEIVE */}
      <div className="flex items-center gap-3">
        <CurrencyInput
          label="SEND"
          value={amount}
          onValueChange={setAmount}
          currency={fromCurrency}
          onCurrencyChange={setFromCurrency}
        />
        <SwapButton onClick={handleSwap} />
        <CurrencyInput
          label="RECEIVE"
          readOnly
          value={loading ? "…" : error ? "—" : formatAmount(converted)}
          currency={toCurrency}
          onCurrencyChange={setToCurrency}
        />
      </div>

      {/* Row 2: rate line + action buttons */}
      <div className="mt-5 flex items-center justify-between">
        <RateLine from={fromCurrency} to={toCurrency} rate={rate} loading={loading} error={error} />
        <ConverterActions
          from={fromCurrency}
          to={toCurrency}
          amount={amount}
          result={converted}
        />
      </div>
    </div>
  );
}

export default CurrencyConverter;
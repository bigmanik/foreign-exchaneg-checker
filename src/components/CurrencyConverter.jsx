import CurrencyInput from "./CurrencyInput";
import SwapButton from "./SwapButton";
import RateLine from "./RateLine";
import ConverterActions from "./ConverterActions";
import { useExchangeRate } from "../hooks/useExchangeRates";
import { formatAmount } from "../utils/format";

function CurrencyConverter({
  amount,
  fromCurrency,
  toCurrency,
  onAmountChange,
  onFromCurrencyChange,
  onToCurrencyChange,
  isFavorited,
  onToggleFavorite,
  onLog,
}) {
  // no useState here anymore — RateChecker owns this state

  const { rate, converted, loading, error } = useExchangeRate(fromCurrency, toCurrency, amount);

  const handleSwap = () => {
    onFromCurrencyChange(toCurrency);
    onToCurrencyChange(fromCurrency);
  };

  return (
    <div>
      {/* Row 1: SEND ↔ swap ↔ RECEIVE */}
      <div className="flex items-center gap-3">
        <CurrencyInput
          label="SEND"
          value={amount}
          onValueChange={onAmountChange}
          currency={fromCurrency}
          onCurrencyChange={onFromCurrencyChange}
        />
        <SwapButton onClick={handleSwap} />
        <CurrencyInput
          label="RECEIVE"
          readOnly
          value={loading ? "…" : error ? "—" : formatAmount(converted)}
          currency={toCurrency}
          onCurrencyChange={onToCurrencyChange}
        />
      </div>

      {/* Row 2 */}
      <div className="-mx-9 mt-5 flex items-center justify-between border-t border-dashed border-white/10 px-9 pt-5">
        <RateLine from={fromCurrency} to={toCurrency} rate={rate} loading={loading} error={error} />
        <ConverterActions
          from={fromCurrency}
          to={toCurrency}
          amount={amount}
          rate={rate}
          result={converted}
          isFavorited={isFavorited}
          onToggleFavorite={onToggleFavorite}
          onLog={onLog}
        />
      </div>
    </div>
  );
}

export default CurrencyConverter;
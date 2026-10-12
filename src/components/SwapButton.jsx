function SwapButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Swap currencies"
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded
                 border border-white/10 bg-[#26262b] text-gray-300
                 transition-colors hover:border-[#c8f542]/40 hover:text-[#c8f542]"
    >
     
     <img src="/src/assets/icon-exchange.svg" alt="swap btn" />
    </button>
  );
}

export default SwapButton;
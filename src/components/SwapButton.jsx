function SwapButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Swap currencies"
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full
                 border border-white/10 bg-[#26262b] text-gray-300
                 transition-colors hover:border-[#c8f542]/40 hover:text-[#c8f542]"
    >
      {/* two-way arrow icon */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 16V4M7 4L3 8M7 4l4 4" />
        <path d="M17 8v12m0 0 4-4m-4 4-4-4" />
      </svg>
    </button>
  );
}

export default SwapButton;
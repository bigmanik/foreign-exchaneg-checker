import CurrencyConverter from "./CurrencyConverter";

function RateChecker() {
  return (
    <section className="mx-auto mt-15 w-full max-w-4xl px-4">
      <h2 className="mb-4 font-mono text-lg tracking-widest text-white">
        CHECK THE RATE
      </h2>

      {/* the card — component goes INSIDE this div, replacing the empty space */}
      <div className="w-full rounded-3xl border border-white/[0.06] bg-[#141416] p-6">
        <CurrencyConverter />
      </div>
    </section>
  );
}

export default RateChecker;
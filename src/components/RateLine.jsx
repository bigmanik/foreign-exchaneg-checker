import { formatRate } from "../utils/format";

function RateLine({ from, to, rate, loading, error }) {
  return (
    <p className="font-mono text-xs tracking-wider text-gray-500">
      {error ? (
        <span className="text-red-400">{error}</span>
      ) : loading || rate === null ? (
        "Loading rate…"
      ) : (
        <>
          1 {from} = <span className="text-[#c8f542]">{formatRate(rate)}</span> {to}
        </>
      )}
    </p>
  );
}

export default RateLine;
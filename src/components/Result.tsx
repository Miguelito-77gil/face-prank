import { useEffect, useState } from "react";

type ResultProps = {
  onScanAgain: () => void;
};

function Result({ onScanAgain }: ResultProps) {
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowResult(true);
    }, 500);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 text-center text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/10 blur-3xl" />

      <div
        className={`relative z-10 transition-all duration-700 ${
          showResult
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0"
        }`}
      >
        {/* Complete indicator */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
            Analysis Complete
          </p>
        </div>

        {/* Result icon */}
        <div className="mx-auto mb-7 flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-white/5 text-6xl shadow-[0_0_60px_rgba(255,255,255,0.08)]">
          🌈
        </div>

        {/* Result */}
        <p className="text-xs uppercase tracking-[0.4em] text-white/40">
          Scanner Result
        </p>

        <h1 className="mt-3 text-7xl font-black tracking-tight">
          GAY
        </h1>

        <div className="mx-auto mt-6 h-px w-32 bg-white/20" />

        <p className="mx-auto mt-6 max-w-sm text-sm leading-6 text-white/50">
          Just a fictional prank result. This is a game and does
          not determine anyone's actual sexuality.
        </p>

        {/* Scan again */}
        <button
          onClick={onScanAgain}
          className="mt-10 rounded-full bg-white px-10 py-4 font-bold text-black transition duration-200 hover:scale-105 hover:bg-white/90 active:scale-95"
        >
          SCAN AGAIN
        </button>
      </div>
    </main>
  );
}

export default Result;


type ScannerFrameProps = {
  isScanning: boolean;
};

function ScannerFrame({ isScanning }: ScannerFrameProps) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-8">
      <div className="relative h-[58vh] w-full max-w-md">
        {/* Main scanner area */}
        <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/20">
          {/* Face target */}
          <div className="absolute left-1/2 top-1/2 h-64 w-48 -translate-x-1/2 -translate-y-1/2 rounded-[48%] border border-white/20" />

          {/* Center target */}
          <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70">
            <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
          </div>

          {/* Scanning line */}
          {isScanning && (
            <div className="absolute left-0 right-0 top-0 h-1 animate-[scan_1.5s_ease-in-out_infinite] bg-white shadow-[0_0_25px_6px_rgba(255,255,255,0.7)]" />
          )}

          {/* Scanning glow */}
          {isScanning && (
            <div className="absolute inset-x-0 top-0 h-32 animate-pulse bg-gradient-to-b from-white/10 to-transparent" />
          )}
        </div>

        {/* Top-left bracket */}
        <div className="absolute left-0 top-0 h-12 w-12 border-l-4 border-t-4 border-white" />

        {/* Top-right bracket */}
        <div className="absolute right-0 top-0 h-12 w-12 border-r-4 border-t-4 border-white" />

        {/* Bottom-left bracket */}
        <div className="absolute bottom-0 left-0 h-12 w-12 border-b-4 border-l-4 border-white" />

        {/* Bottom-right bracket */}
        <div className="absolute bottom-0 right-0 h-12 w-12 border-b-4 border-r-4 border-white" />

        {/* Side markers */}
        <div className="absolute left-0 top-1/2 h-16 w-1 -translate-y-1/2 bg-white/70" />

        <div className="absolute right-0 top-1/2 h-16 w-1 -translate-y-1/2 bg-white/70" />

        {/* Scanner status */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-md">
            <span
              className={`h-2 w-2 rounded-full ${
                isScanning
                  ? "animate-pulse bg-white"
                  : "bg-white/60"
              }`}
            />

            <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70">
              {isScanning ? "Scanning" : "Ready"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScannerFrame;


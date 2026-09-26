import { useEffect, useRef, useState } from "react";
import ScannerFrame from "./ScannerFrame";
import Result from "./Result";

type ScannerState = "camera" | "scanning" | "result";

function Camera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [cameraError, setCameraError] = useState("");
  const [scannerState, setScannerState] =
    useState<ScannerState>("camera");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error("Camera API not supported");
        }

        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
          },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error(error);

        setCameraError(
          "Camera access is not available on this device.",
        );
      }
    };

    startCamera();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    if (scannerState !== "scanning") {
      setProgress(0);
      return;
    }

    const startTime = Date.now();
    const duration = 3000;

    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startTime;

      const currentProgress = Math.min(
        Math.round((elapsed / duration) * 100),
        100,
      );

      setProgress(currentProgress);

      if (currentProgress >= 100) {
        window.clearInterval(interval);
      }
    }, 50);

    const resultTimer = window.setTimeout(() => {
      setScannerState("result");
    }, duration + 300);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(resultTimer);
    };
  }, [scannerState]);

  const handleScan = () => {
    if (scannerState !== "camera") return;

    setProgress(0);
    setScannerState("scanning");
  };

  const handleScanAgain = () => {
    setProgress(0);
    setScannerState("camera");
  };

  /*
   * TEST MODE
   */
  if (cameraError) {
    return (
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 text-center text-white">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10">
          <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
            <span className="text-5xl">📷</span>
          </div>

          <p className="mb-2 text-xs uppercase tracking-[0.4em] text-white/40">
            Face Scanner
          </p>

          <h1 className="text-3xl font-black">
            Camera Not Available
          </h1>

          <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-white/50">
            No camera was detected. You can still test the scanner
            using demo mode.
          </p>

          <button
            onClick={handleScan}
            className="mt-8 rounded-full bg-white px-10 py-4 font-bold text-black transition duration-200 hover:scale-105 hover:bg-white/90 active:scale-95"
          >
            TEST SCAN
          </button>
        </div>
      </main>
    );
  }

  /*
   * RESULT
   */
  if (scannerState === "result") {
    return <Result onScanAgain={handleScanAgain} />;
  }

  /*
   * CAMERA / SCANNING
   */
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Front camera — mirrored like a selfie camera */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="h-screen w-full -scale-x-100 object-cover"
      />

      {/* Dark overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/25" />

      {/* Top information */}
      <div className="absolute left-0 right-0 top-8 z-10 px-6 text-center text-white">
        <p className="mb-2 text-xs uppercase tracking-[0.4em] text-white/50">
          Face Scanner
        </p>

        <h1 className="text-2xl font-bold tracking-wide">
          {scannerState === "scanning"
            ? "ANALYZING FACE"
            : "POSITION YOUR FACE"}
        </h1>

        <p className="mt-2 text-sm text-white/60">
          {scannerState === "scanning"
            ? "Please wait..."
            : "Keep your face inside the frame"}
        </p>
      </div>

      {/* Scanner frame */}
      <ScannerFrame
        isScanning={scannerState === "scanning"}
      />

      {/* Scan status */}
      {scannerState === "scanning" && (
        <div className="absolute left-0 right-0 top-28 z-20 px-8 text-center text-white">
          <p className="text-4xl font-black tabular-nums">
            {progress}%
          </p>

          <div className="mx-auto mt-4 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white transition-[width] duration-75"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <p className="mt-3 animate-pulse text-xs font-semibold tracking-[0.3em] text-white/60">
            SCANNING BIOMETRIC DATA
          </p>
        </div>
      )}

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center bg-gradient-to-t from-black/95 via-black/40 to-transparent px-6 pb-10 pt-32">
        {scannerState === "camera" && (
          <>
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-white/50">
              Tap to scan
            </p>

            <button
              onClick={handleScan}
              aria-label="Scan face"
              className="h-20 w-20 rounded-full border-4 border-white bg-white/20 p-1 backdrop-blur-sm transition duration-200 hover:scale-105 active:scale-90"
            >
              <span className="block h-full w-full rounded-full bg-white" />
            </button>
          </>
        )}

        {scannerState === "scanning" && (
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/30">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white" />
          </div>
        )}
      </div>
    </main>
  );
}

export default Camera;


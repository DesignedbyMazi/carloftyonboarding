"use client";
import KYCLayout from "@/components/kyc/KYCLayout";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";

type ScanState =
  | "scanning"
  | "detected"
  | "capturing"
  | "verifying"
  | "done"
  | "failed"
  | "switch-device";

const PASSPORT_IMG = "https://www.figma.com/api/mcp/asset/e03156b7-d921-4a06-9bd9-34c192fd7d56";

function ScannerOverlay({ state }: { state: ScanState }) {
  const isDetected = state === "detected";
  const isFailed   = state === "failed";
  const borderColor = isFailed ? "#ef4444" : isDetected ? "#22c55e" : "white";

  return (
    <div className="relative w-full max-w-[363px] aspect-[363/250]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-[#252424] rounded-2xl absolute inset-[7.6%_4.8%]" />
        {isDetected && (
          <img
            src={PASSPORT_IMG}
            alt="Passport"
            className="absolute inset-[7.6%_4.8%] rounded-2xl object-cover opacity-80"
          />
        )}
      </div>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 363 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 70 L20 20 L70 20"   stroke={borderColor} strokeWidth="4" strokeLinecap="round" />
        <path d="M293 20 L343 20 L343 70" stroke={borderColor} strokeWidth="4" strokeLinecap="round" />
        <path d="M20 180 L20 230 L70 230" stroke={borderColor} strokeWidth="4" strokeLinecap="round" />
        <path d="M293 230 L343 230 L343 180" stroke={borderColor} strokeWidth="4" strokeLinecap="round" />
      </svg>

      {state === "scanning" && (
        <div className="absolute inset-[7.6%_4.8%] rounded-2xl overflow-hidden">
          <div className="scan-line" />
        </div>
      )}
    </div>
  );
}

function LoadingSpinner() {
  return (
    <svg className="animate-spin h-5 w-5 text-[#2d2d2d]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export default function ScanPassportPageWrapper() {
  return (
    <Suspense fallback={null}>
      <ScanPassportPage />
    </Suspense>
  );
}

function ScanPassportPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = searchParams.get("device") === "mobile";

  const [scanState, setScanState] = useState<ScanState>("scanning");
  const routerRef = useRef(router);
  useEffect(() => { routerRef.current = router; }, [router]);

  useEffect(() => {
    const timings: Partial<Record<ScanState, { next: ScanState | "navigate"; ms: number }>> = {
      scanning:  { next: "detected",  ms: 800 },
      detected:  { next: "capturing", ms: 300 },
      capturing: { next: "verifying", ms: 300 },
      verifying: { next: "done",      ms: 600 },
    };
    const cfg = timings[scanState];
    if (!cfg) return;
    const t = setTimeout(() => {
      if (cfg.next === "navigate") routerRef.current.push("/onboarding/passport-verified");
      else setScanState(cfg.next as ScanState);
    }, cfg.ms);
    return () => clearTimeout(t);
  }, [scanState]);

  const retry = useCallback(() => setScanState("scanning"), []);

  const isScanning    = scanState === "scanning";
  const isDetected    = scanState === "detected";
  const isCapturing   = scanState === "capturing";
  const isVerifying   = scanState === "verifying";
  const isDone        = scanState === "done";
  const isFailed      = scanState === "failed";
  const isSwitchDevice = scanState === "switch-device";

  if (isSwitchDevice) return <SwitchDeviceView onBack={() => setScanState("scanning")} />;

  return (
    <KYCLayout activeStep="government-id">
      <div className="flex flex-col gap-8 lg:gap-16 items-center w-full max-w-[473px]">
        {/* Header */}
        <div className="flex flex-col gap-1 items-center text-center w-full">
          <h1 className="text-xl lg:text-2xl font-medium text-[#2d2d2d] leading-8">Scan Your Passport</h1>
          <p className="text-sm text-[#5a5a5a] leading-5 tracking-[0.14px]">
            Position your passport clearly and ensure all details are visible.
          </p>
        </div>

        {/* Scanner area */}
        <div className="flex flex-col items-center gap-6 lg:gap-8 w-full">
          {isCapturing || isVerifying || isDone ? (
            <div className="relative w-full max-w-[363px] aspect-[363/250]">
              <div className="absolute inset-[7.6%_4.8%] rounded-2xl overflow-hidden border-2 border-[#22c55e]">
                <img src={PASSPORT_IMG} alt="Captured passport" className="w-full h-full object-cover" />
              </div>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 363 250" fill="none">
                <path d="M20 70 L20 20 L70 20"       stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
                <path d="M293 20 L343 20 L343 70"    stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
                <path d="M20 180 L20 230 L70 230"    stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
                <path d="M293 230 L343 230 L343 180" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
          ) : (
            <ScannerOverlay state={scanState} />
          )}

          {(isCapturing || isVerifying || isDone) && (
            <div className="text-center text-[9px] lg:text-[10px] font-mono text-[#555] leading-relaxed px-2">
              <div className="truncate">Q&lt;USAJOHN&lt;&lt;DOE&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div>
              <div className="truncate">C02374927457IUSA333589748223748202827190372368191...</div>
            </div>
          )}

          <div className="flex flex-col items-center gap-3 w-full max-w-[400px]">
            {isVerifying && (
              <button disabled className="flex items-center gap-2 w-full bg-[#e5e5e5] text-[#2d2d2d] rounded-2xl py-3 px-6 text-base font-medium justify-center cursor-not-allowed">
                <LoadingSpinner />
                Verifying passport...
              </button>
            )}

            {isDone && (
              <button
                onClick={() => router.push("/onboarding/passport-verified")}
                className="flex items-center justify-center gap-2 w-full bg-[#171717] text-white rounded-2xl py-3 px-6 text-base font-medium hover:bg-[#333] transition-colors"
              >
                Continue
              </button>
            )}

            {isCapturing && (
              <div className="flex flex-col items-center gap-2">
                <LoadingSpinner />
                <p className="text-sm text-[#2d2d2d] tracking-[0.14px] text-center">Passport Captured, Uploading image!</p>
              </div>
            )}

            {(isScanning || isDetected) && (
              <p className="text-xs text-[#777] tracking-[0.24px] text-center leading-4">
                {isDetected ? "Passport detected! Hold still..." : "Move your passport within the frame to detect it"}
              </p>
            )}

            {isFailed && (
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#ef4444" />
                    <path d="M15 9L9 15M9 9l6 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  <span className="text-sm text-[#2d2d2d] tracking-[0.14px] text-center">Capture not found!</span>
                </div>
                <button onClick={retry} className="px-6 py-2.5 bg-[#171717] text-white rounded-xl text-sm font-medium hover:bg-[#333] transition-colors">
                  Try Again
                </button>
              </div>
            )}
          </div>

          {(isScanning || isFailed) && !isMobile && (
            <button
              onClick={() => setScanState("switch-device")}
              className="flex items-center gap-2 text-sm text-[#335cff] font-medium hover:underline transition-colors mt-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="7" y="4" width="10" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="12" cy="17" r="1" fill="currentColor"/>
              </svg>
              Switch to another device
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .scan-line {
          position: absolute;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #22c55e, transparent);
          animation: scan 2s linear infinite;
          top: 0;
        }
        @keyframes scan {
          0%   { top: 0%; }
          50%  { top: 90%; }
          100% { top: 0%; }
        }
      `}</style>
    </KYCLayout>
  );
}

function SwitchDeviceView({ onBack }: { onBack: () => void }) {
  const [mobileUrl, setMobileUrl] = useState("");
  useEffect(() => {
    setMobileUrl(`${window.location.origin}/onboarding/scan-passport?device=mobile`);
  }, []);

  return (
    <KYCLayout activeStep="government-id">
      <div className="flex flex-col gap-8 lg:gap-10 items-center w-full max-w-[472px]">
        <div className="flex flex-col gap-1 items-center text-center w-full">
          <h1 className="text-xl lg:text-2xl font-medium text-[#2d2d2d] leading-8">Continue on Your Phone</h1>
          <p className="text-sm text-[#5a5a5a] leading-5 tracking-[0.14px]">
            Scan the QR code below with your phone camera to continue the passport scan from where you left off.
          </p>
        </div>

        <div className="flex flex-col items-center gap-5">
          <div className="p-4 lg:p-5 bg-white border border-[#eaeaea] rounded-2xl shadow-sm">
            {mobileUrl ? (
              <QRCodeSVG value={mobileUrl} size={180} bgColor="#ffffff" fgColor="#171717" level="M" includeMargin={false} />
            ) : (
              <div className="w-[180px] h-[180px] bg-[#f0f0f0] rounded-lg animate-pulse" />
            )}
          </div>
          {mobileUrl && (
            <p className="text-[11px] text-[#aaa] tracking-wide text-center break-all max-w-[260px]">{mobileUrl}</p>
          )}
          <p className="text-xs text-[#777] tracking-[0.24px] text-center leading-5 max-w-[300px]">
            Point your phone camera at the QR code — no app needed.
          </p>
        </div>

        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-[#335cff] font-medium hover:underline transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to camera scan
        </button>
      </div>
    </KYCLayout>
  );
}

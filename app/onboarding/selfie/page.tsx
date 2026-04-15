"use client";
import KYCLayout from "@/components/kyc/KYCLayout";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useEffect } from "react";

export default function SelfiePage() {
  const router = useRouter();
  const [scanned, setScanned]     = useState(false);
  const [selfieUrl, setSelfieUrl] = useState("");

  useEffect(() => {
    setSelfieUrl(`${window.location.origin}/onboarding/selfie?device=mobile`);
  }, []);

  return (
    <KYCLayout activeStep="business-info">
      <div className="flex flex-col gap-6 lg:gap-8 items-center w-full max-w-[472px]">
        <div className="flex flex-col gap-2 items-center text-center w-full">
          <h1 className="text-xl lg:text-2xl font-medium text-[#2d2d2d] leading-8">Complete Facial Verification</h1>
          <p className="text-sm text-[#5a5a5a] leading-5 tracking-[0.14px]">
            Scan the QR code below to complete your selfie verification and start making payments.
          </p>
        </div>

        <div className="flex flex-col items-center gap-5 lg:gap-6 py-2 w-full">
          <div className="flex items-center justify-center p-5 lg:p-6 bg-white border border-[#eaeaea] rounded-2xl shadow-sm">
            {selfieUrl ? (
              <QRCodeSVG value={selfieUrl} size={200} bgColor="#ffffff" fgColor="#171717" level="M" includeMargin={false} />
            ) : (
              <div className="w-[200px] h-[200px] bg-[#f0f0f0] rounded-lg animate-pulse" />
            )}
          </div>

          {scanned ? (
            <div className="flex items-center gap-2 text-[#22c55e]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="10" fill="#22c55e"/>
                <path d="M6 10l2.8 2.8 5.2-5.6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm font-medium tracking-[0.21px]">Selfie verified successfully!</span>
            </div>
          ) : (
            <p className="text-xs text-[#777] tracking-[0.24px] text-center leading-4 max-w-[280px]">
              Open your phone's camera and scan this QR code to complete your facial verification.
            </p>
          )}
        </div>

        {!scanned ? (
          <button
            onClick={() => setScanned(true)}
            className="text-xs text-[#959595] underline hover:text-[#777] transition-colors"
          >
            Simulate: mark as scanned
          </button>
        ) : (
          <button
            onClick={() => router.push("/onboarding/final-step")}
            className="w-full bg-[#171717] text-white rounded-2xl py-3 text-base font-medium leading-6 tracking-[0.08px] hover:bg-[#333] transition-colors"
          >
            Continue
          </button>
        )}
      </div>
    </KYCLayout>
  );
}

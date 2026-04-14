"use client";
import KYCLayout from "@/components/kyc/KYCLayout";
import { useRouter } from "next/navigation";
import { useState } from "react";

// QR code assets from Figma
const QR_ASSETS = [
  "https://www.figma.com/api/mcp/asset/86d7affd-af88-4143-9b98-9c89f262d08e",
  "https://www.figma.com/api/mcp/asset/b8d3abbe-be0c-4ea8-8467-5524bec636e1",
  "https://www.figma.com/api/mcp/asset/a5aef3be-5365-48c2-a1b4-241c6db5b927",
  "https://www.figma.com/api/mcp/asset/191e11ed-b9f6-4fd6-9bed-e169a24647b2",
  "https://www.figma.com/api/mcp/asset/5878f39d-eab2-40ee-9d84-91d76c09a260",
  "https://www.figma.com/api/mcp/asset/d8eb0c8e-3cf3-4083-96d0-9cdd8006f44e",
  "https://www.figma.com/api/mcp/asset/122658e6-667d-475a-9690-48d3d1d3884d",
  "https://www.figma.com/api/mcp/asset/3f3a74ca-502a-45f7-b8b9-2a011807bda3",
];

function QRCode() {
  return (
    <div className="relative w-[250px] h-[250px]">
      {QR_ASSETS.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className="absolute"
          style={{
            width: i === 0 ? "250px" : i === 1 ? "241px" : i === 2 ? "46px" : i === 3 ? "20px" : i === 4 ? "46px" : i === 5 ? "20px" : i === 6 ? "46px" : "20px",
            height: i === 0 ? "250px" : i === 1 ? "241px" : i === 2 ? "46px" : i === 3 ? "20px" : i === 4 ? "46px" : i === 5 ? "20px" : i === 6 ? "46px" : "20px",
            left: i === 0 ? "0" : i === 1 ? "4px" : i === 2 ? "4px" : i === 3 ? "17px" : i === 4 ? "200px" : i === 5 ? "213px" : i === 6 ? "4px" : "17px",
            top: i === 0 ? "0" : i === 1 ? "4px" : i === 2 ? "4px" : i === 3 ? "17px" : i === 4 ? "4px" : i === 5 ? "17px" : i === 6 ? "200px" : "213px",
          }}
        />
      ))}
    </div>
  );
}

export default function SelfiePage() {
  const router = useRouter();
  const [scanned, setScanned] = useState(false);

  return (
    <KYCLayout activeStep="selfie">
      <div className="flex flex-col gap-8 items-center w-[472px] max-w-full">
        {/* Header */}
        <div className="flex flex-col gap-2.5 items-center text-center w-full">
          <h1 className="text-2xl font-medium text-[#2d2d2d] leading-8 w-full">
            Complete Facial Verification
          </h1>
          <p className="text-sm text-[#5a5a5a] leading-5 tracking-[0.14px] w-full">
            Scan the QR code below to complete your selfie verification and start making payments.
          </p>
        </div>

        {/* QR Code area */}
        <div className="flex flex-col items-center gap-6 py-4">
          <div className="flex items-center justify-center p-6 bg-white border border-[#eaeaea] rounded-2xl shadow-sm">
            <QRCode />
          </div>

          {scanned ? (
            <div className="flex items-center gap-2 text-[#22c55e]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="10" fill="#22c55e" />
                <path d="M6 10l2.8 2.8 5.2-5.6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm font-medium tracking-[0.21px]">Selfie verified successfully!</span>
            </div>
          ) : (
            <p className="text-xs text-[#777] tracking-[0.24px] text-center leading-4 max-w-[280px]">
              Open your phone's camera and scan this QR code to complete your facial verification.
            </p>
          )}
        </div>

        {/* Simulate scan complete (for demo) */}
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

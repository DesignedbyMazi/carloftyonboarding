"use client";
import KYCLayout from "@/components/kyc/KYCLayout";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GovernmentIDPage() {
  const router = useRouter();
  const [selected, setSelected] = useState(true); // Pre-select passport

  return (
    <KYCLayout activeStep="government-id">
      <div className="flex flex-col gap-10 items-center w-[472px] max-w-full">
        {/* Header */}
        <div className="flex flex-col gap-1 items-center text-center w-full">
          <h1 className="text-2xl font-medium text-[#2d2d2d] leading-8 w-full">
            Upload Your Government ID
          </h1>
          <p className="text-sm text-[#5a5a5a] leading-5 tracking-[0.14px] w-full">
            To verify your identity, please upload a valid government-issued ID. The accepted document is your international passport.
          </p>
        </div>

        {/* Passport option card */}
        <button
          onClick={() => setSelected(true)}
          className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl border-2 text-left transition-all ${
            selected
              ? "border-[#22c55e] bg-white"
              : "border-[#eaeaea] bg-white hover:border-[#aaa]"
          }`}
        >
          {/* Passport icon */}
          <div className="shrink-0 flex items-center justify-center w-10 h-10 bg-[#f5f5f5] rounded-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="2" width="16" height="20" rx="2" stroke="#2d2d2d" strokeWidth="1.5"/>
              <circle cx="12" cy="10" r="3" stroke="#2d2d2d" strokeWidth="1.5"/>
              <path d="M7 16h10M7 18.5h6" stroke="#2d2d2d" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <span className="text-sm font-medium text-[#101010] tracking-[0.21px]">
              International Passport
            </span>
            <span className="text-xs text-[#777] tracking-[0.24px] leading-4">
              Upload a clear image of your passport's data page with all details visible.
            </span>
          </div>
          {/* Checkmark */}
          {selected && (
            <div className="shrink-0 w-5 h-5 rounded-full bg-[#22c55e] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </button>

        {/* CTA */}
        <button
          onClick={() => router.push("/onboarding/scan-passport")}
          disabled={!selected}
          className="w-full bg-[#171717] text-white rounded-2xl py-3 text-base font-medium leading-6 tracking-[0.08px] hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </KYCLayout>
  );
}

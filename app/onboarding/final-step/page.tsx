"use client";
import KYCLayout from "@/components/kyc/KYCLayout";
import { useRouter } from "next/navigation";

export default function FinalStepPage() {
  const router = useRouter();

  return (
    <KYCLayout activeStep="selfie">
      <div className="flex flex-col gap-10 items-center w-[472px] max-w-full">
        {/* Header */}
        <div className="flex flex-col gap-2 items-center text-center w-full">
          <h1 className="text-2xl font-medium text-[#2d2d2d] leading-8 w-full">
            Final Step!
          </h1>
          <p className="text-sm text-[#5a5a5a] leading-5 tracking-[0.14px] w-full">
            You're almost there. Complete a few quick questions to activate your account.
          </p>
        </div>

        {/* Info card */}
        <div className="flex flex-col items-center gap-5 w-full">
          <div className="w-full bg-[#f5f5f5] rounded-2xl p-8 flex flex-col items-center gap-5">
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-white border border-[#eaeaea] flex items-center justify-center shadow-sm">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 4C8 2.89543 8.89543 2 10 2H22L28 8V28C28 29.1046 27.1046 30 26 30H10C8.89543 30 8 29.1046 8 28V4Z"
                  fill="#e5e7eb"
                  stroke="#d1d5db"
                  strokeWidth="1.5"
                />
                <path d="M22 2V8H28" stroke="#d1d5db" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M12 14H20M12 18H20M12 22H16" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>

            <div className="flex flex-col gap-2 items-center text-center">
              <p className="text-sm font-medium text-[#2d2d2d] tracking-[0.14px]">
                Financial Information Required
              </p>
              <p className="text-xs text-[#5a5a5a] leading-5 tracking-[0.24px] max-w-[320px]">
                As part of our compliance process, we need to collect some information about your source of funds and how you intend to use your account.
              </p>
            </div>

            {/* Checklist */}
            <div className="flex flex-col gap-3 w-full max-w-[320px]">
              {[
                "Source of funds & employment details",
                "Expected account usage & monthly volume",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <div className="shrink-0 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="#22c55e" />
                      <path d="M4.5 8l2.3 2.3 4.7-4.6" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-xs text-[#5a5a5a] leading-5 tracking-[0.24px]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-[#959595] tracking-[0.24px] text-center leading-5 max-w-[360px]">
            This information is kept confidential and used solely for regulatory compliance purposes.
          </p>
        </div>

        {/* Next button */}
        <button
          onClick={() => router.push("/onboarding/source-of-funds")}
          className="w-full bg-[#171717] text-white rounded-2xl py-3 text-base font-medium leading-6 tracking-[0.08px] hover:bg-[#333] transition-colors"
        >
          Next
        </button>
      </div>
    </KYCLayout>
  );
}

"use client";
import KYCLayout from "@/components/kyc/KYCLayout";
import { useRouter } from "next/navigation";

export default function CompletePage() {
  const router = useRouter();

  return (
    <KYCLayout activeStep="selfie">
      <div className="flex flex-col gap-8 items-center w-[472px] max-w-full text-center">
        {/* Success icon */}
        <div className="w-20 h-20 rounded-full bg-[#e7f6e8] flex items-center justify-center">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="#22c55e" />
            <path d="M12 20l5.5 5.5 10.5-11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-[#2d2d2d] leading-8">
            Verification Complete!
          </h1>
          <p className="text-sm text-[#5a5a5a] leading-5 tracking-[0.14px]">
            Your identity has been successfully verified. Your account is now fully set up and ready to use.
          </p>
        </div>

        <button
          onClick={() => router.push("/")}
          className="w-full bg-[#171717] text-white rounded-2xl py-3 text-base font-medium leading-6 tracking-[0.08px] hover:bg-[#333] transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    </KYCLayout>
  );
}

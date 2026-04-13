"use client";
import KYCLayout from "@/components/kyc/KYCLayout";
import { useRouter } from "next/navigation";

export default function GettingStartedPage() {
  const router = useRouter();

  return (
    <KYCLayout activeStep="basic-info">
      <div className="flex flex-col gap-6 items-start w-[543px] max-w-full">
        {/* Header */}
        <div className="flex flex-col gap-1 items-center text-center w-full">
          <h1 className="text-2xl font-semibold text-[#2d2d2d] leading-8 w-full">
            Getting Started
          </h1>
          <p className="text-sm text-[#5a5a5a] leading-5 tracking-[0.14px] w-full">
            We'll need a few details to verify your identity and get your account fully set up.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center w-full">
          <button
            onClick={() => router.push("/onboarding/personal-details")}
            className="w-full bg-[#171717] text-white rounded-xl py-3 text-base font-medium leading-6 tracking-[0.08px] hover:bg-[#333] transition-colors"
          >
            Begin Verification
          </button>
        </div>
      </div>
    </KYCLayout>
  );
}

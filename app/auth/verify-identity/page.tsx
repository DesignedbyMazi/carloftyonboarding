"use client";
import AuthLayout from "@/components/auth/AuthLayout";
import { useRouter } from "next/navigation";
import { useState } from "react";

const consentPoints = [
  "Use your data to verify your identity, prevent fraud, and set up your auction access.",
  "Store your data securely with restricted access, only for as long as required.",
  "Share your data when necessary with trusted verification partners, auction providers, or regulators.",
  "Your data will never be used beyond these purposes without your permission.",
];

export default function VerifyIdentityPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  return (
    <AuthLayout>
      <div className="flex flex-col gap-7">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-[26px] lg:text-[30px] font-bold text-[#111827] leading-tight tracking-tight">
            Verify your identity
          </h1>
          <p className="text-sm text-[#6b7280] leading-6">
            To enable auction access and create your account, we need a valid government-issued ID.
          </p>
        </div>

        {/* Consent disclosure */}
        <div className="flex flex-col gap-4">
          <p className="text-[14px] font-semibold text-[#374151]">
            By uploading your passport, you agree that Carlofty will:
          </p>
          <div className="flex flex-col gap-3">
            {consentPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="9" fill="#f3f4f6" />
                    <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-[13px] text-[#6b7280] leading-5">{point}</p>
              </div>
            ))}
          </div>

          {/* Data note */}
          <div className="flex items-start gap-2.5 bg-[#f9fafb] border border-[#e5e7eb] rounded-xl px-4 py-3">
            <svg className="shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-6v-4m0-2V8"
                stroke="#6b7280" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p className="text-xs text-[#6b7280] leading-5">
              You can request access to or deletion of your data at any time.
            </p>
          </div>
        </div>

        {/* Checkbox agreement */}
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <div
            onClick={() => setAgreed(!agreed)}
            className="shrink-0 mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors"
            style={{
              borderColor: agreed ? "#171717" : "#d1d5db",
              backgroundColor: agreed ? "#171717" : "white",
            }}
          >
            {agreed && (
              <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
                <path d="M2 5l2.3 2.3 4-4.3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <input type="checkbox" className="sr-only" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          <span className="text-[13px] text-[#374151] leading-5">
            I agree to the collection and use of my information for identity verification and account setup.
          </span>
        </label>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <button
            disabled={!agreed}
            onClick={() => router.push("/auth/upload-passport")}
            className={`w-full rounded-2xl py-3.5 text-[15px] font-semibold tracking-[0.1px] transition-colors ${
              agreed ? "bg-[#171717] text-white hover:bg-[#333]" : "bg-[#e5e7eb] text-[#9ca3af] cursor-not-allowed"
            }`}
          >
            Verify Identity
          </button>
          <button
            onClick={() => router.back()}
            className="w-full rounded-2xl py-3.5 text-[15px] font-semibold tracking-[0.1px] border-2 border-[#e5e7eb] text-[#374151] hover:border-[#d1d5db] hover:bg-[#f9fafb] transition-colors"
          >
            Back
          </button>
        </div>

        <p className="text-center text-sm text-[#6b7280]">
          Already have an account?{" "}
          <button className="text-[#171717] font-semibold hover:underline">Log in</button>
        </p>
      </div>
    </AuthLayout>
  );
}

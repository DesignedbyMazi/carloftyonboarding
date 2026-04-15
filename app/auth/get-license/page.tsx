"use client";
import AuthLayout from "@/components/auth/AuthLayout";
import { useRouter } from "next/navigation";

const bullets = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 8v4m0 4h.01M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"
          stroke="#374151" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    text: "You'll be charged a one-time, non-refundable fee of $300",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: "Carlofty applies using our verified dealer license",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="2" width="16" height="20" rx="2" stroke="#374151" strokeWidth="1.8" />
        <circle cx="12" cy="10" r="3" stroke="#374151" strokeWidth="1.5" />
        <path d="M7 16h10M7 18.5h6" stroke="#374151" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    text: "You'll need to upload a valid international passport",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-6v-5"
          stroke="#374151" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="8" r="1" fill="#374151" />
      </svg>
    ),
    text: "Processing takes 3–7 business days",
  },
];

export default function GetLicensePage() {
  const router = useRouter();

  return (
    <AuthLayout>
      <div className="flex flex-col gap-7">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-[26px] lg:text-[30px] font-bold text-[#111827] leading-tight tracking-tight">
            Get your auction license
          </h1>
          <p className="text-sm text-[#6b7280] leading-6">
            Carlofty will apply for an auction license on your behalf using our registered dealer credentials.
          </p>
        </div>

        {/* Bullet list */}
        <div className="flex flex-col gap-3">
          {bullets.map((b, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5 w-8 h-8 rounded-xl bg-[#f3f4f6] flex items-center justify-center">
                {b.icon}
              </div>
              <p className="text-[14px] text-[#374151] leading-6 pt-1">{b.text}</p>
            </div>
          ))}
        </div>

        {/* Warning note */}
        <div className="flex items-start gap-3 bg-[#fefce8] border border-[#fde68a] rounded-xl px-4 py-3">
          <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-xs text-[#92400e] leading-5">
            This fee is charged before we process your application and is non-refundable regardless of approval outcome. Payment confirms you understand and agree to these terms.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/auth/verify-identity")}
            className="w-full bg-[#171717] text-white rounded-2xl py-3.5 text-[15px] font-semibold tracking-[0.1px] hover:bg-[#333] transition-colors"
          >
            Continue
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full text-center text-[14px] font-medium text-[#6b7280] hover:text-[#374151] transition-colors py-1"
          >
            Skip to Dashboard
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

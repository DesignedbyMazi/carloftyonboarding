"use client";
import AuthLayout from "@/components/auth/AuthLayout";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Choice = "yes" | "no" | null;

function RadioCard({
  value, selected, onSelect, title, description,
}: {
  value: Choice; selected: Choice; onSelect: (v: Choice) => void;
  title: string; description: string;
}) {
  const isSelected = selected === value;
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`w-full flex items-start gap-3 px-4 py-4 rounded-2xl border-2 text-left transition-all ${
        isSelected
          ? "border-[#171717] bg-white shadow-sm"
          : "border-[#eaeaea] bg-white hover:border-[#d1d5db]"
      }`}
    >
      {/* Checkbox */}
      <div
        className={`shrink-0 mt-0.5 w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${
          isSelected ? "bg-[#171717] border-[#171717]" : "bg-white border-[#d1d5db]"
        }`}
      >
        {isSelected && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5l2.3 2.3 4-4.3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="text-[14px] font-semibold text-[#171717] tracking-[-0.1px]">{title}</span>
        <span className="text-[12px] text-[#6b7280] leading-5 tracking-[0.1px]">{description}</span>
      </div>
    </button>
  );
}

export default function LicenseQuestionPage() {
  const router = useRouter();
  const [choice, setChoice] = useState<Choice>("yes");

  const handleContinue = () => {
    if (choice === "yes") router.push("/auth/upload-license");
    else router.push("/auth/get-license");
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-[28px] lg:text-[32px] font-bold text-[#111827] leading-tight tracking-tight">
            Do you have an auction<br className="hidden sm:block" /> license?
          </h1>
          <p className="text-sm text-[#6b7280] leading-6 max-w-[420px]">
            An auction license lets you bid and purchase vehicles at wholesale auctions. If you're unsure, select No.
          </p>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3">
          <RadioCard
            value="yes"
            selected={choice}
            onSelect={setChoice}
            title="Yes, I have one"
            description="I'll upload my existing license for verification. No fee required."
          />
          <RadioCard
            value="no"
            selected={choice}
            onSelect={setChoice}
            title="No, I don't"
            description="Carlofty will obtain a license for me. A one-time $300 fee applies."
          />
        </div>

        {/* CTA */}
        <button
          disabled={!choice}
          onClick={handleContinue}
          className="w-full bg-[#171717] text-white rounded-2xl py-3.5 text-[15px] font-semibold tracking-[0.1px] hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>

        {/* Login link */}
        <p className="text-center text-sm text-[#6b7280]">
          Already have an account?{" "}
          <button className="text-[#171717] font-semibold hover:underline transition-colors">
            Log in
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}

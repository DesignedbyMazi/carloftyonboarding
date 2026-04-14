"use client";
import FinalStepLayout from "@/components/kyc/FinalStepLayout";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SelectField({
  label,
  placeholder,
  options,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-[#2d2d2d] tracking-[0.14px]">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white border border-[#eaeaea] rounded-xl px-4 py-3 text-sm text-[#2d2d2d] tracking-[0.14px] focus:outline-none focus:border-[#2d2d2d] transition-colors pr-10"
          style={{ color: value ? "#2d2d2d" : "#959595" }}
        >
          <option value="" disabled hidden>{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
          width="16" height="16" viewBox="0 0 24 24" fill="none"
        >
          <path d="M6 9l6 6 6-6" stroke="#959595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

function RadioGroup({
  label,
  description,
  options,
  value,
  onChange,
}: {
  label: string;
  description?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-col gap-0.5">
        <label className="text-sm font-medium text-[#2d2d2d] tracking-[0.14px]">{label}</label>
        {description && (
          <p className="text-xs text-[#959595] tracking-[0.24px]">{description}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-3 p-3.5 rounded-xl border border-[#eaeaea] cursor-pointer hover:border-[#d1d5db] transition-colors"
            style={{ borderColor: value === opt.value ? "#2d2d2d" : undefined }}
          >
            <div
              className="shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors"
              style={{
                borderColor: value === opt.value ? "#2d2d2d" : "#d1d5db",
                backgroundColor: value === opt.value ? "#2d2d2d" : "white",
              }}
            >
              {value === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
            <input
              type="radio"
              className="sr-only"
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
            />
            <span className="text-sm text-[#2d2d2d] tracking-[0.14px]">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function AccountUsagePage() {
  const router = useRouter();

  const [accountPurpose, setAccountPurpose] = useState("");
  const [monthlyVolume, setMonthlyVolume] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [intermediary, setIntermediary] = useState("");

  const isValid = accountPurpose && monthlyVolume && confirmed && intermediary;

  return (
    <FinalStepLayout activeStep="account-usage">
      <div className="flex flex-col gap-10 items-center w-[472px] max-w-full">
        {/* Header */}
        <div className="flex flex-col gap-2 items-center text-center w-full">
          <h1 className="text-2xl font-medium text-[#2d2d2d] leading-8 w-full">
            Expected Account Usage
          </h1>
          <p className="text-sm text-[#5a5a5a] leading-5 tracking-[0.14px] w-full">
            Tell us how you plan to use your account.
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-6 w-full">
          <SelectField
            label="Purpose of Account"
            placeholder="Select purpose"
            value={accountPurpose}
            onChange={setAccountPurpose}
            options={[
              "Personal Payments",
              "Business Payments",
              "International Transfers",
              "Savings",
              "Investment",
              "Other",
            ]}
          />

          <SelectField
            label="Expected Monthly Payment Volume"
            placeholder="Select monthly volume"
            value={monthlyVolume}
            onChange={setMonthlyVolume}
            options={[
              "Less than $1,000",
              "$1,000 – $5,000",
              "$5,000 – $10,000",
              "$10,000 – $50,000",
              "More than $50,000",
            ]}
          />

          <RadioGroup
            label="Will you act as an intermediary?"
            description="Will you be processing payments or holding funds on behalf of others?"
            options={[
              { value: "no", label: "No, I am acting on my own behalf" },
              { value: "yes", label: "Yes, I will act on behalf of others" },
            ]}
            value={intermediary}
            onChange={setIntermediary}
          />

          {/* Confirmation checkbox */}
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <div
              onClick={() => setConfirmed(!confirmed)}
              className="shrink-0 mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center transition-colors"
              style={{
                borderColor: confirmed ? "#2d2d2d" : "#d1d5db",
                backgroundColor: confirmed ? "#2d2d2d" : "white",
              }}
            >
              {confirmed && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5 4-4.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <input
              type="checkbox"
              className="sr-only"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
            <span className="text-xs text-[#5a5a5a] leading-5 tracking-[0.24px]">
              I confirm that the information provided is accurate and complete. I understand that providing false information may result in account suspension.
            </span>
          </label>
        </div>

        {/* Submit */}
        <button
          disabled={!isValid}
          onClick={() => router.push("/onboarding/complete")}
          className={`w-full rounded-2xl py-3 text-base font-medium leading-6 tracking-[0.08px] transition-colors ${
            isValid
              ? "bg-[#171717] text-white hover:bg-[#333]"
              : "bg-[#e5e5e5] text-[#959595] cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </div>
    </FinalStepLayout>
  );
}

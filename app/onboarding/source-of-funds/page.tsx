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
        {/* Chevron */}
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

function TextField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-[#2d2d2d] tracking-[0.14px]">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-[#eaeaea] rounded-xl px-4 py-3 text-sm text-[#2d2d2d] tracking-[0.14px] placeholder:text-[#959595] focus:outline-none focus:border-[#2d2d2d] transition-colors"
      />
    </div>
  );
}

export default function SourceOfFundsPage() {
  const router = useRouter();

  const [sourceOfFunds, setSourceOfFunds] = useState("");
  const [occupation, setOccupation] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");

  const isValid = sourceOfFunds && occupation.trim() && employmentStatus;

  return (
    <FinalStepLayout activeStep="source-of-funds">
      <div className="flex flex-col gap-10 items-center w-[472px] max-w-full">
        {/* Header */}
        <div className="flex flex-col gap-2 items-center text-center w-full">
          <h1 className="text-2xl font-medium text-[#2d2d2d] leading-8 w-full">
            Source of Funds
          </h1>
          <p className="text-sm text-[#5a5a5a] leading-5 tracking-[0.14px] w-full">
            Please provide information about your source of income and employment.
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5 w-full">
          <SelectField
            label="Source of Funds"
            placeholder="Select source of funds"
            value={sourceOfFunds}
            onChange={setSourceOfFunds}
            options={[
              "Employment / Salary",
              "Business Income",
              "Investments",
              "Inheritance / Gift",
              "Rental Income",
              "Pension / Retirement",
              "Other",
            ]}
          />

          <TextField
            label="Most Recent Occupation"
            placeholder="e.g. Software Engineer"
            value={occupation}
            onChange={setOccupation}
          />

          <SelectField
            label="Employment Status"
            placeholder="Select employment status"
            value={employmentStatus}
            onChange={setEmploymentStatus}
            options={[
              "Employed (Full-time)",
              "Employed (Part-time)",
              "Self-employed",
              "Business Owner",
              "Retired",
              "Student",
              "Unemployed",
            ]}
          />
        </div>

        {/* Next */}
        <button
          disabled={!isValid}
          onClick={() => router.push("/onboarding/account-usage")}
          className={`w-full rounded-2xl py-3 text-base font-medium leading-6 tracking-[0.08px] transition-colors ${
            isValid
              ? "bg-[#171717] text-white hover:bg-[#333]"
              : "bg-[#e5e5e5] text-[#959595] cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </FinalStepLayout>
  );
}

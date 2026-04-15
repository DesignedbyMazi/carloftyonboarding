"use client";
import KYCLayout from "@/components/kyc/KYCLayout";
import { useRouter } from "next/navigation";
import { useState } from "react";

function InputField({
  label, required, optional, placeholder, value, onChange, type = "text",
}: {
  label: string; required?: boolean; optional?: boolean;
  placeholder?: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center gap-px text-sm leading-5 flex-wrap">
        <span className="font-medium text-[#2d2d2d] tracking-[0.21px]">{label}</span>
        {required && <span className="font-medium text-[#335cff] tracking-[-0.084px]">*</span>}
        {optional && <span className="text-[#959595] tracking-[0.14px] text-xs"> (Optional)</span>}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-[#eaeaea] rounded-2xl px-4 py-3.5 text-sm text-[#2d2d2d] placeholder:text-[#9ca3af] tracking-[0.14px] leading-5 outline-none focus:border-[#335cff] focus:ring-1 focus:ring-[#335cff] transition-colors"
      />
    </div>
  );
}

function SelectField({
  label, required, placeholder, value, onChange, options,
}: {
  label: string; required?: boolean; placeholder?: string;
  value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center gap-px text-sm leading-5">
        <span className="font-medium text-[#2d2d2d] tracking-[0.21px]">{label}</span>
        {required && <span className="font-medium text-[#335cff] tracking-[-0.084px]">*</span>}
      </div>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white border border-[#eaeaea] rounded-2xl px-4 py-3.5 text-sm text-[#2d2d2d] tracking-[0.14px] leading-5 outline-none focus:border-[#335cff] focus:ring-1 focus:ring-[#335cff] transition-colors pr-10"
          style={{ color: value ? "#2d2d2d" : "#959595" }}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M5 7.5l5 5 5-5" stroke="#959595" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

interface FormData {
  businessName: string;
  website: string;
  address: string;
  aptSuite: string;
  city: string;
  province: string;
  postalCode: string;
}

export default function BusinessDetailsPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    businessName: "", website: "", address: "",
    aptSuite: "", city: "", province: "", postalCode: "",
  });

  const set = (field: keyof FormData) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const isValid = form.businessName.trim() && form.address.trim() && form.city;

  return (
    <KYCLayout activeStep="business-info">
      <div className="flex flex-col gap-8 lg:gap-10 items-center w-full max-w-[472px]">

        {/* Header */}
        <div className="flex flex-col gap-2 items-center text-center w-full">
          <h1 className="text-xl lg:text-2xl font-medium text-[#2d2d2d] leading-8">Business Details</h1>
          <p className="text-sm text-[#5a5a5a] leading-5 tracking-[0.14px]">
            Enter your dealership's registered information.
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5 lg:gap-6 w-full">
          <InputField
            label="Registered Business Name" required
            placeholder="Enter business name"
            value={form.businessName} onChange={set("businessName")}
          />
          <InputField
            label="Business Website" optional
            placeholder="https://yourwebsite.com"
            value={form.website} onChange={set("website")}
          />
          <InputField
            label="Business Address" required
            placeholder="Enter Street Address here..."
            value={form.address} onChange={set("address")}
          />

          {/* Apt/Suite + City */}
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 w-full">
            <InputField
              label="Apt/Suite" optional
              placeholder="Enter Apt/Suite here..."
              value={form.aptSuite} onChange={set("aptSuite")}
            />
            <SelectField
              label="City" required
              placeholder="Choose city"
              value={form.city} onChange={set("city")}
              options={["Lagos", "Abuja", "Port Harcourt", "Kano", "Ibadan", "Benin City", "Kaduna"]}
            />
          </div>

          {/* Province + Postal Code */}
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 w-full">
            <InputField
              label="Province" optional
              placeholder="Enter Province here..."
              value={form.province} onChange={set("province")}
            />
            <InputField
              label="Postal Code" optional
              placeholder="Enter Postal Code here..."
              value={form.postalCode} onChange={set("postalCode")}
            />
          </div>
        </div>

        {/* CTA */}
        <button
          disabled={!isValid}
          onClick={() => router.push("/onboarding/business-info")}
          className={`w-full rounded-2xl py-3 text-base font-medium leading-6 tracking-[0.08px] transition-colors ${
            isValid ? "bg-[#171717] text-white hover:bg-[#333]" : "bg-[#e5e5e5] text-[#959595] cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </KYCLayout>
  );
}

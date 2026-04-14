"use client";
import KYCLayout from "@/components/kyc/KYCLayout";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  nin: string;
  address: string;
  aptSuite: string;
  city: string;
  province: string;
  postalCode: string;
}

function InputField({
  label,
  required,
  optional,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-center gap-px text-sm leading-5 whitespace-nowrap">
        <span className="font-medium text-[#2d2d2d] tracking-[0.21px]">{label}</span>
        {required && (
          <span className="font-medium text-[#335cff] tracking-[-0.084px]">*</span>
        )}
        {optional && (
          <span className="text-[#959595] tracking-[0.14px]"> (Optional)</span>
        )}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-[#eaeaea] rounded-2xl px-3.5 py-3.5 text-sm text-[#2d2d2d] placeholder:text-[#959595] tracking-[0.14px] leading-5 shadow-[0px_1px_2px_0px_rgba(10,13,20,0.01)] outline-none focus:border-[#335cff] focus:ring-1 focus:ring-[#335cff] transition-colors"
      />
    </div>
  );
}

function SelectField({
  label,
  required,
  placeholder,
  value,
  onChange,
  options,
}: {
  label: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-center gap-px text-sm leading-5 whitespace-nowrap">
        <span className="font-medium text-[#2d2d2d] tracking-[0.21px]">{label}</span>
        {required && (
          <span className="font-medium text-[#335cff] tracking-[-0.084px]">*</span>
        )}
      </div>
      <div className="relative w-full">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white border border-[#ebebeb] rounded-2xl px-3 py-3.5 text-sm text-[#2d2d2d] placeholder:text-[#959595] tracking-[0.14px] leading-5 shadow-[0px_1px_2px_0px_rgba(10,13,20,0.03)] outline-none focus:border-[#335cff] focus:ring-1 focus:ring-[#335cff] transition-colors"
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M5 7.5l5 5 5-5" stroke="#959595" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function PersonalDetailsPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    nin: "",
    address: "",
    aptSuite: "",
    city: "",
    province: "",
    postalCode: "",
  });

  const set = (field: keyof FormData) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const isValid =
    form.firstName && form.lastName && form.dateOfBirth && form.nin && form.address && form.city;

  return (
    <KYCLayout activeStep="basic-info">
      <div className="flex flex-col gap-10 items-center w-[472px] max-w-full">
        {/* Header */}
        <div className="flex flex-col gap-1 items-center text-center w-full">
          <h1 className="text-2xl font-medium text-[#2d2d2d] leading-8 w-full">
            Personal Details
          </h1>
          <p className="text-sm text-[#5a5a5a] leading-5 tracking-[0.14px] w-[432px] max-w-full">
            To verify your identity, we need just a few essential details.
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-6 w-full">
          <InputField label="First Name" required placeholder="Enter first name" value={form.firstName} onChange={set("firstName")} />
          <InputField label="Middle Name" optional placeholder="Enter middle name" value={form.middleName} onChange={set("middleName")} />
          <InputField label="Last Name" required placeholder="Enter last name" value={form.lastName} onChange={set("lastName")} />
          <InputField label="Date of Birth" required placeholder="DD / MM / YYYY" type="text" value={form.dateOfBirth} onChange={set("dateOfBirth")} />

          {/* NIN */}
          <div className="flex flex-col gap-1 w-full">
            <div className="flex items-center gap-px text-sm leading-5 whitespace-nowrap">
              <span className="font-medium text-[#2d2d2d] tracking-[0.21px]">National Identity Number</span>
              <span className="font-medium text-[#335cff] tracking-[-0.084px]">*</span>
              <span className="text-[#959595] tracking-[0.14px]"> (NIN)</span>
            </div>
            <input
              type="text"
              placeholder="Enter NIN"
              value={form.nin}
              onChange={(e) => set("nin")(e.target.value)}
              className="w-full bg-white border border-[#eaeaea] rounded-2xl px-3.5 py-3.5 text-sm text-[#2d2d2d] placeholder:text-[#959595] tracking-[0.14px] leading-5 shadow-[0px_1px_2px_0px_rgba(10,13,20,0.01)] outline-none focus:border-[#335cff] focus:ring-1 focus:ring-[#335cff] transition-colors"
            />
          </div>

          <InputField label="Address" required placeholder="Enter Street Address here..." value={form.address} onChange={set("address")} />

          {/* Apt/Suite + City row */}
          <div className="flex gap-6 w-full">
            <InputField label="Apt/Suite" optional placeholder="Enter Apt/Suite here..." value={form.aptSuite} onChange={set("aptSuite")} />
            <SelectField
              label="City"
              required
              placeholder="Choose city"
              value={form.city}
              onChange={set("city")}
              options={["Lagos", "Abuja", "Port Harcourt", "Kano", "Ibadan"]}
            />
          </div>

          {/* Province + Postal Code row */}
          <div className="flex gap-6 w-full">
            <InputField label="Province" optional placeholder="Enter Province here..." value={form.province} onChange={set("province")} />
            <InputField label="Postal Code" optional placeholder="Enter Postal Code here..." value={form.postalCode} onChange={set("postalCode")} />
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col w-full">
          <button
            onClick={() => router.push("/onboarding/government-id")}
            disabled={!isValid}
            className="w-full bg-[#171717] text-white rounded-2xl py-3 text-base font-medium leading-6 tracking-[0.08px] hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </KYCLayout>
  );
}

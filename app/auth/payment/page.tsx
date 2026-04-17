"use client";
import AuthLayout from "@/components/auth/AuthLayout";
import { useRouter } from "next/navigation";
import { useState } from "react";

const feeRows = [
  { label: "Service Fee:",    value: "$300.00",       bold: false },
  { label: "NGN Equiv:",      value: "₦ 405,000.00",  bold: false },
  { label: "VAT (7.5%):",     value: "₦ 30,375.00",   bold: false },
  { label: "Exchange Rate:",  value: "1,350.00",       bold: false },
  { label: "Total Fee:",      value: "₦ 435,375.00",  bold: true  },
];

const paymentMethods = [
  "Bank Transfer (NGN)",
  "Debit / Credit Card",
  "USSD",
  "Pay with Flutterwave",
];

export default function PaymentPage() {
  const router = useRouter();
  const [method, setMethod] = useState("");

  return (
    <AuthLayout>
      <div className="flex flex-col gap-7">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-[26px] lg:text-[30px] font-bold text-[#111827] leading-tight tracking-tight">
            Payment Summary
          </h1>
          <p className="text-sm text-[#6b7280] leading-6">
            Carlofty charges this fee to help create auction access.
          </p>
        </div>

        {/* Fee breakdown */}
        <div className="flex flex-col border border-[#e5e7eb] rounded-2xl overflow-hidden">
          {feeRows.map((row, i) => (
            <div
              key={i}
              className={`flex items-center justify-between px-5 py-3.5 ${
                row.bold
                  ? "bg-[#f9fafb] border-t-2 border-[#e5e7eb]"
                  : i > 0 ? "border-t border-[#f3f4f6]" : ""
              }`}
            >
              <span className={`text-[13px] ${row.bold ? "font-bold text-[#111827]" : "text-[#6b7280]"}`}>
                {row.label}
              </span>
              <span className={`text-[13px] ${row.bold ? "font-bold text-[#111827]" : "font-medium text-[#374151]"}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Info note */}
        <div className="flex items-start gap-3 bg-[#fefce8] border border-[#fde68a] rounded-xl px-4 py-3">
          <svg className="shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-xs text-[#92400e] leading-5">
            Charging $300 USD for auction license application fee. Non-refundable.
          </p>
        </div>

        {/* Payment method select */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-px">
            <label className="text-[13px] font-semibold text-[#374151]">
              Choose how you'd like to complete your payment.
            </label>
            <span className="text-[#e53e3e] font-semibold text-sm ml-0.5">*</span>
          </div>
          <div className="relative">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full appearance-none bg-white border border-[#e5e7eb] rounded-xl px-4 py-3 text-sm tracking-[0.1px] outline-none focus:border-[#171717] focus:ring-1 focus:ring-[#171717] transition-colors pr-10"
              style={{ color: method ? "#111827" : "#9ca3af" }}
            >
              <option value="" disabled hidden>Select Preferred Payment Method</option>
              {paymentMethods.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M5 7.5l5 5 5-5" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          disabled={!method}
          onClick={() => {
            if (typeof window !== "undefined") {
              localStorage.setItem("carlofty_license_complete", "true");
            }
            router.push("/dashboard");
          }}
          className={`w-full rounded-2xl py-3.5 text-[15px] font-semibold tracking-[0.1px] transition-colors ${
            method ? "bg-[#171717] text-white hover:bg-[#333]" : "bg-[#e5e7eb] text-[#9ca3af] cursor-not-allowed"
          }`}
        >
          Confirm Payment
        </button>

        <p className="text-center text-sm text-[#6b7280]">
          Already have an account?{" "}
          <button className="text-[#171717] font-semibold hover:underline">Log in</button>
        </p>
      </div>
    </AuthLayout>
  );
}

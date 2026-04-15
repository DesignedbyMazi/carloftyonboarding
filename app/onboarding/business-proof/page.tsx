"use client";
import KYCLayout from "@/components/kyc/KYCLayout";
import { useRouter } from "next/navigation";
import { useState, useRef, useCallback } from "react";

type ProofMethod = "" | "tin" | "utility";

// ─── Upload Drop Zone ─────────────────────────────────────────────────────────
function UploadZone({ file, onFile }: { file: File | null; onFile: (f: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const f = e.dataTransfer.files[0];
      if (f) onFile(f);
    },
    [onFile]
  );

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`w-full rounded-2xl border-2 border-dashed transition-colors cursor-pointer ${
        dragging
          ? "border-[#335cff] bg-[#f0f4ff]"
          : file
          ? "border-[#22c55e] bg-[#f0fdf4]"
          : "border-[#d4d4d4] bg-white hover:border-[#b0b0b0]"
      }`}
      style={{ minHeight: 180 }}
      onClick={() => !file && inputRef.current?.click()}
    >
      <div className="flex flex-col items-center justify-center gap-3 py-8 px-6 text-center">
        {file ? (
          <>
            <div className="w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  stroke="#16a34a"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-sm font-semibold text-[#16a34a] truncate max-w-[220px]">{file.name}</p>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
              className="text-xs text-[#6b7280] underline hover:text-[#374151] transition-colors"
            >
              Replace file
            </button>
          </>
        ) : (
          <>
            <div className="w-10 h-10 rounded-xl bg-[#f5f5f5] flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  stroke="#6b7280"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#2d2d2d]">Choose a file or drag &amp; drop it here.</p>
              <p className="text-xs text-[#9ca3af] mt-1">Select image file — JPG, PDF, PNG only up to 50MB</p>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
              className="px-4 py-2 text-sm font-medium text-[#374151] bg-white border border-[#d1d5db] rounded-lg hover:bg-[#f9fafb] transition-colors shadow-sm"
            >
              Browse files
            </button>
          </>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        className="sr-only"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }}
      />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BusinessProofPage() {
  const router = useRouter();
  const [method, setMethod]           = useState<ProofMethod>("");
  const [tin, setTin]                 = useState("");
  const [utilityFile, setUtilityFile] = useState<File | null>(null);

  const isValid =
    (method === "tin"     && tin.trim().length > 0) ||
    (method === "utility" && utilityFile !== null);

  return (
    <KYCLayout activeStep="business-info">
      <div className="flex flex-col gap-8 lg:gap-10 items-center w-full max-w-[472px]">

        {/* Header */}
        <div className="flex flex-col gap-2 items-center text-center w-full">
          <h1 className="text-xl lg:text-2xl font-medium text-[#2d2d2d] leading-8">Proof of business identity</h1>
          <p className="text-sm text-[#5a5a5a] leading-5 tracking-[0.14px] max-w-[380px]">
            Provide your TIN (Tax Identification Number) or a utility bill if your TIN is unavailable.
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5 w-full">

          {/* Identity method dropdown */}
          <div className="flex flex-col gap-1.5 w-full">
            <div className="flex items-center gap-px text-sm leading-5">
              <span className="font-medium text-[#2d2d2d] tracking-[0.21px]">Business Identity</span>
              <span className="font-medium text-[#335cff]">*</span>
            </div>
            <div className="relative">
              <select
                value={method}
                onChange={(e) => {
                  setMethod(e.target.value as ProofMethod);
                  setTin("");
                  setUtilityFile(null);
                }}
                className="w-full appearance-none bg-white border border-[#eaeaea] rounded-2xl px-4 py-3.5 text-sm tracking-[0.14px] outline-none focus:border-[#335cff] focus:ring-1 focus:ring-[#335cff] transition-colors pr-10"
                style={{ color: method ? "#2d2d2d" : "#959595" }}
              >
                <option value="" disabled hidden>Select Preferred Identity Method</option>
                <option value="tin">Tax Identification Number (TIN)</option>
                <option value="utility">Utility Bill</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M5 7.5l5 5 5-5" stroke="#959595" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* TIN input */}
          {method === "tin" && (
            <div className="flex flex-col gap-1.5 w-full">
              <div className="flex items-center gap-px text-sm leading-5">
                <span className="font-medium text-[#2d2d2d] tracking-[0.21px]">Tax Identification Number</span>
                <span className="font-medium text-[#335cff]">*</span>
              </div>
              <input
                type="text"
                placeholder="Eg: 123456789"
                value={tin}
                onChange={(e) => setTin(e.target.value)}
                className="w-full bg-white border border-[#eaeaea] rounded-2xl px-4 py-3.5 text-sm text-[#2d2d2d] placeholder:text-[#9ca3af] tracking-[0.14px] outline-none focus:border-[#335cff] focus:ring-1 focus:ring-[#335cff] transition-colors"
              />
            </div>
          )}

          {/* Utility Bill upload */}
          {method === "utility" && (
            <div className="flex flex-col gap-1.5 w-full">
              <div className="flex items-center gap-px text-sm leading-5">
                <span className="font-medium text-[#2d2d2d] tracking-[0.21px]">Upload Utility Bill</span>
                <span className="font-medium text-[#335cff]">*</span>
              </div>
              <UploadZone file={utilityFile} onFile={setUtilityFile} />
            </div>
          )}

        </div>

        {/* CTA */}
        <button
          disabled={!isValid}
          onClick={() => router.push("/onboarding/business-details")}
          className={`w-full rounded-2xl py-3 text-base font-medium leading-6 tracking-[0.08px] transition-colors ${
            isValid
              ? "bg-[#171717] text-white hover:bg-[#333]"
              : "bg-[#e5e5e5] text-[#959595] cursor-not-allowed"
          }`}
        >
          Submit
        </button>

      </div>
    </KYCLayout>
  );
}

"use client";
import AuthLayout from "@/components/auth/AuthLayout";
import { useRouter } from "next/navigation";
import { useState, useRef, useCallback } from "react";

function UploadZone({ file, onFile }: { file: File | null; onFile: (f: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  }, [onFile]);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => !file && inputRef.current?.click()}
      className={`w-full rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
        dragging ? "border-[#335cff] bg-[#f0f4ff]"
        : file ? "border-[#22c55e] bg-[#f0fdf4]"
        : "border-[#e5e7eb] bg-[#fafafa] hover:border-[#9ca3af]"
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-3 py-8 px-6 text-center">
        {file ? (
          <>
            <div className="w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-[#16a34a] truncate max-w-[240px]">{file.name}</p>
            <button type="button" onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
              className="text-xs text-[#6b7280] underline hover:text-[#374151]">
              Click to upload your license
            </button>
          </>
        ) : (
          <>
            <div className="w-10 h-10 rounded-xl bg-[#f3f4f6] flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#374151]">Click to upload your license</p>
              <p className="text-xs text-[#9ca3af] mt-0.5">JPG, PNG or PDF — max 50MB</p>
            </div>
          </>
        )}
      </div>
      <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,.pdf" className="sr-only"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
    </div>
  );
}

function InputField({ label, placeholder, value, onChange, type = "text" }: {
  label: string; placeholder: string; value: string;
  onChange: (v: string) => void; type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[13px] font-semibold text-[#374151] tracking-[0.1px]">{label}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-[#e5e7eb] rounded-xl px-4 py-3 text-sm text-[#111827] placeholder:text-[#9ca3af] outline-none focus:border-[#171717] focus:ring-1 focus:ring-[#171717] transition-colors" />
    </div>
  );
}

export default function UploadLicensePage() {
  const router = useRouter();
  const [file, setFile]               = useState<File | null>(null);
  const [authority, setAuthority]     = useState("");
  const [licenseNo, setLicenseNo]     = useState("");
  const [issueDate, setIssueDate]     = useState("");
  const [expiryDate, setExpiryDate]   = useState("");

  const isValid = file && authority.trim() && licenseNo.trim() && issueDate && expiryDate;

  return (
    <AuthLayout>
      <div className="flex flex-col gap-7">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-[26px] lg:text-[30px] font-bold text-[#111827] leading-tight tracking-tight">
            Upload your existing license
          </h1>
          <p className="text-sm text-[#6b7280] leading-6">
            Provide a clear copy of your current auction license. We'll verify it within 1–2 business days.
          </p>
        </div>

        {/* Upload */}
        <UploadZone file={file} onFile={setFile} />

        {/* Fields */}
        <div className="flex flex-col gap-4">
          <InputField label="Issuing Authority" placeholder="Eg. NAAA, ADESA, Manheim"
            value={authority} onChange={setAuthority} />
          <InputField label="License Number" placeholder="Eg. LIC-2024-00123"
            value={licenseNo} onChange={setLicenseNo} />
          <div className="flex gap-4">
            <InputField label="Issue Date" placeholder="MM / DD / YYYY"
              value={issueDate} onChange={setIssueDate} />
            <InputField label="Expiry Date" placeholder="MM / DD / YYYY"
              value={expiryDate} onChange={setExpiryDate} />
          </div>
        </div>

        {/* Info note */}
        <div className="flex items-start gap-3 bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl px-4 py-3">
          <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-6v-4m0-2V8"
              stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p className="text-xs text-[#166534] leading-5">
            <span className="font-semibold">No fee required.</span> Since you already hold a license, there is no charge for this step. We simply verify it against issuing authority records.
          </p>
        </div>

        {/* CTA */}
        <button
          disabled={!isValid}
          onClick={() => router.push("/onboarding")}
          className={`w-full rounded-2xl py-3.5 text-[15px] font-semibold tracking-[0.1px] transition-colors ${
            isValid ? "bg-[#171717] text-white hover:bg-[#333]" : "bg-[#e5e7eb] text-[#9ca3af] cursor-not-allowed"
          }`}
        >
          Submit &amp; Continue
        </button>

        <p className="text-center text-sm text-[#6b7280]">
          Already have an account?{" "}
          <button className="text-[#171717] font-semibold hover:underline">Log in</button>
        </p>
      </div>
    </AuthLayout>
  );
}

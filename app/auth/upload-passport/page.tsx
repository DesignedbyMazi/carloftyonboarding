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
      <div className="flex flex-col items-center justify-center gap-3 py-10 px-6 text-center">
        {file ? (
          <>
            {/* Compact file preview */}
            <div className="w-full flex items-center gap-3 bg-white border border-[#e5e7eb] rounded-xl px-4 py-3">
              <div className="w-9 h-9 rounded-lg bg-[#dcfce7] flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-semibold text-[#111827] truncate">{file.name}</p>
                <p className="text-xs text-[#9ca3af]">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                className="text-xs text-[#6b7280] underline hover:text-[#374151] shrink-0"
              >
                Replace
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="w-12 h-12 rounded-xl bg-[#f3f4f6] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#374151]">Choose a file or drag &amp; drop it here.</p>
              <p className="text-xs text-[#9ca3af] mt-0.5">Select image file — JPG, PDF, PNG only up to 50MB</p>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
              className="px-5 py-2 bg-white border border-[#d1d5db] rounded-lg text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors shadow-sm"
            >
              Browse files
            </button>
          </>
        )}
      </div>
      <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,.pdf" className="sr-only"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
    </div>
  );
}

export default function UploadPassportPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  return (
    <AuthLayout>
      <div className="flex flex-col gap-7">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-[26px] lg:text-[30px] font-bold text-[#111827] leading-tight tracking-tight">
            Verify Identity
          </h1>
          <p className="text-sm text-[#6b7280] leading-6">
            Upload a clear photo of the biographical data page.
          </p>
        </div>

        {/* Upload */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-px">
            <span className="text-[13px] font-semibold text-[#374151]">Upload Passport</span>
            <span className="text-[#e53e3e] font-semibold text-sm ml-0.5">*</span>
          </div>
          <UploadZone file={file} onFile={setFile} />
        </div>

        {/* Requirements */}
        <div className="flex flex-col gap-2.5">
          {[
            "Photo must be fully visible and unobstructed",
            "Your passport must not be expired",
          ].map((req) => (
            <div key={req} className="flex items-center gap-2.5">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="9" fill="#22c55e" />
                <path d="M5 9l2.7 2.7 5.3-5.4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[13px] text-[#374151] leading-5">{req}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <button
            disabled={!file}
            onClick={() => router.push("/auth/payment")}
            className={`w-full rounded-2xl py-3.5 text-[15px] font-semibold tracking-[0.1px] transition-colors ${
              file ? "bg-[#171717] text-white hover:bg-[#333]" : "bg-[#e5e7eb] text-[#9ca3af] cursor-not-allowed"
            }`}
          >
            Continue
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

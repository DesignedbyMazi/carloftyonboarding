"use client";
import KYCLayout from "@/components/kyc/KYCLayout";
import { useRouter } from "next/navigation";
import { useState, useRef, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useEffect } from "react";

// ─── Upload Drop Zone ─────────────────────────────────────────────────────────
function UploadZone({ file, onFile }: { file: File | null; onFile: (f: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  }, [onFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) onFile(f);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`w-full rounded-2xl border-2 border-dashed transition-colors ${
        dragging ? "border-[#335cff] bg-[#f0f4ff]" : file ? "border-[#22c55e] bg-[#f0fdf4]" : "border-[#d4d4d4] bg-white"
      }`}
      style={{ minHeight: 192 }}
    >
      <div className="flex flex-col items-center justify-center gap-3 py-10 px-6 text-center">
        {file ? (
          <>
            {/* Preview or file icon */}
            {file.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(file)}
                alt="Passport preview"
                className="w-24 h-16 object-cover rounded-lg border border-[#e5e7eb]"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-[#dcfce7] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
            <p className="text-sm font-semibold text-[#16a34a] truncate max-w-[240px]">{file.name}</p>
            <button
              onClick={() => inputRef.current?.click()}
              className="text-xs text-[#6b7280] underline hover:text-[#374151] transition-colors"
            >
              Replace file
            </button>
          </>
        ) : (
          <>
            {/* Upload cloud icon */}
            <div className="w-12 h-12 rounded-xl bg-[#f5f5f5] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#2d2d2d]">Choose a file or drag &amp; drop it here.</p>
              <p className="text-xs text-[#9ca3af] mt-1">Select image file — JPG, PDF, PNG only up to 50MB</p>
            </div>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
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
        onChange={handleChange}
      />
    </div>
  );
}

// ─── QR Code View ─────────────────────────────────────────────────────────────
function QRView({ onBack }: { onBack: () => void }) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl(`${window.location.origin}/onboarding/government-id?device=mobile`);
  }, []);

  return (
    <KYCLayout activeStep="government-id">
      <div className="flex flex-col gap-8 lg:gap-10 items-center w-full max-w-[472px]">
        <div className="flex flex-col gap-2 items-center text-center w-full">
          <h1 className="text-xl lg:text-2xl font-medium text-[#2d2d2d] leading-8">Scan the QR Code</h1>
          <p className="text-sm text-[#5a5a5a] leading-5 tracking-[0.14px] max-w-[340px]">
            Scan the QR code to continue your onboarding on another device right where you left off.
          </p>
        </div>

        {/* QR with green corner brackets */}
        <div className="relative p-2">
          <div className="relative p-4 bg-white rounded-2xl shadow-sm">
            {url ? (
              <QRCodeSVG value={url} size={220} bgColor="#ffffff" fgColor="#171717" level="M" includeMargin={false} />
            ) : (
              <div className="w-[220px] h-[220px] bg-[#f0f0f0] rounded-lg animate-pulse" />
            )}
          </div>
          {/* Green corner brackets */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 280 280" fill="none">
            <path d="M20 70 L20 20 L70 20"    stroke="#22c55e" strokeWidth="5" strokeLinecap="round" />
            <path d="M210 20 L260 20 L260 70" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" />
            <path d="M20 210 L20 260 L70 260" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" />
            <path d="M210 260 L260 260 L260 210" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>

        <button
          onClick={onBack}
          className="w-full bg-[#171717] text-white rounded-2xl py-3 text-base font-medium leading-6 tracking-[0.08px] hover:bg-[#333] transition-colors"
        >
          Continue on this device
        </button>
      </div>
    </KYCLayout>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function GovernmentIDPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [showQR, setShowQR] = useState(false);

  if (showQR) return <QRView onBack={() => setShowQR(false)} />;

  return (
    <KYCLayout activeStep="government-id">
      <div className="flex flex-col gap-8 lg:gap-10 items-center w-full max-w-[472px]">

        {/* Header */}
        <div className="flex flex-col gap-2 items-center text-center w-full">
          <h1 className="text-xl lg:text-2xl font-medium text-[#2d2d2d] leading-8">International Passport</h1>
          <p className="text-sm text-[#5a5a5a] leading-5 tracking-[0.14px]">
            Upload a clear photo of the biographical data page.
          </p>
        </div>

        {/* Upload area */}
        <div className="flex flex-col gap-3 w-full">
          <div className="flex items-center gap-px text-sm leading-5">
            <span className="font-medium text-[#2d2d2d] tracking-[0.21px]">Upload Passport</span>
            <span className="font-medium text-[#335cff]">*</span>
          </div>
          <UploadZone file={file} onFile={setFile} />
        </div>

        {/* Requirements */}
        <div className="flex flex-col gap-2.5 w-full -mt-3">
          {[
            "Photo must be fully visible and unobstructed",
            "Your passport must not be expired",
          ].map((req) => (
            <div key={req} className="flex items-center gap-2.5">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="9" fill="#22c55e" />
                <path d="M5 9l2.7 2.7 5.3-5.4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm text-[#5a5a5a] tracking-[0.14px]">{req}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 w-full">
          <button
            disabled={!file}
            onClick={() => router.push("/onboarding/business-details")}
            className={`w-full rounded-2xl py-3 text-base font-medium leading-6 tracking-[0.08px] transition-colors ${
              file ? "bg-[#171717] text-white hover:bg-[#333]" : "bg-[#e5e5e5] text-[#959595] cursor-not-allowed"
            }`}
          >
            Continue
          </button>
          <button
            onClick={() => setShowQR(true)}
            className="w-full text-center text-sm font-medium text-[#2d2d2d] hover:text-[#555] transition-colors py-1"
          >
            Continue on another device
          </button>
        </div>

      </div>
    </KYCLayout>
  );
}

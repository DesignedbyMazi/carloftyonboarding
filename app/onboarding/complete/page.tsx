"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CompletePage() {
  const router = useRouter();
  const [show, setShow] = useState(false);

  // Small entrance animation delay
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center bg-white px-6">
      <div
        className={`flex flex-col gap-8 items-center w-[472px] max-w-full text-center transition-all duration-500 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Carlofty logo */}
        <div className="mb-2">
          <img
            src="https://www.figma.com/api/mcp/asset/b4f1b995-cb98-48a3-ba0b-7ae714cdccf6"
            alt="Carlofty"
            className="h-8 w-auto object-contain"
          />
        </div>

        {/* Success icon */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-[#f0fdf4] flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="24" fill="#22c55e" />
              <path
                d="M14 24l7 7 13-14"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {/* Decorative ring */}
          <div className="absolute inset-0 rounded-full border-4 border-[#dcfce7] scale-125" />
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold text-[#2d2d2d] leading-9">
            Congratulations!
          </h1>
          <p className="text-sm text-[#5a5a5a] leading-6 tracking-[0.14px] max-w-[360px]">
            Your identity has been successfully verified and your account is fully set up. You're all set to start using Carlofty.
          </p>
        </div>

        {/* Completed steps summary */}
        <div className="w-full bg-[#f9fafb] rounded-2xl p-5 flex flex-col gap-3">
          {[
            "Basic Information verified",
            "Government ID verified",
            "Selfie verification complete",
            "Source of Funds confirmed",
            "Account Usage confirmed",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="shrink-0 w-5 h-5">
                <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
                  <circle cx="10" cy="10" r="10" fill="#22c55e" />
                  <path d="M5.5 10l3 3 6-6.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-sm text-[#5a5a5a] tracking-[0.14px]">{item}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push("/")}
          className="w-full bg-[#171717] text-white rounded-2xl py-3 text-base font-medium leading-6 tracking-[0.08px] hover:bg-[#333] transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

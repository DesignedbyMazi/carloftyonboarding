"use client";
import KYCLayout from "@/components/kyc/KYCLayout";
import { useRouter } from "next/navigation";

const PASSPORT_IMG = "https://www.figma.com/api/mcp/asset/e03156b7-d921-4a06-9bd9-34c192fd7d56";
const WATERMARK_IMG = "https://www.figma.com/api/mcp/asset/61c47cf0-691d-414a-9fd3-5e189d21679d";

export default function PassportVerifiedPage() {
  const router = useRouter();

  return (
    <KYCLayout activeStep="government-id">
      <div className="flex flex-col gap-6 items-center w-[472px] max-w-full">
        {/* Header */}
        <div className="flex flex-col gap-1 items-center text-center w-full">
          <h1 className="text-2xl font-medium text-[#2d2d2d] leading-8 w-full">
            Passport Verified
          </h1>
          <p className="text-sm text-[#5a5a5a] leading-5 tracking-[0.14px] w-full">
            Your passport has been successfully verified. You're good to continue.
          </p>
        </div>

        {/* Passport card with verified badge */}
        <div className="flex flex-col gap-8 items-center py-10 w-full">
          <div className="relative">
            {/* Passport card */}
            <div className="relative bg-white border border-[#eaeaea] rounded-[10px] overflow-hidden shadow-sm w-[328px]">
              {/* Watermark */}
              <div className="absolute inset-0 mix-blend-color opacity-90 pointer-events-none">
                <img src={WATERMARK_IMG} alt="" className="w-full h-[161px] object-cover" />
              </div>

              {/* Header row */}
              <div className="flex items-center justify-between px-2.5 pt-2.5 pb-1">
                <span className="text-[7.5px] font-medium text-black tracking-[0.15px]">UNITED STATES OF AMERICA</span>
                <span className="text-[6px] font-medium text-[#5a5a5a] tracking-[0.12px]">Passport</span>
              </div>

              {/* Content */}
              <div className="flex gap-6 items-start px-2.5 pb-3">
                {/* Photo */}
                <div className="w-[106px] h-[106px] rounded-lg overflow-hidden shrink-0 bg-gray-200">
                  <img
                    src={PASSPORT_IMG}
                    alt="Passport photo"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col gap-1 text-[6.3px] leading-[8.8px] tracking-[0.13px] flex-1 min-w-0">
                  <div>
                    <p className="text-[#5a5a5a]">Given Name</p>
                    <p className="font-medium text-[#2d2d2d]">John Doe</p>
                  </div>
                  <div>
                    <p className="text-[#5a5a5a]">Nationality</p>
                    <p className="font-medium text-[#2d2d2d]">American</p>
                  </div>
                  <div className="flex gap-10">
                    <div>
                      <p className="text-[#5a5a5a]">Date of Birth</p>
                      <p className="font-medium text-[#2d2d2d]">01 JUN 00</p>
                    </div>
                    <div>
                      <p className="text-[#5a5a5a]">NIN</p>
                      <p className="font-medium text-[#2d2d2d]">1234567890</p>
                    </div>
                  </div>
                  <div className="flex gap-10">
                    <div>
                      <p className="text-[#5a5a5a]">Date of Issue</p>
                      <p className="font-medium text-[#2d2d2d]">01 JUN / JUN 26</p>
                    </div>
                    <div>
                      <p className="text-[#5a5a5a]">Authority</p>
                      <p className="font-medium text-[#2d2d2d]">ALAUSA, LAGOS</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[#5a5a5a]">Date of Expiry</p>
                    <p className="font-medium text-[#2d2d2d]">01 JUN / JUN 26</p>
                  </div>
                </div>
              </div>

              {/* MRZ */}
              <div className="flex flex-col items-center gap-1 pb-4 px-2.5">
                <p className="text-[7.5px] font-medium text-[#2d2d2d] tracking-[0.15px] font-mono">
                  {`Q<USAJOHN<<DOE<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`}
                </p>
                <p className="text-[7.5px] font-medium text-[#2d2d2d] tracking-[0.15px] font-mono">
                  C02374927457IUSA333589748223748...
                </p>
              </div>
            </div>

            {/* Verified badge — rotated, overlapping top-left */}
            <div className="absolute top-8 left-14 transform -rotate-[23deg]">
              <div className="flex items-center gap-1 bg-[#e7f6e8] border border-[rgba(22,104,30,0.1)] rounded-full pl-1.5 pr-2.5 py-0.5">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 1.5l1.5 1.3 2-.4.7 1.9 1.8.7-.4 2 1.3 1.5-1.3 1.5.4 2-1.8.7-.7 1.9-2-.4L8 14.5l-1.5-1.3-2 .4-.7-1.9-1.8-.7.4-2L1.1 8l1.3-1.5-.4-2 1.8-.7.7-1.9 2 .4L8 1.5z"
                    fill="#22c55e"
                  />
                  <path d="M5.5 8l1.7 1.7 3-3.4" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-xs font-medium text-[#16681e] tracking-[0.24px] whitespace-nowrap">
                  Verified
                </span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-4 w-full">
            <button
              onClick={() => router.push("/onboarding/selfie")}
              className="w-full bg-[#171717] text-white rounded-2xl py-3 text-base font-medium leading-6 tracking-[0.08px] hover:bg-[#333] transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </KYCLayout>
  );
}

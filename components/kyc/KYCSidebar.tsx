import SupportWidget from "./SupportWidget";

export type KYCStep = "basic-info" | "government-id" | "selfie";
export type StepStatus = "pending" | "active" | "completed";

interface Step {
  id: KYCStep;
  number: number;
  title: string;
  subtitle: string;
}

const steps: Step[] = [
  {
    id: "basic-info",
    number: 1,
    title: "Basic Information",
    subtitle: "Verify Personal Information",
  },
  {
    id: "government-id",
    number: 2,
    title: "Government ID",
    subtitle: "Provide Legal Identification",
  },
  {
    id: "selfie",
    number: 3,
    title: "Selfie",
    subtitle: "Provide a capture for your verification",
  },
];

function getStepStatus(step: Step, activeStep: KYCStep): StepStatus {
  const order: KYCStep[] = ["basic-info", "government-id", "selfie"];
  const stepIdx = order.indexOf(step.id);
  const activeIdx = order.indexOf(activeStep);
  if (stepIdx < activeIdx) return "completed";
  if (stepIdx === activeIdx) return "active";
  return "pending";
}

function StepBadge({ status, number }: { status: StepStatus; number: number }) {
  if (status === "completed") {
    return (
      <div className="relative shrink-0 size-6">
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <circle cx="12" cy="12" r="12" fill="#22c55e" />
          <path d="M7 12l3.5 3.5L17 8.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
  if (status === "active") {
    return (
      <div className="relative shrink-0 flex items-center justify-center w-8 h-8 bg-[#1f1f1f] rounded-full border border-[#3c3c3c] shadow-[0px_0px_2px_1px_rgba(16,24,40,0.1)]">
        <span className="text-white text-xs font-semibold tracking-[0.24px]">{number}</span>
      </div>
    );
  }
  // pending
  return (
    <div className="relative shrink-0 flex items-center justify-center w-8 h-8 bg-white rounded-full border border-[#eaeaea] shadow-[0px_0px_2px_0.5px_rgba(16,24,40,0.02)]">
      <span className="text-[#959595] text-xs font-semibold tracking-[0.24px]">{number}</span>
    </div>
  );
}

function DashedLine({ completed }: { completed: boolean }) {
  return (
    <div className="flex justify-center w-0 h-16 ml-4">
      <div
        className="w-px h-full"
        style={{
          background: completed
            ? "linear-gradient(180deg, #22c55e 0%, #22c55e 100%)"
            : "repeating-linear-gradient(180deg, #d1d5db 0px, #d1d5db 4px, transparent 4px, transparent 8px)",
        }}
      />
    </div>
  );
}

interface KYCSidebarProps {
  activeStep: KYCStep;
}

export default function KYCSidebar({ activeStep }: KYCSidebarProps) {
  return (
    <aside className="bg-[#fafafa] flex flex-col h-full w-[321px] shrink-0 shadow-[0px_4px_6px_-2px_rgba(13,13,18,0.03)]">
      {/* Top: steps */}
      <div className="flex-1 flex flex-col px-8 pt-10 w-full overflow-y-auto">
        <p className="text-xs font-medium text-[#777] tracking-[0.24px] leading-4 uppercase mb-6">
          Complete Your Profile
        </p>
        <div className="flex flex-col items-start w-full">
          {steps.map((step, idx) => {
            const status = getStepStatus(step, activeStep);
            const isLast = idx === steps.length - 1;
            return (
              <div key={step.id} className="w-full">
                <div className="flex gap-3 items-start w-full">
                  <div className="flex flex-col items-center shrink-0">
                    <StepBadge status={status} number={step.number} />
                    {!isLast && <DashedLine completed={status === "completed"} />}
                  </div>
                  <div className="flex flex-col gap-0.5 items-start justify-center flex-1 min-w-0 min-h-[38px]">
                    <p
                      className={`text-sm font-medium tracking-[0.21px] leading-5 ${
                        status === "pending"
                          ? "text-[#959595]"
                          : status === "active"
                          ? "text-[#2d2d2d]"
                          : "text-[#5a5a5a]"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p
                      className={`text-xs tracking-[0.24px] leading-4 ${
                        status === "pending"
                          ? "text-[#959595]"
                          : status === "active"
                          ? "text-[#5a5a5a]"
                          : "text-[#959595]"
                      }`}
                    >
                      {step.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom: support widget always pinned to bottom */}
      <div className="shrink-0 pb-10">
        <SupportWidget />
      </div>
    </aside>
  );
}

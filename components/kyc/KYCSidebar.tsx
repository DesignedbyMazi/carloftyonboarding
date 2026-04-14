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
      <div className="shrink-0 size-6">
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <circle cx="12" cy="12" r="12" fill="#22c55e" />
          <path
            d="M7 12l3.5 3.5L17 8.5"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }
  if (status === "active") {
    return (
      <div className="shrink-0 flex items-center justify-center w-8 h-8 bg-[#1f1f1f] rounded-full border border-[#3c3c3c] shadow-[0px_0px_2px_1px_rgba(16,24,40,0.1)]">
        <span className="text-white text-xs font-semibold tracking-[0.24px]">{number}</span>
      </div>
    );
  }
  return (
    <div className="shrink-0 flex items-center justify-center w-8 h-8 bg-white rounded-full border border-[#eaeaea] shadow-[0px_0px_2px_0.5px_rgba(16,24,40,0.02)]">
      <span className="text-[#959595] text-xs font-semibold tracking-[0.24px]">{number}</span>
    </div>
  );
}

function Connector({ completed }: { completed: boolean }) {
  return (
    <div className="w-px h-16 mx-auto" style={{ marginLeft: "15px" }}>
      <div
        className="w-full h-full"
        style={{
          background: completed
            ? "#22c55e"
            : "repeating-linear-gradient(180deg,#d1d5db 0px,#d1d5db 4px,transparent 4px,transparent 8px)",
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
    /*
     * sticky + top-0 + h-screen  ← the three properties that solve the problem:
     *   sticky  → positions relative to scroll container; sticks once it hits top:0
     *   top-0   → anchors to the very top of the viewport
     *   h-screen → sidebar is ALWAYS exactly 100vh regardless of parent / sibling height
     * This is independent of any parent height — no chain of h-full needed.
     */
    <aside
      className="
        sticky top-0 h-screen
        w-[321px] shrink-0
        bg-[#fafafa]
        shadow-[0px_4px_6px_-2px_rgba(13,13,18,0.03)]
        flex flex-col
        overflow-hidden
      "
    >
      {/* ── Steps (scrollable if ever needed) ── */}
      <div className="flex-1 overflow-y-auto px-8 pt-10">
        <p className="text-xs font-medium text-[#777777] tracking-[0.24px] leading-4 uppercase mb-6">
          Complete Your Profile
        </p>

        <div className="flex flex-col">
          {steps.map((step, idx) => {
            const status = getStepStatus(step, activeStep);
            const isLast = idx === steps.length - 1;

            return (
              <div key={step.id}>
                {/* Step row */}
                <div className="flex gap-3 items-start">
                  {/* Icon column */}
                  <div className="flex flex-col items-center shrink-0">
                    <StepBadge status={status} number={step.number} />
                    {!isLast && <Connector completed={status === "completed"} />}
                  </div>

                  {/* Text column */}
                  <div
                    className={`flex flex-col gap-0.5 justify-center flex-1 min-w-0 ${
                      isLast ? "min-h-[24px]" : "min-h-[88px]"
                    }`}
                  >
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
                        status === "pending" ? "text-[#959595]" : "text-[#5a5a5a]"
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

      {/* ── Support widget pinned to bottom ── */}
      <div className="shrink-0 pb-10">
        <SupportWidget />
      </div>
    </aside>
  );
}

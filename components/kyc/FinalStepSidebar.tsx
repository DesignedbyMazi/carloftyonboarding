import SupportWidget from "./SupportWidget";

export type FinalStep = "source-of-funds" | "account-usage";
export type StepStatus = "pending" | "active" | "completed";

interface Step {
  id: FinalStep;
  number: number;
  title: string;
  subtitle: string;
}

const finalSteps: Step[] = [
  {
    id: "source-of-funds",
    number: 1,
    title: "Source of Funds",
    subtitle: "Provide your source of income",
  },
  {
    id: "account-usage",
    number: 2,
    title: "Account Usage",
    subtitle: "Expected account activity",
  },
];

function getStepStatus(step: Step, activeStep: FinalStep): StepStatus {
  const order: FinalStep[] = ["source-of-funds", "account-usage"];
  const stepIdx = order.indexOf(step.id);
  const activeIdx = order.indexOf(activeStep);
  if (stepIdx < activeIdx) return "completed";
  if (stepIdx === activeIdx) return "active";
  return "pending";
}

function StepBadge({ status, number }: { status: StepStatus; number: number }) {
  if (status === "completed") {
    return (
      <div className="shrink-0 w-6 h-6">
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
      <div className="shrink-0 w-6 h-6 flex items-center justify-center bg-[#1f1f1f] rounded-full border border-[#3c3c3c] shadow-[0px_0px_2px_1px_rgba(16,24,40,0.1)]">
        <span className="text-white font-semibold tracking-[0.24px]" style={{ fontSize: 12, lineHeight: "16px" }}>
          {number}
        </span>
      </div>
    );
  }
  return (
    <div className="shrink-0 w-6 h-6 flex items-center justify-center bg-white rounded-full border border-[#eaeaea] shadow-[0px_0px_2px_0.5px_rgba(16,24,40,0.02)]">
      <span className="text-[#959595] font-semibold tracking-[0.24px]" style={{ fontSize: 12, lineHeight: "16px" }}>
        {number}
      </span>
    </div>
  );
}

function Connector({ completed }: { completed: boolean }) {
  return (
    <div
      className="w-px"
      style={{
        height: 64,
        background: completed
          ? "#22c55e"
          : "repeating-linear-gradient(180deg,#d1d5db 0px,#d1d5db 4px,transparent 4px,transparent 8px)",
      }}
    />
  );
}

// Compact "all completed" KYC steps shown at top
function CompletedKYCSteps() {
  const kycSteps = [
    { label: "Basic Information" },
    { label: "Government ID" },
    { label: "Selfie" },
  ];
  return (
    <div className="flex flex-col gap-2 mb-6">
      {kycSteps.map((s) => (
        <div key={s.label} className="flex items-center gap-2.5">
          <div className="shrink-0 w-5 h-5">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <circle cx="12" cy="12" r="12" fill="#22c55e" />
              <path d="M7 12l3.5 3.5L17 8.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-[#959595] font-medium tracking-[0.21px]" style={{ fontSize: 13, lineHeight: "18px" }}>
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

interface FinalStepSidebarProps {
  activeStep: FinalStep;
}

export default function FinalStepSidebar({ activeStep }: FinalStepSidebarProps) {
  return (
    <aside className="h-full w-[321px] shrink-0 flex flex-col bg-[#fafafa] shadow-[0px_4px_6px_-2px_rgba(13,13,18,0.03)]">

      <div className="flex-1 overflow-y-auto px-8 pt-10">
        {/* Completed KYC label */}
        <p
          className="font-medium text-[#777777] tracking-[0.24px] uppercase mb-4"
          style={{ fontSize: 12, lineHeight: "16px" }}
        >
          Complete Your Profile
        </p>

        {/* Completed KYC steps (compact) */}
        <CompletedKYCSteps />

        {/* Divider */}
        <div className="border-t border-[#eaeaea] mb-6" />

        {/* Final Step label */}
        <p
          className="font-medium text-[#777777] tracking-[0.24px] uppercase mb-6"
          style={{ fontSize: 12, lineHeight: "16px" }}
        >
          Final Step
        </p>

        <div className="flex flex-col">
          {finalSteps.map((step, idx) => {
            const status = getStepStatus(step, activeStep);
            const isLast = idx === finalSteps.length - 1;

            return (
              <div key={step.id} className="flex gap-3">
                <div className="flex flex-col items-center w-6 shrink-0">
                  <StepBadge status={status} number={step.number} />
                  {!isLast && <Connector completed={status === "completed"} />}
                </div>

                <div
                  className="flex flex-col justify-start gap-0.5 flex-1 min-w-0"
                  style={{ height: isLast ? "auto" : 88 }}
                >
                  <p
                    className="font-medium tracking-[0.21px]"
                    style={{
                      fontSize: 14,
                      lineHeight: "20px",
                      color:
                        status === "active"
                          ? "#2d2d2d"
                          : status === "completed"
                          ? "#5a5a5a"
                          : "#959595",
                    }}
                  >
                    {step.title}
                  </p>
                  <p
                    className="tracking-[0.24px]"
                    style={{
                      fontSize: 12,
                      lineHeight: "16px",
                      color: status === "active" ? "#5a5a5a" : "#959595",
                    }}
                  >
                    {step.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="shrink-0 pb-10">
        <SupportWidget />
      </div>

    </aside>
  );
}

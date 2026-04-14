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

/**
 * Badge specs (from design):
 * - Overall size: 24 × 24px
 * - Number font: 12px / line-height 16px
 * - Active:  bg #1f1f1f, border #3c3c3c, white text
 * - Pending: bg white,   border #eaeaea, grey text
 * - Completed: green circle with checkmark
 */
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
        {/* font-size 12px, line-height 16px */}
        <span className="text-white font-semibold tracking-[0.24px]" style={{ fontSize: 12, lineHeight: "16px" }}>
          {number}
        </span>
      </div>
    );
  }

  // pending
  return (
    <div className="shrink-0 w-6 h-6 flex items-center justify-center bg-white rounded-full border border-[#eaeaea] shadow-[0px_0px_2px_0.5px_rgba(16,24,40,0.02)]">
      <span className="text-[#959595] font-semibold tracking-[0.24px]" style={{ fontSize: 12, lineHeight: "16px" }}>
        {number}
      </span>
    </div>
  );
}

/**
 * Connector specs:
 * - Height: 64px  (sits directly below badge — 0px gap)
 * - Width:  1px centred under the badge
 * - Active/pending: dashed grey
 * - Completed:      solid green
 */
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

interface KYCSidebarProps {
  activeStep: KYCStep;
}

export default function KYCSidebar({ activeStep }: KYCSidebarProps) {
  return (
    /**
     * position: fixed — 100% reliable, always covers exact viewport height.
     * Does NOT depend on any parent's height at all.
     * KYCLayout adds ml-[321px] to the main content to prevent overlap.
     */
    <aside
      className="fixed top-0 left-0 h-screen w-[321px] z-20 flex flex-col bg-[#fafafa] shadow-[0px_4px_6px_-2px_rgba(13,13,18,0.03)]"
    >
      {/* ── Steps area (scrollable on very small viewports) ── */}
      <div className="flex-1 overflow-y-auto px-8 pt-10">

        <p className="text-[12px] leading-[16px] font-medium text-[#777777] tracking-[0.24px] uppercase mb-6">
          Complete Your Profile
        </p>

        {/* Step list — gap between rows is 0 because the 64px connector provides spacing */}
        <div className="flex flex-col">
          {steps.map((step, idx) => {
            const status = getStepStatus(step, activeStep);
            const isLast = idx === steps.length - 1;

            return (
              <div key={step.id} className="flex gap-3">

                {/*
                  LEFT COLUMN — fixed 24px wide, centres badge and connector
                  Badge:    24×24px  (h-6 w-6)
                  Connector: 1×64px  (gap-0 between them)
                */}
                <div className="flex flex-col items-center w-6 shrink-0">
                  <StepBadge status={status} number={step.number} />
                  {!isLast && <Connector completed={status === "completed"} />}
                </div>

                {/*
                  RIGHT COLUMN — 12px gap from left (gap-3 on parent)
                  Height: 88px for rows with a connector (24 badge + 64 connector)
                  Height: auto for last row (no connector below)
                  Alignment: top (justify-start)
                  Title:    14px / 20px  font-medium
                  Subtitle: 12px / 16px  font-normal
                  Gap between title & subtitle: 2px
                */}
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

      {/* ── Support widget — pinned to the bottom ── */}
      <div className="shrink-0 pb-10">
        <SupportWidget />
      </div>
    </aside>
  );
}

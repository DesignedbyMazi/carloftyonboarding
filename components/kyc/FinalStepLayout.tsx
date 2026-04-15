import FinalStepSidebar, { type FinalStep } from "./FinalStepSidebar";

interface FinalStepLayoutProps {
  activeStep: FinalStep;
  children: React.ReactNode;
}

const finalStepsList: { id: FinalStep; label: string }[] = [
  { id: "source-of-funds", label: "Source of Funds" },
  { id: "account-usage",   label: "Account Usage" },
];

const stepOrder: FinalStep[] = ["source-of-funds", "account-usage"];

function MobileStepper({ activeStep }: { activeStep: FinalStep }) {
  const activeIdx = stepOrder.indexOf(activeStep);
  return (
    <div className="flex items-center justify-center gap-0 w-full px-4 py-4 border-b border-[#f0f0f0] bg-white lg:hidden">
      {finalStepsList.map((step, idx) => {
        const isCompleted = idx < activeIdx;
        const isActive    = idx === activeIdx;
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  isCompleted ? "bg-[#22c55e] text-white" : isActive ? "bg-[#1f1f1f] text-white" : "bg-[#f0f0f0] text-[#959595]"
                }`}
              >
                {isCompleted ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7l3 3 6-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : idx + 1}
              </div>
              <span className={`text-[10px] font-medium tracking-wide whitespace-nowrap ${isActive ? "text-[#1f1f1f]" : isCompleted ? "text-[#22c55e]" : "text-[#959595]"}`}>
                {step.label}
              </span>
            </div>
            {idx < finalStepsList.length - 1 && (
              <div
                className="w-10 h-px mb-4 mx-1"
                style={{ background: isCompleted ? "#22c55e" : "repeating-linear-gradient(90deg,#d1d5db 0px,#d1d5db 4px,transparent 4px,transparent 8px)" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function FinalStepLayout({ activeStep, children }: FinalStepLayoutProps) {
  return (
    <div className="flex h-full bg-white">
      {/* Sidebar — desktop only */}
      <div className="hidden lg:flex h-full">
        <FinalStepSidebar activeStep={activeStep} />
      </div>

      <main className="flex-1 overflow-y-auto flex flex-col bg-white min-w-0">
        {/* Mobile step progress */}
        <MobileStepper activeStep={activeStep} />

        <div className="flex flex-col items-center w-full px-4 py-8 lg:py-16 lg:px-6">
          {/* Carlofty Logo */}
          <div className="mb-8 lg:mb-12 shrink-0">
            <img
              src="https://www.figma.com/api/mcp/asset/b4f1b995-cb98-48a3-ba0b-7ae714cdccf6"
              alt="Carlofty"
              className="h-7 lg:h-8 w-auto object-contain"
            />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}

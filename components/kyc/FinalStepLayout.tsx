import FinalStepSidebar, { type FinalStep } from "./FinalStepSidebar";

interface FinalStepLayoutProps {
  activeStep: FinalStep;
  children: React.ReactNode;
}

export default function FinalStepLayout({ activeStep, children }: FinalStepLayoutProps) {
  return (
    <div className="flex h-full bg-white">
      <FinalStepSidebar activeStep={activeStep} />

      <main className="flex-1 overflow-y-auto flex flex-col items-center py-16 px-6 bg-white">
        <div className="flex flex-col items-center w-full">
          {/* Carlofty Logo */}
          <div className="mb-12 shrink-0">
            <img
              src="https://www.figma.com/api/mcp/asset/b4f1b995-cb98-48a3-ba0b-7ae714cdccf6"
              alt="Carlofty"
              className="h-8 w-auto object-contain"
            />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}

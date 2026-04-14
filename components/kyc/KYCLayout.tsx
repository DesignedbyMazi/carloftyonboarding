import KYCSidebar, { type KYCStep } from "./KYCSidebar";

interface KYCLayoutProps {
  activeStep: KYCStep;
  children: React.ReactNode;
}

export default function KYCLayout({ activeStep, children }: KYCLayoutProps) {
  return (
    <>
      {/* Fixed sidebar — always full viewport height, never depends on parent height */}
      <KYCSidebar activeStep={activeStep} />

      {/* Offset wrapper so main content doesn't sit under the fixed sidebar */}
      <div className="ml-[321px] min-h-screen flex flex-col bg-white">
        <main className="flex-1 flex flex-col items-center justify-center py-16 px-6">
          <div className="flex flex-col items-center w-full">
            {/* Carlofty Logo — centered directly above page content */}
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
    </>
  );
}

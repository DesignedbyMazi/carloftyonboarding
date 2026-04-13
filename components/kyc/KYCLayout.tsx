import KYCSidebar, { type KYCStep } from "./KYCSidebar";

interface KYCLayoutProps {
  activeStep: KYCStep;
  children: React.ReactNode;
}

export default function KYCLayout({ activeStep, children }: KYCLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex">
      <KYCSidebar activeStep={activeStep} />
      <main className="flex-1 bg-white flex flex-col items-center overflow-y-auto min-h-screen py-16 px-6">
        {/* Carlofty Logo */}
        <div className="mb-12 self-start ml-3">
          <img
            src="https://www.figma.com/api/mcp/asset/b4f1b995-cb98-48a3-ba0b-7ae714cdccf6"
            alt="Carlofty"
            className="h-8 w-auto object-contain"
          />
        </div>
        {children}
      </main>
    </div>
  );
}

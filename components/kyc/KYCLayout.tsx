import KYCSidebar, { type KYCStep } from "./KYCSidebar";

interface KYCLayoutProps {
  activeStep: KYCStep;
  children: React.ReactNode;
}

export default function KYCLayout({ activeStep, children }: KYCLayoutProps) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar sticks to viewport via sticky+h-screen — fills the full visible height
          regardless of how tall the main content grows */}
      <KYCSidebar activeStep={activeStep} />

      {/* Main scrolls naturally as a normal block flow */}
      <main className="flex-1 flex flex-col items-center py-16 px-6 bg-white">
        {/* Carlofty Logo — centered above each page's content */}
        <div className="mb-12 shrink-0">
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

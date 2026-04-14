import KYCSidebar, { type KYCStep } from "./KYCSidebar";

interface KYCLayoutProps {
  activeStep: KYCStep;
  children: React.ReactNode;
}

export default function KYCLayout({ activeStep, children }: KYCLayoutProps) {
  return (
    // h-full inherits from body → html → both set to h-full in layout.tsx
    // This gives the sidebar a real, defined height to fill against
    <div className="flex h-full bg-white">

      {/* Sidebar: h-full works because every ancestor up to <html> has a defined height */}
      <KYCSidebar activeStep={activeStep} />

      {/* Main: flex-1 fills remaining width, overflow-y-auto lets content scroll */}
      <main className="flex-1 overflow-y-auto flex flex-col items-center py-16 px-6 bg-white">
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
  );
}

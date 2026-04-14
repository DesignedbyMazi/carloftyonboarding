import KYCSidebar, { type KYCStep } from "./KYCSidebar";

interface KYCLayoutProps {
  activeStep: KYCStep;
  children: React.ReactNode;
}

export default function KYCLayout({ activeStep, children }: KYCLayoutProps) {
  return (
    <div className="flex min-h-screen bg-white">
      <KYCSidebar activeStep={activeStep} />

      {/* Main — centers the logo+content column horizontally and vertically */}
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-6 bg-white">
        {/*
          Logo and children live in the SAME flex column so the logo is always
          centered directly above the page content — never offset from it.
        */}
        <div className="flex flex-col items-center w-full">
          {/* Carlofty Logo */}
          <div className="mb-12 shrink-0">
            <img
              src="https://www.figma.com/api/mcp/asset/b4f1b995-cb98-48a3-ba0b-7ae714cdccf6"
              alt="Carlofty"
              className="h-8 w-auto object-contain"
            />
          </div>

          {/* Page content — each page controls its own max-width */}
          {children}
        </div>
      </main>
    </div>
  );
}

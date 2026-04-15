interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-full min-h-screen bg-white">

      {/* ── Left Panel ── */}
      <div className="flex-1 flex flex-col min-h-full overflow-y-auto px-6 py-10 lg:px-16 lg:py-14 lg:max-w-[720px]">
        {/* Logo */}
        <div className="mb-10 lg:mb-14 shrink-0">
          <img
            src="https://www.figma.com/api/mcp/asset/b4f1b995-cb98-48a3-ba0b-7ae714cdccf6"
            alt="Carlofty"
            className="h-8 w-auto object-contain object-left"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-start max-w-[472px] w-full">
          {children}
        </div>
      </div>

      {/* ── Right Panel — desktop only ── */}
      <div className="hidden lg:flex w-[720px] shrink-0 flex-col sticky top-0 h-screen overflow-hidden">

        {/* Top: car keys photo */}
        <div className="relative flex-none" style={{ height: "55%" }}>
          <img
            src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1440&q=90&auto=format&fit=crop"
            alt="Car dealership"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bottom: deep crimson with large circle arc + copy */}
        <div
          className="relative flex-1 overflow-hidden flex flex-col justify-end pb-14 px-14"
          style={{ backgroundColor: "#6B1313" }}
        >
          {/* Large decorative circle — top-right overhang */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: 700,
              height: 700,
              borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.12)",
              top: -260,
              right: -180,
            }}
          />
          {/* Smaller inner circle */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: 480,
              height: 480,
              borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.07)",
              top: -140,
              right: -60,
            }}
          />
          {/* Filled red ellipse glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: 420,
              height: 420,
              borderRadius: "50%",
              background: "rgba(160,30,30,0.45)",
              top: -180,
              left: -60,
            }}
          />

          <div className="relative z-10">
            <h2 className="text-white font-bold leading-tight mb-3" style={{ fontSize: 36 }}>
              Access U.S.<br />Wholesale<br />Auctions
            </h2>
            <p className="text-white/70 text-sm leading-relaxed max-w-[340px]">
              Bid on accident-free cars and get the tools you need to build a profitable dealership.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

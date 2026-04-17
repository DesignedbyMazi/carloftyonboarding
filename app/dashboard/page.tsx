"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const BRIDGE_URL = "https://bridge.withpersona.com";

// ─── Icon helper ──────────────────────────────────────────────────────────────
function Icon({
  d, size = 18, stroke = "currentColor", fill = "none", strokeWidth = 1.6,
}: {
  d: string | string[]; size?: number; stroke?: string; fill?: string; strokeWidth?: number;
}) {
  const paths = Array.isArray(d) ? d : [d];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
      {paths.map((p, i) => (
        <path key={i} d={p} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}

// ─── Nav items ────────────────────────────────────────────────────────────────
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: ["M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", "M9 22V12h6v10"] },
  { id: "bids",      label: "My Bids",   icon: ["M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2","M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"] },
  { id: "purchases", label: "Purchases", icon: ["M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z","M3 6h18","M16 10a4 4 0 01-8 0"] },
  { id: "payment",   label: "Payment",   icon: ["M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"] },
  { id: "shipment",  label: "Shipment",  icon: ["M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3","M9 20h9a2 2 0 002-2v-5"] },
  { id: "support",   label: "Support",   icon: ["M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"] },
  { id: "settings",  label: "Settings",  icon: ["M12 15a3 3 0 100-6 3 3 0 000 6z","M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"] },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function SidebarContent({ active, onNav, onClose }: { active: string; onNav: (id: string) => void; onClose?: () => void }) {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-5 pt-5 pb-6 flex items-center justify-between">
        <img src="https://www.figma.com/api/mcp/asset/b4f1b995-cb98-48a3-ba0b-7ae714cdccf6" alt="Carlofty" className="h-7 w-auto object-contain object-left" />
        {onClose && (
          <button onClick={onClose} className="p-1 text-[#9ca3af] hover:text-[#374151] transition-colors">
            <Icon d="M18 6L6 18M6 6l12 12" size={20} strokeWidth={2} />
          </button>
        )}
      </div>
      <nav className="flex-1 flex flex-col gap-0.5 px-3 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button key={item.id} onClick={() => { onNav(item.id); onClose?.(); }}
              className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-left transition-colors ${isActive ? "bg-[#fef2f2] text-[#e53e3e]" : "text-[#6b7280] hover:bg-[#f9fafb] hover:text-[#374151]"}`}
            >
              <span className={isActive ? "text-[#e53e3e]" : "text-[#9ca3af]"}>
                <Icon d={item.icon} size={16} strokeWidth={1.6} />
              </span>
              <span className="text-[13px] font-medium tracking-[0.1px]">{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="px-3 pb-5 pt-3 border-t border-[#f0f0f0]">
        <div className="flex items-center gap-2.5 px-2 py-2">
          <div className="w-8 h-8 rounded-full bg-[#e5e7eb] flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-[#374151]">OS</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-[#1f2937] truncate">Ogundeko Sharon</p>
            <p className="text-[10px] text-[#9ca3af] truncate">Sharon@gmail.com</p>
          </div>
          <button className="text-[#e53e3e] hover:text-[#c53030] transition-colors">
            <Icon d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" size={15} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Onboarding Tour ──────────────────────────────────────────────────────────
interface TourStep {
  title: string;
  description: string;
  /** Desktop tooltip anchor position */
  pos: "center" | "top-right" | "top-left" | "bottom-right" | "bottom-left";
  isFinal?: boolean;
  /** ID of the DOM element to scroll into view when this step is active */
  sectionId?: string;
  /** Tab to switch to when this step is active */
  targetTab?: "overview" | "wallet";
}

const TOUR_STEPS: TourStep[] = [
  {
    title: "Welcome to Carlofty 👋",
    description: "Your all-in-one dealer platform for bidding on and purchasing wholesale vehicles from U.S. auctions. Let's take a 2-minute tour.",
    pos: "center",
  },
  {
    title: "Sidebar Navigation",
    description: "Switch between Dashboard, My Bids, Purchases, Payments, Shipments, Support, and Settings from the sidebar.",
    pos: "top-left",
    sectionId: "tour-sidebar",
    targetTab: "overview",
  },
  {
    title: "Key Metrics at a Glance",
    description: "Your four headline numbers — active bids, total purchases, payments made, and vehicles in transit — updated in real time.",
    pos: "top-right",
    sectionId: "tour-stats",
    targetTab: "overview",
  },
  {
    title: "Status Pipeline",
    description: "Track every vehicle from bid request through payment, shipping, and delivery — all six stages in one view.",
    pos: "top-right",
    sectionId: "tour-pipeline",
    targetTab: "overview",
  },
  {
    title: "Pending Payments",
    description: "Vehicles with outstanding or overdue payments surface here. Red items need urgent attention to protect your bids.",
    pos: "bottom-right",
    sectionId: "tour-payments",
    targetTab: "overview",
  },
  {
    title: "Sourcing Breakdown",
    description: "See how your spending is distributed across Manheim, Copart, Adesa, IAA, and other auction platforms.",
    pos: "bottom-left",
    sectionId: "tour-sourcing",
    targetTab: "overview",
  },
  {
    title: "Recent Activity",
    description: "A full log of every payment transaction. Filter by date, auction, status, or payment type to find anything instantly.",
    pos: "bottom-left",
    sectionId: "tour-activity",
    targetTab: "overview",
  },
  {
    title: "Notifications",
    description: "Real-time alerts for bid wins, payment deadlines, shipment updates, and important account events.",
    pos: "top-right",
    sectionId: "tour-notifications",
    targetTab: "overview",
  },
  {
    title: "Wallet Balance",
    description: "Click the Wallet tab to manage your NGN and USD balances. All auction payments are made in USD.",
    pos: "top-right",
    sectionId: "tour-tabs",
    targetTab: "overview",
  },
  {
    title: "Your Wallets",
    description: "The Wallet tab holds two balances — your NGN (Naira) wallet and your USD (Dollar) wallet. All auction payments are made in USD, so you must fund NGN first then convert.",
    pos: "top-right",
    sectionId: "tour-wallet-cards",
    targetTab: "wallet",
  },
  {
    title: "Add Money",
    description: "Fund your NGN wallet with Naira using Paystack. Once funds are confirmed, your Naira balance updates instantly and you're ready to convert.",
    pos: "top-right",
    sectionId: "tour-add-money",
    targetTab: "wallet",
  },
  {
    title: "Convert NGN → USD",
    description: "Convert your Naira balance to USD at the live exchange rate. Payments to auction houses are strictly in USD — convert before attempting to pay.",
    pos: "top-right",
    sectionId: "tour-convert",
    targetTab: "wallet",
  },
  {
    title: "Make a Payment",
    description: "Pay auction houses directly from your USD wallet by entering the recipient's bank details, amount, and a payment reference. No intermediaries.",
    pos: "top-right",
    sectionId: "tour-make-payment",
    targetTab: "wallet",
  },
  {
    title: "Saved Recipients",
    description: "Save frequently used auction accounts as recipients so you can send money in one tap. Edit or delete saved recipients any time.",
    pos: "bottom-right",
    sectionId: "tour-recipients",
    targetTab: "wallet",
  },
  {
    title: "Time & Date Filters",
    description: "Narrow all dashboard data to the last 24 hours, 7 days, 1 month, or 12 months with a single click.",
    pos: "top-left",
    sectionId: "tour-time-filter",
    targetTab: "overview",
  },
  {
    title: "You're almost ready! 🚀",
    description: "Complete your KYB verification, connect Bridge for payments, and set up your auction license to unlock full bidding access.",
    pos: "center",
    isFinal: true,
  },
];

const DESKTOP_POS: Record<TourStep["pos"], string> = {
  center:         "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  "top-right":    "top-28 right-8 xl:right-14",
  "top-left":     "top-28 left-[200px] xl:left-[220px]",
  "bottom-right": "bottom-10 right-8 xl:right-14",
  "bottom-left":  "bottom-10 left-[200px] xl:left-[220px]",
};

function OnboardingTour({ onClose, onSwitchTab }: { onClose: () => void; onSwitchTab: (tab: "overview" | "wallet") => void }) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);
  const current = TOUR_STEPS[step];
  const total = TOUR_STEPS.length;
  const isFirst = step === 0;
  const isLast = step === total - 1;

  const goToStep = (newStep: number) => {
    setVisible(false);
    setTimeout(() => {
      const target = TOUR_STEPS[newStep];
      if (target.targetTab) onSwitchTab(target.targetTab);
      setStep(newStep);
      setVisible(true);
      if (target.sectionId) {
        setTimeout(() => {
          document.getElementById(target.sectionId!)?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 80);
      }
    }, 180);
  };

  const next = () => { if (isLast) onClose(); else goToStep(step + 1); };
  const back = () => { if (step > 0) goToStep(step - 1); };

  const DotRow = ({ size = "default" }: { size?: "default" | "small" }) => (
    <div className={`flex items-center gap-1.5 ${size === "small" ? "gap-1" : ""}`}>
      {TOUR_STEPS.map((_, i) => (
        <button
          key={i}
          onClick={() => goToStep(i)}
          className={`rounded-full transition-all ${
            i === step
              ? size === "small" ? "w-4 h-1 bg-[#171717]" : "w-5 h-1.5 bg-[#171717]"
              : size === "small" ? "w-1 h-1 bg-[#e5e7eb]" : "w-1.5 h-1.5 bg-[#e5e7eb] hover:bg-[#d1d5db]"
          }`}
        />
      ))}
    </div>
  );

  const ActionRow = ({ small = false }: { small?: boolean }) => (
    <div className="flex items-center gap-2">
      {!isFirst && (
        <button
          onClick={back}
          className={`flex-1 rounded-xl border-2 border-[#e5e7eb] font-semibold text-[#374151] hover:border-[#d1d5db] hover:bg-[#f9fafb] transition-colors ${small ? "py-2 text-[12px]" : "py-2.5 text-[13px]"}`}
        >
          Back
        </button>
      )}
      <button
        onClick={next}
        className={`${isFirst ? "w-full" : "flex-1"} bg-[#171717] text-white rounded-xl font-semibold hover:bg-[#333] transition-colors ${small ? "py-2 text-[12px]" : "py-2.5 text-[13px]"}`}
      >
        {isLast ? "Complete Registration" : step === total - 2 ? "Finish Tour" : "Next →"}
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[200]">
      {/* Dark backdrop */}
      <div className="absolute inset-0 bg-black/65" />

      {/* ── Desktop tooltip ── */}
      <div className={`absolute hidden lg:flex ${DESKTOP_POS[current.pos]} w-[340px] flex-col bg-white rounded-2xl shadow-2xl z-10 p-6 transition-all duration-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-lg text-[#9ca3af] hover:text-[#374151] hover:bg-[#f3f4f6] transition-colors">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Step counter */}
        <p className="text-[11px] font-semibold text-[#9ca3af] tracking-[0.3px] mb-3">{step + 1} of {total}</p>

        {current.isFinal ? (
          <>
            {/* Rocket illustration */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6B1313] to-[#e53e3e] flex items-center justify-center shadow-lg">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C9 5 7 9 7 13a5 5 0 0010 0c0-4-2-8-5-11z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7 13c-2 0-4 1-4 3l4-1M17 13c2 0 4 1 4 3l-4-1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="2" fill="white" />
                </svg>
              </div>
            </div>
            <h3 className="text-[17px] font-bold text-[#111827] leading-tight mb-2 text-center pr-4">{current.title}</h3>
            <p className="text-[13px] text-[#6b7280] leading-relaxed mb-5 text-center">{current.description}</p>
            <div className="flex justify-center mb-5"><DotRow /></div>
            <button onClick={onClose} className="w-full bg-[#171717] text-white rounded-xl py-3 text-[14px] font-semibold hover:bg-[#333] transition-colors mb-2">
              Complete My Registration
            </button>
            <button onClick={onClose} className="w-full text-[12px] text-[#9ca3af] hover:text-[#6b7280] py-1 transition-colors text-center">
              Skip for now
            </button>
          </>
        ) : (
          <>
            <h3 className="text-[16px] font-bold text-[#111827] leading-tight mb-2 pr-6">{current.title}</h3>
            <p className="text-[13px] text-[#6b7280] leading-relaxed mb-5">{current.description}</p>
            <div className="mb-5"><DotRow /></div>
            <ActionRow />
          </>
        )}
      </div>

      {/* ── Mobile bottom sheet ── */}
      <div className={`absolute bottom-0 left-0 right-0 lg:hidden bg-white rounded-t-2xl shadow-2xl z-10 p-5 pb-7 transition-all duration-200 ${visible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-2"}`}>
        <button onClick={onClose} className="absolute top-4 right-4 p-1 text-[#9ca3af] hover:text-[#374151]">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Drag handle */}
        <div className="flex justify-center mb-4">
          <div className="w-8 h-1 rounded-full bg-[#e5e7eb]" />
        </div>

        <p className="text-[10px] font-semibold text-[#9ca3af] tracking-[0.3px] mb-2">{step + 1} of {total}</p>
        <h3 className="text-[15px] font-bold text-[#111827] leading-tight mb-1.5 pr-7">{current.title}</h3>
        <p className="text-[12px] text-[#6b7280] leading-relaxed mb-4">{current.description}</p>
        <div className="mb-4"><DotRow size="small" /></div>
        <ActionRow small />
      </div>
    </div>
  );
}

// ─── Profile Completion Hanger ────────────────────────────────────────────────
interface ProfileTask {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  route: string;
  iconPath: string | string[];
  iconBg: string;
  iconStroke: string;
  ctaClass: string;
}

const PROFILE_TASKS: ProfileTask[] = [
  {
    id: "kyb",
    title: "Complete KYB",
    description: "Verify your business identity to unlock full bidding access",
    ctaLabel: "Start KYB",
    route: "/onboarding",
    iconPath: ["M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"],
    iconBg: "bg-[#eff6ff]",
    iconStroke: "#2563eb",
    ctaClass: "text-[#2563eb] border-[#bfdbfe] hover:bg-[#eff6ff]",
  },
  {
    id: "bridge",
    title: "Bridge Verification",
    description: "Connect Bridge to enable payments and fund your wallet",
    ctaLabel: "Connect Bridge",
    route: BRIDGE_URL,
    iconPath: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    iconBg: "bg-[#f5f3ff]",
    iconStroke: "#7c3aed",
    ctaClass: "text-[#7c3aed] border-[#ddd6fe] hover:bg-[#f5f3ff]",
  },
  {
    id: "license",
    title: "Auction License",
    description: "Get a license to bid at wholesale U.S. auction houses",
    ctaLabel: "Request License",
    route: "/auth/get-license",
    iconPath: ["M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2", "M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"],
    iconBg: "bg-[#fefce8]",
    iconStroke: "#ca8a04",
    ctaClass: "text-[#ca8a04] border-[#fde68a] hover:bg-[#fefce8]",
  },
  {
    id: "tier",
    title: "Request Tier Upgrade",
    description: "Unlock higher bid limits and priority auction access",
    ctaLabel: "Request Upgrade",
    route: "/",
    iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
    iconBg: "bg-[#f0fdf4]",
    iconStroke: "#16a34a",
    ctaClass: "text-[#16a34a] border-[#bbf7d0] hover:bg-[#f0fdf4]",
  },
];

function ProfileHanger({
  completedTasks,
  onComplete,
  collapsed,
  onToggle,
}: {
  completedTasks: Set<string>;
  onComplete: (id: string) => void;
  collapsed: boolean;
  onToggle: () => void;
}) {
  const router = useRouter();
  const done = completedTasks.size;
  const total = PROFILE_TASKS.length;
  const allDone = done === total;
  const pct = Math.round((done / total) * 100);

  return (
    <div className="bg-white border-b border-[#f0f0f0] shrink-0">
      {/* Header row */}
      <div className="flex items-center justify-between px-4 lg:px-7 py-3">
        <div className="flex items-center gap-3 min-w-0">
          {allDone ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#f0fdf4] flex items-center justify-center shrink-0">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-[13px] font-semibold text-[#16a34a]">Profile complete — full access unlocked!</span>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 min-w-0 flex-wrap">
              <div className="flex items-center gap-1.5 shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#f59e0b" strokeWidth="1.8" />
                  <path d="M12 8v4M12 16h.01" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <span className="text-[12px] lg:text-[13px] font-semibold text-[#374151]">Complete your profile</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-20 lg:w-28 h-1.5 rounded-full bg-[#f3f4f6] overflow-hidden">
                  <div className="h-full rounded-full bg-[#171717] transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-[11px] font-semibold text-[#9ca3af]">{done}/{total}</span>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onToggle}
          className="flex items-center gap-1 text-[11px] lg:text-[12px] font-medium text-[#6b7280] hover:text-[#374151] transition-colors shrink-0 ml-2"
        >
          {collapsed ? "Show steps" : "Hide"}
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            className={`transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}
          >
            <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Task cards */}
      {!collapsed && (
        <div className="px-4 lg:px-7 pb-4">
          <div className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory">
            {PROFILE_TASKS.map((task, index) => {
              const isDone = completedTasks.has(task.id);
              return (
                <div
                  key={task.id}
                  className={`flex-none w-[200px] sm:w-[220px] lg:flex-1 snap-start rounded-2xl border p-4 transition-all ${
                    isDone
                      ? "bg-[#f0fdf4] border-[#bbf7d0]"
                      : "bg-white border-[#f0f0f0] hover:border-[#e5e7eb] hover:shadow-sm"
                  }`}
                >
                  {/* Top row: icon + step badge + done check */}
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-8 h-8 rounded-xl ${task.iconBg} flex items-center justify-center`}>
                      <Icon d={task.iconPath} size={15} stroke={task.iconStroke} strokeWidth={1.8} />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-bold text-[#9ca3af]">{index + 1} of {total}</span>
                      {isDone && (
                        <div className="w-4 h-4 rounded-full bg-[#dcfce7] flex items-center justify-center">
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                            <path d="M5 13l4 4L19 7" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className={`text-[12px] font-semibold mb-1 leading-tight ${isDone ? "text-[#166534]" : "text-[#111827]"}`}>
                    {task.title}
                  </p>
                  <p className="text-[10px] lg:text-[11px] text-[#9ca3af] leading-4 mb-3">{task.description}</p>

                  {isDone ? (
                    <span className="text-[11px] font-semibold text-[#16a34a]">✓ Complete</span>
                  ) : (
                    <button
                      onClick={() => {
                        if (task.id === "bridge") {
                          window.open(task.route, "_blank");
                        } else {
                          router.push(task.route);
                        }
                      }}
                      className={`text-[11px] font-semibold px-3 py-1.5 rounded-lg border transition-colors ${task.ctaClass}`}
                    >
                      {task.ctaLabel} →
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-white rounded-2xl border border-[#f0f0f0] px-4 py-4 flex flex-col gap-2">
      <p className="text-[12px] lg:text-[13px] text-[#6b7280] font-medium tracking-[0.1px]">{label}</p>
      <p className="text-[20px] lg:text-[26px] font-semibold text-[#111827] leading-none tracking-tight">{value}</p>
      <p className="text-[10px] lg:text-[11px] text-[#9ca3af] tracking-[0.2px]">{sub}</p>
    </div>
  );
}

// ─── Status Pipeline ──────────────────────────────────────────────────────────
const pipelineColumns = [
  { id: "requested",  label: "Requested",         count: 2, color: "#6b7280", bg: "bg-white",     textColor: "text-[#374151]",  border: "border-[#e5e7eb]" },
  { id: "active",     label: "Active Bid",         count: 2, color: "#d97706", bg: "bg-[#fffbeb]", textColor: "text-[#92400e]",  border: "border-[#fde68a]" },
  { id: "won",        label: "Won/Payment Due",    count: 2, color: "#dc2626", bg: "bg-[#fef2f2]", textColor: "text-[#991b1b]",  border: "border-[#fecaca]" },
  { id: "processing", label: "Payment Processing", count: 2, color: "#7c3aed", bg: "bg-[#f5f3ff]", textColor: "text-[#4c1d95]",  border: "border-[#ddd6fe]" },
  { id: "transit",    label: "In Transit",         count: 2, color: "#2563eb", bg: "bg-[#eff6ff]", textColor: "text-[#1e3a8a]",  border: "border-[#bfdbfe]" },
  { id: "delivered",  label: "Delivered",          count: 2, color: "#16a34a", bg: "bg-[#f0fdf4]", textColor: "text-[#14532d]",  border: "border-[#bbf7d0]" },
];

const pillColors: Record<string, string> = {
  requested:  "bg-[#f3f4f6] text-[#374151]",
  active:     "bg-[#fef9c3] text-[#854d0e]",
  won:        "bg-[#fee2e2] text-[#991b1b]",
  processing: "bg-[#ede9fe] text-[#5b21b6]",
  transit:    "bg-[#dbeafe] text-[#1e40af]",
  delivered:  "bg-[#dcfce7] text-[#166534]",
};

function StatusPipeline() {
  return (
    <section className="bg-white rounded-2xl border border-[#f0f0f0] p-4 lg:p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-[14px] lg:text-[15px] font-semibold text-[#111827]">Status Pipeline</h2>
          <p className="text-[11px] lg:text-[12px] text-[#9ca3af] mt-0.5">Track the progress of your purchase</p>
        </div>
        <button className="flex items-center gap-1 text-[11px] lg:text-[12px] text-[#6b7280] hover:text-[#111827] transition-colors font-medium whitespace-nowrap">
          View All Bids
          <Icon d="M7 17L17 7M17 7H7M17 7v10" size={12} strokeWidth={2} />
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        {pipelineColumns.map((col) => (
          <div key={col.id} className="flex-none w-[120px] lg:flex-1 lg:min-w-[120px]">
            <div className="flex items-center gap-1 mb-2 px-1">
              <div className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: col.color }} />
              <span className="text-[10px] font-semibold text-[#374151] truncate">{col.label}</span>
              <span className="ml-auto text-[10px] font-bold text-[#374151]">{col.count}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {[0, 1].map((i) => (
                <div key={i} className={`${col.bg} border ${col.border} rounded-xl px-2.5 py-2`}>
                  <p className={`text-[9px] lg:text-[10px] font-medium ${col.textColor} leading-4`}>
                    2024 Mercedes-Benz 2022 GLE450
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 mt-4 flex-wrap">
        {Object.entries({ requested: "2 Requested", active: "2 Active Bids", won: "2 Won/Payment Due", processing: "2 Payment Processing", transit: "2 In Transit", delivered: "2 Delivered" }).map(([key, label]) => (
          <span key={key} className={`px-2 py-0.5 rounded-full text-[9px] lg:text-[10px] font-semibold ${pillColors[key]}`}>{label}</span>
        ))}
        <span className="ml-auto text-[10px] lg:text-[11px] font-semibold text-[#374151] whitespace-nowrap">Total active: 12 Vehicles</span>
      </div>
    </section>
  );
}

// ─── Pending Payments ─────────────────────────────────────────────────────────
const pendingPayments = [
  { vehicle: "2021 Toyota Camry SE", auction: "Manheim Phoenix", amount: "₦4,500,000", status: "2d overdue",   statusColor: "text-[#dc2626] bg-[#fef2f2]" },
  { vehicle: "2021 Toyota Camry SE", auction: "Manheim Phoenix", amount: "₦4,500,000", status: "Due in 2days", statusColor: "text-[#d97706] bg-[#fffbeb]" },
];

function PendingPayments() {
  return (
    <div className="bg-white rounded-2xl border border-[#f0f0f0] p-4 lg:p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-[14px] lg:text-[15px] font-semibold text-[#111827]">Pending Payments</h2>
          <span className="px-2 py-0.5 bg-[#fef2f2] text-[#dc2626] text-[9px] lg:text-[10px] font-bold rounded-full">1 Overdue</span>
        </div>
        <button className="flex items-center gap-1 text-[11px] text-[#6b7280] hover:text-[#111827] transition-colors font-medium">
          View All <Icon d="M7 17L17 7M17 7H7M17 7v10" size={12} strokeWidth={2} />
        </button>
      </div>
      <p className="text-[10px] lg:text-[11px] text-[#9ca3af] -mt-2">Payment requiring your attention</p>
      <div className="flex flex-col gap-2">
        {pendingPayments.map((p, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-[#f3f4f6] bg-[#fafafa]">
            <div className="w-8 h-8 rounded-lg bg-[#fef9c3] border border-[#fde68a] flex items-center justify-center shrink-0">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] lg:text-[12px] font-semibold text-[#1f2937] truncate">{p.vehicle}</p>
              <p className="text-[10px] text-[#9ca3af]">{p.auction}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <p className="text-[11px] lg:text-[12px] font-bold text-[#111827]">{p.amount}</p>
              <span className={`text-[9px] lg:text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${p.statusColor}`}>{p.status}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-3 border-t border-[#f3f4f6] flex items-center justify-between">
        <span className="text-[11px] lg:text-[12px] text-[#6b7280] font-medium">Total Outstanding:</span>
        <span className="text-[12px] lg:text-[13px] font-bold text-[#111827]">₦ 9,000,000</span>
      </div>
    </div>
  );
}

// ─── Sourcing Breakdown ───────────────────────────────────────────────────────
const sourcingData = [
  { name: "Adesa",   vehicles: 4, amount: "₦11.4M", pct: 20 },
  { name: "Manheim", vehicles: 4, amount: "₦11.4M", pct: 20 },
  { name: "Copart",  vehicles: 4, amount: "₦11.4M", pct: 20 },
  { name: "IAA",     vehicles: 4, amount: "₦11.4M", pct: 20 },
];

function SourcingBreakdown() {
  return (
    <div className="bg-white rounded-2xl border border-[#f0f0f0] p-4 lg:p-5 flex flex-col gap-4">
      <div>
        <h2 className="text-[14px] lg:text-[15px] font-semibold text-[#111827]">Sourcing Breakdown</h2>
        <p className="text-[10px] lg:text-[11px] text-[#9ca3af] mt-0.5">Vehicles sourced by auction platform</p>
      </div>
      <div className="flex flex-col gap-1">
        {sourcingData.map((row) => (
          <div key={row.name} className="flex items-center gap-2 lg:gap-3 py-2 border-b border-[#f9fafb] last:border-0">
            <div className="w-1 h-4 rounded-full bg-[#e5e7eb] shrink-0" />
            <span className="flex-1 text-[11px] lg:text-[12px] font-medium text-[#374151]">{row.name}</span>
            <span className="text-[10px] lg:text-[11px] text-[#6b7280]">{row.vehicles} Vehicles</span>
            <span className="text-[11px] lg:text-[12px] font-semibold text-[#111827]">{row.amount}</span>
            <span className="text-[10px] lg:text-[11px] font-bold text-[#9ca3af] w-7 text-right">{row.pct}%</span>
          </div>
        ))}
      </div>
      <div className="text-[10px] lg:text-[11px] text-[#9ca3af] border-t border-[#f3f4f6] pt-3">
        Total sourced this period &nbsp;
        <span className="font-semibold text-[#374151]">12 vehicles · ₦43.9M</span>
      </div>
      <div className="flex items-center gap-3 bg-[#eff6ff] border border-[#bfdbfe] rounded-xl px-3 py-2.5">
        <div className="w-7 h-7 rounded-full bg-[#dbeafe] flex items-center justify-center shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#2563eb">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] lg:text-[12px] font-semibold text-[#1e40af]">3 vehicles currently in transit</p>
          <p className="text-[9px] lg:text-[10px] text-[#3b82f6]">Estimated arrival: Mar 5 – Mar 20, 2026</p>
        </div>
        <button className="flex items-center gap-1 text-[10px] lg:text-[11px] font-semibold text-[#2563eb] hover:text-[#1d4ed8] whitespace-nowrap">
          Track <Icon d="M7 17L17 7M17 7H7M17 7v10" size={10} strokeWidth={2.2} stroke="#2563eb" />
        </button>
      </div>
    </div>
  );
}

// ─── Recent Activity ──────────────────────────────────────────────────────────
const activityRows = [
  { date: "31-03-2026", id: "e8b....fb28", auction: "Copart, Inc.", ngn: "₦ 40,284,000.", usd: "$12,500.00", fx: "1368", status: "Completed",        statusColor: "bg-[#f0fdf4] text-[#16a34a]", dot: "bg-[#16a34a]" },
  { date: "31-03-2026", id: "e8b....fb28", auction: "Copart, Inc.", ngn: "₦ 40,284,000.", usd: "$12,500.00", fx: "1368", status: "Payment processed", statusColor: "bg-[#eff6ff] text-[#2563eb]", dot: "bg-[#2563eb]" },
  { date: "31-03-2026", id: "e8b....fb28", auction: "Copart, Inc.", ngn: "₦ 40,284,000.", usd: "$12,500.00", fx: "1368", status: "Awaiting payment",  statusColor: "bg-[#fffbeb] text-[#d97706]", dot: "bg-[#d97706]" },
];

function RecentActivity() {
  const [page, setPage] = useState(1);
  const pages = [1, 2, 3, "...", 8];

  return (
    <section className="bg-white rounded-2xl border border-[#f0f0f0] p-4 lg:p-5">
      <h2 className="text-[14px] lg:text-[15px] font-semibold text-[#111827] mb-4">Recent Activity</h2>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <div className="flex items-center gap-2 bg-[#f9fafb] border border-[#f0f0f0] rounded-xl px-3 py-2 w-full sm:w-auto sm:flex-1 sm:min-w-[140px] sm:max-w-[220px]">
          <Icon d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" size={13} stroke="#9ca3af" strokeWidth={2} />
          <input type="text" placeholder="Search transactions" className="bg-transparent text-[12px] text-[#374151] placeholder:text-[#9ca3af] outline-none flex-1 min-w-0" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["23 February", "All stages", "All payment type", "All Status"].map((f, i) => (
            <button key={f} className="flex items-center gap-1 px-2.5 py-2 bg-[#f9fafb] border border-[#f0f0f0] rounded-xl text-[11px] lg:text-[12px] text-[#374151] hover:border-[#d1d5db] transition-colors whitespace-nowrap">
              {i === 0 && <Icon d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" size={12} strokeWidth={1.8} stroke="#6b7280" />}
              {f}
              <Icon d="M6 9l6 6 6-6" size={10} strokeWidth={2} stroke="#9ca3af" />
            </button>
          ))}
        </div>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-3 lg:hidden">
        {activityRows.map((row, i) => (
          <div key={i} className="border border-[#f3f4f6] rounded-xl p-3 bg-[#fafafa]">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-[12px] font-semibold text-[#111827]">{row.auction}</p>
                <p className="text-[10px] text-[#9ca3af]">{row.date} · {row.id}</p>
              </div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold ${row.statusColor}`}>
                <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${row.dot}`} />
                {row.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] font-bold text-[#111827]">{row.ngn}</p>
                <p className="text-[10px] text-[#6b7280]">{row.usd} · FX {row.fx}</p>
              </div>
              <button className="text-[#e53e3e] text-[11px] font-semibold hover:text-[#c53030]">View Receipt</button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block overflow-x-auto rounded-xl border border-[#f3f4f6]">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="bg-[#f9fafb] border-b border-[#f3f4f6]">
              {["Date","Payment ID","Auction","Amount Paid (NGN)","USD Equiv","FX Rate","Status","Wire Receipt"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-[#6b7280] tracking-[0.3px] whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activityRows.map((row, i) => (
              <tr key={i} className="border-b border-[#f9fafb] hover:bg-[#fafafa]">
                <td className="px-4 py-3.5 text-[#374151] whitespace-nowrap">{row.date}</td>
                <td className="px-4 py-3.5 text-[#374151]">{row.id}</td>
                <td className="px-4 py-3.5 text-[#374151]">{row.auction}</td>
                <td className="px-4 py-3.5 font-semibold text-[#111827]">{row.ngn}</td>
                <td className="px-4 py-3.5 text-[#374151]">{row.usd}</td>
                <td className="px-4 py-3.5 text-[#374151]">{row.fx}</td>
                <td className="px-4 py-3.5">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold ${row.statusColor}`}>
                    <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${row.dot}`} />
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <button className="text-[#e53e3e] text-[12px] font-semibold hover:text-[#c53030]">View Receipt</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#e5e7eb] text-[11px] lg:text-[12px] text-[#374151] hover:bg-[#f9fafb] font-medium">
          <Icon d="M15 18l-6-6 6-6" size={12} strokeWidth={2} /> Previous
        </button>
        <div className="hidden sm:flex items-center gap-1">
          {pages.map((p, i) => (
            <button key={i} onClick={() => typeof p === "number" && setPage(p)}
              className={`w-7 h-7 lg:w-8 lg:h-8 rounded-lg text-[11px] lg:text-[12px] font-medium transition-colors ${p === page ? "bg-[#111827] text-white" : p === "..." ? "text-[#9ca3af] cursor-default" : "text-[#374151] hover:bg-[#f3f4f6]"}`}
            >{p}</button>
          ))}
        </div>
        <span className="sm:hidden text-[12px] font-medium text-[#374151]">Page {page} of 8</span>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#e5e7eb] text-[11px] lg:text-[12px] text-[#374151] hover:bg-[#f9fafb] font-medium">
          Next <Icon d="M9 18l6-6-6-6" size={12} strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}

// ─── Wallet Modals ────────────────────────────────────────────────────────────
function AddMoneyModal({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState("");
  return (
    <div className="fixed inset-0 z-[300] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-[400px] shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[16px] font-bold text-[#111827]">Add Money</h3>
          <button onClick={onClose} className="p-1 rounded-lg text-[#9ca3af] hover:text-[#374151] hover:bg-[#f3f4f6] transition-colors">
            <Icon d="M18 6L6 18M6 6l12 12" size={16} strokeWidth={2.2} />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-[12px] font-semibold text-[#374151] mb-1.5 block">Amount (NGN)</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-[#eaeaea] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#171717] transition-colors"
            />
          </div>
          <div className="flex items-start gap-2.5 bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl px-3 py-2.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#16a34a" className="shrink-0 mt-0.5">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
            <p className="text-[11px] text-[#166534] leading-4">Powered by Paystack. Funds reflect instantly after payment confirmation.</p>
          </div>
          <div className="flex gap-2 mt-1">
            <button
              onClick={onClose}
              className="flex-1 border-2 border-[#e5e7eb] text-[#374151] rounded-xl py-2.5 text-[13px] font-semibold hover:bg-[#f9fafb] transition-colors"
            >
              Cancel
            </button>
            <button className="flex-1 bg-[#171717] text-white rounded-xl py-2.5 text-[13px] font-semibold hover:bg-[#333] transition-colors">
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MakePaymentModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ bank: "", account: "", amount: "", reference: "" });
  const handleChange = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));
  return (
    <div className="fixed inset-0 z-[300] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-[400px] shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[16px] font-bold text-[#111827]">Make Payment</h3>
          <button onClick={onClose} className="p-1 rounded-lg text-[#9ca3af] hover:text-[#374151] hover:bg-[#f3f4f6] transition-colors">
            <Icon d="M18 6L6 18M6 6l12 12" size={16} strokeWidth={2.2} />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-[12px] font-semibold text-[#374151] mb-1.5 block">Bank Name</label>
            <input
              type="text"
              placeholder="e.g. Chase Bank"
              value={form.bank}
              onChange={(e) => handleChange("bank", e.target.value)}
              className="w-full border border-[#eaeaea] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#171717] transition-colors"
            />
          </div>
          <div>
            <label className="text-[12px] font-semibold text-[#374151] mb-1.5 block">Account Number</label>
            <input
              type="text"
              placeholder="ABA routing / account number"
              value={form.account}
              onChange={(e) => handleChange("account", e.target.value)}
              className="w-full border border-[#eaeaea] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#171717] transition-colors"
            />
          </div>
          <div>
            <label className="text-[12px] font-semibold text-[#374151] mb-1.5 block">Account Name</label>
            <input
              type="text"
              placeholder="Will auto-populate"
              disabled
              className="w-full border border-[#eaeaea] rounded-xl px-4 py-3 text-sm outline-none bg-[#f9fafb] text-[#9ca3af] cursor-not-allowed"
            />
          </div>
          <div>
            <label className="text-[12px] font-semibold text-[#374151] mb-1.5 block">Amount (USD)</label>
            <input
              type="number"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
              className="w-full border border-[#eaeaea] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#171717] transition-colors"
            />
          </div>
          <div>
            <label className="text-[12px] font-semibold text-[#374151] mb-1.5 block">Payment Reference <span className="text-[#9ca3af] font-normal">(optional)</span></label>
            <input
              type="text"
              placeholder="e.g. Invoice #12345"
              value={form.reference}
              onChange={(e) => handleChange("reference", e.target.value)}
              className="w-full border border-[#eaeaea] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#171717] transition-colors"
            />
          </div>
          <div className="flex items-start gap-2.5 bg-[#fffbeb] border border-[#fde68a] rounded-xl px-3 py-2.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
              <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-[11px] text-[#92400e] leading-4">Payments are processed in USD only. Ensure your USD balance is sufficient.</p>
          </div>
          <div className="flex gap-2 mt-1">
            <button
              onClick={onClose}
              className="flex-1 border-2 border-[#e5e7eb] text-[#374151] rounded-xl py-2.5 text-[13px] font-semibold hover:bg-[#f9fafb] transition-colors"
            >
              Cancel
            </button>
            <button className="flex-1 bg-[#171717] text-white rounded-xl py-2.5 text-[13px] font-semibold hover:bg-[#333] transition-colors">
              Send Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddRecipientModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", bank: "", account: "", accountType: "Checking" });
  const handleChange = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));
  return (
    <div className="fixed inset-0 z-[300] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-[400px] shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[16px] font-bold text-[#111827]">Add Recipient</h3>
          <button onClick={onClose} className="p-1 rounded-lg text-[#9ca3af] hover:text-[#374151] hover:bg-[#f3f4f6] transition-colors">
            <Icon d="M18 6L6 18M6 6l12 12" size={16} strokeWidth={2.2} />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-[12px] font-semibold text-[#374151] mb-1.5 block">Recipient Name</label>
            <input
              type="text"
              placeholder="e.g. Manheim Auto Auctions"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full border border-[#eaeaea] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#171717] transition-colors"
            />
          </div>
          <div>
            <label className="text-[12px] font-semibold text-[#374151] mb-1.5 block">Bank Name</label>
            <input
              type="text"
              placeholder="e.g. Chase Bank"
              value={form.bank}
              onChange={(e) => handleChange("bank", e.target.value)}
              className="w-full border border-[#eaeaea] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#171717] transition-colors"
            />
          </div>
          <div>
            <label className="text-[12px] font-semibold text-[#374151] mb-1.5 block">Account Number</label>
            <input
              type="text"
              placeholder="ABA routing / account number"
              value={form.account}
              onChange={(e) => handleChange("account", e.target.value)}
              className="w-full border border-[#eaeaea] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#171717] transition-colors"
            />
          </div>
          <div>
            <label className="text-[12px] font-semibold text-[#374151] mb-1.5 block">Account Type</label>
            <select
              value={form.accountType}
              onChange={(e) => handleChange("accountType", e.target.value)}
              className="w-full border border-[#eaeaea] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#171717] transition-colors bg-white"
            >
              <option value="Checking">Checking</option>
              <option value="Savings">Savings</option>
            </select>
          </div>
          <div className="flex gap-2 mt-1">
            <button
              onClick={onClose}
              className="flex-1 border-2 border-[#e5e7eb] text-[#374151] rounded-xl py-2.5 text-[13px] font-semibold hover:bg-[#f9fafb] transition-colors"
            >
              Cancel
            </button>
            <button className="flex-1 bg-[#171717] text-white rounded-xl py-2.5 text-[13px] font-semibold hover:bg-[#333] transition-colors">
              Save Recipient
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Wallet Tab ───────────────────────────────────────────────────────────────
const savedRecipients = [
  { initials: "MA", color: "bg-[#dbeafe] text-[#1d4ed8]", name: "Manheim Auto Auctions", aba: "ABA 021000021", bank: "Chase Bank" },
  { initials: "CP", color: "bg-[#fef9c3] text-[#854d0e]", name: "Copart, Inc.",           aba: "ABA 026009593", bank: "Bank of America" },
  { initials: "AA", color: "bg-[#f0fdf4] text-[#166534]", name: "Adesa Auto Auction",     aba: "ABA 111000025", bank: "Wells Fargo" },
];

const walletTransactions = [
  { icon: "↑", iconBg: "bg-[#f0fdf4]", iconColor: "text-[#16a34a]", desc: "Added ₦500,000 via Paystack", date: "Apr 10, 2026", status: "Completed", statusColor: "bg-[#f0fdf4] text-[#16a34a]", dot: "bg-[#16a34a]" },
  { icon: "↔", iconBg: "bg-[#eff6ff]", iconColor: "text-[#2563eb]", desc: "Converted ₦500,000 → $350.00", date: "Apr 10, 2026", status: "Completed", statusColor: "bg-[#f0fdf4] text-[#16a34a]", dot: "bg-[#16a34a]" },
  { icon: "→", iconBg: "bg-[#eff6ff]", iconColor: "text-[#2563eb]", desc: "Payment to Manheim · $350.00", date: "Apr 10, 2026", status: "Processed", statusColor: "bg-[#eff6ff] text-[#2563eb]", dot: "bg-[#2563eb]" },
];

function WalletTab({ bridgeVerified }: { bridgeVerified: boolean }) {
  const [addMoneyOpen, setAddMoneyOpen] = useState(false);
  const [makePaymentOpen, setMakePaymentOpen] = useState(false);
  const [addRecipientOpen, setAddRecipientOpen] = useState(false);

  const handleMakePayment = () => {
    if (!bridgeVerified) {
      window.open(BRIDGE_URL, "_blank");
    } else {
      setMakePaymentOpen(true);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Modals */}
      {addMoneyOpen && <AddMoneyModal onClose={() => setAddMoneyOpen(false)} />}
      {makePaymentOpen && <MakePaymentModal onClose={() => setMakePaymentOpen(false)} />}
      {addRecipientOpen && <AddRecipientModal onClose={() => setAddRecipientOpen(false)} />}

      {/* Wallet cards */}
      <div id="tour-wallet-cards" className="flex flex-col sm:flex-row gap-4 items-stretch">
        {/* NGN Wallet */}
        <div className="flex-1 bg-white rounded-2xl border border-[#f0f0f0] p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[18px]">🇳🇬</span>
            <span className="text-[12px] font-semibold text-[#6b7280] tracking-[0.2px]">NGN Wallet</span>
          </div>
          <div>
            <p className="text-[28px] lg:text-[32px] font-bold text-[#111827] leading-none tracking-tight">₦ 0.00</p>
            <p className="text-[11px] text-[#9ca3af] mt-1">Available Naira Balance</p>
          </div>
          <div id="tour-add-money" className="flex gap-2 mt-auto">
            <button
              onClick={() => setAddMoneyOpen(true)}
              className="flex-1 bg-[#171717] text-white rounded-xl py-2.5 text-[13px] font-semibold hover:bg-[#333] transition-colors"
            >
              Add Money
            </button>
            <button className="flex-1 border-2 border-[#e5e7eb] text-[#374151] rounded-xl py-2.5 text-[13px] font-semibold hover:bg-[#f9fafb] transition-colors">
              Withdraw
            </button>
          </div>
        </div>

        {/* Convert button (between cards on mobile, centered on desktop) */}
        <div id="tour-convert" className="flex sm:flex-col items-center justify-center">
          <button className="flex items-center gap-1.5 bg-[#f3f4f6] hover:bg-[#e5e7eb] text-[#374151] font-semibold text-[12px] px-4 py-2 rounded-full transition-colors border border-[#e5e7eb] whitespace-nowrap">
            Convert ↔
          </button>
        </div>

        {/* USD Wallet */}
        <div className="flex-1 bg-white rounded-2xl border border-[#f0f0f0] p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[18px]">🇺🇸</span>
            <span className="text-[12px] font-semibold text-[#6b7280] tracking-[0.2px]">USD Wallet</span>
          </div>
          <div>
            <p className="text-[28px] lg:text-[32px] font-bold text-[#111827] leading-none tracking-tight">$ 0.00</p>
            <p className="text-[11px] text-[#9ca3af] mt-1">Available Dollar Balance</p>
          </div>
          <div className="flex gap-2 mt-auto">
            <button
              id="tour-make-payment"
              onClick={handleMakePayment}
              className="flex-1 bg-[#171717] text-white rounded-xl py-2.5 text-[13px] font-semibold hover:bg-[#333] transition-colors"
            >
              {bridgeVerified ? "Make Payment" : "Make Payment 🔒"}
            </button>
            <button
              onClick={() => setAddRecipientOpen(true)}
              className="flex-1 border-2 border-[#e5e7eb] text-[#374151] rounded-xl py-2.5 text-[13px] font-semibold hover:bg-[#f9fafb] transition-colors"
            >
              Add Recipient
            </button>
          </div>
        </div>
      </div>

      {/* Saved Recipients */}
      <div id="tour-recipients" className="bg-white rounded-2xl border border-[#f0f0f0] p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[14px] lg:text-[15px] font-semibold text-[#111827]">Saved Recipients</h2>
          <button
            onClick={() => setAddRecipientOpen(true)}
            className="text-[11px] font-semibold text-[#6b7280] hover:text-[#111827] transition-colors flex items-center gap-1"
          >
            + Add New
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {savedRecipients.map((r, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-[#f3f4f6] bg-[#fafafa] hover:border-[#e5e7eb] transition-colors">
              <div className={`w-9 h-9 rounded-xl ${r.color} flex items-center justify-center shrink-0 font-bold text-[12px]`}>
                {r.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-[#111827] truncate">{r.name}</p>
                <p className="text-[10px] text-[#9ca3af]">{r.aba} · {r.bank}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button className="bg-[#171717] text-white rounded-lg px-2.5 py-1.5 text-[10px] font-semibold hover:bg-[#333] transition-colors whitespace-nowrap">
                  Send Money
                </button>
                <button className="p-1.5 rounded-lg text-[#6b7280] hover:text-[#374151] hover:bg-[#f3f4f6] transition-colors">
                  <Icon d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" size={13} strokeWidth={1.8} />
                </button>
                <button className="p-1.5 rounded-lg text-[#6b7280] hover:text-[#dc2626] hover:bg-[#fef2f2] transition-colors">
                  <Icon d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" size={13} strokeWidth={1.8} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Wallet Activity */}
      <div className="bg-white rounded-2xl border border-[#f0f0f0] p-5">
        <h2 className="text-[14px] lg:text-[15px] font-semibold text-[#111827] mb-4">Recent Wallet Activity</h2>
        <div className="flex flex-col gap-2">
          {walletTransactions.map((tx, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-[#f3f4f6] bg-[#fafafa]">
              <div className={`w-8 h-8 rounded-lg ${tx.iconBg} flex items-center justify-center shrink-0 font-bold text-[14px] ${tx.iconColor}`}>
                {tx.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-[#111827] truncate">{tx.desc}</p>
                <p className="text-[10px] text-[#9ca3af]">{tx.date}</p>
              </div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] lg:text-[10px] font-semibold ${tx.statusColor} shrink-0`}>
                <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${tx.dot}`} />
                {tx.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Mobile Bottom Nav ────────────────────────────────────────────────────────
const bottomNavItems = [
  { id: "dashboard", label: "Home",      icon: ["M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z","M9 22V12h6v10"] },
  { id: "bids",      label: "Bids",      icon: ["M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2","M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"] },
  { id: "purchases", label: "Purchases", icon: ["M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z","M3 6h18","M16 10a4 4 0 01-8 0"] },
  { id: "payment",   label: "Payment",   icon: ["M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"] },
  { id: "shipment",  label: "Shipment",  icon: ["M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3","M9 20h9a2 2 0 002-2v-5"] },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [activeNav, setActiveNav]         = useState("dashboard");
  const [activeTab, setActiveTab]         = useState<"overview" | "wallet">("overview");
  const [activeTime, setActiveTime]       = useState("1M");
  const [drawerOpen, setDrawerOpen]       = useState(false);

  // Tour + profile completion state
  const [showTour, setShowTour]           = useState(false); // hydrated from localStorage
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [hangerCollapsed, setHangerCollapsed] = useState(false);
  const [hydrated, setHydrated]           = useState(false);

  // ── Restore state from localStorage on first mount ──
  useEffect(() => {
    const tourSeen    = localStorage.getItem("carlofty_tour_seen")      === "true";
    const kybDone     = localStorage.getItem("carlofty_kyb_complete")   === "true";
    const licenseDone = localStorage.getItem("carlofty_license_complete") === "true";
    const savedTasks: string[] = JSON.parse(localStorage.getItem("carlofty_completed_tasks") || "[]");

    const restored = new Set<string>(savedTasks);
    if (kybDone)     restored.add("kyb");
    if (licenseDone) restored.add("license");

    setCompletedTasks(restored);
    setShowTour(!tourSeen);
    setHydrated(true);
  }, []);

  // ── Persist completed tasks whenever they change ──
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("carlofty_completed_tasks", JSON.stringify(Array.from(completedTasks)));
  }, [completedTasks, hydrated]);

  const handleComplete = (id: string) => {
    setCompletedTasks(prev => new Set(Array.from(prev).concat(id)));
  };

  const handleCloseTour = () => {
    localStorage.setItem("carlofty_tour_seen", "true");
    setShowTour(false);
  };

  const allComplete = completedTasks.size === PROFILE_TASKS.length;
  const bridgeVerified = completedTasks.has("bridge");
  // Blur content until at least ONE task is completed (after tour is dismissed)
  const contentBlurred = !showTour && completedTasks.size === 0;

  const timeFilters = ["12M", "1M", "7D", "24H"];

  return (
    <div className="flex h-full bg-[#f9fafb]">

      {/* ── Onboarding Tour overlay ── */}
      {showTour && <OnboardingTour onClose={handleCloseTour} onSwitchTab={setActiveTab} />}

      {/* ── Desktop Sidebar ── */}
      <aside id="tour-sidebar" className="hidden lg:flex h-full w-[168px] shrink-0 flex-col border-r border-[#f0f0f0]">
        <SidebarContent active={activeNav} onNav={setActiveNav} />
      </aside>

      {/* ── Mobile Drawer ── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-64 shadow-2xl">
            <SidebarContent active={activeNav} onNav={setActiveNav} onClose={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      {/* ── Main column ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top header */}
        <header className="bg-white border-b border-[#f0f0f0] px-4 lg:px-7 py-3 lg:py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-[#374151] hover:bg-[#f3f4f6] transition-colors"
            >
              <Icon d="M4 6h16M4 12h16M4 18h16" size={20} strokeWidth={2} />
            </button>
            <div>
              <h1 className="text-[15px] lg:text-[18px] font-bold text-[#111827] leading-tight">Dashboard</h1>
              <p className="hidden sm:block text-[11px] lg:text-[12px] text-[#9ca3af] mt-0.5">
                Manage your bids, payments, and vehicle purchases in one place.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Notification bell */}
            <button id="tour-notifications" className="relative w-8 h-8 lg:w-9 lg:h-9 rounded-xl border border-[#f0f0f0] bg-white flex items-center justify-center hover:border-[#d1d5db] transition-colors">
              <Icon d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" size={15} strokeWidth={1.8} stroke="#374151" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#e53e3e] text-white text-[9px] font-bold rounded-full flex items-center justify-center">2</span>
            </button>
            {/* Wallet */}
            <button
              onClick={() => setActiveTab("wallet")}
              className="flex items-center gap-1.5 lg:gap-2 px-2.5 lg:px-3 py-2 rounded-xl border border-[#f0f0f0] bg-white hover:border-[#d1d5db] transition-colors"
            >
              <div className="w-4 h-4 lg:w-5 lg:h-5 rounded bg-[#1f2937] flex items-center justify-center">
                <Icon d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" size={11} stroke="white" strokeWidth={1.8} />
              </div>
              <span className="text-[11px] lg:text-[12px] font-semibold text-[#111827]">₦ 0.</span>
              <Icon d="M6 9l6 6 6-6" size={11} strokeWidth={2} stroke="#9ca3af" />
            </button>
          </div>
        </header>

        {/* ── Profile Completion Hanger (shown after tour is dismissed until all done) ── */}
        {!showTour && !allComplete && (
          <ProfileHanger
            completedTasks={completedTasks}
            onComplete={handleComplete}
            collapsed={hangerCollapsed}
            onToggle={() => setHangerCollapsed(v => !v)}
          />
        )}

        {/* ── Scrollable body — blurred when profile incomplete ── */}
        <div className="flex-1 min-h-0 relative overflow-hidden">
          {/* Blurred content */}
          <div
            className={`h-full overflow-y-auto transition-[filter,opacity] duration-300 ${contentBlurred ? "opacity-60 pointer-events-none select-none" : ""}`}
            style={contentBlurred ? { filter: "blur(3px)" } : undefined}
          >
            <main className="px-4 lg:px-7 py-4 lg:py-6 pb-24 lg:pb-8">

              {/* Tabs — always visible */}
              <div id="tour-tabs" className="flex items-center gap-0 border-b border-[#f0f0f0] mb-4">
                {(["overview", "wallet"] as const).map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-3 lg:px-4 py-2 lg:py-2.5 text-[12px] lg:text-[13px] font-medium capitalize transition-colors border-b-2 -mb-px ${activeTab === tab ? "border-[#111827] text-[#111827]" : "border-transparent text-[#9ca3af] hover:text-[#374151]"}`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {activeTab === "wallet" ? (
                <WalletTab bridgeVerified={bridgeVerified} />
              ) : (
                <>
                  {/* Time filter */}
                  <div id="tour-time-filter" className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-5">
                    <div className="flex items-center gap-0.5 lg:gap-1 bg-white border border-[#f0f0f0] rounded-xl p-1">
                      {timeFilters.map((t) => (
                        <button key={t} onClick={() => setActiveTime(t)}
                          className={`px-2.5 lg:px-3 py-1.5 rounded-lg text-[11px] lg:text-[12px] font-semibold transition-colors ${activeTime === t ? "bg-[#111827] text-white" : "text-[#9ca3af] hover:text-[#374151]"}`}
                        >{t}</button>
                      ))}
                    </div>
                    <p className="text-[11px] lg:text-[12px] text-[#9ca3af] hidden sm:block">
                      Showing data <span className="font-semibold text-[#374151]">for last 30 days</span>
                    </p>
                  </div>

                  {/* Stats */}
                  <div id="tour-stats" className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-4 lg:mb-5">
                    <StatCard label="My Bids"   value="5.00"          sub="All active bids" />
                    <StatCard label="Purchases" value="40.00"         sub="Vehicle Purchased" />
                    <StatCard label="Payment"   value="₦40,000,000." sub="Total payments" />
                    <StatCard label="Shipment"  value="4.00"          sub="In transit" />
                  </div>

                  {/* Pipeline */}
                  <div id="tour-pipeline" className="mb-4 lg:mb-5">
                    <StatusPipeline />
                  </div>

                  {/* Payments + Sourcing */}
                  <div className="flex flex-col lg:flex-row gap-4 mb-4 lg:mb-5">
                    <div id="tour-payments" className="lg:flex-1"><PendingPayments /></div>
                    <div id="tour-sourcing" className="lg:flex-1"><SourcingBreakdown /></div>
                  </div>

                  {/* Activity */}
                  <div id="tour-activity"><RecentActivity /></div>

                  <div className="flex items-center justify-end mt-4 pb-2">
                    <p className="text-[10px] lg:text-[11px] text-[#9ca3af]">Last updated Feb 14, 2026 14:35:12</p>
                  </div>
                </>
              )}
            </main>
          </div>

          {/* Blur CTA overlay — click to scroll back to hanger */}
          {contentBlurred && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 pointer-events-none">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-5 shadow-xl text-center max-w-[320px] mx-4 pointer-events-auto">
                <div className="w-10 h-10 rounded-xl bg-[#fef9c3] flex items-center justify-center mx-auto mb-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#ca8a04" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-[14px] font-bold text-[#111827] mb-1">Complete your profile to unlock</p>
                <p className="text-[12px] text-[#6b7280] leading-5 mb-4">
                  Finish your KYB verification, Bridge connection, and auction license to access full dashboard features.
                </p>
                <button
                  onClick={() => setHangerCollapsed(false)}
                  className="w-full bg-[#171717] text-white rounded-xl py-2.5 text-[13px] font-semibold hover:bg-[#333] transition-colors"
                >
                  View required steps
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#f0f0f0] lg:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {bottomNavItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className="flex flex-col items-center gap-1 px-2 py-1"
              >
                <span className={isActive ? "text-[#e53e3e]" : "text-[#9ca3af]"}>
                  <Icon d={item.icon} size={20} strokeWidth={1.6} />
                </span>
                <span className={`text-[9px] font-medium ${isActive ? "text-[#e53e3e]" : "text-[#9ca3af]"}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

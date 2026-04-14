"use client";
import { useState } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────
function Icon({ d, size = 18, stroke = "currentColor", fill = "none", strokeWidth = 1.6 }: {
  d: string | string[]; size?: number; stroke?: string; fill?: string; strokeWidth?: number;
}) {
  const paths = Array.isArray(d) ? d : [d];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
      {paths.map((p, i) => <path key={i} d={p} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />)}
    </svg>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: ["M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", "M9 22V12h6v10"] },
  { id: "bids", label: "My Bids", icon: ["M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2", "M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"] },
  { id: "purchases", label: "Purchases", icon: ["M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z", "M3 6h18", "M16 10a4 4 0 01-8 0"] },
  { id: "payment", label: "Payment", icon: ["M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"] },
  { id: "shipment", label: "Shipment", icon: ["M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3", "M12 17l-3 3 3 3M15.657 17.657A8 8 0 1117 10h4", "M9 20h9a2 2 0 002-2v-5"] },
  { id: "support", label: "Support", icon: ["M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"] },
  { id: "settings", label: "Settings", icon: ["M12 15a3 3 0 100-6 3 3 0 000 6z", "M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"] },
];

function Sidebar({ active, onNav }: { active: string; onNav: (id: string) => void }) {
  return (
    <aside className="h-full w-[168px] shrink-0 flex flex-col bg-white border-r border-[#f0f0f0]">
      {/* Logo */}
      <div className="px-5 pt-5 pb-6">
        <img
          src="https://www.figma.com/api/mcp/asset/b4f1b995-cb98-48a3-ba0b-7ae714cdccf6"
          alt="Carlofty"
          className="h-7 w-auto object-contain object-left"
        />
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-0.5 px-3">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-left transition-colors ${
                isActive
                  ? "bg-[#fef2f2] text-[#e53e3e]"
                  : "text-[#6b7280] hover:bg-[#f9fafb] hover:text-[#374151]"
              }`}
            >
              <span className={isActive ? "text-[#e53e3e]" : "text-[#9ca3af]"}>
                <Icon d={item.icon} size={16} strokeWidth={1.6} />
              </span>
              <span className="text-[13px] font-medium tracking-[0.1px]">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-3 pb-5 pt-3 border-t border-[#f0f0f0]">
        <div className="flex items-center gap-2.5 px-2 py-2">
          <div className="w-8 h-8 rounded-full bg-[#e5e7eb] flex items-center justify-center shrink-0 overflow-hidden">
            <img
              src="https://api.dicebear.com/7.x/initials/svg?seed=OS&backgroundColor=e5e7eb&textColor=374151"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
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
    </aside>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="flex-1 min-w-0 bg-white rounded-2xl border border-[#f0f0f0] px-5 py-5 flex flex-col gap-3">
      <p className="text-[13px] text-[#6b7280] font-medium tracking-[0.1px]">{label}</p>
      <p className="text-[26px] font-semibold text-[#111827] leading-none tracking-tight">{value}</p>
      <p className="text-[11px] text-[#9ca3af] tracking-[0.2px]">{sub}</p>
    </div>
  );
}

// ─── Status Pipeline ──────────────────────────────────────────────────────────
const pipelineColumns = [
  { id: "requested",    label: "Requested",         count: 2, color: "#6b7280", bg: "bg-white",       textColor: "text-[#374151]",  border: "border-[#e5e7eb]" },
  { id: "active",       label: "Active Bid",         count: 2, color: "#d97706", bg: "bg-[#fffbeb]",   textColor: "text-[#92400e]",  border: "border-[#fde68a]" },
  { id: "won",          label: "Won/Payment Due",    count: 2, color: "#dc2626", bg: "bg-[#fef2f2]",   textColor: "text-[#991b1b]",  border: "border-[#fecaca]" },
  { id: "processing",   label: "Payment Processing", count: 2, color: "#7c3aed", bg: "bg-[#f5f3ff]",   textColor: "text-[#4c1d95]",  border: "border-[#ddd6fe]" },
  { id: "transit",      label: "In Transit",         count: 2, color: "#2563eb", bg: "bg-[#eff6ff]",   textColor: "text-[#1e3a8a]",  border: "border-[#bfdbfe]" },
  { id: "delivered",    label: "Delivered",          count: 2, color: "#16a34a", bg: "bg-[#f0fdf4]",   textColor: "text-[#14532d]",  border: "border-[#bbf7d0]" },
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
    <section className="bg-white rounded-2xl border border-[#f0f0f0] p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-[15px] font-semibold text-[#111827]">Status Pipeline</h2>
          <p className="text-[12px] text-[#9ca3af] mt-0.5">Track the progress of your purchase</p>
        </div>
        <button className="flex items-center gap-1 text-[12px] text-[#6b7280] hover:text-[#111827] transition-colors font-medium">
          View All Bids
          <Icon d="M7 17L17 7M17 7H7M17 7v10" size={13} strokeWidth={2} />
        </button>
      </div>

      {/* Columns */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {pipelineColumns.map((col) => (
          <div key={col.id} className="flex-1 min-w-[130px]">
            {/* Column header */}
            <div className="flex items-center gap-1.5 mb-2 px-1">
              <div className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: col.color }} />
              <span className="text-[11px] font-semibold text-[#374151] truncate">{col.label}</span>
              <span className="ml-auto text-[11px] font-bold text-[#374151]">{col.count}</span>
              <Icon d="M9 5l7 7-7 7" size={10} strokeWidth={2.5} stroke="#9ca3af" />
            </div>
            {/* Cards */}
            <div className="flex flex-col gap-1.5">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className={`${col.bg} border ${col.border} rounded-xl px-3 py-2.5`}
                >
                  <p className={`text-[10px] font-medium ${col.textColor} leading-4`}>
                    2024 Mercedes-Benz 2022 GLE450
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Status pills */}
      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${pillColors.requested}`}>2 Requested</span>
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${pillColors.active}`}>2 Active Bids</span>
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${pillColors.won}`}>2 Won/Payment Due</span>
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${pillColors.processing}`}>2 Payment Processing</span>
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${pillColors.transit}`}>2 In Transit</span>
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${pillColors.delivered}`}>2 Delivered</span>
        <span className="ml-auto text-[11px] font-semibold text-[#374151]">Total active: 12 Vehicles</span>
      </div>
    </section>
  );
}

// ─── Pending Payments ─────────────────────────────────────────────────────────
const pendingPayments = [
  { vehicle: "2021 Toyota Camry SE", auction: "Manheim Phoenix", amount: "₦4,500,000", status: "2d overdue", statusColor: "text-[#dc2626] bg-[#fef2f2]" },
  { vehicle: "2021 Toyota Camry SE", auction: "Manheim Phoenix", amount: "₦4,500,000", status: "Due in 2days", statusColor: "text-[#d97706] bg-[#fffbeb]" },
];

function PendingPayments() {
  return (
    <div className="flex-1 min-w-0 bg-white rounded-2xl border border-[#f0f0f0] p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-[15px] font-semibold text-[#111827]">Pending Payments</h2>
          <span className="px-2 py-0.5 bg-[#fef2f2] text-[#dc2626] text-[10px] font-bold rounded-full">1 Overdue</span>
        </div>
        <button className="flex items-center gap-1 text-[12px] text-[#6b7280] hover:text-[#111827] transition-colors font-medium">
          View All
          <Icon d="M7 17L17 7M17 7H7M17 7v10" size={13} strokeWidth={2} />
        </button>
      </div>
      <p className="text-[11px] text-[#9ca3af] -mt-2">Payment requiring your attention</p>

      <div className="flex flex-col gap-2">
        {pendingPayments.map((p, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-[#f3f4f6] bg-[#fafafa]">
            <div className="w-8 h-8 rounded-lg bg-[#fef9c3] border border-[#fde68a] flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-[#1f2937] truncate">{p.vehicle}</p>
              <p className="text-[10px] text-[#9ca3af]">{p.auction}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <p className="text-[12px] font-bold text-[#111827]">{p.amount}</p>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${p.statusColor}`}>{p.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-3 border-t border-[#f3f4f6] flex items-center justify-between">
        <span className="text-[12px] text-[#6b7280] font-medium">Total Outstanding:</span>
        <span className="text-[13px] font-bold text-[#111827]">₦ 9,000,000</span>
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
    <div className="flex-1 min-w-0 bg-white rounded-2xl border border-[#f0f0f0] p-5 flex flex-col gap-4">
      <div>
        <h2 className="text-[15px] font-semibold text-[#111827]">Sourcing Breakdown</h2>
        <p className="text-[11px] text-[#9ca3af] mt-0.5">Vehicles sourced by auction platform</p>
      </div>

      <div className="flex flex-col gap-1">
        {sourcingData.map((row) => (
          <div key={row.name} className="flex items-center gap-3 py-2 border-b border-[#f9fafb] last:border-0">
            <div className="w-1 h-4 rounded-full bg-[#e5e7eb] shrink-0" />
            <span className="flex-1 text-[12px] font-medium text-[#374151]">{row.name}</span>
            <div className="flex items-center gap-1 text-[11px] text-[#6b7280]">
              <Icon d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3" size={12} strokeWidth={1.5} />
              {row.vehicles} Vehicles
            </div>
            <span className="text-[12px] font-semibold text-[#111827] w-14 text-right">{row.amount}</span>
            <span className="text-[11px] font-bold text-[#9ca3af] w-8 text-right">{row.pct}%</span>
          </div>
        ))}
      </div>

      <div className="text-[11px] text-[#9ca3af] border-t border-[#f3f4f6] pt-3">
        Total sourced this period &nbsp;
        <span className="font-semibold text-[#374151]">12 vehicles · ₦43.9M</span>
      </div>

      {/* In transit alert */}
      <div className="flex items-center gap-3 bg-[#eff6ff] border border-[#bfdbfe] rounded-xl px-4 py-3">
        <div className="w-8 h-8 rounded-full bg-[#dbeafe] flex items-center justify-center shrink-0">
          <Icon d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" size={16} stroke="#2563eb" strokeWidth={0} fill="#2563eb" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-semibold text-[#1e40af]">3 vehicles currently in transit</p>
          <p className="text-[10px] text-[#3b82f6]">Estimated arrival: Mar 5 – Mar 20, 2026</p>
        </div>
        <button className="flex items-center gap-1 text-[11px] font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors whitespace-nowrap">
          Track Shipment
          <Icon d="M7 17L17 7M17 7H7M17 7v10" size={11} strokeWidth={2.2} stroke="#2563eb" />
        </button>
      </div>
    </div>
  );
}

// ─── Recent Activity ──────────────────────────────────────────────────────────
const activityRows = [
  { date: "31-03-2026", id: "e8b....fb28", auction: "Copart, Inc.", ngn: "₦ 40,284,000.", usd: "$12,500.00", fx: "1368", status: "Completed",         statusColor: "bg-[#f0fdf4] text-[#16a34a]" },
  { date: "31-03-2026", id: "e8b....fb28", auction: "Copart, Inc.", ngn: "₦ 40,284,000.", usd: "$12,500.00", fx: "1368", status: "Payment processed",  statusColor: "bg-[#eff6ff] text-[#2563eb]" },
  { date: "31-03-2026", id: "e8b....fb28", auction: "Copart, Inc.", ngn: "₦ 40,284,000.", usd: "$12,500.00", fx: "1368", status: "Awaiting payment",   statusColor: "bg-[#fffbeb] text-[#d97706]" },
];

function StatusDot({ color }: { color: string }) {
  const dotMap: Record<string, string> = {
    "bg-[#f0fdf4] text-[#16a34a]": "bg-[#16a34a]",
    "bg-[#eff6ff] text-[#2563eb]": "bg-[#2563eb]",
    "bg-[#fffbeb] text-[#d97706]": "bg-[#d97706]",
  };
  return <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${dotMap[color] ?? "bg-gray-400"}`} />;
}

function RecentActivity() {
  const [page, setPage] = useState(1);
  const pages = [1, 2, 3, "...", 8];

  return (
    <section className="bg-white rounded-2xl border border-[#f0f0f0] p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[15px] font-semibold text-[#111827]">Recent Activity</h2>
      </div>

      {/* Filters row */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {/* Search */}
        <div className="flex items-center gap-2 bg-[#f9fafb] border border-[#f0f0f0] rounded-xl px-3 py-2 flex-1 min-w-[160px] max-w-[260px]">
          <Icon d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" size={13} stroke="#9ca3af" strokeWidth={2} />
          <input
            type="text"
            placeholder="Search all transactions"
            className="bg-transparent text-[12px] text-[#374151] placeholder:text-[#9ca3af] outline-none flex-1"
          />
        </div>

        {/* Date filter */}
        <button className="flex items-center gap-1.5 px-3 py-2 bg-[#f9fafb] border border-[#f0f0f0] rounded-xl text-[12px] text-[#374151] hover:border-[#d1d5db] transition-colors">
          <Icon d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" size={13} strokeWidth={1.8} stroke="#6b7280" />
          23 February
          <Icon d="M6 9l6 6 6-6" size={11} strokeWidth={2} stroke="#9ca3af" />
        </button>

        {["All stages", "All payment type", "All Status"].map((f) => (
          <button key={f} className="flex items-center gap-1 px-3 py-2 bg-[#f9fafb] border border-[#f0f0f0] rounded-xl text-[12px] text-[#374151] hover:border-[#d1d5db] transition-colors">
            {f}
            <Icon d="M6 9l6 6 6-6" size={11} strokeWidth={2} stroke="#9ca3af" />
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[#f3f4f6]">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="bg-[#f9fafb] border-b border-[#f3f4f6]">
              {["Date", "Payment ID", "Auction", "Amount Paid (NGN)", "USD Equiv", "FX Rate", "Status", "Wire Receipt"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-[#6b7280] tracking-[0.3px] whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activityRows.map((row, i) => (
              <tr key={i} className="border-b border-[#f9fafb] hover:bg-[#fafafa] transition-colors">
                <td className="px-4 py-3.5 text-[#374151] whitespace-nowrap">{row.date}</td>
                <td className="px-4 py-3.5">
                  <span className="flex items-center gap-1 text-[#374151]">
                    {row.id}
                    <Icon d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" size={11} strokeWidth={1.8} stroke="#9ca3af" />
                  </span>
                </td>
                <td className="px-4 py-3.5 text-[#374151]">{row.auction}</td>
                <td className="px-4 py-3.5 font-semibold text-[#111827]">{row.ngn}</td>
                <td className="px-4 py-3.5 text-[#374151]">{row.usd}</td>
                <td className="px-4 py-3.5 text-[#374151]">{row.fx}</td>
                <td className="px-4 py-3.5">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold ${row.statusColor}`}>
                    <StatusDot color={row.statusColor} />
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <button className="text-[#e53e3e] text-[12px] font-semibold hover:text-[#c53030] transition-colors">
                    View Receipt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#e5e7eb] text-[12px] text-[#374151] hover:bg-[#f9fafb] transition-colors font-medium">
          <Icon d="M15 18l-6-6 6-6" size={13} strokeWidth={2} />
          Previous
        </button>
        <div className="flex items-center gap-1">
          {pages.map((p, i) => (
            <button
              key={i}
              onClick={() => typeof p === "number" && setPage(p)}
              className={`w-8 h-8 rounded-lg text-[12px] font-medium transition-colors ${
                p === page
                  ? "bg-[#111827] text-white"
                  : p === "..."
                  ? "text-[#9ca3af] cursor-default"
                  : "text-[#374151] hover:bg-[#f3f4f6]"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#e5e7eb] text-[12px] text-[#374151] hover:bg-[#f9fafb] transition-colors font-medium">
          Next
          <Icon d="M9 18l6-6-6-6" size={13} strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [activeTab, setActiveTab] = useState("overview");
  const [activeTime, setActiveTime] = useState("1M");
  const timeFilters = ["12M", "1M", "7D", "24H"];

  return (
    <div className="flex h-full bg-[#f9fafb]">
      <Sidebar active={activeNav} onNav={setActiveNav} />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="bg-white border-b border-[#f0f0f0] px-7 py-4 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] leading-tight">Dashboard</h1>
            <p className="text-[12px] text-[#9ca3af] mt-0.5">Manage your bids, payments, and vehicle purchases in one place.</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Bell */}
            <button className="relative w-9 h-9 rounded-xl border border-[#f0f0f0] bg-white flex items-center justify-center hover:border-[#d1d5db] transition-colors">
              <Icon d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" size={16} strokeWidth={1.8} stroke="#374151" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#e53e3e] text-white text-[9px] font-bold rounded-full flex items-center justify-center">2</span>
            </button>
            {/* Wallet */}
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#f0f0f0] bg-white hover:border-[#d1d5db] transition-colors">
              <div className="w-5 h-5 rounded bg-[#1f2937] flex items-center justify-center">
                <Icon d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" size={13} stroke="white" strokeWidth={1.8} />
              </div>
              <span className="text-[12px] font-semibold text-[#111827]">₦ 0.</span>
              <Icon d="M6 9l6 6 6-6" size={12} strokeWidth={2} stroke="#9ca3af" />
            </button>
          </div>
        </header>

        {/* Scrollable body */}
        <main className="flex-1 overflow-y-auto px-7 py-6">
          {/* Tabs */}
          <div className="flex items-center gap-0 border-b border-[#f0f0f0] mb-5">
            {["overview", "wallet"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-[13px] font-medium capitalize transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-[#111827] text-[#111827]"
                    : "border-transparent text-[#9ca3af] hover:text-[#374151]"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Time filter row */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-1 bg-white border border-[#f0f0f0] rounded-xl p-1">
              {timeFilters.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTime(t)}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${
                    activeTime === t
                      ? "bg-[#111827] text-white"
                      : "text-[#9ca3af] hover:text-[#374151]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="text-[12px] text-[#9ca3af]">
              Showing data <span className="font-semibold text-[#374151]">for last 30 days</span>
            </p>
          </div>

          {/* Stat cards */}
          <div className="flex gap-4 mb-5">
            <StatCard label="My Bids"   value="5.00"          sub="All active bids" />
            <StatCard label="Purchases" value="40.00"         sub="Vehicle Purchased" />
            <StatCard label="Payment"   value="₦40,000,000." sub="Total payments" />
            <StatCard label="Shipment"  value="4.00"          sub="In transit" />
          </div>

          {/* Status Pipeline */}
          <div className="mb-5">
            <StatusPipeline />
          </div>

          {/* Pending Payments + Sourcing Breakdown */}
          <div className="flex gap-4 mb-5">
            <PendingPayments />
            <SourcingBreakdown />
          </div>

          {/* Recent Activity */}
          <RecentActivity />

          {/* Footer */}
          <div className="flex items-center justify-end mt-4 pb-2">
            <p className="text-[11px] text-[#9ca3af] flex items-center gap-1.5">
              <Icon d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-6v-4m0-2V8" size={12} strokeWidth={1.8} stroke="#9ca3af" />
              Last updated Feb 14, 2026 14:35:12
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

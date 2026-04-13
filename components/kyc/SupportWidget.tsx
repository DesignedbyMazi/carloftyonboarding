"use client";
import { useState } from "react";

export default function SupportWidget() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="px-4 w-full">
      <div className="bg-white rounded-lg p-3 w-full">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            {/* Headset icon */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2C6.13 2 3 5.13 3 9v4c0 1.1.9 2 2 2h1v-5H4V9c0-3.31 2.69-6 6-6s6 2.69 6 6v1h-2v5h1c1.1 0 2-.9 2-2V9c0-3.87-3.13-7-7-7z" fill="#2d2d2d"/>
            </svg>
            <span className="text-sm font-medium text-[#2d2d2d] tracking-[0.21px]">Need Support?</span>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="text-[#959595] hover:text-[#2d2d2d] transition-colors"
            aria-label="Close support widget"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <p className="text-xs text-[#777] tracking-[0.24px] leading-4 mb-2.5">
          Contact with one of our experts to get supports
        </p>
        <button className="w-full border border-[#d4d4d4] rounded-lg h-10 text-sm text-[#262626] font-normal bg-white hover:bg-gray-50 transition-colors shadow-[inset_0px_-2px_0px_0px_rgba(0,0,0,0.05)]">
          Get Help
        </button>
      </div>
    </div>
  );
}

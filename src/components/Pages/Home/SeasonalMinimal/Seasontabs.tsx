"use client";

import type { Season } from "./Products";
import { seasonMeta } from "./Products";

interface SeasonTabsProps {
  active: Season;
  onChange: (s: Season) => void;
}

export function SeasonTabs({ active, onChange }: SeasonTabsProps) {
  const seasons: Season[] = ["summer", "rainy", "winter"];

  return (
    <div className="flex items-center justify-center gap-3 flex-wrap mt-6">
      {seasons.map((season) => {
        const isActive = active === season;
        const meta = seasonMeta[season];

        return (
          <button
            key={season}
            onClick={() => onChange(season)}
            className="relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium tracking-wider uppercase transition-all duration-400 overflow-hidden group/tab focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800000]"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: isActive ? 600 : 500,
              letterSpacing: "0.1em",
              backgroundColor: isActive ? "#800000" : "transparent",
              color: isActive ? "#fff" : "#800000",
              border: "1.5px solid #800000",
              boxShadow: isActive
                ? "0 4px 16px rgba(128,0,0,0.25)"
                : "none",
              transform: isActive ? "translateY(-1px)" : "translateY(0)",
              transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor =
                  "rgba(128,0,0,0.07)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(128,0,0,0.12)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }
            }}
          >
            {/* Ripple fill on active */}
            <div
              className="absolute inset-0 rounded-full transition-transform duration-500 origin-left"
              style={{
                backgroundColor: "#5C0000",
                transform: isActive ? "scaleX(0)" : "scaleX(0)",
              }}
            />

            <span className="text-base leading-none relative z-10">
              {meta.icon}
            </span>
            <span className="relative z-10">{meta.label}</span>
          </button>
        );
      })}
    </div>
  );
}
"use client";
import { useState } from "react";
import { ChevronUp, ChevronDown, SlidersHorizontal, X } from "lucide-react";

export interface Filters {
  colors:   string[];
  sizes:    string[];
  priceMax: number;
}

interface Props {
  filters:       Filters;
  onChange:      (f: Filters) => void;
  onApply:       () => void;
  mobileOpen:    boolean;
  onMobileClose: () => void;
}

const COLORS = [
  { name: "Black",    hex: "#111111" },
  { name: "Navy",     hex: "#0f172a" },
  { name: "White",    hex: "#f5f5f5" },
  { name: "Camel",    hex: "#c19a6b" },
  { name: "Grey",     hex: "#9ca3af" },
  { name: "Olive",    hex: "#6b7c45" },
  { name: "Burgundy", hex: "#7c2335" },
  { name: "Beige",    hex: "#e8dcc8" },
];

const SIZES    = ["XS", "S", "M", "L", "XL", "XXL"];
const MAX_PRICE = 1500;

// ── Collapsible section wrapper ───────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-maroon/10 pb-6 mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between mb-4 group"
      >
        <span className="text-[11px] font-black tracking-[0.2em] uppercase text-maroon">
          {title}
        </span>
        {open
          ? <ChevronUp   className="w-3.5 h-3.5 text-maroon/60 group-hover:text-maroon transition-colors" />
          : <ChevronDown className="w-3.5 h-3.5 text-maroon/60 group-hover:text-maroon transition-colors" />
        }
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

// ── Inner sidebar markup (shared desktop + mobile) ────────────────────────────
function SidebarInner({ filters, onChange, onApply, onMobileClose }: Omit<Props, "mobileOpen">) {
  const activeCount =
    filters.colors.length +
    filters.sizes.length +
    (filters.priceMax < MAX_PRICE ? 1 : 0);

  const toggleColor = (name: string) =>
    onChange({
      ...filters,
      colors: filters.colors.includes(name)
        ? filters.colors.filter(c => c !== name)
        : [...filters.colors, name],
    });

  const toggleSize = (s: string) =>
    onChange({
      ...filters,
      sizes: filters.sizes.includes(s)
        ? filters.sizes.filter(x => x !== s)
        : [...filters.sizes, s],
    });

  return (
    <aside className="w-full">
      {/* Sidebar header */}
      <div className="flex items-center justify-between mb-7 pb-4 border-b border-maroon/10">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-maroon" />
          <span className="text-[11px] font-black tracking-[0.22em] uppercase text-maroon">
            Filter By
          </span>
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-maroon text-white text-[10px] font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        <button
          onClick={onMobileClose}
          className="lg:hidden p-1.5 hover:bg-maroon/5 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-maroon/60 hover:text-maroon" />
        </button>
      </div>

      {/* ── COLOR ── */}
      <Section title="Color">
        <div className="grid grid-cols-4 gap-x-2 gap-y-3">
          {COLORS.map(c => {
            const active = filters.colors.includes(c.name);
            return (
              <button
                key={c.name}
                onClick={() => toggleColor(c.name)}
                title={c.name}
                className="flex flex-col items-center gap-1.5 group"
              >
                <span
                  className={`w-8 h-8 rounded-full border-2 block transition-all duration-200
                    ${active
                      ? "border-maroon scale-110 shadow-md"
                      : "border-gray-200 hover:border-maroon/50 hover:scale-105"}
                    ${c.name === "White" ? "shadow-sm" : ""}`}
                  style={{ backgroundColor: c.hex }}
                />
                <span className={`text-[9px] font-semibold leading-none ${active ? "text-maroon" : "text-gray-400"}`}>
                  {c.name}
                </span>
              </button>
            );
          })}
        </div>
      </Section>

      {/* ── SIZE ── */}
      <Section title="Size">
        <div className="grid grid-cols-3 gap-2">
          {SIZES.map(s => {
            const active = filters.sizes.includes(s);
            return (
              <button
                key={s}
                onClick={() => toggleSize(s)}
                className={`py-2 text-xs font-bold rounded-xl border transition-all duration-200
                  ${active
                    ? "bg-maroon text-white border-maroon shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-maroon hover:text-maroon"
                  }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </Section>

      {/* ── PRICE RANGE ── */}
      <Section title="Price Range">
        <div className="space-y-4">
          <input
            type="range"
            min={0}
            max={MAX_PRICE}
            step={50}
            value={filters.priceMax}
            onChange={e => onChange({ ...filters, priceMax: Number(e.target.value) })}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right,#800000 0%,#800000 ${
                (filters.priceMax / MAX_PRICE) * 100
              }%,#e5e7eb ${(filters.priceMax / MAX_PRICE) * 100}%,#e5e7eb 100%)`,
              accentColor: "#800000",
            }}
          />
          <div className="flex items-center justify-between">
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5">
              <span className="text-[11px] font-bold text-gray-500">$0</span>
            </div>
            <div className="bg-maroon/10 border border-maroon/20 rounded-lg px-3 py-1.5">
              <span className="text-[11px] font-bold text-maroon">
                ${filters.priceMax.toLocaleString()}
                {filters.priceMax >= MAX_PRICE ? "+" : ""}
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* ── APPLY / CLEAR ── */}
      <div className="space-y-2 pt-1">
        <button
          onClick={onApply}
          className="w-full bg-maroon hover:bg-maroon-dark text-white font-black text-[11px]
            tracking-[0.22em] uppercase py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg
            active:scale-[0.98]"
        >
          Apply Filters
        </button>
        {activeCount > 0 && (
          <button
            onClick={() => onChange({ colors: [], sizes: [], priceMax: MAX_PRICE })}
            className="w-full text-maroon/60 hover:text-maroon text-[11px] font-semibold
              tracking-wider uppercase py-2 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      <style>{`
        :root {
          --maroon: #800000;
          --maroon-dark: #5C0000;
          --maroon-light: #9D2A2A;
        }
        
        .text-maroon {
          color: var(--maroon);
        }
        
        .bg-maroon {
          background-color: var(--maroon);
        }
        
        .bg-maroon-dark {
          background-color: var(--maroon-dark);
        }
        
        .border-maroon {
          border-color: var(--maroon);
        }
        
        .hover\\:bg-maroon-dark:hover {
          background-color: var(--maroon-dark);
        }
        
        input[type=range]::-webkit-slider-thumb{
          -webkit-appearance:none;appearance:none;
          width:18px;height:18px;border-radius:50%;
          background:#800000;border:3px solid #fff;
          box-shadow:0 1px 8px rgba(128,0,0,.35);cursor:pointer;
        }
        input[type=range]::-moz-range-thumb{
          width:18px;height:18px;border-radius:50%;
          background:#800000;border:3px solid #fff;
          box-shadow:0 1px 8px rgba(128,0,0,.35);cursor:pointer;
        }
        
        input[type=range]::-webkit-slider-runnable-track {
          background: #e5e7eb;
        }
        
        input[type=range]::-moz-range-track {
          background: #e5e7eb;
        }
      `}</style>
    </aside>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function FilterSidebar(props: Props) {
  const { mobileOpen, onMobileClose, ...rest } = props;

  return (
    <>
      {/* Desktop — sticky sidebar */}
      <div className="hidden lg:block sticky top-6 self-start">
        <SidebarInner {...rest} onMobileClose={onMobileClose} />
      </div>

      {/* Mobile — slide-in drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          {/* Panel */}
          <div className="absolute left-0 top-0 bottom-0 w-[300px] bg-white shadow-2xl p-6 overflow-y-auto">
            <SidebarInner {...rest} onMobileClose={onMobileClose} />
          </div>
        </div>
      )}
    </>
  );
}
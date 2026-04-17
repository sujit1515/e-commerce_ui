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
  { name: "Black",    hex: "#111111", darkHex: "#111111" },
  { name: "White",    hex: "#f5f5f5", darkHex: "#e5e5e5" },
  { name: "Rose",     hex: "#f43f5e", darkHex: "#e11d48" },
  { name: "Blush",    hex: "#fda4af", darkHex: "#fb7185" },
  { name: "Ivory",    hex: "#fffff0", darkHex: "#fefce8" },
  { name: "Mauve",    hex: "#c084fc", darkHex: "#a855f7" },
  { name: "Sage",     hex: "#86efac", darkHex: "#4ade80" },
  { name: "Camel",    hex: "#c19a6b", darkHex: "#b87a4a" },
];

// Kids-specific sizes
const SIZES    = ["XS", "S", "M", "L", "XL", "XXL"];
const MAX_PRICE = 1500;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-rose/20 pb-6 mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between mb-4 group"
      >
        <span className="text-[11px] font-black tracking-[0.2em] uppercase text-black">
          {title}
        </span>
        {open
          ? <ChevronUp   className="w-3.5 h-3.5 text-gray-600 group-hover:text-rose transition-colors" />
          : <ChevronDown className="w-3.5 h-3.5 text-gray-600 group-hover:text-rose transition-colors" />
        }
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

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
      {/* Header */}
      <div className="flex items-center justify-between mb-7 pb-4 border-b border-rose/20">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-rose" />
          <span className="text-[11px] font-black tracking-[0.22em] uppercase text-black">
            Filter By
          </span>
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-rose text-white text-[10px] font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        <button
          onClick={onMobileClose}
          className="lg:hidden p-1.5 hover:bg-rose/10 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-gray-500 hover:text-rose" />
        </button>
      </div>

      {/* Kids' Collection label */}
      <div className="mb-6 px-3 py-2.5 rounded-xl bg-rose/5 border border-rose/15">
        <p className="text-[10px] font-black tracking-[0.18em] uppercase text-rose text-center">
          Kids' Collection
        </p>
      </div>

      {/* COLOR */}
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
                      ? "border-rose scale-110 shadow-md ring-2 ring-rose/30"
                      : "border-gray-300 hover:border-rose/70 hover:scale-105"}
                    ${c.name === "White" || c.name === "Ivory" ? "shadow-sm" : ""}`}
                  style={{ backgroundColor: active ? c.darkHex : c.hex }}
                />
                <span className={`text-[9px] font-semibold leading-none ${active ? "text-rose font-bold" : "text-gray-600"}`}>
                  {c.name}
                </span>
              </button>
            );
          })}
        </div>
      </Section>

      {/* SIZE */}
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
                    ? "bg-rose text-white border-rose shadow-md ring-2 ring-rose/30"
                    : "bg-white text-gray-800 border-gray-300 hover:border-rose hover:text-rose hover:bg-rose/5"
                  }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </Section>

      {/* PRICE RANGE */}
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
              background: `linear-gradient(to right,#8B2252 0%,#8B2252 ${
                (filters.priceMax / MAX_PRICE) * 100
              }%,#e5e7eb ${(filters.priceMax / MAX_PRICE) * 100}%,#e5e7eb 100%)`,
              accentColor: "#8B2252",
            }}
          />
          <div className="flex items-center justify-between">
            <div className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-1.5">
              <span className="text-[11px] font-bold text-gray-800">$0</span>
            </div>
            <div className="bg-rose/15 border border-rose/30 rounded-lg px-3 py-1.5">
              <span className="text-[11px] font-bold text-rose">
                ${filters.priceMax.toLocaleString()}
                {filters.priceMax >= MAX_PRICE ? "+" : ""}
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* APPLY / CLEAR */}
      <div className="space-y-2 pt-1">
        <button
          onClick={onApply}
          className="w-full bg-rose hover:bg-rose-dark text-white font-black text-[11px]
            tracking-[0.22em] uppercase py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg
            active:scale-[0.98]"
        >
          Apply Filters
        </button>
        {activeCount > 0 && (
          <button
            onClick={() => onChange({ colors: [], sizes: [], priceMax: MAX_PRICE })}
            className="w-full text-gray-700 hover:text-rose text-[11px] font-semibold
              tracking-wider uppercase py-2 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      <style>{`
        :root {
          --rose: #8B2252;
          --rose-dark: #5C1238;
        }
        .text-rose   { color: var(--rose); }
        .bg-rose     { background-color: var(--rose); }
        .border-rose { border-color: var(--rose); }
        .hover\\:bg-rose-dark:hover { background-color: var(--rose-dark); }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 18px; height: 18px; border-radius: 50%;
          background: #8B2252; border: 3px solid #fff;
          box-shadow: 0 1px 8px rgba(139,34,82,.45); cursor: pointer;
        }
        input[type=range]::-moz-range-thumb {
          width: 18px; height: 18px; border-radius: 50%;
          background: #8B2252; border: 3px solid #fff;
          box-shadow: 0 1px 8px rgba(139,34,82,.45); cursor: pointer;
        }
      `}</style>
    </aside>
  );
}

export default function KidsFilterSidebar(props: Props) {
  const { mobileOpen, onMobileClose, ...rest } = props;
  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block sticky top-6 self-start">
        <SidebarInner {...rest} onMobileClose={onMobileClose} />
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onMobileClose} />
          <div className="absolute left-0 top-0 bottom-0 w-[300px] bg-white shadow-2xl p-6 overflow-y-auto">
            <SidebarInner {...rest} onMobileClose={onMobileClose} />
          </div>
        </div>
      )}
    </>
  );
}
"use client";

// ─────────────────────────────────────────────────────────────────────────────
//  CollectionHeader.tsx
//  Breadcrumb · Title · Description · Sort By
//  Reusable: edit CONTENT + SORT_OPTIONS
// ─────────────────────────────────────────────────────────────────────────────

const SORT_OPTIONS = [
  { value: "newest",     label: "Newest Arrivals"    },
  { value: "price-asc",  label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "popular",    label: "Most Popular"       },
];

const CONTENT = {
  breadcrumbs: ["Home", "Men's Collection"],
  title:       "Essential Collection",
  description: "Curated premium menswear for the modern silhouette. Timeless aesthetics meet contemporary craftsmanship.",
};

interface Props {
  sortValue:    string;
  onSortChange: (val: string) => void;
}

export default function CollectionHeader({ sortValue, onSortChange }: Props) {
  return (
    <div className="border-b border-gray-100 pb-6 mb-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 mb-4">
        {CONTENT.breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-gray-300 text-xs">›</span>}
            <a
              href={i === 0 ? "/" : "#"}
              className={`text-[11px] font-bold tracking-widest uppercase transition-colors
                ${i === CONTENT.breadcrumbs.length - 1
                  ? "text-[#0f172a] pointer-events-none"
                  : "text-gray-400 hover:text-gray-600"}`}
            >
              {crumb}
            </a>
          </span>
        ))}
      </nav>

      {/* Title row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-display italic font-bold text-[#0f172a] text-3xl sm:text-4xl lg:text-5xl leading-tight mb-2">
            {CONTENT.title}
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed max-w-md">
            {CONTENT.description}
          </p>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="hidden sm:block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">
            Sort By
          </span>
          <div className="relative">
            <select
              value={sortValue}
              onChange={e => onSortChange(e.target.value)}
              className="appearance-none bg-white border border-gray-200 text-[#0f172a] text-sm font-medium
                pl-4 pr-9 py-2.5 rounded-xl outline-none cursor-pointer
                focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
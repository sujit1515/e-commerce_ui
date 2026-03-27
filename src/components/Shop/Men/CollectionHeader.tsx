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
    <>
      <style>{`
        :root {
          --maroon: #800000;
          --maroon-dark: #5C0000;
          --maroon-light: #9D2A2A;
          --maroon-soft: #F5E6E6;
        }
        
        .text-maroon {
          color: var(--maroon);
        }
        
        .border-maroon {
          border-color: var(--maroon);
        }
        
        .focus\\:border-maroon:focus {
          border-color: var(--maroon);
        }
        
        .focus\\:ring-maroon:focus {
          --tw-ring-color: rgba(128, 0, 0, 0.2);
        }
        
        .hover\\:text-maroon:hover {
          color: var(--maroon);
        }
      `}</style>

      <div className="border-b border-maroon/10 pb-6 mb-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 mb-4">
          {CONTENT.breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-maroon/30 text-xs">›</span>}
              <a
                href={i === 0 ? "/" : "#"}
                className={`text-[11px] font-bold tracking-widest uppercase transition-colors
                  ${i === CONTENT.breadcrumbs.length - 1
                    ? "text-maroon pointer-events-none"
                    : "text-maroon/50 hover:text-maroon"}`}
              >
                {crumb}
              </a>
            </span>
          ))}
        </nav>

        {/* Title row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-display italic font-bold text-maroon text-3xl sm:text-4xl lg:text-5xl leading-tight mb-2">
              {CONTENT.title}
            </h1>
            <p className="text-maroon/60 text-sm leading-relaxed max-w-md">
              {CONTENT.description}
            </p>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="hidden sm:block text-[10px] font-bold tracking-[0.2em] uppercase text-maroon/50">
              Sort By
            </span>
            <div className="relative">
              <select
                value={sortValue}
                onChange={e => onSortChange(e.target.value)}
                className="appearance-none bg-white border border-maroon/20 text-maroon text-sm font-medium
                  pl-4 pr-9 py-2.5 rounded-xl outline-none cursor-pointer
                  focus:border-maroon focus:ring-2 focus:ring-maroon/10 transition-all"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-maroon/40 pointer-events-none"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
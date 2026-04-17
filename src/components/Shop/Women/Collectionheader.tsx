"use client";

const SORT_OPTIONS = [
  { value: "newest",     label: "Newest Arrivals"    },
  { value: "price-asc",  label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "popular",    label: "Most Popular"       },
];

const CONTENT = {
  breadcrumbs: ["Home", "Women's Collection"],
  title:       "Feminine Edit",
  description: "Elevated womenswear for every occasion. Where fluid silhouettes meet refined tailoring.",
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
          --rose: #8B2252;
          --rose-dark: #5C1238;
          --rose-light: #B05070;
          --rose-soft: #F5E6EE;
          --bg-color: #FBF7F9;
        }
        .text-rose   { color: var(--rose); }
        .text-black  { color: #000000; }
        .border-rose { border-color: var(--rose); }
        .focus\\:border-rose:focus { border-color: var(--rose); }
        .focus\\:ring-rose:focus   { --tw-ring-color: rgba(139,34,82,0.2); }
        .hover\\:text-rose:hover   { color: var(--rose); }
      `}</style>

      <div className="border-b border-rose/10 pb-6 mb-8 bg-[#FBF7F9]">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 mb-4">
          {CONTENT.breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-rose/30 text-xs">›</span>}
              <a
                href={i === 0 ? "/" : "#"}
                className={`text-[11px] font-bold tracking-widest uppercase transition-colors
                  ${i === CONTENT.breadcrumbs.length - 1
                    ? "text-black pointer-events-none"
                    : "text-black/50 hover:text-rose"}`}
              >
                {crumb}
              </a>
            </span>
          ))}
        </nav>

        {/* Title row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-display italic font-bold text-black text-3xl sm:text-4xl lg:text-5xl leading-tight mb-2">
              {CONTENT.title}
            </h1>
            <p className="text-black/60 text-sm leading-relaxed max-w-md">
              {CONTENT.description}
            </p>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="hidden sm:block text-[10px] font-bold tracking-[0.2em] uppercase text-black/50">
              Sort By
            </span>
            <div className="relative">
              <select
                value={sortValue}
                onChange={e => onSortChange(e.target.value)}
                className="appearance-none bg-white border border-rose/20 text-black text-sm font-medium
                  pl-4 pr-9 py-2.5 rounded-xl outline-none cursor-pointer
                  focus:border-rose focus:ring-2 focus:ring-rose/10 transition-all"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/40 pointer-events-none"
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
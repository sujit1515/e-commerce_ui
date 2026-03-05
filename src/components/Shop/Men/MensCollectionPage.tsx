"use client";
import { useState, useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";

import CollectionHeader               from "./CollectionHeader";
import FilterSidebar, { Filters }     from "./FilterSidebar";
import ProductGrid, { ALL_PRODUCTS }  from "./Productgrid";

// ─────────────────────────────────────────────────────────────────────────────
//  MensCollectionPage.tsx
//  Composer — wires CollectionHeader + FilterSidebar + ProductGrid together.
//  All state lives here and is passed down as props.
//  Usage: drop <MensCollectionPage /> into app/mens-collection/page.tsx
// ─────────────────────────────────────────────────────────────────────────────

const PAGE_SIZE    = 6;
const TOTAL_COUNT  = 48; // total in "database" (mocked)

export default function MensCollectionPage() {
  // ── Filter state ──────────────────────────────────────────────────────────
  const [filters, setFilters]           = useState<Filters>({ colors: [], sizes: [], priceMax: 1500 });
  const [appliedFilters, setApplied]    = useState<Filters>({ colors: [], sizes: [], priceMax: 1500 });
  const [mobileFilterOpen, setMobile]   = useState(false);

  // ── Sort state ────────────────────────────────────────────────────────────
  const [sortValue, setSortValue]       = useState("newest");

  // ── Pagination ────────────────────────────────────────────────────────────
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // ── Derived: filtered + sorted products ──────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...ALL_PRODUCTS];

    if (appliedFilters.colors.length > 0)
      list = list.filter(p => p.colors.some(c => appliedFilters.colors.includes(c)));

    if (appliedFilters.sizes.length > 0)
      list = list.filter(p => p.sizes.some(s => appliedFilters.sizes.includes(s)));

    list = list.filter(p => p.price <= appliedFilters.priceMax);

    switch (sortValue) {
      case "price-asc":  list.sort((a, b) => a.price - b.price);   break;
      case "price-desc": list.sort((a, b) => b.price - a.price);   break;
      case "popular":    list.sort((a, b) => b.reviews - a.reviews); break;
      default: /* newest — keep seed order */ break;
    }

    return list;
  }, [appliedFilters, sortValue]);

  const visibleProducts = filtered.slice(0, visibleCount);

  const handleApply = () => {
    setApplied({ ...filters });
    setVisibleCount(PAGE_SIZE);
    setMobile(false);
  };

  const handleLoadMore = () => setVisibleCount(v => Math.min(v + PAGE_SIZE, filtered.length));

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        .font-display { font-family:'Cormorant Garamond',serif; }
        * { font-family:'DM Sans',sans-serif; }
      `}</style>

      <div className="min-h-screen bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

          {/* ── Collection header (full width) ── */}
          <CollectionHeader sortValue={sortValue} onSortChange={setSortValue} />

          {/* ── Mobile filter toggle button ── */}
          <div className="flex lg:hidden mb-6">
            <button
              onClick={() => setMobile(true)}
              className="flex items-center gap-2 border border-gray-200 text-[#0f172a] text-[11px]
                font-black tracking-[0.2em] uppercase px-5 py-2.5 rounded-xl
                hover:bg-gray-50 transition-all shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter
              {(appliedFilters.colors.length + appliedFilters.sizes.length + (appliedFilters.priceMax < 1500 ? 1 : 0)) > 0 && (
                <span className="ml-1 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {appliedFilters.colors.length + appliedFilters.sizes.length + (appliedFilters.priceMax < 1500 ? 1 : 0)}
                </span>
              )}
            </button>
          </div>

          {/* ── Main layout: Sidebar + Grid ── */}
          <div className="flex gap-10 xl:gap-14 items-start">

            {/* Left sidebar — 260px fixed width on desktop */}
            <div className="w-[260px] flex-shrink-0">
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                onApply={handleApply}
                mobileOpen={mobileFilterOpen}
                onMobileClose={() => setMobile(false)}
              />
            </div>

            {/* Right product grid — grows to fill remaining space */}
            <div className="flex-1 min-w-0">
              <ProductGrid
                products={visibleProducts}
                totalCount={Math.min(filtered.length + (TOTAL_COUNT - ALL_PRODUCTS.length), TOTAL_COUNT)}
                visibleCount={visibleCount}
                onLoadMore={handleLoadMore}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
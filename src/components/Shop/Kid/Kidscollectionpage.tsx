"use client";

import { useState, useEffect, useCallback } from "react";
import { SlidersHorizontal } from "lucide-react";
import KidsCollectionHeader from "./Kidsheader";
import FilterSidebar, { Filters } from "./FilterSidebar";
import ProductGrid from "../Women/Productgrid";
import { getAllProducts, Product as APIProduct, ProductFilters } from "@/api/product";
import { getWishlist } from "@/api/wishlist";

const PAGE_SIZE = 9;

const transformProduct = (apiProduct: APIProduct): any => ({
  _id:         apiProduct._id,
  name:        apiProduct.name,
  price:       apiProduct.price,
  img:         apiProduct.images?.[0] || "https://via.placeholder.com/600x800?text=No+Image",
  images:      apiProduct.images,
  colors:      apiProduct.colors || [],
  sizes:       apiProduct.sizes  || [],
  category:    apiProduct.category,
  description: apiProduct.description,
  stock:       apiProduct.stock,
  rating:      4.5,
  reviews:     0,
  badge:       apiProduct.stock && apiProduct.stock < 10 ? "Limited" : undefined,
});

export default function KidsCollectionPage() {
  const [filters, setFilters]           = useState<Filters>({ colors: [], sizes: [], priceMax: 1500 });
  const [appliedFilters, setApplied]    = useState<Filters>({ colors: [], sizes: [], priceMax: 1500 });
  const [mobileFilterOpen, setMobile]   = useState(false);
  const [sortValue, setSortValue]       = useState("newest");

  const [products, setProducts]         = useState<any[]>([]);
  const [totalCount, setTotalCount]     = useState(0);
  const [page, setPage]                 = useState(1);
  const [loading, setLoading]           = useState(false);
  const [hasMore, setHasMore]           = useState(true);

  const [wishlistedIds, setWishlistedIds]         = useState<Set<string>>(new Set());
  const [isWishlistLoading, setIsWishlistLoading] = useState(true);

  /* ── Wishlist ─────────────────────────────────────────────────────── */
  const fetchWishlist = useCallback(async () => {
    try {
      setIsWishlistLoading(true);
      const data = await getWishlist();
      if (data?.success && Array.isArray(data.wishlist)) {
        const ids = new Set<string>(
          data.wishlist
            .map((item: any) => {
              if (item?.product?._id) return item.product._id;
              if (item?.productId)    return item.productId;
              if (item?._id)          return item._id;
              return null;
            })
            .filter(Boolean)
        );
        setWishlistedIds(ids);
      }
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    } finally {
      setIsWishlistLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") fetchWishlist();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [fetchWishlist]);

  /* ── Products ─────────────────────────────────────────────────────── */
  const fetchProducts = async (pageNumber = 1, append = false) => {
    try {
      setLoading(true);

      const apiFilters: ProductFilters = {
        category: "kids",            // ← KEY: fetches only kids products
        page:     pageNumber,
        limit:    PAGE_SIZE,
        ...(appliedFilters.colors.length > 0 && { colors: appliedFilters.colors }),
        ...(appliedFilters.sizes.length  > 0 && { sizes:  appliedFilters.sizes  }),
        ...(appliedFilters.priceMax < 1500    && { maxPrice: appliedFilters.priceMax }),
      };

      if (sortValue === "price-asc") {
        apiFilters.sortBy    = "price";
        apiFilters.sortOrder = "asc";
      } else if (sortValue === "price-desc") {
        apiFilters.sortBy    = "price";
        apiFilters.sortOrder = "desc";
      }

      const response = await getAllProducts(apiFilters);

      if (response?.success) {
        const transformed = response.products.map(transformProduct);
        if (append) setProducts(prev => [...prev, ...transformed]);
        else        setProducts(transformed);
        setTotalCount(response.totalProducts);
        setHasMore(response.currentPage < response.totalPages);
        setPage(response.currentPage);
      }
    } catch (err) {
      console.error("Error fetching kids products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleWishlistToggle = useCallback((productId: string, isWishlisted: boolean) => {
    setWishlistedIds(prev => {
      const next = new Set(prev);
      if (isWishlisted) next.add(productId);
      else              next.delete(productId);
      return next;
    });
  }, []);

  useEffect(() => {
    setProducts([]);
    setPage(1);
    fetchProducts(1, false);
  }, [appliedFilters, sortValue]);

  const handleLoadMore = () => {
    if (!loading && hasMore) fetchProducts(page + 1, true);
  };

  const handleApply = () => {
    setApplied({ ...filters });
    setPage(1);
    setMobile(false);
  };

  /* ── Render ───────────────────────────────────────────────────────── */
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
        .bg-rose     { background-color: var(--rose); }
        .border-rose { border-color: var(--rose); }
        .hover\\:bg-rose-dark:hover  { background-color: var(--rose-dark); }
        .hover\\:border-rose:hover   { border-color: var(--rose); }
        .focus\\:border-rose:focus   { border-color: var(--rose); }
        .focus\\:ring-rose:focus     { --tw-ring-color: rgba(139,34,82,0.2); }
        .spinner-rose { border-bottom-color: var(--rose) !important; }
      `}</style>

      <div className="min-h-screen" style={{ backgroundColor: "#FBF7F9" }}>
        <div className="max-w-[1400px] mx-auto px-4 py-10">
          <KidsCollectionHeader sortValue={sortValue} onSortChange={setSortValue} />

          {/* Mobile filter button */}
          <div className="flex lg:hidden mb-6">
            <button
              onClick={() => setMobile(true)}
              className="flex items-center gap-2 border border-rose/20 px-4 py-2 rounded-xl text-rose hover:bg-rose/5 hover:border-rose transition-all duration-200"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-sm font-medium">Filter</span>
            </button>
          </div>

          <div className="flex gap-10">
            {/* Desktop sidebar */}
            <div className="w-[260px] hidden lg:block">
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                onApply={handleApply}
                mobileOpen={mobileFilterOpen}
                onMobileClose={() => setMobile(false)}
              />
            </div>

            {/* Mobile drawer */}
            {mobileFilterOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                  onClick={() => setMobile(false)}
                />
                <div className="absolute right-0 top-0 h-full w-[300px] bg-white shadow-2xl">
                  <FilterSidebar
                    filters={filters}
                    onChange={setFilters}
                    onApply={handleApply}
                    mobileOpen={mobileFilterOpen}
                    onMobileClose={() => setMobile(false)}
                  />
                </div>
              </div>
            )}

            {/* Product grid */}
            <div className="flex-1">
              {loading && page === 1 && products.length === 0 ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose" />
                </div>
              ) : (
                <ProductGrid
                  products={products}
                  totalCount={totalCount}
                  visibleCount={products.length}
                  onLoadMore={handleLoadMore}
                  loading={loading}
                  hasMore={hasMore}
                  wishlistedIds={wishlistedIds}
                  onWishlistToggle={handleWishlistToggle}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
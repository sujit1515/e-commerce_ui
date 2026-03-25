"use client";

import { useState, useEffect, useCallback } from "react";
import { SlidersHorizontal } from "lucide-react";

import CollectionHeader from "./CollectionHeader";
import FilterSidebar, { Filters } from "./FilterSidebar";
import ProductGrid from "./Productgrid";
import { getAllProducts, Product as APIProduct, ProductFilters } from "@/api/product";
import { getWishlist } from "@/api/wishlist";

const PAGE_SIZE = 9;

// Helper function to transform API product to display format
const transformProduct = (apiProduct: APIProduct): any => {
  return {
    _id: apiProduct._id,
    name: apiProduct.name,
    price: apiProduct.price,
    img: apiProduct.images?.[0] || "https://via.placeholder.com/600x800?text=No+Image",
    images: apiProduct.images,
    colors: apiProduct.colors || [],
    sizes: apiProduct.sizes || [],
    category: apiProduct.category,
    description: apiProduct.description,
    stock: apiProduct.stock,
    rating: 4.5,
    reviews: 0,
    badge: apiProduct.stock && apiProduct.stock < 10 ? "Limited" : undefined
  };
};

export default function MensCollectionPage() {
  // Filters state
  const [filters, setFilters] = useState<Filters>({
    colors: [],
    sizes: [],
    priceMax: 1500
  });

  const [appliedFilters, setApplied] = useState<Filters>({
    colors: [],
    sizes: [],
    priceMax: 1500
  });

  const [mobileFilterOpen, setMobile] = useState(false);
  const [sortValue, setSortValue] = useState("newest");

  // Product state
  const [products, setProducts] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  // Wishlist state
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set());
  const [isWishlistLoading, setIsWishlistLoading] = useState(true);

  // ✅ Function to fetch wishlist - can be called on demand
  const fetchWishlist = useCallback(async () => {
    try {
      setIsWishlistLoading(true);
      const data = await getWishlist();
      if (data?.success && Array.isArray(data.wishlist)) {
        const ids = new Set<string>(
          data.wishlist.map((item: any) => {
            // Handle different API response structures
            if (item?.product?._id) return item.product._id;
            if (item?.productId) return item.productId;
            if (item?._id) return item._id;
            return null;
          }).filter(Boolean) // Remove null values
        );
        setWishlistedIds(ids);
      }
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    } finally {
      setIsWishlistLoading(false);
    }
  }, []);

  // ✅ Fetch wishlist on mount AND when page becomes visible (for tab switches)
  useEffect(() => {
    fetchWishlist();
    
    // Optional: Refetch wishlist when page becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchWishlist();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchWishlist]);

  // Fetch products from API
  const fetchProducts = async (pageNumber = 1, append = false) => {
    try {
      setLoading(true);

      const apiFilters: ProductFilters = {
        category: "men",
        page: pageNumber,
        limit: PAGE_SIZE,
        ...(appliedFilters.colors.length > 0 && { colors: appliedFilters.colors }),
        ...(appliedFilters.sizes.length > 0 && { sizes: appliedFilters.sizes }),
        ...(appliedFilters.priceMax < 1500 && { maxPrice: appliedFilters.priceMax })
      };

      // Add sorting
      if (sortValue === "price-low") {
        apiFilters.sortBy = "price";
        apiFilters.sortOrder = "asc";
      } else if (sortValue === "price-high") {
        apiFilters.sortBy = "price";
        apiFilters.sortOrder = "desc";
      }

      const response = await getAllProducts(apiFilters);

      if (response && response.success) {
        const transformedProducts = response.products.map(transformProduct);
        
        if (append) {
          setProducts(prev => [...prev, ...transformedProducts]);
        } else {
          setProducts(transformedProducts);
        }
        
        setTotalCount(response.totalProducts);
        setHasMore(response.currentPage < response.totalPages);
        setPage(response.currentPage);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle wishlist toggle from ProductCard
  const handleWishlistToggle = useCallback(async (productId: string, isWishlisted: boolean) => {
    // Update local state optimistically
    setWishlistedIds(prev => {
      const newSet = new Set(prev);
      if (isWishlisted) {
        newSet.add(productId);
      } else {
        newSet.delete(productId);
      }
      return newSet;
    });
    
    // Optional: Refetch wishlist to ensure consistency with server
    // This is good practice but adds an extra API call
    // Uncomment if you want to ensure perfect sync
    // setTimeout(() => fetchWishlist(), 500);
  }, []);

  // Load products on initial load or when filters/sorting change
  useEffect(() => {
    setProducts([]);
    setPage(1);
    fetchProducts(1, false);
  }, [appliedFilters, sortValue]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchProducts(page + 1, true);
    }
  };

  const handleApply = () => {
    setApplied({ ...filters });
    setPage(1);
    setMobile(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-4 py-10">
        <CollectionHeader
          sortValue={sortValue}
          onSortChange={setSortValue}
        />

        <div className="flex lg:hidden mb-6">
          <button
            onClick={() => setMobile(true)}
            className="flex items-center gap-2 border px-4 py-2 rounded"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="flex gap-10">
          <div className="w-[260px] hidden lg:block">
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              onApply={handleApply}
              mobileOpen={mobileFilterOpen}
              onMobileClose={() => setMobile(false)}
            />
          </div>

          {mobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setMobile(false)} />
              <div className="absolute right-0 top-0 h-full w-[300px] bg-white">
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

          <div className="flex-1">
            {/* Show loading state for wishlist if needed */}
            {loading && page === 1 && products.length === 0 ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
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
  );
}
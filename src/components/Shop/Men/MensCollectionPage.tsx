"use client";

import { useState, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";

import CollectionHeader from "./CollectionHeader";
import FilterSidebar, { Filters } from "./FilterSidebar";
import ProductGrid from "./Productgrid";

const PAGE_SIZE = 6;

// Mock product data
const MOCK_PRODUCTS = [
  {
    _id: "69a84cb26a461596385f3bf6",
    name: "Premium Wool Overcoat",
    price: 895,
    images: ["https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&q=85"],
    colors: ["Charcoal", "Navy", "Black"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    _id: "69a84f2c13b437ae818ee767",
    name: "Cashmere Turtleneck",
    price: 295,
    images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=85"],
    colors: ["Cream", "Black", "Navy"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    _id: "2",
    name: "Raw Edge Denim",
    price: 185,
    images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=85"],
    colors: ["Blue", "Black", "Gray"],
    sizes: ["28", "30", "32", "34", "36"]
  },
  {
    _id: "9",
    name: "Chelsea Leather Boots",
    price: 450,
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=85"],
    colors: ["Brown", "Black", "Tan"],
    sizes: ["7", "8", "9", "10", "11", "12"]
  },
  {
    _id: "10",
    name: "Heritage Gold Watch",
    price: 1250,
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=85"],
    colors: ["Gold", "Silver", "Rose Gold"],
    sizes: ["One Size"]
  },
  {
    _id: "3",
    name: "Merino Wool Sweater",
    price: 245,
    images: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=85"],
    colors: ["Gray", "Navy", "Burgundy"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    _id: "4",
    name: "Slim Fit Chinos",
    price: 135,
    images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=85"],
    colors: ["Khaki", "Navy", "Olive", "Black"],
    sizes: ["30", "32", "34", "36", "38"]
  },
  {
    _id: "5",
    name: "Leather Bomber Jacket",
    price: 695,
    images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=85"],
    colors: ["Brown", "Black"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    _id: "6",
    name: "Oxford Button-Down Shirt",
    price: 125,
    images: ["https://images.unsplash.com/photo-1598033121419-5e6a91f9a8b0?w=500&q=85"],
    colors: ["White", "Blue", "Pink"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    _id: "7",
    name: "Cuffed Beanie",
    price: 45,
    images: ["https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500&q=85"],
    colors: ["Black", "Gray", "Navy", "Burgundy"],
    sizes: ["One Size"]
  }
];

// Sorting function
const sortProducts = (products: any[], sortValue: string) => {
  const sorted = [...products];
  
  switch (sortValue) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case "newest":
    default:
      return sorted; // Assume original order is newest
  }
};

// Filter function
const filterProducts = (products: any[], filters: Filters) => {
  return products.filter(product => {
    // Color filter
    if (filters.colors.length > 0) {
      const hasColor = product.colors?.some((color: string) => 
        filters.colors.includes(color.toLowerCase())
      );
      if (!hasColor) return false;
    }

    // Size filter
    if (filters.sizes.length > 0) {
      const hasSize = product.sizes?.some((size: string) => 
        filters.sizes.includes(size)
      );
      if (!hasSize) return false;
    }

    // Price filter
    if (product.price > filters.priceMax) return false;

    return true;
  });
};

export default function MensCollectionPage() {

  // Filters
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

  // Sorting
  const [sortValue, setSortValue] = useState("newest");

  // Product state
  const [products, setProducts] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch products (now using mock data)
  const fetchProducts = async (pageNumber = 1) => {
    setLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Filter and sort the mock data
    let filteredProducts = filterProducts(MOCK_PRODUCTS, appliedFilters);
    filteredProducts = sortProducts(filteredProducts, sortValue);

    // Paginate
    const start = (pageNumber - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const paginatedProducts = filteredProducts.slice(start, end);

    // Format products
    const formattedProducts = paginatedProducts.map((p: any) => ({
      id: p._id,
      name: p.name,
      price: p.price,
      img: p.images?.[0] || "",
      badge: p.price > 800 ? "Premium" : "",
      rating: 4.5,
      reviews: 24,
      colors: p.colors || [],
      sizes: p.sizes || []
    }));

    if (pageNumber === 1) {
      setProducts(formattedProducts);
    } else {
      setProducts(prev => [...prev, ...formattedProducts]);
    }

    setTotalCount(filteredProducts.length);
    setLoading(false);
  };

  // Load on start or filter change
  useEffect(() => {
    fetchProducts(1);
  }, [appliedFilters, sortValue]);

  // Apply filters
  const handleApply = () => {
    setApplied({ ...filters });
    setPage(1);
    setMobile(false);
  };

  // Load more
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage);
  };

  return (
    <>
      <div className="min-h-screen bg-white">

        <div className="max-w-[1400px] mx-auto px-4 py-10">

          {/* Header */}
          <CollectionHeader
            sortValue={sortValue}
            onSortChange={setSortValue}
          />

          {/* Mobile Filter */}
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

            {/* Sidebar */}
            <div className="w-[260px] hidden lg:block">
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                onApply={handleApply}
                mobileOpen={mobileFilterOpen}
                onMobileClose={() => setMobile(false)}
              />
            </div>

            {/* Mobile Sidebar - conditionally rendered */}
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

            {/* Products */}
            <div className="flex-1">

              {loading && page === 1 && (
                <div className="flex justify-center items-center py-20">
                  <p className="text-gray-500">Loading products...</p>
                </div>
              )}

              {!loading && products.length === 0 && (
                <div className="flex justify-center items-center py-20">
                  <p className="text-gray-500">No products found matching your filters</p>
                </div>
              )}

              <ProductGrid
                products={products}
                totalCount={totalCount}
                visibleCount={products.length}
                onLoadMore={handleLoadMore}
                loading={loading && page > 1}
              />

            </div>

          </div>

        </div>

      </div>
    </>
  );
}
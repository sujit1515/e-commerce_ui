// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Heart, ShoppingCart, Zap, Star } from "lucide-react";
// import { toggleWishlist } from "@/api/wishlist";          
// import { addToCart as addCartAPI } from "@/api/cart";

// export interface Product {
//   id:      string;
//   name:    string;
//   price:   number;
//   img:     string;
//   badge?:  string;
//   rating:  number;
//   reviews: number;
//   colors:  string[];
//   sizes:   string[];
// }

// export const ALL_PRODUCTS: Product[] = [
//   {
//     id: "69a84cb26a461596385f3bf6", name: "Signature Wool Overcoat", price: 895,
//     img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=85",
//     badge: "Bestseller", rating: 4.9, reviews: 128,
//     colors: ["Black","Navy"], sizes: ["XS","S","M","L","XL"],
//   },
//   {
//     id: "69a84f2c13b437ae818ee767", name: "Italian Cashmere Rollneck", price: 450,
//     img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=85",
//     badge: "New", rating: 4.8, reviews: 74,
//     colors: ["Camel","Grey","White"], sizes: ["S","M","L","XL","XXL"],
//   },
//   {
//     id: "69b6f71bf957c763d23a2643", name: "Italian Cashmere Rollneck", price: 450,
//     img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=85",
//     badge: "New", rating: 4.8, reviews: 74,
//     colors: ["Camel","Grey","White"], sizes: ["S","M","L","XL","XXL"],
//   },
// ];

// const BADGE_STYLE: Record<string, string> = {
//   Bestseller: "bg-red-600 text-white",
//   New:        "bg-[#0f172a] text-white",
//   Limited:    "bg-red-700 text-white",
// };

// function ProductCard({ product }: { product: Product }) {
//   const router = useRouter();
//   const [wishlisted, setWishlisted] = useState(false);
//   const [isTogglingWishlist, setIsTogglingWishlist] = useState(false); 
//   const [cartFlash, setCartFlash] = useState(false);
//   const [isAddingToCart, setIsAddingToCart] = useState(false);

//   // ── Add to Cart ────────────────────────────────────────────────────────────
//   const handleAddToCart = async (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (isAddingToCart) return;

//     setIsAddingToCart(true);
//     try {
//       const cartItem = await addCartAPI({
//         productId: product.id,
//         quantity: 1
//       });

//       if (cartItem?.success) {
//         setCartFlash(true);
//         setTimeout(() => setCartFlash(false), 1800);
//       } else {
//         alert(cartItem?.message || "Failed to add to cart");
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       alert("Failed to add to cart. Please try again.");
//     } finally {
//       setIsAddingToCart(false);
//     }
//   };

//   // ── Buy Now ────────────────────────────────────────────────────────────────
//   const handleBuyNow = async (e: React.MouseEvent) => {
//     e.stopPropagation();
//     try {
//       const cartItem = await addCartAPI({
//         productId: product.id,
//         quantity: 1
//       });

//       if (cartItem?.success) {
//         router.push("/checkout");
//       } else {
//         alert(cartItem?.message || "Failed to process order");
//       }
//     } catch (error) {
//       console.error("Error in buy now:", error);
//       alert("Failed to process order. Please try again.");
//     }
//   };

//   // ── Wishlist Toggle ────────────────────────────────────────────────────────
//   const handleWishlistClick = async (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (isTogglingWishlist) return;            // ✅ prevent double-click

//     const previousState = wishlisted;
//     setWishlisted(!wishlisted);               // ✅ optimistic update
//     setIsTogglingWishlist(true);

//     try {
//       const data = await toggleWishlist(product.id);  // ✅ correct API
//       if (data?.success) {
//         setWishlisted(data.action === "added"); // ✅ sync with server
//       } else {
//         setWishlisted(previousState);           // ✅ revert on failure
//         alert(data?.message || "Failed to update wishlist");
//       }
//     } catch (error) {
//       setWishlisted(previousState);             // ✅ revert on error
//       console.error("Wishlist toggle error:", error);
//       alert("Failed to update wishlist. Please try again.");
//     } finally {
//       setIsTogglingWishlist(false);
//     }
//   };

//   const handleProductClick = () => router.push(`/productdetail/${product.id}`);

//   return (
//     <div className="group flex flex-col cursor-pointer" onClick={handleProductClick}>
//       <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-gray-50 mb-3 sm:mb-4" style={{ aspectRatio: "3/4" }}>
//         <img
//           src={product.img}
//           alt={product.name}
//           className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-700 ease-out"
//         />
//         {product.badge && (
//           <span className={`absolute top-2 left-2 sm:top-3 sm:left-3 text-[8px] sm:text-[9px] font-black tracking-[0.15em] uppercase px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full ${BADGE_STYLE[product.badge] ?? "bg-[#0f172a] text-white"}`}>
//             {product.badge}
//           </span>
//         )}

//         {/* ── Wishlist Button ── */}
//         <button
//           onClick={handleWishlistClick}
//           disabled={isTogglingWishlist}                    // ✅ disable while loading
//           aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
//           className={`absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 ${isTogglingWishlist ? "opacity-60 cursor-not-allowed" : ""}`}
//         >
//           <Heart
//             className={`w-3 h-3 sm:w-4 sm:h-4 transition-colors duration-200 ${
//               wishlisted
//                 ? "fill-red-500 text-red-500"   // ❤️ red filled when wishlisted
//                 : "fill-none text-[#0f172a]"    // 🤍 hollow when not wishlisted
//             }`}
//           />
//         </button>

//         <div className="absolute bottom-0 inset-x-0 p-2 sm:p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out hidden sm:block">
//           <button
//             onClick={handleAddToCart}
//             disabled={isAddingToCart}
//             className="w-full bg-[#0f172a]/90 backdrop-blur-sm text-white text-[11px] font-bold tracking-widest uppercase py-2 sm:py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <ShoppingCart className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
//             {isAddingToCart ? "Adding..." : cartFlash ? "Added ✓" : "Quick Add"}
//           </button>
//         </div>
//       </div>

//       <div className="flex-1 flex flex-col">
//         <div className="flex items-center gap-1 sm:gap-1.5 mb-1 sm:mb-1.5">
//           <div className="flex gap-0.5">
//             {Array.from({ length: 5 }).map((_, i) => (
//               <Star
//                 key={i}
//                 className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${i < Math.floor(product.rating) ? "fill-red-500 text-red-500" : "fill-gray-200 text-gray-200"}`}
//               />
//             ))}
//           </div>
//           <span className="text-[9px] sm:text-[10px] text-gray-400 font-medium">({product.reviews})</span>
//         </div>

//         <h3 className="font-bold text-[#0f172a] text-xs sm:text-sm md:text-base leading-snug mb-1 line-clamp-2">
//           {product.name}
//         </h3>
//         <p className="text-[#0f172a] font-black text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
//           ${product.price.toLocaleString()}.00
//         </p>

//         <div className="flex flex-col xs:flex-row gap-2 mt-auto" onClick={(e) => e.stopPropagation()}>
//           <button
//             onClick={handleAddToCart}
//             disabled={isAddingToCart}
//             className="w-full xs:flex-1 border border-gray-200 text-[#0f172a] text-[10px] sm:text-[11px] font-bold tracking-wider uppercase py-2 sm:py-2.5 rounded-lg sm:rounded-xl hover:border-red-600 hover:bg-red-50 hover:text-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 sm:gap-1.5"
//           >
//             <ShoppingCart className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
//             <span className="hidden xs:inline">{isAddingToCart ? "Adding..." : "Add to Cart"}</span>
//             <span className="xs:hidden">{isAddingToCart ? "..." : "Cart"}</span>
//           </button>
//           <button
//             onClick={handleBuyNow}
//             disabled={isAddingToCart}
//             className="w-full xs:flex-1 bg-[#0f172a] text-white text-[10px] sm:text-[11px] font-bold tracking-wider uppercase py-2 sm:py-2.5 rounded-lg sm:rounded-xl shadow-sm hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 sm:gap-1.5"
//           >
//             <Zap className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
//             <span className="hidden xs:inline">Buy Now</span>
//             <span className="xs:hidden">Buy</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── Main Grid ──────────────────────────────────────────────────────────────
// interface GridProps {
//   products: Product[];
//   totalCount: number;
//   visibleCount: number;
//   onLoadMore: () => void;
// }

// export default function ProductGrid({ products, totalCount, visibleCount, onLoadMore }: GridProps) {
//   const progress = Math.min((visibleCount / totalCount) * 100, 100);

//   return (
//     <div>
//       <p className="text-xs text-gray-400 font-medium mb-4 sm:mb-6">
//         Showing <span className="font-bold text-[#0f172a]">{products.length}</span> of <span className="font-bold text-[#0f172a]">{totalCount}</span> products
//       </p>

//       {products.length === 0 ? (
//         <div className="flex flex-col items-center justify-center py-24 text-center">
//           <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
//             <ShoppingCart className="w-7 h-7 text-red-300" />
//           </div>
//           <p className="font-bold text-[#0f172a] text-lg mb-1">No products found</p>
//           <p className="text-gray-400 text-sm">Try adjusting your filters</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-3 sm:grid-cols-2 xl:grid-cols-3 gap-2 xs:gap-3 sm:gap-5">
//           {products.map(p => <ProductCard key={p.id} product={p} />)}
//         </div>
//       )}

//       {visibleCount < totalCount && (
//         <div className="mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-gray-100 flex flex-col items-center gap-5">
//           <div className="w-full max-w-xs text-center">
//             <p className="text-xs text-gray-400 mb-2.5">
//               Showing {visibleCount} of {totalCount} products
//             </p>
//             <div className="h-[3px] w-full bg-gray-100 rounded-full overflow-hidden">
//               <div className="h-full bg-red-600 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
//             </div>
//           </div>
//           <button
//             onClick={onLoadMore}
//             className="border border-gray-300 text-[#0f172a] text-[11px] font-black tracking-[0.2em] uppercase px-8 sm:px-10 py-3 sm:py-3.5 rounded-xl hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 shadow-sm hover:shadow-md"
//           >
//             Load More
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart, ShoppingCart, Zap, Star } from "lucide-react";
import { toggleWishlist } from "@/api/wishlist";          
import { addToCart as addCartAPI } from "@/api/cart";
import { getAllProducts, Product as APIProduct, ProductFilters } from "@/api/product";

// Component props
interface GridProps {
  category?: "men" | "women" | "kids";
  initialFilters?: ProductFilters;
}

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

export default function ProductGrid({ category, initialFilters = {} }: GridProps) {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const ITEMS_PER_PAGE = 9;

  const fetchProducts = async (page: number, append = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const filters: ProductFilters = {
        ...initialFilters,
        page,
        limit: ITEMS_PER_PAGE,
        ...(category && { category })
      };
      
      const response = await getAllProducts(filters);
      
      if (response && response.success) {
        const transformedProducts = response.products.map(transformProduct);
        
        if (append) {
          setProducts(prev => [...prev, ...transformedProducts]);
        } else {
          setProducts(transformedProducts);
        }
        
        setTotalCount(response.totalProducts);
        setVisibleCount(append ? visibleCount + transformedProducts.length : transformedProducts.length);
        setHasMore(response.currentPage < response.totalPages);
        setCurrentPage(response.currentPage);
      } else {
        setError("Failed to load products");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("An error occurred while loading products");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchProducts(currentPage + 1, true);
    }
  };

  useEffect(() => {
    setProducts([]);
    setCurrentPage(1);
    setVisibleCount(0);
    fetchProducts(1, false);
  }, [category, JSON.stringify(initialFilters)]);

  const progress = totalCount > 0 ? Math.min((visibleCount / totalCount) * 100, 100) : 0;

  if (loading && products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
          <ShoppingCart className="w-7 h-7 text-red-300" />
        </div>
        <p className="font-bold text-[#0f172a] text-lg mb-1">Error loading products</p>
        <p className="text-gray-400 text-sm mb-4">{error}</p>
        <button
          onClick={() => fetchProducts(1, false)}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs text-gray-400 font-medium mb-4 sm:mb-6">
        Showing <span className="font-bold text-[#0f172a]">{visibleCount}</span> of <span className="font-bold text-[#0f172a]">{totalCount}</span> products
      </p>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
            <ShoppingCart className="w-7 h-7 text-red-300" />
          </div>
          <p className="font-bold text-[#0f172a] text-lg mb-1">No products found</p>
          <p className="text-gray-400 text-sm">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {hasMore && products.length > 0 && (
        <div className="mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-gray-100 flex flex-col items-center gap-5">
          <div className="w-full max-w-xs text-center">
            <p className="text-xs text-gray-400 mb-2.5">
              Showing {visibleCount} of {totalCount} products
            </p>
            <div className="h-[3px] w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-red-600 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="border border-gray-300 text-[#0f172a] text-[11px] font-black tracking-[0.2em] uppercase px-8 sm:px-10 py-3 sm:py-3.5 rounded-xl hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  const router = useRouter();
  const [wishlisted, setWishlisted] = useState(false);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false); 
  const [cartFlash, setCartFlash] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAddingToCart) return;

    setIsAddingToCart(true);
    try {
      const cartItem = await addCartAPI({
        productId: product._id,
        quantity: 1
      });

      if (cartItem?.success) {
        setCartFlash(true);
        setTimeout(() => setCartFlash(false), 1800);
      } else {
        alert(cartItem?.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const cartItem = await addCartAPI({
        productId: product._id,
        quantity: 1
      });

      if (cartItem?.success) {
        router.push("/checkout");
      } else {
        alert(cartItem?.message || "Failed to process order");
      }
    } catch (error) {
      console.error("Error in buy now:", error);
      alert("Failed to process order. Please try again.");
    }
  };

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTogglingWishlist) return;

    const previousState = wishlisted;
    setWishlisted(!wishlisted);
    setIsTogglingWishlist(true);

    try {
      const data = await toggleWishlist(product._id);
      if (data?.success) {
        setWishlisted(data.action === "added");
      } else {
        setWishlisted(previousState);
        alert(data?.message || "Failed to update wishlist");
      }
    } catch (error) {
      setWishlisted(previousState);
      console.error("Wishlist toggle error:", error);
      alert("Failed to update wishlist. Please try again.");
    } finally {
      setIsTogglingWishlist(false);
    }
  };

  const handleProductClick = () => router.push(`/productdetail/${product._id}`);

  return (
    <div className="group flex flex-col cursor-pointer" onClick={handleProductClick}>
      <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-gray-50 mb-3 sm:mb-4" style={{ aspectRatio: "3/4" }}>
        <img
          src={product.img || (product.images && product.images[0]) || "https://via.placeholder.com/600x800?text=No+Image"}
          alt={product.name}
          className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-700 ease-out"
        />
        {product.badge && (
          <span className={`absolute top-2 left-2 sm:top-3 sm:left-3 text-[8px] sm:text-[9px] font-black tracking-[0.15em] uppercase px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-red-600 text-white`}>
            {product.badge}
          </span>
        )}

        <button
          onClick={handleWishlistClick}
          disabled={isTogglingWishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 ${isTogglingWishlist ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          <Heart
            className={`w-3 h-3 sm:w-4 sm:h-4 transition-colors duration-200 ${
              wishlisted
                ? "fill-red-500 text-red-500"
                : "fill-none text-[#0f172a]"
            }`}
          />
        </button>

        <div className="absolute bottom-0 inset-x-0 p-2 sm:p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out hidden sm:block">
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="w-full bg-[#0f172a]/90 backdrop-blur-sm text-white text-[11px] font-bold tracking-widest uppercase py-2 sm:py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            {isAddingToCart ? "Adding..." : cartFlash ? "Added ✓" : "Quick Add"}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-1 sm:gap-1.5 mb-1 sm:mb-1.5">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${i < Math.floor(product.rating || 0) ? "fill-red-500 text-red-500" : "fill-gray-200 text-gray-200"}`}
              />
            ))}
          </div>
          <span className="text-[9px] sm:text-[10px] text-gray-400 font-medium">({product.reviews || 0})</span>
        </div>

        <h3 className="font-bold text-[#0f172a] text-xs sm:text-sm md:text-base leading-snug mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-[#0f172a] font-black text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
          ${product.price.toLocaleString()}.00
        </p>

        <div className="flex flex-col xs:flex-row gap-2 mt-auto" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="w-full xs:flex-1 border border-gray-200 text-[#0f172a] text-[10px] sm:text-[11px] font-bold tracking-wider uppercase py-2 sm:py-2.5 rounded-lg sm:rounded-xl hover:border-red-600 hover:bg-red-50 hover:text-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 sm:gap-1.5"
          >
            <ShoppingCart className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            <span className="hidden xs:inline">{isAddingToCart ? "Adding..." : "Add to Cart"}</span>
            <span className="xs:hidden">{isAddingToCart ? "..." : "Cart"}</span>
          </button>
          <button
            onClick={handleBuyNow}
            disabled={isAddingToCart}
            className="w-full xs:flex-1 bg-[#0f172a] text-white text-[10px] sm:text-[11px] font-bold tracking-wider uppercase py-2 sm:py-2.5 rounded-lg sm:rounded-xl shadow-sm hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 sm:gap-1.5"
          >
            <Zap className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            <span className="hidden xs:inline">Buy Now</span>
            <span className="xs:hidden">Buy</span>
          </button>
        </div>
      </div>
    </div>
  );
}
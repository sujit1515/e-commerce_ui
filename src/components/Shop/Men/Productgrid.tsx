"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart, ShoppingCart, Zap, Star } from "lucide-react";
import { toggleWishlist } from "@/api/wishlist";
import { addToCart as addCartAPI } from "@/api/cart";

interface GridProps {
  products: any[];
  totalCount: number;
  visibleCount: number;
  onLoadMore: () => void;
  loading: boolean;
  hasMore: boolean;
  wishlistedIds?: Set<string>;
  onWishlistToggle?: (productId: string, isWishlisted: boolean) => void;
}

export default function ProductGrid({ 
  products, 
  totalCount, 
  visibleCount, 
  onLoadMore, 
  loading,
  hasMore,
  wishlistedIds = new Set(),
  onWishlistToggle
}: GridProps) {
  const progress = totalCount > 0 ? Math.min((visibleCount / totalCount) * 100, 100) : 0;

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-maroon/5 border border-maroon/10 flex items-center justify-center mb-4">
          <ShoppingCart className="w-7 h-7 text-maroon/40" />
        </div>
        <p className="font-bold text-maroon text-lg mb-1">No products found</p>
        <p className="text-maroon/50 text-sm">Try adjusting your filters</p>
      </div>
    );
  }

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
        
        .bg-maroon {
          background-color: var(--maroon);
        }
        
        .border-maroon {
          border-color: var(--maroon);
        }
        
        .hover\\:bg-maroon:hover {
          background-color: var(--maroon);
        }
        
        .hover\\:bg-maroon-dark:hover {
          background-color: var(--maroon-dark);
        }
        
        .hover\\:border-maroon:hover {
          border-color: var(--maroon);
        }
        
        .hover\\:text-maroon:hover {
          color: var(--maroon);
        }
        
        .fill-maroon {
          fill: var(--maroon);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <div>
        <p className="text-xs text-maroon/50 font-medium mb-4 sm:mb-6">
          Showing <span className="font-bold text-maroon">{visibleCount}</span> of <span className="font-bold text-maroon">{totalCount}</span> products
        </p>

        {/* 4 products per row on large screens */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {products.map(product => (
            <ProductCard
              key={product._id}
              product={product}
              initialWishlisted={wishlistedIds.has(product._id)}
              onWishlistToggle={onWishlistToggle}
            />
          ))}
        </div>

        {hasMore && products.length > 0 && (
          <div className="mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-maroon/10 flex flex-col items-center gap-5">
            <div className="w-full max-w-xs text-center">
              <p className="text-xs text-maroon/50 mb-2.5">
                Showing {visibleCount} of {totalCount} products
              </p>
              <div className="h-[3px] w-full bg-maroon/10 rounded-full overflow-hidden">
                <div className="h-full bg-maroon rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <button
              onClick={onLoadMore}
              disabled={loading}
              className="border border-maroon/30 text-maroon text-[11px] font-black tracking-[0.2em] uppercase px-8 sm:px-10 py-3 sm:py-3.5 rounded-xl hover:bg-maroon hover:text-white hover:border-maroon transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function ProductCard({ product, initialWishlisted = false, onWishlistToggle }: { 
  product: any; 
  initialWishlisted?: boolean;
  onWishlistToggle?: (productId: string, isWishlisted: boolean) => void;
}) {
  const router = useRouter();
  const [wishlisted, setWishlisted] = useState(initialWishlisted);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false); 
  const [cartFlash, setCartFlash] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    setWishlisted(initialWishlisted);
  }, [initialWishlisted]);
  
  // Add to cart function
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAddingToCart) return;

    setIsAddingToCart(true);

    try {
      const response = await addCartAPI({
        productId: product._id,
        quantity: 1
      });

      if (response?.success) {
        setCartFlash(true);
        setTimeout(() => setCartFlash(false), 1800);
      } else {
        alert(response?.message || "Failed to add to cart");
      }

    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };
  
  // Buy now function
  const handleBuyNow = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const response = await addCartAPI({
        productId: product._id,
        quantity: 1
      });

      if (response?.success) {
        router.push("/checkout");
      } else {
        alert(response?.message || "Failed to process order");
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
    // Optimistic update
    setWishlisted(!wishlisted);
    setIsTogglingWishlist(true);

    try {
      const data = await toggleWishlist(product._id);
      
      if (data?.success) {
        const newState = data.action === "added";
        setWishlisted(newState);
        
        // Notify parent component to update its wishlistedIds Set
        if (onWishlistToggle) {
          onWishlistToggle(product._id, newState);
        }
      } else {
        // Rollback on failure
        setWishlisted(previousState);
        alert(data?.message || "Failed to update wishlist");
      }
    } catch (error) {
      // Rollback on error
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
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 text-[8px] sm:text-[9px] font-black tracking-[0.15em] uppercase px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-maroon text-white">
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
                ? "fill-maroon text-maroon"
                : "fill-none text-maroon/60"
            }`}
          />
        </button>

        <div className="absolute bottom-0 inset-x-0 p-2 sm:p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out hidden sm:block">
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="w-full bg-maroon/90 backdrop-blur-sm text-white text-[11px] font-bold tracking-widest uppercase py-2 sm:py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-maroon-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${i < Math.floor(product.rating || 0) ? "fill-maroon text-maroon" : "fill-gray-200 text-gray-200"}`}
              />
            ))}
          </div>
          <span className="text-[9px] sm:text-[10px] text-maroon/40 font-medium">({product.reviews || 0})</span>
        </div>

        <h3 className="font-bold text-maroon text-xs sm:text-sm md:text-base leading-snug mb-1 line-clamp-2">
          {product.name}
        </h3>
        
        {/* Price and buttons in one row */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          <p className="text-maroon font-black text-sm sm:text-base md:text-lg">
            ${product.price.toLocaleString()}.00
          </p>
          
          {/* Buttons on the right side of the price */}
          <div className="flex items-center gap-2 sm:gap-2.5" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-maroon/20 text-maroon hover:border-maroon hover:bg-maroon/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isAddingToCart ? "Adding..." : cartFlash ? "Added ✓" : "Add to Cart"}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={isAddingToCart}
              className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-maroon text-white hover:bg-maroon-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
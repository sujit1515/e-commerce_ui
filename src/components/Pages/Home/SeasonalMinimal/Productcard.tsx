"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { WishlistButton } from "./Wishlistbutton";
import type { Product } from "@/api/seasonalProducts";

// Wishlist API function
async function toggleWishlistAPI(productId: string) {
  const token = localStorage.getItem('userToken');
  try {
    const response = await fetch('/api/wishlist/toggle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId })
    });
    const data = await response.json();
    return { success: data.success, isInWishlist: data.isInWishlist };
  } catch (error) {
    console.error('Wishlist error:', error);
    return { success: false, isInWishlist: false };
  }
}

export function ProductCard({ product }: { product: Product }) {
  const [wished, setWished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    // Add to cart logic
    console.log(`Added to cart: ${product.name}`);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);
  };

  const handleBuyNow = () => {
    console.log(`Buy now: ${product.name}`);
    // Redirect to checkout or product page
  };

  const handleWishlistToggle = async () => {
    try {
      setLoading(true);
      const res = await toggleWishlistAPI(product._id);
      if (res.success) setWished(res.isInWishlist);
    } catch (err) {
      console.error("Wishlist error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Get first image from product images array
  const productImage = product.images?.[0] || '';
  
  // Generate consistent color based on product ID for fallback
  const getBgColor = (id: string) => {
    const colors = ['#f5f0e8', '#f0ede6', '#ededec', '#eee9e0', '#e8e4df', '#eae7e2'];
    const index = parseInt(id.slice(-2), 16) % colors.length;
    return colors[index];
  };

  // Get season-appropriate emoji
  const getSeasonEmoji = () => {
    if (product.season === 'summer') return '☀️';
    if (product.season === 'winter') return '❄️';
    if (product.season === 'rainy') return '🌧️';
    return '👕';
  };

  return (
    <div
      className="group flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Image Card ── */}
      <div
        className="relative rounded-xl overflow-hidden mb-4 aspect-[3/4] border border-gray-100 transition-all duration-500"
        style={{
          backgroundColor: getBgColor(product._id),
          boxShadow: isHovered
            ? "0 20px 40px rgba(128,0,0,0.15)"
            : "0 4px 20px rgba(128,0,0,0.10)",
          transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <WishlistButton
          active={wished}
          onToggle={handleWishlistToggle}
          loading={loading}
        />

        {!imageError && productImage ? (
          <img
            src={productImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span
              className="text-[5rem] sm:text-[6rem] md:text-[7rem] select-none transition-all duration-500 group-hover:scale-110"
              style={{
                filter: isHovered
                  ? "drop-shadow(0 8px 24px rgba(128,0,0,0.15))"
                  : "drop-shadow(0 4px 12px rgba(128,0,0,0.08))",
              }}
            >
              {getSeasonEmoji()}
            </span>
          </div>
        )}

        {/* Season badge */}
        {product.season && product.season !== 'all' && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm shadow-sm">
              {product.season === 'summer' && '☀️ Summer'}
              {product.season === 'winter' && '❄️ Winter'}
              {product.season === 'rainy' && '🌧️ Rainy'}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-maroon/0 via-transparent to-transparent transition-all duration-500 group-hover:from-[rgba(128,0,0,0.05)]" />
      </div>

      {/* ── Info ── */}
      <div className="px-1">
        <h3
          className="font-semibold text-base sm:text-lg leading-tight mb-1 transition-all duration-300"
          style={{
            color: isHovered ? "#800000" : "#000000",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 600,
            letterSpacing: "0.02em",
            transform: isHovered ? "translateX(4px)" : "translateX(0)",
            transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {product.name}
        </h3>

        <p
          className="text-sm mb-2 transition-all duration-300"
          style={{
            color: "#800000",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            opacity: isHovered ? 0.85 : 0.7,
            transform: isHovered ? "translateX(4px)" : "translateX(0)",
            transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {product.category}
        </p>

        <div className="flex items-center justify-between">
          <p
            className="font-semibold text-base transition-all duration-300"
            style={{
              color: isHovered ? "#800000" : "#000000",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600,
              transform: isHovered ? "scale(1.05)" : "scale(1)",
              transformOrigin: "left",
              transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            ${product.price.toFixed(2)}
          </p>

          <div className="flex items-center gap-2">
            {/* Buy Now */}
            <button
              onClick={handleBuyNow}
              className="text-xs font-medium px-3 py-1.5 rounded-full relative overflow-hidden group/buy transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: "#800000",
                color: "#fff",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                letterSpacing: "0.05em",
                boxShadow: "0 2px 6px rgba(128,0,0,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#5C0000";
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(128,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#800000";
                e.currentTarget.style.boxShadow = "0 2px 6px rgba(128,0,0,0.2)";
              }}
            >
              <span className="relative z-10">Buy Now</span>
              <div className="absolute inset-0 bg-[#4a0000] transform scale-x-0 group-hover/buy:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
            </button>

            {/* Cart */}
            <button
              onClick={handleAddToCart}
              aria-label="Add to cart"
              className="w-8 h-8 rounded-full flex items-center justify-center relative overflow-hidden group/cart transition-all duration-300 hover:scale-110 active:scale-95"
              style={{
                backgroundColor: addedToCart ? "#10b981" : "#800000",
                color: "#fff",
                boxShadow: "0 2px 6px rgba(128,0,0,0.2)",
                transition: "background-color 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                if (!addedToCart) e.currentTarget.style.backgroundColor = "#4a0000";
              }}
              onMouseLeave={(e) => {
                if (!addedToCart) e.currentTarget.style.backgroundColor = "#800000";
              }}
            >
              <span className="relative z-10">
                <ShoppingBag className="w-4 h-4 transition-all duration-300 group-hover/cart:rotate-12 group-hover/cart:scale-110" />
              </span>
              <div className="absolute inset-0 bg-[#4a0000] transform scale-x-0 group-hover/cart:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
            </button>
          </div>
        </div>
      </div>

      {/* Toast */}
      {addedToCart && (
        <div
          className="fixed bottom-4 right-4 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in z-50"
          style={{ backgroundColor: "#800000" }}
        >
          Added to cart! ✨
        </div>
      )}
    </div>
  );
}
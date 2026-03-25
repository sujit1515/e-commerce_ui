"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { toggleWishlist } from "../../../api/wishlist";

const products = [
  {
    id: 1,
    name: "Sand Linen Dress",
    category: "Summer Essentials",
    price: 185.0,
    image: "/Images/Shop/summer-1.jpg", 
    emoji: "👗",
    bg: "#f5f0e8",
  },
  {
    id: 2,
    name: "Pleated Trousers",
    category: "Tailored Goods",
    price: 220.0,
    image: "/Images/Shop/summer-4.jpg",
    emoji: "👖",
    bg: "#f0ede6",
  },
  {
    id: 3,
    name: "Boxy Cotton Shirt",
    category: "Essentials",
    price: 125.0,
    image: "/Images/Shop/summer-2.jpg",
    emoji: "👔",
    bg: "#ededec",
  },
  {
    id: 4,
    name: "Soft Leather Mules",
    category: "Footwear",
    price: 295.0,
    image: "/Images/Shop/summer-5.jpg",
    emoji: "👡",
    bg: "#eee9e0",
  },
];

interface WishlistButtonProps {
  active: boolean;
  onToggle: () => void;
}

function WishlistButton({ active, onToggle }: WishlistButtonProps) {
  return (
    <button
      onClick={onToggle}
      aria-label="Add to wishlist"
      className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95 group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={active ? "#ef4444" : "#000000"}
        className="w-4 h-4 transition-all duration-300 group-hover:scale-110"
      >
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
      </svg>
    </button>
  );
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  emoji: string;
  bg: string;
}

function ProductCard({ product }: { product: Product }) {
  const [wished, setWished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    console.log(`Added to cart: ${product.name}`);
    setTimeout(() => setAddedToCart(false), 1800);
  };

  const handleBuyNow = () => {
    console.log(`Buy now: ${product.name}`);
    // Add your buy now logic here
  };

  const handleWishlistToggle = async () => {
  try {
    setLoading(true);

    const res = await toggleWishlist(product.id.toString());

    if (res.success) {
      setWished(res.isInWishlist); // backend should return this
    } else {
      console.log(res.message);
    }
  } catch (error) {
    console.log("Wishlist error:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="group flex flex-col">
      {/* Image card - matching Signature Style aspect ratio and styling */}
      <div
        className="relative rounded-xl overflow-hidden mb-4 aspect-[3/4] bg-white border border-gray-100 transition-all duration-300 group-hover:shadow-xl"
        style={{ 
          backgroundColor: product.bg,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <WishlistButton active={wished} onToggle={handleWishlistToggle} />

        {!imageError && product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          /* Fallback placeholder with emoji */
          <div className="w-full h-full flex items-center justify-center">
            <span
              className="text-[5rem] sm:text-[6rem] md:text-[7rem] select-none transition-transform duration-500 group-hover:scale-110"
              style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.08))" }}
            >
              {product.emoji}
            </span>
          </div>
        )}
      </div>

      {/* Product info - matching Signature Style typography */}
      <div className="px-1">
        {/* Product Name */}
        <h3
          className="font-semibold text-base sm:text-lg leading-tight mb-1 transition-colors duration-300 group-hover:text-red-600"
          style={{ 
            color: "#000000", 
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 600,
            letterSpacing: "0.02em",
          }}
        >
          {product.name}
        </h3>
        
        <p 
          className="text-sm mb-2" 
          style={{ 
            color: "#333333",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400,
          }}
        >
          {product.category}
        </p>
        
        {/* Price and Actions row */}
        <div className="flex items-center justify-between">
          <p 
            className="font-semibold text-base transition-colors duration-300 group-hover:text-red-600" 
            style={{ 
              color: "#000000",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600,
            }}
          >
            ${product.price.toFixed(2)}
          </p>
          
          {/* Buy Now and Cart Icons */}
          <div className="flex items-center gap-2">
            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-md relative overflow-hidden group/buy"
              style={{
                backgroundColor: "#000000",
                color: "#fff",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                letterSpacing: "0.05em",
              }}
            >
              <span className="relative z-10  cursor-pointer">Buy Now</span>
              <div className="absolute inset-0 bg-red-600 transform scale-x-0 group-hover/buy:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
            </button>
            
            {/* Cart Icon Button */}
            <button
              onClick={handleAddToCart}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-lg relative overflow-hidden group/cart"
              style={{
                backgroundColor: addedToCart ? "#10b981" : "#000000",
                color: "#fff",
              }}
              aria-label="Add to cart"
            >
              <span className="relative z-10">
                <ShoppingBag className="w-4 h-4 transition-transform duration-300 group-hover/cart:rotate-12" />
              </span>
              <div className="absolute inset-0 bg-red-600 transform scale-x-0 group-hover/cart:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Success message animation */}
      {addedToCart && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce z-50">
          Added to cart!
        </div>
      )}
    </div>
  );
}

export default function CuratedSelection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&display=swap');
        
        /* Apply Cormorant Garamond as the primary font */
        * {
          font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif !important;
        }
        
        /* Keep icons with their original styling */
        svg, [class*="lucide-"] {
          font-family: inherit !important;
        }
        
        /* Custom animations */
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-bounce {
          animation: bounce 0.5s ease-in-out;
        }
      `}</style>

      <section
        className="w-full py-16 px-4 sm:px-6 lg:px-8"
        style={{ 
          backgroundColor: "#ffffff",
          padding: "4rem 1rem",
        }}
      >
        <div className="max-w-6xl mx-auto">
          {/* ── Header with Signature Style styling ── */}
          <div className="text-center mb-12 sm:mb-16" style={{ marginBottom: "3rem" }}>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-4 transition-all duration-300 hover:tracking-wider"
              style={{
                color: "#000000",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600,
                letterSpacing: "0.25em",
                fontSize: "clamp(1.5rem, 4vw, 2.4rem)",
                margin: "0 0 0.5rem 0",
              }}
            >
              SUMMER MINIMAL
            </h2>
            <p
              className="text-base sm:text-lg max-w-md mx-auto italic transition-all duration-300 hover:text-red-600"
              style={{ 
                color: "#333333", 
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(0.85rem, 2vw, 1rem)",
                letterSpacing: "0.05em",
              }}
            >
              Breathable fabrics and effortless silhouettes designed for the
              warmest days of the year.
            </p>
          </div>

          {/* ── Product Grid with matching gap to Signature Style ── */}
          <div 
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
            style={{ gap: "2rem" }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* ── View All CTA ── */}
          <div className="mt-12 sm:mt-16 text-center" style={{ marginTop: "2rem" }}>
            <button
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:bg-red-600 hover:shadow-xl hover:-translate-y-1 active:translate-y-0 group relative overflow-hidden"
              style={{
                backgroundColor: "#000000",
                color: "#fff",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                letterSpacing: "0.12em",
                fontWeight: 500,
              }}
            >
              <span className="relative z-10 flex items-center gap-2 cursor-pointer">
                View All Collection
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Responsive adjustments to match Signature Style */}
      <style>{`
        @media (max-width: 900px) {
          .grid {
            gap: 1rem !important;
          }
          section {
            padding: 3rem 1rem !important;
          }
        }

        @media (max-width: 640px) {
          .grid {
            gap: 2rem !important;
            max-width: 380px;
            margin: 0 auto;
          }
          .text-center {
            margin-bottom: 2rem !important;
          }
          section {
            padding: 2.5rem 1.25rem !important;
          }
        }

        @media (max-width: 400px) {
          .grid {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
}
"use client";
import { useState } from "react";
import { Heart, ShoppingCart, Zap, Star } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
//  ProductGrid.tsx  (Screenshots 3 + 4 combined)
//  — Product card grid with wishlist, Add to Cart, Buy Now
//  — Progress bar + Load More
//  — All 9 products exported so the page can filter / sort them
// ─────────────────────────────────────────────────────────────────────────────

export interface Product {
  id:      number;
  name:    string;
  price:   number;
  img:     string;
  badge?:  string;
  rating:  number;
  reviews: number;
  colors:  string[];
  sizes:   string[];
}

// ── Seed data — swap images & details freely ─────────────────────────────────
export const ALL_PRODUCTS: Product[] = [
  {
    id: 1, name: "Signature Wool Overcoat", price: 895,
    img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=85",
    badge: "Bestseller", rating: 4.9, reviews: 128,
    colors: ["Black","Navy"], sizes: ["XS","S","M","L","XL"],
  },
  {
    id: 2, name: "Italian Cashmere Rollneck", price: 450,
    img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=85",
    badge: "New", rating: 4.8, reviews: 74,
    colors: ["Camel","Grey","White"], sizes: ["S","M","L","XL","XXL"],
  },
  {
    id: 3, name: "Bespoke Navy Blazer", price: 1250,
    img: "https://images.unsplash.com/photo-1592878940526-0214b0f374f6?w=600&q=85",
    badge: "", rating: 4.7, reviews: 56,
    colors: ["Navy","Black"], sizes: ["S","M","L","XL"],
  },
  {
    id: 4, name: "Linen Oxford Shirt", price: 195,
    img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=85",
    badge: "", rating: 4.6, reviews: 93,
    colors: ["White","Beige"], sizes: ["XS","S","M","L","XL","XXL"],
  },
  {
    id: 5, name: "Wool Pleated Trouser", price: 320,
    img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=85",
    badge: "", rating: 4.8, reviews: 47,
    colors: ["Grey","Navy","Camel"], sizes: ["S","M","L","XL"],
  },
  {
    id: 6, name: "Urban Suede Bomber", price: 1100,
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=85",
    badge: "Limited", rating: 4.9, reviews: 38,
    colors: ["Olive","Black"], sizes: ["S","M","L"],
  },
  {
    id: 7, name: "Merino Turtleneck", price: 275,
    img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=85",
    badge: "", rating: 4.7, reviews: 62,
    colors: ["Navy","Grey","Burgundy"], sizes: ["XS","S","M","L","XL"],
  },
  {
    id: 8, name: "Tailored Chino", price: 245,
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=85",
    badge: "", rating: 4.5, reviews: 81,
    colors: ["Camel","Navy","Beige"], sizes: ["S","M","L","XL","XXL"],
  },
  {
    id: 9, name: "Leather Chelsea Boot", price: 580,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=85",
    badge: "New", rating: 4.9, reviews: 29,
    colors: ["Black","Camel"], sizes: ["S","M","L","XL"],
  },
];

const BADGE_STYLE: Record<string, string> = {
  Bestseller: "bg-amber-500 text-white",
  New:        "bg-blue-600 text-white",
  Limited:    "bg-rose-600 text-white",
};

// ── Individual product card ───────────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [cartFlash,  setCartFlash]  = useState(false);

  const handleCart = () => {
    setCartFlash(true);
    setTimeout(() => setCartFlash(false), 1800);
  };

  return (
    <div className="group flex flex-col">
      {/* ── Image ── */}
      <div
        className="relative rounded-2xl overflow-hidden bg-gray-50 mb-4"
        style={{ aspectRatio: "3/4" }}
      >
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover object-top
            group-hover:scale-[1.04] transition-transform duration-700 ease-out"
        />

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-[9px] font-black tracking-[0.15em] uppercase
              px-2.5 py-1 rounded-full ${BADGE_STYLE[product.badge] ?? "bg-gray-800 text-white"}`}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm
            shadow-md flex items-center justify-center
            hover:scale-110 active:scale-95 transition-transform duration-200"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200
              ${wishlisted ? "fill-rose-500 text-rose-500" : "text-[#0f172a]"}`}
          />
        </button>

        {/* Quick-add slide up on hover */}
        <div className="absolute bottom-0 inset-x-0 p-3
          translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
        >
          <button
            onClick={handleCart}
            className="w-full bg-[#0f172a]/90 backdrop-blur-sm text-white text-[11px]
              font-bold tracking-widest uppercase py-2.5 rounded-xl
              flex items-center justify-center gap-2
              hover:bg-[#0f172a] transition-colors"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {cartFlash ? "Added ✓" : "Quick Add"}
          </button>
        </div>
      </div>

      {/* ── Info ── */}
      <div className="flex-1 flex flex-col">
        {/* Stars */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-400 font-medium">({product.reviews})</span>
        </div>

        <h3 className="font-bold text-[#0f172a] text-sm sm:text-base leading-snug mb-1">
          {product.name}
        </h3>
        <p className="text-[#0f172a] font-black text-base sm:text-lg mb-4">
          ${product.price.toLocaleString()}.00
        </p>

        {/* CTA buttons */}
        <div className="flex gap-2 mt-auto">
          <button
            className="flex-1 border border-gray-200 text-[#0f172a] text-[11px] font-bold
              tracking-wider uppercase py-2.5 rounded-xl
              hover:border-gray-800 hover:bg-gray-50 transition-all
              flex items-center justify-center gap-1.5"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add to Cart
          </button>
          <button
            onClick={handleCart}
            className="flex-1 bg-[#0f172a] text-white text-[11px] font-bold
              tracking-wider uppercase py-2.5 rounded-xl shadow-sm
              hover:bg-blue-700 transition-all
              flex items-center justify-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            {cartFlash ? "Added ✓" : "Buy Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main grid export ──────────────────────────────────────────────────────────
interface GridProps {
  products:     Product[];
  totalCount:   number;
  visibleCount: number;
  onLoadMore:   () => void;
}

export default function ProductGrid({ products, totalCount, visibleCount, onLoadMore }: GridProps) {
  const progress = Math.min((visibleCount / totalCount) * 100, 100);

  return (
    <div>
      {/* Count label */}
      <p className="text-xs text-gray-400 font-medium mb-6">
        Showing <span className="font-bold text-[#0f172a]">{products.length}</span> of{" "}
        <span className="font-bold text-[#0f172a]">{totalCount}</span> products
      </p>

      {/* Grid */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
            <ShoppingCart className="w-7 h-7 text-gray-300" />
          </div>
          <p className="font-bold text-[#0f172a] text-lg mb-1">No products found</p>
          <p className="text-gray-400 text-sm">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-10">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* Progress + Load More */}
      {visibleCount < totalCount && (
        <div className="mt-14 pt-10 border-t border-gray-100 flex flex-col items-center gap-5">
          {/* Progress */}
          <div className="w-full max-w-xs text-center">
            <p className="text-xs text-gray-400 mb-2.5">
              Showing {visibleCount} of {totalCount} products
            </p>
            <div className="h-[3px] w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Load More */}
          <button
            onClick={onLoadMore}
            className="border border-gray-300 text-[#0f172a] text-[11px] font-black
              tracking-[0.2em] uppercase px-10 py-3.5 rounded-xl
              hover:bg-[#0f172a] hover:text-white hover:border-[#0f172a]
              transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
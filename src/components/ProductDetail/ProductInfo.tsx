"use client";
import { useState } from "react";
import { Heart, Eye, ChevronDown, ChevronUp, Star, Ruler, Zap, ShoppingCart } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
//  ProductInfo.tsx
//  Right-side panel: badge · title · price · stars · color · size · CTAs
//  + collapsible accordions (Description / Material & Care / Shipping)
// ─────────────────────────────────────────────────────────────────────────────

export interface ProductData {
  badge:        string;
  viewCount:    number;
  name:         string;
  price:        number;
  rating:       number;
  reviewCount:  number;
  colors:       { name: string; hex: string }[];
  sizes:        string[];
  outOfStock?:  string[];
  description:  string;
  material:     string;
  shipping:     string;
}

interface Props {
  product: ProductData;
}

// ── Accordion ─────────────────────────────────────────────────────────────────
function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className="text-[11px] font-black tracking-[0.2em] uppercase text-[#0f172a] group-hover:text-blue-700 transition-colors">
          {title}
        </span>
        {open
          ? <ChevronUp   className="w-4 h-4 text-gray-400 flex-shrink-0" />
          : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="pb-4 text-gray-500 text-sm leading-relaxed animate-in">
          {children}
        </div>
      )}
    </div>
  );
}

export default function ProductInfo({ product }: Props) {
  const [selectedColor, setColor] = useState(product.colors[0].name);
  const [selectedSize,  setSize]  = useState("");
  const [wishlisted,    setWish]  = useState(false);
  const [cartFlash,     setCart]  = useState(false);
  const [sizeError,     setSizeError] = useState(false);

  const handleBuy = () => {
    if (!selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    // add your buy logic here
  };

  const handleCart = () => {
    if (!selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    setCart(true);
    setTimeout(() => setCart(false), 1800);
  };

  return (
    <div className="flex flex-col gap-0">

      {/* ── Top badges row ── */}
      <div className="flex items-center gap-3 flex-wrap mb-5">
        <span className="bg-rose-600 text-white text-[9px] font-black tracking-[0.18em] uppercase px-3 py-1.5 rounded-full">
          {product.badge}
        </span>
        <div className="flex items-center gap-1.5 text-gray-400">
          <Eye className="w-3.5 h-3.5" />
          <span className="text-[11px] font-medium">
            Recently viewed by {product.viewCount}+ people
          </span>
        </div>
      </div>

      {/* ── Title ── */}
      <h1 className="font-display font-bold text-[#0f172a] text-3xl sm:text-4xl leading-tight mb-5">
        {product.name}
      </h1>

      {/* ── Price + Stars ── */}
      <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-100">
        <span className="font-black text-[#0f172a] text-3xl">
          ${product.price.toFixed(2)}
        </span>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-rose-500 text-rose-500"
                    : i < product.rating
                    ? "fill-rose-300 text-rose-300"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
          <a href="#reviews" className="text-sm font-bold text-rose-500 hover:underline">
            {product.reviewCount} Reviews
          </a>
        </div>
      </div>

      {/* ── Color selector ── */}
      <div className="mb-6">
        <p className="text-[11px] font-black tracking-[0.2em] uppercase text-[#0f172a] mb-3">
          Color: <span className="text-blue-600 font-black">{selectedColor.toUpperCase()}</span>
        </p>
        <div className="flex gap-2.5 flex-wrap">
          {product.colors.map(c => (
            <button
              key={c.name}
              onClick={() => setColor(c.name)}
              title={c.name}
              className={`w-9 h-9 rounded-full border-2 transition-all duration-200
                ${selectedColor === c.name
                  ? "border-[#0f172a] scale-110 shadow-md"
                  : "border-gray-200 hover:border-gray-500 hover:scale-105"}
                ${c.name === "White" || c.hex === "#f5f5f5" ? "shadow-sm" : ""}`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>

      {/* ── Size selector ── */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-black tracking-[0.2em] uppercase text-[#0f172a]">
            Select Size
          </p>
          <button className="flex items-center gap-1 text-[11px] font-bold text-rose-500 hover:text-rose-700 transition-colors">
            <Ruler className="w-3 h-3" /> Size Guide
          </button>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {product.sizes.map(s => {
            const oos = product.outOfStock?.includes(s);
            const active = selectedSize === s;
            return (
              <button
                key={s}
                onClick={() => { if (!oos) { setSize(s); setSizeError(false); } }}
                disabled={oos}
                className={`py-2.5 text-xs font-bold rounded-xl border transition-all duration-200
                  ${oos
                    ? "border-gray-100 text-gray-300 line-through cursor-not-allowed bg-gray-50"
                    : active
                    ? "border-rose-500 bg-rose-50 text-rose-600 shadow-sm"
                    : "border-gray-200 text-gray-600 hover:border-gray-800 hover:text-[#0f172a]"}`}
              >
                {s}
              </button>
            );
          })}
        </div>
        {sizeError && (
          <p className="mt-2 text-xs font-semibold text-rose-500">
            Please select a size before continuing
          </p>
        )}
      </div>

      {/* ── CTAs ── */}
      <div className="flex flex-col gap-3 mb-6">
        {/* Buy it now */}
        <button
          onClick={handleBuy}
          className="w-full bg-[#0f172a] hover:bg-blue-700 text-white font-black text-sm
            tracking-[0.18em] uppercase py-4 rounded-2xl transition-all shadow-md
            hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" /> Buy It Now
        </button>

        {/* Add to cart + wishlist */}
        <div className="flex gap-3">
          <button
            onClick={handleCart}
            className="flex-1 border-2 border-[#0f172a] text-[#0f172a] font-black text-sm
              tracking-[0.18em] uppercase py-3.5 rounded-2xl transition-all
              hover:bg-gray-50 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartFlash ? "Added ✓" : "Add to Cart"}
          </button>
          <button
            onClick={() => setWish(!wishlisted)}
            className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center flex-shrink-0
              transition-all duration-200 hover:scale-105 active:scale-95
              ${wishlisted
                ? "border-rose-500 bg-rose-50 text-rose-500"
                : "border-gray-200 text-gray-400 hover:border-gray-400"}`}
          >
            <Heart className={`w-5 h-5 ${wishlisted ? "fill-rose-500" : ""}`} />
          </button>
        </div>
      </div>

      {/* ── Accordions ── */}
      <div className="border-t border-gray-100">
        <Accordion title="Product Description">
          <p>{product.description}</p>
        </Accordion>
        <Accordion title="Material & Care">
          <p>{product.material}</p>
        </Accordion>
        <Accordion title="Shipping & Returns">
          <p>{product.shipping}</p>
        </Accordion>
      </div>

      <style>{`
        @keyframes animate-in { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }
        .animate-in { animation: animate-in 0.2s ease; }
      `}</style>
    </div>
  );
}
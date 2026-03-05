"use client";
import { useState, useRef, useEffect } from "react";
import {
  Heart, ShoppingBag, Trash2, Share2, SlidersHorizontal,
  Star, X, Check, ChevronDown, ArrowRight, Sparkles,
  ShoppingCart, Eye, Tag,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface WishItem {
  id:        string;
  name:      string;
  category:  string;
  price:     number;
  originalPrice?: number;
  img:       string;
  badge?:    string;
  rating:    number;
  reviews:   number;
  sizes:     string[];
  inStock:   boolean;
  addedAt:   number;
}

// ── Seed data ─────────────────────────────────────────────────────────────────
const SEED: WishItem[] = [
  {
    id: "1", name: "Signature Wool Overcoat", category: "Outerwear",
    price: 895, img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=85",
    badge: "Bestseller", rating: 4.9, reviews: 128,
    sizes: ["XS","S","M","L","XL"], inStock: true, addedAt: Date.now() - 86400000,
  },
  {
    id: "2", name: "Italian Cashmere Rollneck", category: "Knitwear",
    price: 450, originalPrice: 590,
    img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=85",
    badge: "Sale", rating: 4.8, reviews: 74,
    sizes: ["S","M","L","XL"], inStock: true, addedAt: Date.now() - 172800000,
  },
  {
    id: "3", name: "Bespoke Navy Blazer", category: "Tailoring",
    price: 1250, img: "https://images.unsplash.com/photo-1592878940526-0214b0f374f6?w=600&q=85",
    badge: "New", rating: 4.7, reviews: 56,
    sizes: ["S","M","L"], inStock: true, addedAt: Date.now() - 259200000,
  },
  {
    id: "4", name: "Linen Oxford Shirt", category: "Shirts",
    price: 195, img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=85",
    rating: 4.6, reviews: 93,
    sizes: ["XS","S","M","L","XL","XXL"], inStock: false, addedAt: Date.now() - 345600000,
  },
  {
    id: "5", name: "Wool Pleated Trouser", category: "Trousers",
    price: 320, img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=85",
    badge: "Limited", rating: 4.8, reviews: 47,
    sizes: ["S","M","L","XL"], inStock: true, addedAt: Date.now() - 432000000,
  },
  {
    id: "6", name: "Urban Suede Bomber", category: "Outerwear",
    price: 1100, img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=85",
    badge: "Limited", rating: 4.9, reviews: 38,
    sizes: ["S","M","L"], inStock: true, addedAt: Date.now() - 518400000,
  },
];

const BADGE_STYLE: Record<string, string> = {
  Bestseller: "bg-amber-500  text-white",
  New:        "bg-blue-600   text-white",
  Limited:    "bg-rose-600   text-white",
  Sale:       "bg-emerald-600 text-white",
};

type SortKey = "recent" | "price-asc" | "price-desc" | "name";
type ViewMode = "grid" | "list";

// ── Scroll-reveal hook ────────────────────────────────────────────────────────
function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, vis, delay };
}

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ message, onUndo, onClose }: { message: string; onUndo: () => void; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3
      bg-[#0f172a] text-white text-sm font-semibold px-5 py-3.5 rounded-2xl shadow-2xl
      animate-toastIn">
      <span>{message}</span>
      <button onClick={onUndo} className="text-blue-400 hover:text-blue-300 font-bold underline text-xs transition-colors">
        Undo
      </button>
      <button onClick={onClose} className="ml-1 text-gray-400 hover:text-white transition-colors">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// ── Grid card ─────────────────────────────────────────────────────────────────
function GridCard({
  item, onRemove, onAddToCart, index,
}: {
  item: WishItem; onRemove: (id: string) => void;
  onAddToCart: (id: string, size: string) => void; index: number;
}) {
  const { ref, vis } = useFadeIn();
  const [selectedSize, setSize] = useState("");
  const [cartFlash,    setCart] = useState(false);
  const [removing,     setRemoving] = useState(false);

  const handleCart = () => {
    if (!selectedSize) { /* pulse to prompt size selection */ return; }
    setCart(true);
    onAddToCart(item.id, selectedSize);
    setTimeout(() => setCart(false), 1800);
  };

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove(item.id), 300);
  };

  return (
    <div
      ref={ref}
      className={`group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100
        shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1
        ${removing ? "opacity-0 scale-95" : ""}
        ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: vis ? `${index * 70}ms` : "0ms" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#f0f0ee]" style={{ aspectRatio: "3/4" }}>
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-cover object-top
            group-hover:scale-[1.05] transition-transform duration-700 ease-out"
        />
        {/* Badge */}
        {item.badge && (
          <span className={`absolute top-3 left-3 text-[9px] font-black tracking-[0.15em]
            uppercase px-2.5 py-1 rounded-full ${BADGE_STYLE[item.badge]}`}>
            {item.badge}
          </span>
        )}
        {/* Out of stock overlay */}
        {!item.inStock && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-white text-[#0f172a] text-xs font-black tracking-widest uppercase
              px-4 py-2 rounded-full shadow-md border border-gray-200">
              Out of Stock
            </span>
          </div>
        )}
        {/* Remove btn */}
        <button
          onClick={handleRemove}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm
            shadow-md flex items-center justify-center text-rose-400 hover:text-rose-600
            hover:bg-rose-50 hover:scale-110 transition-all duration-200 opacity-0
            group-hover:opacity-100"
        >
          <X className="w-3.5 h-3.5" />
        </button>
        {/* Quick view */}
        <div className="absolute bottom-0 inset-x-0 p-3
          translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button className="w-full bg-white/90 backdrop-blur-sm text-[#0f172a] text-[10px]
            font-bold tracking-widest uppercase py-2 rounded-xl flex items-center justify-center gap-1.5
            hover:bg-white transition-colors shadow-sm">
            <Eye className="w-3 h-3" /> Quick View
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        {/* Stars */}
        <div className="flex items-center gap-1 mb-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-2.5 h-2.5 ${
              i < Math.floor(item.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
            }`} />
          ))}
          <span className="text-[10px] text-gray-400 ml-0.5">({item.reviews})</span>
        </div>

        <p className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase mb-0.5">
          {item.category}
        </p>
        <h3 className="font-bold text-[#0f172a] text-sm leading-snug mb-2">{item.name}</h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-black text-[#0f172a] text-base">${item.price.toLocaleString()}</span>
          {item.originalPrice && (
            <span className="text-gray-300 text-xs line-through font-medium">
              ${item.originalPrice.toLocaleString()}
            </span>
          )}
          {item.originalPrice && (
            <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
              -{Math.round((1 - item.price / item.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Size selector */}
        {item.inStock && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.sizes.map(s => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition-all
                  ${selectedSize === s
                    ? "border-[#0f172a] bg-[#0f172a] text-white"
                    : "border-gray-200 text-gray-500 hover:border-gray-400"}`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* CTA */}
        <button
          onClick={handleCart}
          disabled={!item.inStock}
          className={`mt-auto w-full py-2.5 rounded-xl text-[11px] font-black tracking-wider
            uppercase flex items-center justify-center gap-1.5 transition-all duration-200
            ${!item.inStock
              ? "bg-gray-100 text-gray-300 cursor-not-allowed"
              : !selectedSize
              ? "bg-gray-100 text-gray-400 hover:bg-[#0f172a] hover:text-white border border-dashed border-gray-300"
              : cartFlash
              ? "bg-emerald-600 text-white shadow-md"
              : "bg-[#0f172a] text-white hover:bg-blue-700 shadow-md hover:shadow-lg"}`}
        >
          {!item.inStock ? "Notify Me" :
           cartFlash ? <><Check className="w-3.5 h-3.5" /> Added!</> :
           !selectedSize ? "Select Size" :
           <><ShoppingCart className="w-3.5 h-3.5" /> Add to Cart</>}
        </button>
      </div>
    </div>
  );
}

// ── List card ─────────────────────────────────────────────────────────────────
function ListCard({
  item, onRemove, onAddToCart, index,
}: {
  item: WishItem; onRemove: (id: string) => void;
  onAddToCart: (id: string, size: string) => void; index: number;
}) {
  const { ref, vis } = useFadeIn();
  const [selectedSize, setSize] = useState("");
  const [cartFlash,    setCart] = useState(false);

  const handleCart = () => {
    if (!selectedSize || !item.inStock) return;
    setCart(true);
    onAddToCart(item.id, selectedSize);
    setTimeout(() => setCart(false), 1800);
  };

  return (
    <div
      ref={ref}
      className={`group flex gap-4 sm:gap-6 bg-white rounded-2xl border border-gray-100
        shadow-sm hover:shadow-lg p-4 sm:p-5 transition-all duration-500
        ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: vis ? `${index * 60}ms` : "0ms" }}
    >
      {/* Image */}
      <div className="relative rounded-xl overflow-hidden bg-[#f0f0ee] flex-shrink-0
        w-24 h-28 sm:w-32 sm:h-36">
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-cover object-top
            group-hover:scale-105 transition-transform duration-500"
        />
        {item.badge && (
          <span className={`absolute top-2 left-2 text-[8px] font-black tracking-wider
            uppercase px-1.5 py-0.5 rounded-full ${BADGE_STYLE[item.badge]}`}>
            {item.badge}
          </span>
        )}
        {!item.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-[9px] font-black text-gray-500 tracking-wider uppercase">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="min-w-0">
            <p className="text-[10px] text-gray-400 font-bold tracking-wider uppercase mb-0.5">{item.category}</p>
            <h3 className="font-bold text-[#0f172a] text-sm sm:text-base leading-snug truncate">{item.name}</h3>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="flex-shrink-0 w-7 h-7 rounded-lg hover:bg-rose-50 flex items-center
              justify-center text-gray-300 hover:text-rose-500 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Stars + price */}
        <div className="flex items-center gap-3 mb-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < Math.floor(item.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-black text-[#0f172a] text-sm sm:text-base">${item.price.toLocaleString()}</span>
            {item.originalPrice && (
              <span className="text-gray-300 text-xs line-through">${item.originalPrice.toLocaleString()}</span>
            )}
          </div>
        </div>

        {/* Sizes */}
        {item.inStock && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.sizes.map(s => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border transition-all
                  ${selectedSize === s
                    ? "border-[#0f172a] bg-[#0f172a] text-white"
                    : "border-gray-200 text-gray-400 hover:border-gray-600"}`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* CTA */}
        <button
          onClick={handleCart}
          disabled={!item.inStock}
          className={`self-start flex items-center gap-1.5 text-[11px] font-black tracking-wider
            uppercase px-4 py-2 rounded-xl transition-all
            ${!item.inStock
              ? "bg-gray-100 text-gray-300 cursor-not-allowed"
              : cartFlash
              ? "bg-emerald-600 text-white"
              : "bg-[#0f172a] text-white hover:bg-blue-700 shadow-sm"}`}
        >
          {cartFlash ? <><Check className="w-3 h-3" /> Added</> : <><ShoppingCart className="w-3 h-3" /> {selectedSize ? "Add to Cart" : "Select Size"}</>}
        </button>
      </div>
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-3xl bg-rose-50 border-2 border-rose-100 flex items-center justify-center shadow-lg">
          <Heart className="w-10 h-10 text-rose-300" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      </div>
      <h2 className="font-display font-bold text-[#0f172a] text-3xl mb-2">Your wishlist is empty</h2>
      <p className="text-gray-400 text-sm max-w-xs mb-8 leading-relaxed">
        Discover pieces worth keeping. Add your favourites and they'll appear right here.
      </p>
      <a
        href="/mens-collection"
        className="flex items-center gap-2 bg-[#0f172a] hover:bg-blue-700 text-white font-bold
          text-sm tracking-wider uppercase px-7 py-3.5 rounded-2xl transition-all shadow-lg
          hover:shadow-xl hover:scale-[1.03] active:scale-[0.98]"
      >
        <ShoppingBag className="w-4 h-4" /> Explore Collection
      </a>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function WishlistPage() {
  const [items, setItems]       = useState<WishItem[]>(SEED);
  const [view, setView]         = useState<ViewMode>("grid");
  const [sort, setSort]         = useState<SortKey>("recent");
  const [toast, setToast]       = useState<{ msg: string; item: WishItem } | null>(null);
  const [cartSnack, setSnack]   = useState(false);
  const [shared, setShared]     = useState(false);

  // Sort
  const sorted = [...items].sort((a, b) => {
    if (sort === "price-asc")  return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "name")       return a.name.localeCompare(b.name);
    return b.addedAt - a.addedAt;
  });

  const handleRemove = (id: string) => {
    const item = items.find(i => i.id === id)!;
    setItems(prev => prev.filter(i => i.id !== id));
    setToast({ msg: `"${item.name}" removed`, item });
  };

  const handleUndo = () => {
    if (!toast) return;
    setItems(prev => [...prev, toast.item]);
    setToast(null);
  };

  const handleAddToCart = (_id: string, _size: string) => {
    setSnack(true);
    setTimeout(() => setSnack(false), 2200);
  };

  const handleMoveAll = () => {
    setSnack(true);
    setTimeout(() => setSnack(false), 2200);
  };

  const handleShare = () => {
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const totalValue = items.reduce((s, i) => s + i.price, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');
        .font-display{font-family:'Cormorant Garamond',serif;}
        *{font-family:'DM Sans',sans-serif;}
        @keyframes toastIn{from{opacity:0;transform:translate(-50%,16px)}to{opacity:1;transform:translate(-50%,0)}}
        .animate-toastIn{animation:toastIn 0.3s cubic-bezier(0.175,0.885,0.32,1.275);}
        @keyframes snackIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .animate-snackIn{animation:snackIn 0.3s ease;}
      `}</style>

      <div className="min-h-screen bg-[#f8f9fb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

          {/* ── Page header ── */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px w-6 bg-rose-400" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-rose-400">
                  Saved Items
                </span>
              </div>
              <h1 className="font-display italic font-bold text-[#0f172a] text-4xl sm:text-5xl leading-tight">
                My Wishlist
              </h1>
              {items.length > 0 && (
                <p className="text-gray-400 text-sm mt-1.5">
                  {items.length} item{items.length !== 1 ? "s" : ""} ·{" "}
                  <span className="font-bold text-[#0f172a]">${totalValue.toLocaleString()}</span> total value
                </p>
              )}
            </div>

            {/* Header actions */}
            {items.length > 0 && (
              <div className="flex items-center gap-2.5 flex-wrap">
                {/* Share */}
                <button
                  onClick={handleShare}
                  className={`flex items-center gap-1.5 border text-xs font-bold tracking-wider uppercase
                    px-4 py-2.5 rounded-xl transition-all
                    ${shared
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-gray-200 text-gray-500 hover:border-gray-400 hover:text-[#0f172a] bg-white shadow-sm"}`}
                >
                  {shared ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                  {shared ? "Copied!" : "Share"}
                </button>

                {/* Move all to cart */}
                <button
                  onClick={handleMoveAll}
                  className="flex items-center gap-1.5 bg-[#0f172a] hover:bg-blue-700 text-white
                    text-xs font-bold tracking-wider uppercase px-5 py-2.5 rounded-xl
                    transition-all shadow-md hover:shadow-lg"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Add All to Cart
                </button>
              </div>
            )}
          </div>

          {items.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* ── Toolbar ── */}
              <div className="flex items-center justify-between gap-4 mb-6 bg-white rounded-2xl
                border border-gray-100 shadow-sm px-4 py-3">
                {/* Sort */}
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-[11px] font-bold tracking-wider uppercase text-gray-400 hidden sm:block">
                    Sort
                  </span>
                  <div className="relative">
                    <select
                      value={sort}
                      onChange={e => setSort(e.target.value as SortKey)}
                      className="appearance-none bg-gray-50 border border-gray-200 text-[#0f172a]
                        text-xs font-bold pl-3 pr-7 py-1.5 rounded-lg outline-none cursor-pointer
                        focus:border-blue-500 transition-all"
                    >
                      <option value="recent">Recently Added</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="name">Name A–Z</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* View toggle */}
                <div className="flex items-center bg-gray-100 rounded-xl p-0.5">
                  {(["grid", "list"] as ViewMode[]).map(v => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black tracking-wider
                        uppercase transition-all
                        ${view === v ? "bg-white text-[#0f172a] shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                    >
                      {v === "grid" ? (
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                            <rect x="0" y="0" width="6" height="6" rx="1"/><rect x="10" y="0" width="6" height="6" rx="1"/>
                            <rect x="0" y="10" width="6" height="6" rx="1"/><rect x="10" y="10" width="6" height="6" rx="1"/>
                          </svg>
                          Grid
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                            <rect x="0" y="1" width="16" height="3" rx="1.5"/>
                            <rect x="0" y="7" width="16" height="3" rx="1.5"/>
                            <rect x="0" y="13" width="16" height="3" rx="1.5"/>
                          </svg>
                          List
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Product grid / list ── */}
              {view === "grid" ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-5">
                  {sorted.map((item, i) => (
                    <GridCard
                      key={item.id}
                      item={item}
                      index={i}
                      onRemove={handleRemove}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {sorted.map((item, i) => (
                    <ListCard
                      key={item.id}
                      item={item}
                      index={i}
                      onRemove={handleRemove}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              )}

              {/* ── Bottom CTA bar ── */}
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between
                gap-4 bg-[#0f172a] rounded-2xl px-6 sm:px-8 py-5 shadow-xl">
                <div>
                  <p className="font-display italic font-bold text-white text-xl sm:text-2xl">
                    Love what you see?
                  </p>
                  <p className="text-gray-400 text-sm mt-0.5">
                    {items.filter(i => i.inStock).length} items available · ${totalValue.toLocaleString()} total
                  </p>
                </div>
                <button
                  onClick={handleMoveAll}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white
                    font-black text-sm tracking-wide uppercase px-6 py-3.5 rounded-xl
                    transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
                >
                  Move All to Cart <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Remove toast ── */}
      {toast && (
        <Toast
          message={toast.msg}
          onUndo={handleUndo}
          onClose={() => setToast(null)}
        />
      )}

      {/* ── Cart snackbar ── */}
      {cartSnack && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5
          bg-emerald-600 text-white text-sm font-bold px-5 py-3.5 rounded-2xl shadow-2xl animate-snackIn">
          <Check className="w-4 h-4" />
          Added to cart!
        </div>
      )}
    </>
  );
}

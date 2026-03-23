"use client";

import { useState, useEffect, useRef } from "react";
import {
  Heart, ShoppingBag, Trash2, Share2, SlidersHorizontal,
  Star, X, Check, ChevronDown, ArrowRight, Sparkles,
  ShoppingCart, Eye,
} from "lucide-react";

import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import { getWishlist, removeFromWishlist } from "@/api/wishlist"; 

// ── Types ─────────────────────────────────────────────────────────────────────
interface WishItem {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  img: string;
  badge?: string;
  rating: number;
  reviews: number;
  sizes: string[];
  inStock: boolean;
  addedAt: number;
  productId?: string;
}

type SortKey = "recent" | "price-asc" | "price-desc" | "name";
type ViewMode = "grid" | "list";

const BADGE_STYLE: Record<string, string> = {
  Bestseller: "bg-red-600 text-white",
  New: "bg-[#0f172a] text-white",
  Limited: "bg-red-700 text-white",
  Sale: "bg-red-500 text-white",
};

// ── Scroll fade-in hook ───────────────────────────────────────────────────────
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
      border-l-4 border-red-500 animate-toastIn">
      <span>{message}</span>
      <button onClick={onUndo} className="text-red-400 hover:text-red-300 font-bold underline text-xs transition-colors">
        Undo
      </button>
      <button onClick={onClose} className="ml-1 text-gray-400 hover:text-white transition-colors">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// ── Grid Card ─────────────────────────────────────────────────────────────────
function GridCard({ item, onRemove, onAddToCart, index }: { item: WishItem; onRemove: (id: string) => void; onAddToCart: (id: string, size: string) => void; index: number; }) {
  const { ref, vis } = useFadeIn();
  const [selectedSize, setSize] = useState("");
  const [cartFlash, setCart] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleCart = () => {
    if (!selectedSize) return;
    setCart(true);
    onAddToCart(item.id, selectedSize);
    setTimeout(() => setCart(false), 1800);
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    setRemoving(true);
    
    try {
      const userId = localStorage.getItem("userId") || "";
      await removeFromWishlist(item.id, userId);
      setTimeout(() => onRemove(item.id), 300);
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
      setIsRemoving(false);
      setRemoving(false);
    }
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
        <img src={item.img} alt={item.name} className="w-full h-full object-cover object-top group-hover:scale-[1.05] transition-transform duration-700 ease-out"/>
        {item.badge && (
          <span className={`absolute top-3 left-3 text-[9px] font-black tracking-[0.15em] uppercase px-2.5 py-1 rounded-full ${BADGE_STYLE[item.badge]}`}>
            {item.badge}
          </span>
        )}
        {!item.inStock && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-white text-[#0f172a] text-xs font-black tracking-widest uppercase px-4 py-2 rounded-full shadow-md border border-gray-200">
              Out of Stock
            </span>
          </div>
        )}
        <button
          onClick={handleRemove}
          disabled={isRemoving}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRemoving ? (
            <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
          ) : (
            <X className="w-3.5 h-3.5" />
          )}
        </button>
        <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button className="w-full bg-white/90 backdrop-blur-sm text-[#0f172a] text-[10px] font-bold tracking-widest uppercase py-2 rounded-xl flex items-center justify-center gap-1.5 hover:bg-white transition-colors">
            <Eye className="w-3 h-3" /> Quick View
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={`w-2.5 h-2.5 ${
                i < Math.floor(item.rating) 
                  ? "fill-red-500 text-red-500" 
                  : "fill-gray-200 text-gray-200"
              }`} 
            />
          ))}
          <span className="text-[10px] text-gray-400 ml-0.5">({item.reviews})</span>
        </div>

        <p className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase mb-0.5">{item.category}</p>
        <h3 className="font-bold text-[#0f172a] text-sm leading-snug mb-2">{item.name}</h3>

        <div className="flex items-center gap-2 mb-3">
          <span className="font-black text-[#0f172a] text-base">${item.price.toLocaleString()}</span>
          {item.originalPrice && (
            <span className="text-gray-300 text-xs line-through font-medium">${item.originalPrice.toLocaleString()}</span>
          )}
          {item.originalPrice && (
            <span className="text-[9px] font-black text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full">
              -{Math.round((1 - item.price / item.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {item.inStock && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.sizes.map(s => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition-all ${
                  selectedSize === s 
                    ? "border-[#0f172a] bg-[#0f172a] text-white" 
                    : "border-gray-200 text-gray-500 hover:border-red-400 hover:text-red-500"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={handleCart}
          disabled={!item.inStock || isRemoving}
          className={`mt-auto w-full py-2.5 rounded-xl text-[11px] font-black tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all duration-200
            ${!item.inStock 
              ? "bg-gray-100 text-gray-300 cursor-not-allowed" 
              : !selectedSize 
                ? "bg-gray-100 text-gray-400 hover:bg-[#0f172a] hover:text-white border border-dashed border-gray-300" 
                : cartFlash 
                  ? "bg-[#0f172a] text-white shadow-md border-l-4 border-red-500" 
                  : "bg-[#0f172a] text-white hover:bg-red-600 shadow-md hover:shadow-lg"
            }`}
        >
          {!item.inStock 
            ? "Notify Me" 
            : cartFlash 
              ? <><Check className="w-3.5 h-3.5 text-red-500" /> Added!</> 
              : !selectedSize 
                ? "Select Size" 
                : <><ShoppingCart className="w-3.5 h-3.5" /> Add to Cart</>}
        </button>
      </div>
    </div>
  );
}

// ── List Card ─────────────────────────────────────────────────────────────────
function ListCard({ item, onRemove, onAddToCart, index }: { item: WishItem; onRemove: (id: string) => void; onAddToCart: (id: string, size: string) => void; index: number; }) {
  const { ref, vis } = useFadeIn();
  const [selectedSize, setSize] = useState("");
  const [cartFlash, setCart] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleCart = () => {
    if (!selectedSize || !item.inStock) return;
    setCart(true);
    onAddToCart(item.id, selectedSize);
    setTimeout(() => setCart(false), 1800);
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    
    try {
      const userId = localStorage.getItem("userId") || "";
      await removeFromWishlist(item.id, userId);
      onRemove(item.id);
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
      setIsRemoving(false);
    }
  };

  return (
    <div
      ref={ref}
      className={`group flex gap-4 sm:gap-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg p-4 sm:p-5 transition-all duration-500 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: vis ? `${index * 60}ms` : "0ms" }}
    >
      {/* Image */}
      <div className="relative rounded-xl overflow-hidden bg-[#f0f0ee] flex-shrink-0 w-24 h-28 sm:w-32 sm:h-36">
        <img src={item.img} alt={item.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"/>
        {item.badge && <span className={`absolute top-2 left-2 text-[8px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded-full ${BADGE_STYLE[item.badge]}`}>{item.badge}</span>}
        {!item.inStock && <div className="absolute inset-0 bg-white/70 flex items-center justify-center"><span className="text-[9px] font-black text-gray-500 tracking-wider uppercase">Out of Stock</span></div>}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="min-w-0">
            <p className="text-[10px] text-gray-400 font-bold tracking-wider uppercase mb-0.5">{item.category}</p>
            <h3 className="font-bold text-[#0f172a] text-sm sm:text-base leading-snug truncate">{item.name}</h3>
          </div>
          <button 
            onClick={handleRemove} 
            disabled={isRemoving}
            className="flex-shrink-0 w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-300 hover:text-red-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRemoving ? (
              <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
            ) : (
              <Trash2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 ${
                  i < Math.floor(item.rating) 
                    ? "fill-red-500 text-red-500" 
                    : "fill-gray-200 text-gray-200"
                }`} 
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-black text-[#0f172a] text-sm sm:text-base">${item.price.toLocaleString()}</span>
            {item.originalPrice && <span className="text-gray-300 text-xs line-through">${item.originalPrice.toLocaleString()}</span>}
          </div>
        </div>

        {item.inStock && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.sizes.map(s => (
              <button 
                key={s} 
                onClick={() => setSize(s)} 
                className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border transition-all ${
                  selectedSize === s 
                    ? "border-[#0f172a] bg-[#0f172a] text-white" 
                    : "border-gray-200 text-gray-400 hover:border-red-400 hover:text-red-500"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <button 
          onClick={handleCart} 
          disabled={!item.inStock || isRemoving} 
          className={`self-start flex items-center gap-1.5 text-[11px] font-black tracking-wider uppercase px-4 py-2 rounded-xl transition-all 
            ${!item.inStock 
              ? "bg-gray-100 text-gray-300 cursor-not-allowed" 
              : cartFlash 
                ? "bg-[#0f172a] text-white border-l-4 border-red-500" 
                : "bg-[#0f172a] text-white hover:bg-red-600 shadow-sm"
            }`}
        >
          {cartFlash 
            ? <><Check className="w-3 h-3 text-red-500" /> Added</> 
            : <><ShoppingCart className="w-3 h-3" /> {selectedSize ? "Add to Cart" : "Select Size"}</>}
        </button>
      </div>
    </div>
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-3xl bg-red-50 border-2 border-red-100 flex items-center justify-center shadow-lg">
          <Heart className="w-10 h-10 text-red-300" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-xl bg-[#0f172a] flex items-center justify-center shadow-md">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      </div>
      <h2 className="font-display font-bold text-[#0f172a] text-3xl mb-2">Your wishlist is empty</h2>
      <p className="text-gray-400 text-sm max-w-xs mb-8 leading-relaxed">
        Discover pieces worth keeping. Add your favourites and they'll appear right here.
      </p>
      <a href="/mens-collection" className="flex items-center gap-2 bg-[#0f172a] hover:bg-red-600 text-white font-bold text-sm tracking-wider uppercase px-7 py-3.5 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98]">
        <ShoppingBag className="w-4 h-4" /> Explore Collection
      </a>
    </div>
  );
}

// ── Main Wishlist Page ───────────────────────────────────────────────────────
export default function WishlistPage() {
  const [items, setItems] = useState<WishItem[]>([]);
  const [view, setView] = useState<ViewMode>("grid");
  const [sort, setSort] = useState<SortKey>("recent");
  const [toast, setToast] = useState<{ msg: string; item: WishItem } | null>(null);
  const [cartSnack, setSnack] = useState(false);
  const [shared, setShared] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ── Fetch wishlist from API ───────────────────────────────
  useEffect(() => {
    const fetchWishlist = async () => {
      setIsLoading(true);
      try {
        const res = await getWishlist();
        if (res?.success && res?.wishlist) {
          const mapped = res.wishlist.map((w: any) => ({
            id: w.product._id,
            productId: w.product._id,
            name: w.product.name,
            category: w.product.category,
            price: w.product.price,
            originalPrice: w.product.originalPrice,
            img: w.product.images[0]?.url || "",
            badge: w.product.badge || undefined,
            rating: w.product.rating || 0,
            reviews: w.product.reviews || 0,
            sizes: w.product.sizes || [],
            inStock: w.product.stock > 0,
            addedAt: new Date(w.createdAt).getTime(),
          }));
          setItems(mapped);
        } else {
          setItems([]);
        }
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const sorted = [...items].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "name") return a.name.localeCompare(b.name);
    return b.addedAt - a.addedAt;
  });

  const handleRemove = async (id: string) => {
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

  const handleShare = () => {
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const totalValue = items.reduce((s, i) => s + i.price, 0);

  if (isLoading) {
    return (
      <>
        <Navbar wishlistCount={0} />
        <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center">
          <div className="text-center">
            <svg className="animate-spin w-10 h-10 mx-auto mb-4 text-[#0f172a]" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            <p className="text-gray-500">Loading your wishlist...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar wishlistCount={items.length} />
      <div className="min-h-screen bg-[#f8f9fb] p-4 sm:p-6 lg:p-8">
        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-display italic font-bold text-[#0f172a]">My Wishlist</h1>
                <p className="text-gray-400 text-sm mt-1">
                  {items.length} item{items.length !== 1 ? "s" : ""} · ${totalValue.toLocaleString()} total value
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setView("grid")} 
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    view === "grid" 
                      ? "bg-[#0f172a] text-white" 
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  Grid
                </button>
                <button 
                  onClick={() => setView("list")} 
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    view === "list" 
                      ? "bg-[#0f172a] text-white" 
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  List
                </button>
                <button
                  onClick={handleShare}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    shared 
                      ? "bg-red-500 text-white" 
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  <Share2 className="w-4 h-4" />
                  {shared ? "Copied!" : "Share"}
                </button>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex justify-end mb-6">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="bg-white border border-gray-200 text-[#0f172a] text-sm font-bold px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="recent">Recently Added</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>

            <div className={`${view === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
              : "flex flex-col gap-4"
            }`}>
              {sorted.map((item, i) => view === "grid" ? (
                <GridCard key={item.id} item={item} onRemove={handleRemove} onAddToCart={handleAddToCart} index={i} />
              ) : (
                <ListCard key={item.id} item={item} onRemove={handleRemove} onAddToCart={handleAddToCart} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
      
      {toast && <Toast message={toast.msg} onUndo={handleUndo} onClose={() => setToast(null)} />}
      
      {cartSnack && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5
          bg-[#0f172a] text-white text-sm font-bold px-5 py-3.5 rounded-2xl shadow-2xl
          border-l-4 border-red-500 animate-snackIn">
          <Check className="w-4 h-4 text-red-500" />
          Added to cart!
        </div>
      )}

      <style>{`
        @keyframes snackIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-snackIn {
          animation: snackIn 0.3s ease;
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translate(-50%, 16px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-toastIn {
          animation: toastIn 0.3s ease;
        }
      `}</style>
    </>
  );
}
"use client";
import { useState, useEffect, useRef } from "react";
import {
  ShoppingBag, Trash2, Heart, Plus, Minus, Tag, X,
  ChevronRight, ShieldCheck, Truck, RefreshCcw, Star,
  ArrowRight, Lock, Check, Gift, Package,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
//  CartPage.tsx  — Premium LUXE Shopping Cart
//  Features:
//   • Quantity increment / decrement
//   • Remove item with animated exit + undo toast
//   • Move to wishlist
//   • Promo code input with validation
//   • Order summary with live total
//   • Free shipping threshold progress bar
//   • Suggested / recommended products
//   • Trust badges
//   • Fully responsive (mobile-first)
// ─────────────────────────────────────────────────────────────────────────────

// ── Types ─────────────────────────────────────────────────────────────────────
interface CartItem {
  id:        string;
  name:      string;
  category:  string;
  price:     number;
  img:       string;
  size:      string;
  color:     string;
  colorHex:  string;
  qty:       number;
  maxQty:    number;
  badge?:    string;
}

interface SuggestedItem {
  id:    string;
  name:  string;
  price: number;
  img:   string;
  rating: number;
}

// ── Seed cart ─────────────────────────────────────────────────────────────────
const SEED_CART: CartItem[] = [
  {
    id: "1", name: "Signature Wool Overcoat", category: "Outerwear",
    price: 895, img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&q=85",
    size: "M", color: "Black", colorHex: "#111111", qty: 1, maxQty: 5, badge: "Bestseller",
  },
  {
    id: "2", name: "Italian Cashmere Rollneck", category: "Knitwear",
    price: 450, img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=85",
    size: "L", color: "Camel", colorHex: "#c19a6b", qty: 1, maxQty: 3, badge: "New",
  },
  {
    id: "3", name: "Wool Pleated Trouser", category: "Trousers",
    price: 320, img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=85",
    size: "M", color: "Grey", colorHex: "#9ca3af", qty: 2, maxQty: 4,
  },
];

const SUGGESTED: SuggestedItem[] = [
  { id: "s1", name: "Linen Oxford Shirt",  price: 195, rating: 4.6, img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80" },
  { id: "s2", name: "Urban Suede Bomber",  price: 1100, rating: 4.9, img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80" },
  { id: "s3", name: "Leather Chelsea Boot",price: 580, rating: 4.8, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
  { id: "s4", name: "Heritage Gold Watch", price: 1250, rating: 4.9, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
];

const VALID_CODES: Record<string, { type: "percent" | "flat"; value: number; label: string }> = {
  "LUXE20": { type: "percent", value: 20, label: "20% off" },
  "SAVE50": { type: "flat",    value: 50, label: "$50 off" },
  "WELCOME": { type: "percent", value: 10, label: "10% off" },
};

const FREE_SHIPPING_THRESHOLD = 500;
const BADGE_STYLE: Record<string, string> = {
  Bestseller: "bg-amber-500 text-white",
  New:        "bg-blue-600  text-white",
  Limited:    "bg-rose-600  text-white",
};

// ── Scroll reveal ─────────────────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

// ── Cart item row ─────────────────────────────────────────────────────────────
function CartRow({
  item, onQtyChange, onRemove, onWishlist, index,
}: {
  item: CartItem;
  onQtyChange: (id: string, delta: number) => void;
  onRemove:    (id: string) => void;
  onWishlist:  (id: string) => void;
  index:       number;
}) {
  const { ref, vis } = useFadeIn();
  const [removing, setRemoving] = useState(false);
  const [wishlisted, setWish]   = useState(false);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove(item.id), 350);
  };
  const handleWishlist = () => {
    setWish(true);
    setTimeout(() => onWishlist(item.id), 300);
  };

  return (
    <div
      ref={ref}
      className={`flex gap-4 sm:gap-5 bg-white rounded-2xl p-4 sm:p-5 border border-gray-100
        shadow-sm transition-all duration-500
        ${removing ? "opacity-0 -translate-x-4 scale-98" : ""}
        ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: vis ? `${index * 80}ms` : "0ms" }}
    >
      {/* Product image */}
      <div className="relative rounded-xl overflow-hidden bg-[#f0f0ee] flex-shrink-0
        w-24 h-28 sm:w-28 sm:h-32 lg:w-32 lg:h-36">
        <img
          src={item.img} alt={item.name}
          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
        />
        {item.badge && (
          <span className={`absolute top-2 left-2 text-[8px] font-black tracking-wider
            uppercase px-1.5 py-0.5 rounded-full ${BADGE_STYLE[item.badge]}`}>
            {item.badge}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top row: name + remove */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="min-w-0">
            <p className="text-[10px] text-gray-400 font-bold tracking-wider uppercase mb-0.5">{item.category}</p>
            <h3 className="font-bold text-[#0f172a] text-sm sm:text-base leading-snug">{item.name}</h3>
          </div>
          <button
            onClick={handleRemove}
            className="flex-shrink-0 w-7 h-7 rounded-lg hover:bg-rose-50 flex items-center
              justify-center text-gray-300 hover:text-rose-500 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Variant pills */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="flex items-center gap-1 text-[10px] font-bold text-gray-500
            bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">
            Size: {item.size}
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500
            bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">
            <span className="w-2.5 h-2.5 rounded-full border border-gray-300"
              style={{ backgroundColor: item.colorHex }} />
            {item.color}
          </span>
        </div>

        {/* Bottom row: qty + price + wishlist */}
        <div className="flex items-center justify-between gap-3 mt-auto flex-wrap">
          <div className="flex items-center gap-3">
            {/* Qty stepper */}
            <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl p-0.5">
              <button
                onClick={() => onQtyChange(item.id, -1)}
                disabled={item.qty <= 1}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400
                  hover:text-[#0f172a] hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed
                  transition-all"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-7 text-center text-sm font-black text-[#0f172a]">{item.qty}</span>
              <button
                onClick={() => onQtyChange(item.id, 1)}
                disabled={item.qty >= item.maxQty}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400
                  hover:text-[#0f172a] hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed
                  transition-all"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Move to wishlist */}
            <button
              onClick={handleWishlist}
              className={`flex items-center gap-1 text-[10px] font-bold transition-all
                ${wishlisted ? "text-rose-500" : "text-gray-400 hover:text-rose-500"}`}
            >
              <Heart className={`w-3.5 h-3.5 ${wishlisted ? "fill-rose-500" : ""}`} />
              <span className="hidden sm:inline">{wishlisted ? "Saved" : "Wishlist"}</span>
            </button>
            {/* Line total */}
            <span className="font-black text-[#0f172a] text-base sm:text-lg">
              ${(item.price * item.qty).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Promo code ────────────────────────────────────────────────────────────────
function PromoInput({ onApply }: { onApply: (code: string, discount: number) => void }) {
  const [code,    setCode]    = useState("");
  const [state,   setState]   = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  const handleApply = () => {
    if (!code.trim()) return;
    setState("loading");
    setTimeout(() => {
      const upper = code.trim().toUpperCase();
      if (VALID_CODES[upper]) {
        const rule = VALID_CODES[upper];
        setState("ok");
        setMessage(`Code applied — ${rule.label}`);
        onApply(upper, rule.type === "flat" ? rule.value : -rule.value);
      } else {
        setState("err");
        setMessage("Invalid promo code. Try LUXE20 or SAVE50.");
      }
    }, 800);
  };

  return (
    <div>
      <div className={`flex gap-2 rounded-xl border-2 overflow-hidden transition-all
        ${state === "ok"  ? "border-emerald-400" :
          state === "err" ? "border-rose-400"    : "border-gray-200 focus-within:border-blue-400"}`}>
        <div className="flex items-center pl-3.5 text-gray-300 flex-shrink-0">
          <Tag className="w-4 h-4" />
        </div>
        <input
          value={code}
          onChange={e => { setCode(e.target.value.toUpperCase()); setState("idle"); }}
          placeholder="Enter promo code"
          className="flex-1 py-3 px-2 text-sm text-[#0f172a] placeholder-gray-300 outline-none bg-transparent"
          onKeyDown={e => e.key === "Enter" && handleApply()}
        />
        <button
          onClick={handleApply}
          disabled={state === "ok"}
          className={`px-5 text-[11px] font-black tracking-wider uppercase flex-shrink-0 transition-all
            ${state === "ok"
              ? "bg-emerald-500 text-white"
              : "bg-[#0f172a] hover:bg-blue-700 text-white"}`}
        >
          {state === "loading" ? (
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
          ) : state === "ok" ? <Check className="w-4 h-4" /> : "Apply"}
        </button>
      </div>
      {message && (
        <p className={`mt-1.5 text-xs font-semibold ${state === "ok" ? "text-emerald-600" : "text-rose-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
}

// ── Suggested card ────────────────────────────────────────────────────────────
function SuggestedCard({ item }: { item: SuggestedItem }) {
  const [added, setAdded] = useState(false);
  return (
    <div className="group flex-shrink-0 w-36 sm:w-44">
      <div className="relative rounded-xl overflow-hidden bg-[#f0f0ee] mb-2.5"
        style={{ aspectRatio: "3/4" }}>
        <img src={item.img} alt={item.name}
          className="w-full h-full object-cover object-top
            group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute bottom-0 inset-x-0 p-2
          translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 1800); }}
            className="w-full bg-[#0f172a]/90 backdrop-blur-sm text-white text-[9px]
              font-bold tracking-widest uppercase py-1.5 rounded-lg flex items-center
              justify-center gap-1 hover:bg-[#0f172a] transition-colors"
          >
            {added ? <><Check className="w-2.5 h-2.5" /> Added</> : <><Plus className="w-2.5 h-2.5" /> Add</>}
          </button>
        </div>
      </div>
      <p className="font-bold text-[#0f172a] text-xs leading-snug mb-0.5">{item.name}</p>
      <div className="flex items-center justify-between">
        <span className="font-black text-[#0f172a] text-sm">${item.price.toLocaleString()}</span>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-2.5 h-2.5 ${i < Math.floor(item.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-3xl bg-blue-50 border-2 border-blue-100
          flex items-center justify-center shadow-lg">
          <ShoppingBag className="w-10 h-10 text-blue-300" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-xl bg-rose-500
          flex items-center justify-center shadow-md text-white font-black text-sm">
          0
        </div>
      </div>
      <h2 className="font-display italic font-bold text-[#0f172a] text-3xl mb-2">Your cart is empty</h2>
      <p className="text-gray-400 text-sm max-w-xs mb-8 leading-relaxed">
        You haven't added anything yet. Explore the collection and find something you love.
      </p>
      <a
        href="/mens-collection"
        className="flex items-center gap-2 bg-[#0f172a] hover:bg-blue-700 text-white
          font-bold text-sm tracking-wider uppercase px-7 py-3.5 rounded-2xl
          transition-all shadow-lg hover:shadow-xl"
      >
        <ShoppingBag className="w-4 h-4" /> Start Shopping
      </a>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function CartPage() {
  const [items, setItems]             = useState<CartItem[]>(SEED_CART);
  const [discount, setDiscount]       = useState(0);
  const [appliedCode, setApplied]     = useState("");
  const [toast, setToast]             = useState<{ msg: string; item: CartItem } | null>(null);
  const [checkoutLoading, setLoading] = useState(false);
  const [checkoutDone, setDone]       = useState(false);

  // Totals
  const subtotal     = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discountAmt  = appliedCode
    ? VALID_CODES[appliedCode].type === "flat"
      ? VALID_CODES[appliedCode].value
      : Math.round(subtotal * VALID_CODES[appliedCode].value / 100)
    : 0;
  const shipping     = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 15;
  const tax          = Math.round((subtotal - discountAmt) * 0.08 * 100) / 100;
  const total        = subtotal - discountAmt + shipping + tax;
  const toFreeShip   = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  const handleQty = (id: string, delta: number) =>
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, Math.min(i.maxQty, i.qty + delta)) } : i));

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

  const handleWishlist = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 2000);
  };

  if (checkoutDone) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-sm w-full text-center">
          <div className="relative inline-flex mb-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <Check className="w-8 h-8 text-emerald-500" />
            </div>
            <div className="absolute -inset-2 rounded-3xl bg-emerald-500/5 animate-ping" style={{ animationDuration: "2s" }} />
          </div>
          <h2 className="font-display italic font-bold text-[#0f172a] text-3xl mb-2">Order Placed!</h2>
          <p className="text-gray-400 text-sm mb-1">Your order has been confirmed</p>
          <p className="font-black text-blue-600 text-2xl mb-7">${total.toFixed(2)}</p>
          <a href="/" className="block w-full bg-[#0f172a] text-white font-bold text-sm tracking-wider uppercase py-3.5 rounded-xl hover:bg-blue-700 transition-colors">
            Continue Shopping
          </a>
        </div>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,700&display=swap');
          .font-display{font-family:'Cormorant Garamond',serif;}
        `}</style>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');
        .font-display{font-family:'Cormorant Garamond',serif;}
        *{font-family:'DM Sans',sans-serif;}
        @keyframes toastIn{from{opacity:0;transform:translate(-50%,16px)}to{opacity:1;transform:translate(-50%,0)}}
        .animate-toastIn{animation:toastIn 0.3s cubic-bezier(0.175,0.885,0.32,1.275);}
        .scale-98{transform:scale(0.98);}
      `}</style>

      <div className="min-h-screen bg-[#f8f9fb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

          {/* ── Header ── */}
          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-px w-6 bg-blue-500" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-blue-500">
                  My Bag
                </span>
              </div>
              <h1 className="font-display italic font-bold text-[#0f172a] text-4xl sm:text-5xl leading-none">
                Shopping Cart
              </h1>
              {items.length > 0 && (
                <p className="text-gray-400 text-sm mt-1.5">
                  {items.reduce((s, i) => s + i.qty, 0)} item{items.reduce((s, i) => s + i.qty, 0) !== 1 ? "s" : ""}
                </p>
              )}
            </div>
            <a href="/mens-collection"
              className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold tracking-wider
                uppercase text-gray-400 hover:text-[#0f172a] transition-colors">
              Continue Shopping <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] gap-7 lg:gap-8 items-start">

              {/* ── LEFT: cart items ── */}
              <div className="space-y-4">

                {/* Free shipping bar */}
                <div className={`rounded-2xl p-4 sm:p-5 border transition-all
                  ${shipping === 0
                    ? "bg-emerald-50 border-emerald-200"
                    : "bg-blue-50 border-blue-200"}`}>
                  <div className="flex items-center gap-2.5 mb-3">
                    <Truck className={`w-4 h-4 flex-shrink-0 ${shipping === 0 ? "text-emerald-600" : "text-blue-600"}`} />
                    <p className={`text-xs font-bold ${shipping === 0 ? "text-emerald-700" : "text-blue-700"}`}>
                      {shipping === 0
                        ? "🎉 You've unlocked FREE shipping!"
                        : `Add $${toFreeShip.toFixed(2)} more for FREE shipping`}
                    </p>
                  </div>
                  <div className="h-1.5 bg-white/60 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700
                        ${shipping === 0 ? "bg-emerald-500" : "bg-blue-500"}`}
                      style={{ width: `${freeProgress}%` }}
                    />
                  </div>
                </div>

                {/* Cart rows */}
                {items.map((item, i) => (
                  <CartRow
                    key={item.id} item={item} index={i}
                    onQtyChange={handleQty}
                    onRemove={handleRemove}
                    onWishlist={handleWishlist}
                  />
                ))}

                {/* Suggested items */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Gift className="w-4 h-4 text-blue-500" />
                    <h3 className="font-bold text-[#0f172a] text-sm">You Might Also Like</h3>
                  </div>
                  <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-hide snap-x snap-mandatory">
                    {SUGGESTED.map(s => <SuggestedCard key={s.id} item={s} />)}
                  </div>
                </div>
              </div>

              {/* ── RIGHT: order summary ── */}
              <div className="lg:sticky lg:top-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  {/* Top accent */}
                  <div className="h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600" />

                  <div className="p-5 sm:p-6 space-y-5">
                    <h2 className="font-bold text-[#0f172a] text-lg">Order Summary</h2>

                    {/* Line items */}
                    <div className="space-y-3 pb-4 border-b border-gray-100">
                      {items.map(item => (
                        <div key={item.id} className="flex justify-between gap-3 text-sm">
                          <span className="text-gray-500 leading-snug">
                            {item.name}
                            <span className="text-gray-300 ml-1 text-xs">×{item.qty}</span>
                          </span>
                          <span className="font-bold text-[#0f172a] flex-shrink-0">
                            ${(item.price * item.qty).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-2.5 pb-4 border-b border-gray-100">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="font-semibold text-[#0f172a]">${subtotal.toLocaleString()}</span>
                      </div>
                      {discountAmt > 0 && (
                        <div className="flex justify-between text-sm items-center">
                          <span className="text-emerald-600 flex items-center gap-1">
                            <Tag className="w-3 h-3" /> {appliedCode}
                          </span>
                          <span className="font-bold text-emerald-600">−${discountAmt}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm items-center">
                        <span className="text-gray-500">Shipping</span>
                        {shipping === 0
                          ? <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">FREE</span>
                          : <span className="font-semibold text-[#0f172a]">${shipping}</span>}
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Tax (8%)</span>
                        <span className="font-semibold text-[#0f172a]">${tax.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center pb-5 border-b border-gray-100">
                      <span className="font-black text-[#0f172a] text-base">Total</span>
                      <span className="font-black text-blue-600 text-2xl">${total.toFixed(2)}</span>
                    </div>

                    {/* Promo code */}
                    <PromoInput onApply={(code) => setApplied(code)} />

                    {/* Checkout button */}
                    <button
                      onClick={handleCheckout}
                      disabled={checkoutLoading}
                      className="w-full bg-[#0f172a] hover:bg-blue-700 disabled:bg-gray-300 text-white
                        font-black text-sm tracking-wide uppercase py-4 rounded-xl transition-all
                        shadow-md hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      {checkoutLoading ? (
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                      ) : (
                        <><Lock className="w-4 h-4" /> Secure Checkout <ArrowRight className="w-4 h-4" /></>
                      )}
                    </button>

                    {/* Trust badges */}
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      {[
                        { icon: ShieldCheck, label: "SSL Secure" },
                        { icon: RefreshCcw,  label: "Free Returns" },
                        { icon: Package,     label: "Fast Delivery" },
                      ].map(({ icon: Icon, label }) => (
                        <div key={label} className="flex flex-col items-center gap-1 text-center">
                          <div className="w-8 h-8 rounded-xl bg-gray-50 border border-gray-100
                            flex items-center justify-center">
                            <Icon className="w-3.5 h-3.5 text-gray-400" />
                          </div>
                          <span className="text-[9px] font-bold text-gray-400 leading-tight">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Payment logos */}
                <div className="mt-4 flex items-center justify-center gap-3 flex-wrap">
                  {["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay"].map(p => (
                    <span key={p} className="text-[9px] font-black tracking-wider uppercase
                      text-gray-300 bg-white border border-gray-100 px-2.5 py-1 rounded-lg shadow-sm">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Remove toast ── */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3
          bg-[#0f172a] text-white text-sm font-semibold px-5 py-3.5 rounded-2xl shadow-2xl
          animate-toastIn whitespace-nowrap">
          <span>{toast.msg}</span>
          <button onClick={handleUndo} className="text-blue-400 hover:text-blue-300 font-bold underline text-xs">
            Undo
          </button>
          <button onClick={() => setToast(null)} className="text-gray-400 hover:text-white ml-1">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </>
  );
}

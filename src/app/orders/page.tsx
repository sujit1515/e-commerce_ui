"use client";

import { useState, useEffect } from "react";
import {
  ShoppingBag, Search, Package, ChevronRight,
  RefreshCcw, X, MapPin, RotateCcw, FileText,
  CheckCircle2, Clock, Truck, XCircle, AlertCircle,
} from "lucide-react";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
// import { getOrders } from "@/api/orders"; // ← uncomment when API is ready

// ── Types ─────────────────────────────────────────────────────────────────────
interface OrderProduct {
  _id: string;
  name: string;
  price: number;
  images: string[];
  size: string;
  color: string;
  quantity: number;
}

interface Order {
  _id: string;
  orderId: string;
  createdAt: string;
  status: "processing" | "packed" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: OrderProduct[];
  trackingNumber?: string;
  deliveredAt?: string;
}

type FilterKey = "all" | "processing" | "shipped" | "delivered" | "cancelled";

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  processing: {
    label: "Processing",
    icon: Clock,
    badgeCls: "bg-amber-50 text-amber-800 border border-amber-200",
    trackProgress: 20,
  },
  packed: {
    label: "Packed",
    icon: Package,
    badgeCls: "bg-blue-50 text-blue-800 border border-blue-200",
    trackProgress: 45,
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
    badgeCls: "bg-sky-50 text-sky-800 border border-sky-200",
    trackProgress: 66,
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle2,
    badgeCls: "bg-green-50 text-green-800 border border-green-200",
    trackProgress: 100,
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    badgeCls: "bg-red-50 text-red-700 border border-red-200",
    trackProgress: 0,
  },
};

const TRACK_STEPS = ["Ordered", "Packed", "Shipped", "Delivered"];

// ── Mock data (replace with API call) ─────────────────────────────────────────
const MOCK_ORDERS: Order[] = [
  {
    _id: "1",
    orderId: "#ORD-20481",
    createdAt: "2026-04-03T10:00:00Z",
    status: "delivered",
    total: 349,
    deliveredAt: "2026-04-07T14:30:00Z",
    items: [
      { _id: "p1", name: "Merino Wool Blazer", price: 229, images: [], size: "M", color: "Charcoal", quantity: 1 },
      { _id: "p2", name: "Slim Chinos", price: 120, images: [], size: "32×30", color: "Navy", quantity: 1 },
    ],
  },
  {
    _id: "2",
    orderId: "#ORD-20219",
    createdAt: "2026-03-28T09:00:00Z",
    status: "shipped",
    total: 512,
    trackingNumber: "1Z999AA10123456784",
    items: [
      { _id: "p3", name: "Oxford Dress Shirt", price: 129, images: [], size: "L", color: "White", quantity: 1 },
      { _id: "p4", name: "Leather Derby Shoes", price: 299, images: [], size: "42", color: "Brown", quantity: 1 },
      { _id: "p5", name: "Silk Pocket Square", price: 84, images: [], size: "OS", color: "Burgundy", quantity: 1 },
    ],
  },
  {
    _id: "3",
    orderId: "#ORD-19874",
    createdAt: "2026-03-10T11:00:00Z",
    status: "delivered",
    total: 189,
    deliveredAt: "2026-03-14T16:00:00Z",
    items: [
      { _id: "p6", name: "Cashmere Crewneck", price: 189, images: [], size: "M", color: "Camel", quantity: 1 },
    ],
  },
  {
    _id: "4",
    orderId: "#ORD-19301",
    createdAt: "2026-02-21T08:00:00Z",
    status: "processing",
    total: 234,
    items: [
      { _id: "p7", name: "Tailored Trousers", price: 159, images: [], size: "32×32", color: "Charcoal", quantity: 1 },
      { _id: "p8", name: "Linen Summer Shirt", price: 75, images: [], size: "L", color: "Ecru", quantity: 1 },
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
}

function getTrackProgress(status: Order["status"]) {
  return STATUS_CONFIG[status]?.trackProgress ?? 0;
}

// ── Product Thumbnails ────────────────────────────────────────────────────────
function ProductThumbs({ items }: { items: OrderProduct[] }) {
  const visible = items.slice(0, 3);
  const extra = items.length - 3;
  return (
    <div className="flex">
      {visible.map((item, i) => (
        <div
          key={item._id}
          className="w-14 h-16 rounded-lg overflow-hidden border-2 border-white bg-maroon/10 flex-shrink-0 flex items-center justify-center"
          style={{ marginRight: i < visible.length - 1 ? "-10px" : 0, zIndex: visible.length - i }}
        >
          {item.images?.[0] ? (
            <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover object-top" />
          ) : (
            <ShoppingBag className="w-5 h-5 text-maroon/40" />
          )}
        </div>
      ))}
      {extra > 0 && (
        <div
          className="w-14 h-16 rounded-lg border-2 border-white bg-maroon/5 flex-shrink-0 flex items-center justify-center text-xs font-bold text-maroon/50"
          style={{ marginLeft: "-10px" }}
        >
          +{extra}
        </div>
      )}
    </div>
  );
}

// ── Track Bar ─────────────────────────────────────────────────────────────────
function TrackBar({ status }: { status: Order["status"] }) {
  const progress = getTrackProgress(status);
  const isCancelled = status === "cancelled";

  if (isCancelled) {
    return (
      <div className="flex items-center gap-2 text-xs text-red-500 font-medium">
        <XCircle className="w-3.5 h-3.5" />
        Order cancelled
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        {TRACK_STEPS.map((step, i) => {
          const stepPct = (i / (TRACK_STEPS.length - 1)) * 100;
          const done = stepPct <= progress;
          return (
            <span
              key={step}
              className={`text-[10px] font-medium ${done ? "text-maroon" : "text-black/30"}`}
            >
              {step}
            </span>
          );
        })}
      </div>
      <div className="h-1 rounded-full bg-maroon/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-maroon transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// ── Order Card ────────────────────────────────────────────────────────────────
function OrderCard({ order }: { order: Order }) {
  const cfg = STATUS_CONFIG[order.status];
  const StatusIcon = cfg.icon;
  const itemNames = order.items.slice(0, 2).map(i => i.name).join(", ")
    + (order.items.length > 2 ? ` +${order.items.length - 2} more` : "");
  const itemSub = order.items.slice(0, 2)
    .map(i => `${i.size} · ${i.color}`)
    .join("  ·  ");

  return (
    <div className="bg-white rounded-2xl border border-maroon/10 overflow-hidden hover:border-maroon/20 hover:shadow-md transition-all duration-300">

      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-maroon/8 flex-wrap">
        <div className="flex items-center gap-5 flex-wrap">
          <span className="font-bold text-black text-sm">{order.orderId}</span>
          <span className="text-xs text-black/40">{formatDate(order.createdAt)}</span>
          {order.deliveredAt && (
            <span className="text-xs text-black/40">
              Delivered {formatDate(order.deliveredAt)}
            </span>
          )}
          {order.trackingNumber && (
            <span className="text-xs text-maroon/60 font-medium">
              {order.trackingNumber}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-black text-black text-sm">${order.total.toLocaleString()}</span>
          <span className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${cfg.badgeCls}`}>
            <StatusIcon className="w-3 h-3" />
            {cfg.label}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4 flex items-center gap-5 flex-wrap">
        <ProductThumbs items={order.items} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-black leading-snug truncate">{itemNames}</p>
          <p className="text-xs text-black/40 mt-0.5">{itemSub}</p>
          <p className="text-xs text-black/30 mt-1">
            {order.items.reduce((s, i) => s + i.quantity, 0)} item{order.items.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2 ml-auto flex-shrink-0">
          {order.status === "processing" && (
            <button className="flex items-center gap-1.5 text-[11px] font-bold px-3.5 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors">
              <X className="w-3 h-3" /> Cancel
            </button>
          )}
          {(order.status === "shipped" || order.status === "processing") && (
            <button className="flex items-center gap-1.5 text-[11px] font-bold px-3.5 py-2 rounded-xl border border-maroon/20 text-maroon hover:bg-maroon/5 transition-colors">
              <MapPin className="w-3 h-3" /> Track
            </button>
          )}
          {order.status === "delivered" && (
            <button className="flex items-center gap-1.5 text-[11px] font-bold px-3.5 py-2 rounded-xl bg-maroon text-white hover:bg-maroon/80 transition-colors">
              <RotateCcw className="w-3 h-3" /> Reorder
            </button>
          )}
          <button className="flex items-center gap-1.5 text-[11px] font-bold px-3.5 py-2 rounded-xl border border-maroon/20 text-black/50 hover:text-maroon hover:border-maroon/30 transition-colors">
            <FileText className="w-3 h-3" /> Details
          </button>
        </div>
      </div>

      {/* Track footer */}
      <div className="px-5 pb-4 pt-2 bg-maroon/[0.02] border-t border-maroon/5">
        <TrackBar status={order.status} />
      </div>
    </div>
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────
function EmptyState({ filtered }: { filtered: boolean }) {
  return (
    <div className="flex flex-col items-center py-20 text-center">
      <div className="relative mb-5">
        <div className="w-20 h-20 rounded-3xl bg-maroon/5 border-2 border-maroon/10 flex items-center justify-center">
          <ShoppingBag className="w-9 h-9 text-maroon/30" />
        </div>
        <div className="absolute -top-2 -right-2 w-7 h-7 rounded-xl bg-maroon flex items-center justify-center">
          <AlertCircle className="w-3.5 h-3.5 text-white" />
        </div>
      </div>
      <h3 className="font-bold text-black text-xl mb-2">
        {filtered ? "No orders found" : "No orders yet"}
      </h3>
      <p className="text-black/40 text-sm max-w-xs mb-7 leading-relaxed">
        {filtered
          ? "Try adjusting your filter or search term."
          : "When you place an order, it will appear here."}
      </p>
      {!filtered && (
        <a
          href="/mens-collection"
          className="flex items-center gap-2 bg-maroon hover:bg-maroon/80 text-white font-bold text-xs tracking-wider uppercase px-6 py-3 rounded-2xl transition-all shadow-md hover:shadow-lg"
        >
          <ShoppingBag className="w-4 h-4" /> Shop Now
        </a>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        // ── Replace with real API call ──────────────────────────────
        // const res = await getOrders();
        // if (res?.success) setOrders(res.orders);
        // ───────────────────────────────────────────────────────────
        await new Promise(r => setTimeout(r, 600)); // simulate network
        setOrders(MOCK_ORDERS);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filtered = orders.filter(o => {
    const matchFilter = activeFilter === "all" || o.status === activeFilter;
    const matchSearch = !search
      || o.orderId.toLowerCase().includes(search.toLowerCase())
      || o.items.some(i => i.name.toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchSearch;
  });

  const totalSpent = orders.reduce((s, o) => s + o.total, 0);
  const deliveredCount = orders.filter(o => o.status === "delivered").length;

  const FILTERS: { key: FilterKey; label: string }[] = [
    { key: "all", label: "All" },
    { key: "processing", label: "Processing" },
    { key: "shipped", label: "Shipped" },
    { key: "delivered", label: "Delivered" },
    { key: "cancelled", label: "Cancelled" },
  ];

  if (isLoading) {
    return (
      <>
        <Navbar wishlistCount={0} />
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F8F4F0" }}>
          <div className="text-center">
            <svg className="animate-spin w-10 h-10 mx-auto mb-4 text-maroon" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <p className="text-maroon/60 text-sm">Loading your orders…</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <style>{`
        :root {
          --maroon: #800000;
          --maroon-dark: #5C0000;
        }
        .text-maroon { color: var(--maroon); }
        .bg-maroon { background-color: var(--maroon); }
        .border-maroon { border-color: var(--maroon); }
        .border-maroon\\/8 { border-color: rgba(128,0,0,0.08); }
        .border-maroon\\/5 { border-color: rgba(128,0,0,0.05); }
        .hover\\:bg-maroon\\/80:hover { background-color: rgba(128,0,0,0.8); }
        .hover\\:bg-maroon\\/5:hover { background-color: rgba(128,0,0,0.05); }
        .hover\\:border-maroon\\/20:hover { border-color: rgba(128,0,0,0.2); }
        .hover\\:border-maroon\\/30:hover { border-color: rgba(128,0,0,0.3); }
        .hover\\:text-maroon:hover { color: var(--maroon); }
      `}</style>

      <Navbar wishlistCount={0} />

      <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-8" style={{ backgroundColor: "#F8F4F0" }}>
        <div className="max-w-4xl mx-auto">

          {/* Page header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="h-px w-6 bg-maroon" />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-maroon">Account</span>
            </div>
            <h1 className="text-4xl font-bold italic text-black" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              My Orders
            </h1>
            <p className="text-black/40 text-sm mt-1">
              {orders.length} order{orders.length !== 1 ? "s" : ""} placed
            </p>
          </div>

          {/* Stats */}
          {orders.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { label: "Total orders", value: orders.length },
                { label: "Total spent", value: `$${totalSpent.toLocaleString()}` },
                { label: "Delivered", value: deliveredCount },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white rounded-2xl border border-maroon/10 px-5 py-4">
                  <p className="text-[10px] font-bold tracking-wider uppercase text-black/40 mb-1">{label}</p>
                  <p className="text-2xl font-black text-black">{value}</p>
                </div>
              ))}
            </div>
          )}

          {/* Filters + search */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            {FILTERS.map(f => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`text-xs font-bold px-4 py-2 rounded-full border transition-all ${
                  activeFilter === f.key
                    ? "bg-maroon text-white border-maroon"
                    : "bg-white text-black/50 border-maroon/20 hover:border-maroon/40 hover:text-maroon"
                }`}
              >
                {f.label}
              </button>
            ))}
            <div className="ml-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/30" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search orders…"
                className="pl-8 pr-4 py-2 text-xs font-medium rounded-full border border-maroon/20 bg-white text-black placeholder-black/30 outline-none focus:border-maroon/40 w-48 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black/30 hover:text-maroon"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Orders */}
          {filtered.length === 0 ? (
            <EmptyState filtered={activeFilter !== "all" || !!search} />
          ) : (
            <div className="flex flex-col gap-4">
              {filtered.map(order => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          )}

          {/* Continue shopping link */}
          {orders.length > 0 && (
            <div className="flex justify-center mt-10">
              <a
                href="/mens-collection"
                className="flex items-center gap-1.5 text-xs font-bold text-black/40 hover:text-maroon tracking-wider uppercase transition-colors"
              >
                Continue Shopping <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
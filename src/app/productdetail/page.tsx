"use client";

// ─────────────────────────────────────────────────────────────────────────────
//  ProductDetailPage.tsx
//  Composer — wires ProductImageGallery + ProductInfo + StyleRecommendations
//
//  File structure:
//    components/product-detail/
//      ProductImageGallery.tsx   ← thumbnail strip + main image
//      ProductInfo.tsx           ← title, price, color, size, CTAs, accordions
//      StyleRecommendations.tsx  ← "Complete your look" 4-item grid
//      ProductDetailPage.tsx     ← THIS FILE (composer + seed data)
//
//  Usage in Next.js:
//    app/product/[slug]/page.tsx → <ProductDetailPage />
// ─────────────────────────────────────────────────────────────────────────────

import ProductImageGallery, { GalleryImage } from "@/components/ProductDetail/ProductImageGallery";
import ProductInfo,         { ProductData  } from "@/components/ProductDetail/ProductInfo";
import StyleRecommendations                  from "@/components/ProductDetail/StyleRecommendations";
import { ChevronRight }                      from "lucide-react";

// ── Seed data — swap with real API data ──────────────────────────────────────
const IMAGES: GalleryImage[] = [
  { src: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=85", alt: "Signature Wool Blend Overcoat — front" },
  { src: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=85",    alt: "Fabric texture closeup"                },
  { src: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=85",    alt: "Camel colourway full length"           },
  { src: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=85", alt: "Styled lookbook shot"                  },
];

const PRODUCT: ProductData = {
  badge:       "New Collection",
  viewCount:   50,
  name:        "Signature Wool Blend Overcoat",
  price:       845,
  rating:      4.5,
  reviewCount: 124,
  colors: [
    { name: "Camel Beige", hex: "#c19a6b" },
    { name: "Black",       hex: "#111111" },
    { name: "Olive",       hex: "#6b7c45" },
    { name: "Light Grey",  hex: "#e5e5e5" },
  ],
  sizes:      ["XS", "S", "M", "L", "XL", "XXL"],
  outOfStock: ["XXL"],
  description:
    "A defining piece for the considered wardrobe. Crafted from a 70% virgin wool, 30% cashmere blend, this overcoat offers unparalleled warmth without sacrificing silhouette. Notched lapels, welt pockets, and a clean single-breasted front make it as relevant on the boardroom as on the boulevard.",
  material:
    "70% Virgin Wool · 30% Cashmere. Dry clean only. Store on a wide-shouldered hanger. Avoid prolonged exposure to direct sunlight. Steam to remove creases.",
  shipping:
    "Complimentary standard shipping on all orders (3–7 business days). Express delivery available at checkout (1–2 days). Free 30-day returns — full refund, no questions asked.",
};

export default function ProductDetailPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');
        .font-display { font-family:'Cormorant Garamond',serif; }
        * { font-family:'DM Sans',sans-serif; }
      `}</style>

      <div className="min-h-screen bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

          {/* ── Breadcrumb ── */}
          <nav className="flex items-center gap-1.5 mb-8 flex-wrap">
            {["Home", "Men's Collection", "Outerwear", "Signature Wool Blend Overcoat"].map((c, i, arr) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="w-3 h-3 text-gray-300 flex-shrink-0" />}
                <a
                  href="#"
                  className={`text-[11px] font-bold tracking-widest uppercase transition-colors
                    ${i === arr.length - 1
                      ? "text-[#0f172a] pointer-events-none"
                      : "text-gray-400 hover:text-gray-600"}`}
                >
                  {c}
                </a>
              </span>
            ))}
          </nav>

          {/* ── Main product layout ── */}
          {/* Mobile: stacked | Tablet: 55/45 split | Desktop: 60/40 */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] gap-8 lg:gap-14 xl:gap-20 mb-0">

            {/* Left — image gallery */}
            <div className="w-full">
              <ProductImageGallery images={IMAGES} />
            </div>

            {/* Right — product info */}
            <div className="w-full lg:sticky lg:top-6 lg:self-start">
              <ProductInfo product={PRODUCT} />
            </div>
          </div>
        </div>

        {/* ── Style Recommendations (full-width section) ── */}
        <StyleRecommendations />
      </div>
    </>
  );
}
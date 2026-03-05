"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
//  ProductImageGallery.tsx
//  Vertical thumbnail strip (left) + large main image (right)
//  Mobile: horizontal swipe strip at bottom
// ─────────────────────────────────────────────────────────────────────────────

export interface GalleryImage {
  src: string;
  alt: string;
}

interface Props {
  images: GalleryImage[];
}

export default function ProductImageGallery({ images }: Props) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const prev = () => setActive(i => (i - 1 + images.length) % images.length);
  const next = () => setActive(i => (i + 1) % images.length);

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">

      {/* ── Thumbnail strip ── */}
      {/* Mobile: horizontal row at bottom | Desktop: vertical column left */}
      <div className="flex flex-row sm:flex-col gap-2 sm:gap-3 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200
              w-[68px] h-[68px] sm:w-[80px] sm:h-[90px]
              ${i === active
                ? "border-[#0f172a] shadow-md scale-[1.02]"
                : "border-transparent hover:border-gray-300"}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover object-top"
            />
          </button>
        ))}
      </div>

      {/* ── Main image ── */}
      <div className="relative flex-1 rounded-2xl overflow-hidden bg-[#f0f0ee] group"
        style={{ aspectRatio: "3/4", minHeight: "320px" }}
      >
        <img
          src={images[active].src}
          alt={images[active].alt}
          className={`w-full h-full object-cover object-top transition-all duration-500
            ${zoomed ? "scale-150 cursor-zoom-out" : "group-hover:scale-[1.02] cursor-zoom-in"}`}
          onClick={() => setZoomed(!zoomed)}
        />

        {/* Zoom hint */}
        {!zoomed && (
          <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm
            flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-4 h-4 text-[#0f172a]" />
          </div>
        )}

        {/* Prev / Next arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full
                bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center
                opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110"
            >
              <ChevronLeft className="w-4 h-4 text-[#0f172a]" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full
                bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center
                opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110"
            >
              <ChevronRight className="w-4 h-4 text-[#0f172a]" />
            </button>
          </>
        )}

        {/* Dot indicators — mobile only */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:hidden">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-200
                ${i === active ? "w-5 h-1.5 bg-[#0f172a]" : "w-1.5 h-1.5 bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
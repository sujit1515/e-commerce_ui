"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

// ── Data — swap images / labels freely ───────────────────────────────────────
const CATEGORIES = [
  {
    label: "Men",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=85",
    bg: "#1a4a3a",
    span: "col-span-2 sm:col-span-1",   // first card is taller on mobile
    tall: true,
  },
  {
    label: "Women",
    img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=85",
    bg: "#f0e8d8",
    span: "col-span-2 sm:col-span-1",
    tall: false,
  },
  {
    label: "Kid",
    img: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&q=85",
    bg: "#e8e0d0",
    span: "col-span-2 sm:col-span-1",
    tall: false,
  },
  {
    label: "GenZ",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=85",
    bg: "#f5f0e8",
    span: "col-span-2 sm:col-span-1",
    tall: false,
  },
];

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

export default function ShopByCategory() {
  const { ref: headRef, vis: headVis } = useFadeIn();

  return (
    <section className="bg-[#f2f3f5] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header row ── */}
        <div
          ref={headRef}
          className={`flex items-end justify-between mb-6 sm:mb-8 transition-all duration-700
            ${headVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          <div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-[#0f172a] leading-tight">
              Shop by Category
            </h2>
            {/* Blue underline accent */}
            <div className="mt-1.5 h-[3px] w-16 bg-blue-600 rounded-full" />
          </div>
          <a
            href="/categories"
            className="flex items-center gap-1.5 text-blue-700 hover:text-blue-900 text-xs sm:text-sm font-extrabold tracking-wider uppercase transition-colors group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* ── Category grid ── */}
        {/* Mobile: 2-col grid  |  sm+: 4-col grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.label} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Individual card ───────────────────────────────────────────────────────────
function CategoryCard({
  cat,
  index,
}: {
  cat: (typeof CATEGORIES)[0];
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <a
      ref={ref}
      href={`/category/${cat.label.toLowerCase()}`}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer block
        transition-all duration-500 hover:-translate-y-1 hover:shadow-xl
        ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{
        transitionDelay: vis ? `${index * 80}ms` : "0ms",
        aspectRatio: "3 / 4",
        backgroundColor: cat.bg,
      }}
    >
      {/* Product image — centered, cover */}
      <img
        src={cat.img}
        alt={cat.label}
        className="absolute inset-0 w-full h-full object-cover object-top
          group-hover:scale-105 transition-transform duration-700 ease-out"
        loading="lazy"
      />

      {/* Subtle bottom gradient for label legibility */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)",
        }}
      />

      {/* Category label */}
      <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
        <span className="text-white font-black text-lg sm:text-xl lg:text-2xl drop-shadow-md tracking-tight">
          {cat.label}
        </span>
      </div>

      {/* Hover shine sweep */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
        }}
      />
    </a>
  );
}
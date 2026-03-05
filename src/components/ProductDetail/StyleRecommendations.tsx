"use client";
import { useEffect, useRef, useState } from "react";
import { ShoppingCart } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
//  StyleRecommendations.tsx  (Screenshot 2)
//  "Style Recommendations · Complete Your Look" section
//  Reusable: edit RECOMMENDATIONS array
// ─────────────────────────────────────────────────────────────────────────────

interface Recommendation {
  name:  string;
  price: number;
  img:   string;
}

const RECOMMENDATIONS: Recommendation[] = [
  { name: "Cashmere Turtleneck",  price: 295,   img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=85" },
  { name: "Raw Edge Denim",       price: 185,   img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=85" },
  { name: "Chelsea Leather Boots",price: 450,   img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=85" },
  { name: "Heritage Gold Watch",  price: 1250,  img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=85" },
];

function RecommendCard({ item, delay }: { item: Recommendation; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      ref={ref}
      className={`group flex flex-col transition-all duration-500 cursor-pointer
        ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: vis ? `${delay}ms` : "0ms" }}
    >
      {/* Image */}
      <div
        className="relative rounded-2xl overflow-hidden bg-[#f0f0ee] mb-4 hover:-translate-y-1 transition-transform duration-300"
        style={{ aspectRatio: "3/4" }}
      >
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-cover object-top
            group-hover:scale-[1.04] transition-transform duration-700 ease-out"
        />
        {/* Quick add */}
        <div className="absolute bottom-0 inset-x-0 p-3
          translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button
            onClick={handleAdd}
            className="w-full bg-[#0f172a]/90 backdrop-blur-sm text-white text-[10px]
              font-bold tracking-widest uppercase py-2.5 rounded-xl
              flex items-center justify-center gap-2 hover:bg-[#0f172a] transition-colors"
          >
            <ShoppingCart className="w-3 h-3" />
            {added ? "Added ✓" : "Quick Add"}
          </button>
        </div>
      </div>
      {/* Info */}
      <h3 className="font-bold text-[#0f172a] text-sm leading-snug mb-1">{item.name}</h3>
      <p className="font-black text-[#0f172a] text-base">${item.price.toLocaleString()}.00</p>
    </div>
  );
}

export default function StyleRecommendations() {
  const headRef = useRef<HTMLDivElement>(null);
  const [headVis, setHeadVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeadVis(true); },
      { threshold: 0.2 }
    );
    if (headRef.current) obs.observe(headRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-[#f8f9fb] py-16 sm:py-20 mt-16 sm:mt-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div
          ref={headRef}
          className={`text-center mb-12 transition-all duration-700
            ${headVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <h2 className="font-display font-bold text-[#0f172a] text-3xl sm:text-4xl mb-2">
            Style Recommendations
          </h2>
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-gray-400">
            Complete Your Look
          </p>
        </div>

        {/* Grid — 2 cols mobile, 4 cols desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {RECOMMENDATIONS.map((item, i) => (
            <RecommendCard key={i} item={item} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
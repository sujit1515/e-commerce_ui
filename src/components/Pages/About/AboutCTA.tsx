"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function AboutCTA() {
  const ref              = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-20 sm:py-28 bg-[#0f172a] relative overflow-hidden">
      {/* Subtle background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=70"
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/95 to-[#0f172a]/80" />
      </div>

      {/* Top / bottom accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          ref={ref}
          className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-6 bg-blue-500" />
            <span className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase">Join LUXE</span>
            <div className="h-px w-6 bg-blue-500" />
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Own Something
            <br />
            <span className="italic text-blue-400">Worth Keeping</span>
          </h2>

          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Join 2.4 million discerning individuals who've chosen craftsmanship over convenience,
            intention over impulse, and quality that only improves with time.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/shop"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-blue-900/40 text-sm"
            >
              Shop the Collection <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/journal"
              className="flex items-center gap-2 border border-white/15 text-white hover:bg-white/5 font-semibold px-8 py-4 rounded-xl transition-all text-sm"
            >
              Read Our Journal
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";
import { useEffect, useRef, useState } from "react";
import { Quote, Star } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────
interface Testimonial {
  quote: string;
  author: string;
  role: string;
  stars: number;
}

// ── Data ─────────────────────────────────────────────────────────────────────
const TESTIMONIALS: Testimonial[] = [
  {
    quote:  "LUXE redefined what luxury means to me. Not excess — but precision, intention, and beauty that endures.",
    author: "Camille D.",
    role:   "Paris, France",
    stars:  5,
  },
  {
    quote:  "I've owned pieces from every major house. Nothing compares to the craftsmanship and soul LUXE puts into every item.",
    author: "James T.",
    role:   "New York, USA",
    stars:  5,
  },
  {
    quote:  "The sustainability commitment isn't marketing fluff — it's woven into every thread, every decision.",
    author: "Priya M.",
    role:   "Mumbai, India",
    stars:  5,
  },
];

// ── Single testimonial card ──────────────────────────────────────────────────
function TestimonialCard({ t, index, delay }: { t: Testimonial; index: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const isDark = index === 1; // centre card inverted for hierarchy

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`h-full rounded-2xl p-7 sm:p-8 border flex flex-col
        transition-all duration-500 hover:-translate-y-1.5
        ${isDark ? "bg-black border-white/10 shadow-xl shadow-red-900/20" : "bg-white border-gray-200 hover:shadow-lg"}
        ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: vis ? `${delay}ms` : "0ms" }}
    >
      <Quote className={`w-7 h-7 mb-4 flex-shrink-0 ${isDark ? "text-red-500/40" : "text-red-200"}`} />

      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: t.stars }).map((_, j) => (
          <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
        ))}
      </div>

      <p className={`text-sm sm:text-base leading-relaxed mb-6 flex-1 font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}>
        "{t.quote}"
      </p>

      <div className={`flex items-center gap-3 pt-5 border-t ${isDark ? "border-white/[0.07]" : "border-gray-200"}`}>
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${isDark ? "bg-red-600 text-white" : "bg-black text-white"}`}
        >
          {t.author[0]}
        </div>
        <div>
          <p className={`text-sm font-bold ${isDark ? "text-white" : "text-black"}`}>{t.author}</p>
          <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{t.role}</p>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AboutTestimonials() {
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
    <section className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          ref={headRef}
          className={`text-center mb-14 transition-all duration-700 ${headVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-6 bg-red-600" />
            <span className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase">Voices</span>
            <div className="h-px w-6 bg-red-600" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight">
            Worn Around
            <br />
            <span className="italic text-red-600">the World</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
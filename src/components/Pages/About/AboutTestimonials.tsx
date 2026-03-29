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
        ${isDark ? "bg-black border-maroon/20 shadow-xl shadow-maroon/20" : "bg-white border-maroon/10 hover:shadow-lg"}
        ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ 
        transitionDelay: vis ? `${delay}ms` : "0ms",
        boxShadow: isDark ? "0 20px 25px -12px rgba(128, 0, 0, 0.2)" : ""
      }}
    >
      <Quote className={`w-7 h-7 mb-4 flex-shrink-0 ${isDark ? "text-maroon/40" : "text-maroon/30"}`} style={{ color: isDark ? "rgba(128, 0, 0, 0.4)" : "rgba(128, 0, 0, 0.3)" }} />

      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: t.stars }).map((_, j) => (
          <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
        ))}
      </div>

      <p className={`text-sm sm:text-base leading-relaxed mb-6 flex-1 font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}>
        "{t.quote}"
      </p>

      <div className={`flex items-center gap-3 pt-5 border-t ${isDark ? "border-maroon/20" : "border-maroon/10"}`}>
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${isDark ? "bg-maroon text-white" : "bg-maroon text-white"}`}
          style={{ backgroundColor: "#800000" }}
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
    <section className="py-20 sm:py-28 overflow-hidden" style={{ backgroundColor: "#F8F4F0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          ref={headRef}
          className={`text-center mb-14 transition-all duration-700 ${headVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-6" style={{ backgroundColor: "#800000" }} />
            <span className="text-maroon text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "#800000" }}>Voices</span>
            <div className="h-px w-6" style={{ backgroundColor: "#800000" }} />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            <span style={{ color: "#000000" }}>Worn Around</span>
            <br />
            <span className="italic" style={{ color: "#800000" }}>the World</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} delay={i * 100} />
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&display=swap');
        
        .font-display {
          font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif !important;
        }
        
        .text-maroon {
          color: #800000 !important;
        }
        
        .bg-maroon {
          background-color: #800000 !important;
        }
        
        .border-maroon\\/10 {
          border-color: rgba(128, 0, 0, 0.1) !important;
        }
        
        .border-maroon\\/20 {
          border-color: rgba(128, 0, 0, 0.2) !important;
        }
        
        .hover\\:shadow-maroon\\/20:hover {
          box-shadow: 0 20px 25px -12px rgba(128, 0, 0, 0.2) !important;
        }
        
        /* Card hover effects */
        .group:hover {
          transform: translateY(-6px);
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .p-7 {
            padding: 1.25rem !important;
          }
          .text-4xl {
            font-size: 2rem !important;
          }
          .gap-5 {
            gap: 1rem !important;
          }
        }
        
        @media (min-width: 641px) and (max-width: 768px) {
          .text-4xl {
            font-size: 2.5rem !important;
          }
        }
        
        /* Smooth transitions */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Quote icon animation */
        .group:hover .w-7 {
          transform: scale(1.1);
          transition: transform 0.3s ease;
        }
        
        /* Star rating animation */
        .group:hover .fill-amber-400 {
          animation: pulse 0.5s ease;
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }
        
        /* Card hover shadow enhancement */
        .bg-white:hover {
          box-shadow: 0 20px 25px -12px rgba(128, 0, 0, 0.15);
        }
      `}</style>
    </section>
  );
}
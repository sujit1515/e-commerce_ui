"use client";
import { useEffect, useRef, useState } from "react";
import { Award, Leaf, Zap, Globe, LucideIcon } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────
interface Value {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: "maroon" | "maroon-dark" | "maroon-light" | "maroon-bright";
}

// ── Data ─────────────────────────────────────────────────────────────────────
const VALUES: Value[] = [
  {
    icon: Award,
    title: "Uncompromising Quality",
    desc: "Every piece passes through 47 quality checkpoints before reaching your door. We source only the finest materials from certified suppliers worldwide.",
    color: "maroon",
  },
  {
    icon: Leaf,
    title: "Sustainable by Design",
    desc: "Carbon-neutral shipping, recycled packaging, and ethical manufacturing. Our planet matters as much as our craft.",
    color: "maroon-dark",
  },
  {
    icon: Zap,
    title: "Innovative Craft",
    desc: "Tradition meets technology. Our artisans blend centuries-old techniques with modern precision to create pieces built for tomorrow.",
    color: "maroon-light",
  },
  {
    icon: Globe,
    title: "Global Community",
    desc: "From São Paulo to Seoul, the LUXE community spans 180 countries. Diverse perspectives shape every collection we create.",
    color: "maroon-bright",
  },
];

// ── Color map - Updated to maroon ─────────────────────────────────────────────────────────────────
const COLOR: Record<string, { bg: string; border: string; icon: string; shadow: string }> = {
  maroon:       { bg: "bg-maroon/10",    border: "border-maroon/20",    icon: "text-maroon",    shadow: "hover:shadow-maroon/10"    },
  "maroon-dark": { bg: "bg-maroon-dark/10", border: "border-maroon-dark/20", icon: "text-maroon-dark", shadow: "hover:shadow-maroon-dark/10"    },
  "maroon-light": { bg: "bg-maroon-light/10", border: "border-maroon-light/20", icon: "text-maroon-light", shadow: "hover:shadow-maroon-light/10"    },
  "maroon-bright": { bg: "bg-maroon/10",  border: "border-maroon/20",    icon: "text-maroon",    shadow: "hover:shadow-maroon/10"    },
};

// ── Card ──────────────────────────────────────────────────────────────────────
function ValueCard({ v, delay }: { v: Value; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const c = COLOR[v.color];
  const Icon = v.icon;

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
      className={`group h-full rounded-2xl p-6 shadow-sm hover:shadow-xl cursor-default
        transition-all duration-500 hover:-translate-y-1.5
        ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ 
        transitionDelay: vis ? `${delay}ms` : "0ms",
        backgroundColor: "#F8F4F0",
        border: "1px solid rgba(128, 0, 0, 0.1)"
      }}
    >
      <div className={`w-12 h-12 ${c.bg} ${c.border} border rounded-xl flex items-center justify-center mb-5`}>
        <Icon className={`w-5 h-5 ${c.icon}`} />
      </div>
      <h3 className="font-bold text-black text-base mb-3">{v.title}</h3>
      <p className="text-gray-700 text-sm leading-relaxed">{v.desc}</p>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AboutValues() {
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
    <section className="py-20 sm:py-28" style={{ backgroundColor: "#F8F4F0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          ref={headRef}
          className={`text-center mb-14 sm:mb-18 transition-all duration-700 ${headVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-6" style={{ backgroundColor: "#800000" }} />
            <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "#800000" }}>
              What We Stand For
            </span>
            <div className="h-px w-6" style={{ backgroundColor: "#800000" }} />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: "#000000" }}>
            Principles That
            <br />
            <span className="italic" style={{ color: "#800000" }}>Shape Everything</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v, i) => (
            <ValueCard key={i} v={v} delay={i * 100} />
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&display=swap');
        
        .font-display {
          font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif !important;
        }
        
        /* Maroon color utilities */
        .text-maroon { color: #800000 !important; }
        .text-maroon-dark { color: #5C0000 !important; }
        .text-maroon-light { color: #9D2A2A !important; }
        
        .bg-maroon\\/10 { background-color: rgba(128, 0, 0, 0.1) !important; }
        .bg-maroon-dark\\/10 { background-color: rgba(92, 0, 0, 0.1) !important; }
        .bg-maroon-light\\/10 { background-color: rgba(157, 42, 42, 0.1) !important; }
        
        .border-maroon\\/20 { border-color: rgba(128, 0, 0, 0.2) !important; }
        .border-maroon-dark\\/20 { border-color: rgba(92, 0, 0, 0.2) !important; }
        .border-maroon-light\\/20 { border-color: rgba(157, 42, 42, 0.2) !important; }
        
        .hover\\:shadow-maroon\\/10:hover { box-shadow: 0 10px 25px -5px rgba(128, 0, 0, 0.1), 0 8px 10px -6px rgba(128, 0, 0, 0.05) !important; }
        .hover\\:shadow-maroon-dark\\/10:hover { box-shadow: 0 10px 25px -5px rgba(92, 0, 0, 0.1), 0 8px 10px -6px rgba(92, 0, 0, 0.05) !important; }
        .hover\\:shadow-maroon-light\\/10:hover { box-shadow: 0 10px 25px -5px rgba(157, 42, 42, 0.1), 0 8px 10px -6px rgba(157, 42, 42, 0.05) !important; }
        
        /* Card hover effects */
        .group:hover {
          border-color: rgba(128, 0, 0, 0.3) !important;
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .text-4xl {
            font-size: 2rem !important;
          }
          .p-6 {
            padding: 1.25rem !important;
          }
          .gap-5 {
            gap: 1rem !important;
          }
        }
        
        /* Animation keyframes */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Smooth transitions */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Hover icon animation */
        .group:hover .w-5.h-5 {
          transform: scale(1.1);
          transition: transform 0.3s ease;
        }
        
        /* Card inner glow effect */
        .group {
          position: relative;
          overflow: hidden;
        }
        
        .group::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(128, 0, 0, 0.05), transparent);
          transition: left 0.5s ease;
        }
        
        .group:hover::before {
          left: 100%;
        }
      `}</style>
    </section>
  );
}
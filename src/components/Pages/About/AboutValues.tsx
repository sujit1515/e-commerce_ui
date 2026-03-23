"use client";
import { useEffect, useRef, useState } from "react";
import { Award, Leaf, Zap, Globe, LucideIcon } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────
interface Value {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: "red" | "red-dark" | "red-light" | "red-bright";
}

// ── Data ─────────────────────────────────────────────────────────────────────
const VALUES: Value[] = [
  {
    icon: Award,
    title: "Uncompromising Quality",
    desc: "Every piece passes through 47 quality checkpoints before reaching your door. We source only the finest materials from certified suppliers worldwide.",
    color: "red",
  },
  {
    icon: Leaf,
    title: "Sustainable by Design",
    desc: "Carbon-neutral shipping, recycled packaging, and ethical manufacturing. Our planet matters as much as our craft.",
    color: "red-dark",
  },
  {
    icon: Zap,
    title: "Innovative Craft",
    desc: "Tradition meets technology. Our artisans blend centuries-old techniques with modern precision to create pieces built for tomorrow.",
    color: "red-light",
  },
  {
    icon: Globe,
    title: "Global Community",
    desc: "From São Paulo to Seoul, the LUXE community spans 180 countries. Diverse perspectives shape every collection we create.",
    color: "red-bright",
  },
];

// ── Color map ─────────────────────────────────────────────────────────────────
const COLOR: Record<string, { bg: string; border: string; icon: string; shadow: string }> = {
  red:       { bg: "bg-red-500/10",    border: "border-red-500/20",    icon: "text-red-600",    shadow: "hover:shadow-red-500/10"    },
  "red-dark": { bg: "bg-red-700/10",    border: "border-red-700/20",    icon: "text-red-700",    shadow: "hover:shadow-red-700/10"    },
  "red-light": { bg: "bg-red-400/10",   border: "border-red-400/20",    icon: "text-red-500",    shadow: "hover:shadow-red-400/10"    },
  "red-bright": { bg: "bg-red-600/10",  border: "border-red-600/20",    icon: "text-red-600",    shadow: "hover:shadow-red-600/10"    },
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
      className={`group h-full bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl ${c.shadow} cursor-default
        transition-all duration-500 hover:-translate-y-1.5
        ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: vis ? `${delay}ms` : "0ms" }}
    >
      <div className={`w-12 h-12 ${c.bg} ${c.border} border rounded-xl flex items-center justify-center mb-5`}>
        <Icon className={`w-5 h-5 ${c.icon}`} />
      </div>
      <h3 className="font-bold text-black text-base mb-3">{v.title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
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
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          ref={headRef}
          className={`text-center mb-14 sm:mb-18 transition-all duration-700 ${headVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-6 bg-red-600" />
            <span className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase">
              What We Stand For
            </span>
            <div className="h-px w-6 bg-red-600" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight">
            Principles That
            <br />
            <span className="italic text-red-600">Shape Everything</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v, i) => (
            <ValueCard key={i} v={v} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
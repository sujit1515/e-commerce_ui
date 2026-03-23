"use client";
import { useEffect, useRef, useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
interface Milestone {
  year: string;
  title: string;
  desc: string;
}

// ── Data ─────────────────────────────────────────────────────────────────────
const MILESTONES: Milestone[] = [
  { year: "2012", title: "The Beginning",          desc: "Eleanor Voss launches LUXE from a 400 sq ft studio in Paris with a single collection of 12 pieces." },
  { year: "2015", title: "First Million",           desc: "LUXE crosses 1M customers. First flagship store opens on Rue du Faubourg Saint-Honoré." },
  { year: "2018", title: "Global Expansion",        desc: "Operations expand to 40 countries. LUXE becomes carbon-neutral, years ahead of industry standards." },
  { year: "2021", title: "Digital Transformation",  desc: "Launch of the LUXE digital platform, merging editorial storytelling with seamless commerce." },
  { year: "2024", title: "New Horizons",            desc: "2.4 million customers across 180 countries. LUXE named #1 luxury lifestyle brand by Condé Nast." },
];

// ── Single milestone card ────────────────────────────────────────────────────
function MilestoneCard({ m, index }: { m: Milestone; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const isRight = index % 2 === 1; // alternates left / right on desktop

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-8 items-center mb-10 lg:mb-0">

      {/* ── Desktop left column ── */}
      <div className={`hidden lg:block ${isRight ? "lg:col-start-3" : "lg:col-start-1"}`}>
        <div
          className={`bg-black/40 border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-red-500/30 hover:bg-black/60
            transition-all duration-500 ${isRight ? "text-left" : "text-right"}
            ${vis ? "opacity-100 translate-x-0" : `opacity-0 ${isRight ? "translate-x-8" : "-translate-x-8"}`}`}
          style={{ transitionDelay: vis ? "100ms" : "0ms" }}
        >
          <span className="inline-block text-red-500 text-xs font-bold tracking-widest mb-2">{m.year}</span>
          <h3 className="font-bold text-white text-lg sm:text-xl mb-2">{m.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{m.desc}</p>
        </div>
      </div>

      {/* ── Center dot (desktop) ── */}
      <div className="hidden lg:flex lg:col-start-2 items-center justify-center">
        <div
          className={`w-11 h-11 rounded-full bg-red-600 border-4 border-black shadow-lg shadow-red-600/40 flex items-center justify-center z-10
            transition-all duration-500 ${vis ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
        >
          <div className="w-3 h-3 rounded-full bg-red-200" />
        </div>
      </div>

      {/* ── Desktop right spacer (keeps grid balanced) ── */}
      {!isRight && <div className="hidden lg:block lg:col-start-3" />}
      {isRight  && <div className="hidden lg:block lg:col-start-1" />}

      {/* ── Mobile layout ── */}
      <div className="lg:hidden">
        {/* Mobile dot + line */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-red-600/30">
            <div className="w-2.5 h-2.5 rounded-full bg-red-200" />
          </div>
          <span className="text-red-500 text-xs font-bold tracking-widest">{m.year}</span>
          <div className="h-px flex-1 bg-red-500/20" />
        </div>

        <div
          className={`bg-black/40 border border-white/10 rounded-2xl p-5
            transition-all duration-500 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: vis ? "80ms" : "0ms" }}
        >
          <h3 className="font-bold text-white text-base mb-1.5">{m.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{m.desc}</p>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AboutTimeline() {
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
    <section className="py-20 sm:py-28 bg-black relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px,transparent 1px),linear-gradient(90deg,#ffffff 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          ref={headRef}
          className={`text-center mb-14 sm:mb-20 transition-all duration-700 ${headVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-6 bg-red-600" />
            <span className="text-red-500 text-xs font-bold tracking-[0.3em] uppercase">Our Journey</span>
            <div className="h-px w-6 bg-red-600" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            A Decade of
            <br />
            <span className="italic text-red-500">Milestones</span>
          </h2>
        </div>

        {/* Timeline wrapper — desktop center line */}
        <div className="relative">
          {/* Vertical line on desktop only */}
          <div
            className="hidden lg:block absolute left-1/2 -translate-x-px top-6 bottom-6 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, #ef4444 15%, #ef4444 85%, transparent)",
            }}
          />

          <div className="space-y-6 lg:space-y-14">
            {MILESTONES.map((m, i) => (
              <MilestoneCard key={i} m={m} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
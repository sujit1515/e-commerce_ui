"use client";
import { useEffect, useRef, useState } from "react";

export default function PhilosophySection() {
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

  return (
    <section className="bg-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px] sm:min-h-[640px] lg:min-h-[720px]">

        {/* ── LEFT — product image panel ─────────────────────────────── */}
        <div className="relative bg-[#f0f0ee] flex items-end justify-center overflow-hidden min-h-[380px] sm:min-h-[480px] lg:min-h-full">
          {/* Subtle inner shadow right edge on desktop */}
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/[0.04] to-transparent pointer-events-none hidden lg:block" />

          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=85"
            alt="Philosophy product"
            className="relative z-10 h-[90%] w-auto object-contain object-bottom
              scale-100 hover:scale-[1.03] transition-transform duration-700 ease-out
              drop-shadow-lg"
          />
        </div>

        {/* ── RIGHT — text content ────────────────────────────────────── */}
        <div
          ref={ref}
          className="relative flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 py-14 lg:py-0 overflow-hidden"
        >

          {/* Giant watermark "1os" behind text */}
          <span
            className={`absolute right-0 top-1/2 -translate-y-1/2 font-display font-black select-none pointer-events-none
              text-[160px] sm:text-[220px] lg:text-[260px] xl:text-[300px] leading-none
              text-[#0f172a]/[0.04] transition-all duration-1000
              ${vis ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"}`}
            aria-hidden
          >
            1os
          </span>

          {/* Content */}
          <div className="relative z-10 max-w-xl">

            {/* Eyebrow */}
            <p
              className={`text-blue-600 text-[11px] font-bold tracking-[0.28em] uppercase mb-6
                transition-all duration-700 delay-[100ms]
                ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              Our Philosophy
            </p>

            {/* Headline */}
            <h2
              className={`font-display font-bold text-[#0f172a] leading-[0.9] mb-7
                text-[52px] sm:text-[68px] lg:text-[72px] xl:text-[84px]
                transition-all duration-700 delay-[200ms]
                ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              Form
              <br />
              <span className="italic">&amp; Function</span>
            </h2>

            {/* Quote */}
            <p
              className={`font-display italic text-[#0f172a]/40 text-base sm:text-lg lg:text-xl leading-relaxed mb-10 max-w-md
                transition-all duration-700 delay-[320ms]
                ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              "True luxury is found in the restraint of design and the excellence of material."
            </p>

            {/* Stats row */}
            <div
              className={`flex items-start gap-10 sm:gap-16 transition-all duration-700 delay-[440ms]
                ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              {[
                { value: "100%", label: "Traceable Silk" },
                { value: "Zero", label: "Waste Policy"   },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display font-black text-[#0f172a] text-3xl sm:text-4xl leading-none mb-1.5">
                    {s.value}
                  </p>
                  <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-gray-400">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
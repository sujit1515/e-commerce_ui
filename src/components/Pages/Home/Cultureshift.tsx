"use client";
import { useEffect, useRef, useState } from "react";

const CONTENT = {
  badge:    "Editorial",
  headline: { line1: "CULTURE", line2: "SHIFT" },
  quote:    "Bold, expressive, and unapologetically conscious. For the generation that demands transparency as much as style.",
  volume:   "Volume 04 / Digital Nomads",
  img:      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=85",
  imgAlt:   "GenZ Editorial — Culture Shift",
};

export default function CultureShift() {
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
    <section className="bg-white py-12 sm:py-16 lg:py-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-0
            min-h-[480px] sm:min-h-[560px] lg:min-h-[640px]"
        >

          {/* ── LEFT — text ── */}
          <div className="flex flex-col justify-center pr-0 lg:pr-12 xl:pr-20">

            {/* Badge pill */}
            <div
              className={`inline-flex mb-6 transition-all duration-600 delay-[60ms]
                ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <span className="bg-blue-600 text-white text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm">
                {CONTENT.badge}
              </span>
            </div>

            {/* Headline */}
            <div
              className={`mb-8 transition-all duration-700 delay-[140ms]
                ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              {/* Line 1 — dark navy italic */}
              <h2
                className="font-black italic text-[#0f172a] leading-[0.9] tracking-tight
                  text-[56px] sm:text-[72px] md:text-[80px] lg:text-[84px] xl:text-[96px]"
              >
                {CONTENT.headline.line1}
              </h2>
              {/* Line 2 — solid blue, same weight */}
              <h2
                className="font-black italic text-blue-600 leading-[0.9] tracking-tight
                  text-[56px] sm:text-[72px] md:text-[80px] lg:text-[84px] xl:text-[96px]"
              >
                {CONTENT.headline.line2}
              </h2>
            </div>

            {/* Quote with left blue border */}
            <div
              className={`border-l-4 border-blue-600 pl-5 mb-8 transition-all duration-700 delay-[240ms]
                ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              <p className="text-[#0f172a] font-bold text-sm sm:text-base leading-relaxed max-w-sm">
                {CONTENT.quote}
              </p>
            </div>

            {/* Volume label */}
            <p
              className={`text-blue-600 text-[11px] font-bold tracking-[0.22em] uppercase
                transition-all duration-700 delay-[320ms]
                ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              {CONTENT.volume}
            </p>
          </div>

          {/* ── RIGHT — image ── */}
          <div
            className={`flex justify-center lg:justify-end transition-all duration-700 delay-[100ms]
              ${vis ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <div
              className="relative w-full max-w-[420px] lg:max-w-none lg:w-[90%] xl:w-[88%]
                rounded-2xl overflow-hidden shadow-lg group"
              style={{ aspectRatio: "3 / 4" }}
            >
              <img
                src={CONTENT.img}
                alt={CONTENT.imgAlt}
                className="w-full h-full object-cover object-top
                  group-hover:scale-[1.04] transition-transform duration-700 ease-out"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
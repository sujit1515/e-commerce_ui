"use client";
import { useEffect, useRef, useState } from "react";

// ── Data — edit freely ────────────────────────────────────────────────────────
const CONTENT = {
  eyebrow:   "Men's Essential",
  headline:  ["LINEAR", "PRECISION"],
  body:      "Minimalist tailoring for the contemporary visionary. Our menswear line focuses on the intersection of technical innovation and traditional craftsmanship, providing a wardrobe that transitions seamlessly through the urban landscape.",
  img:       "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=900&q=85",
  imgAlt:    "Men's Essential — Linear Precision",
};

export default function LinearPrecision() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-0 min-h-[480px] sm:min-h-[560px] lg:min-h-[640px]">

          {/* ── LEFT — text ── */}
          <div
            ref={ref}
            className={`flex flex-col justify-center pr-0 lg:pr-16 xl:pr-24
              transition-all duration-700
              ${vis ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            {/* Eyebrow */}
            <p
              className={`text-blue-600 text-[11px] font-bold tracking-[0.28em] uppercase mb-5
                transition-all duration-600 delay-[60ms]
                ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              {CONTENT.eyebrow}
            </p>

            {/* Headline */}
            <div
              className={`mb-5 transition-all duration-700 delay-[140ms]
                ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              {CONTENT.headline.map((line, i) => (
                <h2
                  key={i}
                  className="font-black text-[#0f172a] leading-[0.88] tracking-tight
                    text-[52px] sm:text-[68px] lg:text-[72px] xl:text-[84px]"
                >
                  {line}
                </h2>
              ))}
            </div>

            {/* Divider */}
            <div
              className={`w-16 h-[2px] bg-[#0f172a] mb-7 transition-all duration-700 delay-[220ms]
                ${vis ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`}
              style={{ transformOrigin: "left" }}
            />

            {/* Body */}
            <p
              className={`text-gray-500 text-sm sm:text-base leading-relaxed max-w-sm
                transition-all duration-700 delay-[300ms]
                ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              {CONTENT.body}
            </p>
          </div>

          {/* ── RIGHT — image ── */}
          <div
            className={`relative flex justify-center lg:justify-end
              transition-all duration-800 delay-[100ms]
              ${vis ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            {/* Card */}
            <div className="relative w-full max-w-[480px] lg:max-w-none lg:w-[90%] xl:w-[85%]
              rounded-2xl overflow-hidden shadow-xl group"
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
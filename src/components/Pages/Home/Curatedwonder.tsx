"use client";
import { useEffect, useRef, useState } from "react";

const CONTENT = {
  eyebrow: "The Little Luxe",
  headline: ["Curated", "Wonder"],
  body: "Premium aesthetics meet playful resilience. We believe style should have no age limit. Our children's collection features the same ethically sourced organic cottons and merino wools found in our adult lines, tailored for the leaders of tomorrow.",
  img: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&q=85",
  imgAlt: "Kids collection — Curated Wonder",
};

export default function CuratedWonder() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Auto-advance dot indicator
  useEffect(() => {
    const t = setInterval(() => setSlide(p => (p + 1) % 3), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16"
        >

          {/* ── LEFT — circular image ── */}
          <div
            className={`flex justify-center lg:justify-start transition-all duration-700
              ${vis ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            {/* Outer circle bg */}
            <div
              className="relative rounded-full bg-[#ecedf2] flex items-center justify-center overflow-hidden
                w-[280px] h-[280px] xs:w-[320px] xs:h-[320px] sm:w-[380px] sm:h-[380px]
                md:w-[420px] md:h-[420px] lg:w-[460px] lg:h-[460px] xl:w-[500px] xl:h-[500px]"
            >
              <img
                src={CONTENT.img}
                alt={CONTENT.imgAlt}
                className="w-full h-full object-cover object-center
                  hover:scale-[1.04] transition-transform duration-700 ease-out"
              />
            </div>
          </div>

          {/* ── RIGHT — text ── */}
          <div className="flex flex-col justify-center">

            {/* Eyebrow */}
            <p
              className={`text-blue-600 text-[11px] font-bold tracking-[0.28em] uppercase mb-5
                transition-all duration-600 delay-[80ms]
                ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              {CONTENT.eyebrow}
            </p>

            {/* Headline */}
            <div
              className={`mb-6 transition-all duration-700 delay-[160ms]
                ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              {CONTENT.headline.map((line, i) => (
                <h2
                  key={i}
                  className="font-display font-bold text-[#0f172a] leading-[0.95]
                    text-[52px] sm:text-[64px] lg:text-[68px] xl:text-[78px]"
                >
                  {line}
                </h2>
              ))}
            </div>

            {/* Body */}
            <p
              className={`text-gray-500 text-sm sm:text-base leading-relaxed max-w-lg mb-10
                transition-all duration-700 delay-[240ms]
                ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              {CONTENT.body}
            </p>

            {/* Dot indicators */}
            <div
              className={`flex items-center gap-2 transition-all duration-700 delay-[320ms]
                ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className={`rounded-full transition-all duration-300
                    ${i === slide
                      ? "w-8 h-2 bg-blue-600"
                      : "w-6 h-2 bg-gray-200 hover:bg-gray-300"
                    }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700;800&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
      `}</style>
    </section>
  );
}
"use client";
import { useEffect, useRef, useState } from "react";

function useFadeIn() {
  const ref              = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

export default function AboutStory() {
  const left  = useFadeIn();
  const right = useFadeIn();

  return (
    <section id="story" className="py-20 sm:py-28 bg-[#f8f9fb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT — images ── */}
          <div
            ref={left.ref}
            className={`transition-all duration-700 ${left.vis ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <div className="relative">
              {/* Main image */}
              <div className="rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=700&q=85"
                  alt="LUXE atelier"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating quality card */}
              <div className="absolute -bottom-6 -right-3 sm:-right-8 bg-[#0f172a] text-white rounded-2xl p-5 shadow-2xl w-44 sm:w-56">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="flex gap-0.5">
                    {[1, 0.65, 0.35].map((op, i) => (
                      <div key={i} className="w-2 h-2 rounded-full bg-white" style={{ opacity: op }} />
                    ))}
                  </div>
                  <span className="text-white font-black tracking-widest text-[10px] ml-1">LUXE</span>
                </div>
                <p className="text-blue-400 font-bold text-2xl">47</p>
                <p className="text-gray-400 text-xs leading-snug mt-0.5">
                  Quality checkpoints on every single piece
                </p>
              </div>

              {/* Year badge */}
              <div className="absolute -top-4 -left-3 sm:-left-6 bg-blue-600 text-white rounded-2xl p-4 shadow-xl text-center">
                <p className="font-display text-3xl font-bold leading-none">12</p>
                <p className="text-blue-200 text-[10px] font-bold tracking-widest">YEARS</p>
              </div>
            </div>
          </div>

          {/* ── RIGHT — text ── */}
          <div
            ref={right.ref}
            className={`transition-all duration-700 delay-150 ${right.vis ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-6 bg-blue-500" />
              <span className="text-blue-600 text-xs font-bold tracking-[0.3em] uppercase">Our Story</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#0f172a] leading-tight mb-6">
              Born From a Refusal to
              <br />
              <span className="italic text-blue-600">Compromise</span>
            </h2>

            <div className="space-y-4 text-gray-500 text-sm sm:text-base leading-relaxed">
              <p>
                In 2012, Eleanor Voss walked away from her position as lead designer at a storied
                Parisian house. Not out of frustration — but conviction. She believed that true luxury
                had been hollowed out, replaced by logos and hype. LUXE was her answer.
              </p>
              <p>
                Starting with a collection of just 12 pieces, handcrafted in a 400 sq ft Paris studio,
                LUXE grew through word of mouth alone. No ads. No influencers. Just objects so precisely
                made that owners couldn't help but tell someone.
              </p>
              <p>
                Today, with 2.4 million customers across 180 countries, the philosophy remains unchanged:{" "}
                <span className="text-[#0f172a] font-semibold">
                  design everything as if it will be owned for a lifetime.
                </span>
              </p>
            </div>

            {/* Founder attribution */}
            <div className="mt-8 pt-8 border-t border-gray-200 flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&q=85"
                alt="Eleanor Voss"
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-100 flex-shrink-0"
              />
              <div>
                <p className="font-bold text-[#0f172a] text-sm">Eleanor Voss</p>
                <p className="text-gray-400 text-xs">Founder & Creative Director</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
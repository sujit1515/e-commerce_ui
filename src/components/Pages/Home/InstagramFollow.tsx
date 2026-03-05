"use client";
import { useEffect, useRef, useState } from "react";
import { Instagram } from "lucide-react";

const CONTENT = {
  handle:   "@sujit.pattnaik_",
  label:    "Follow on Instagram",
  url:      "https://www.instagram.com/sujit.pattnaik_?igsh=bmZva3U4M3N1b2Fn",
//   tagline:  "Join 246 who live the LUXE life",
};

export default function InstagramFollow() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-white py-16 sm:py-20 overflow-hidden">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700
          ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >

        {/* ── Tagline ── */}
        {/* <p
          className={`text-center text-gray-400 text-xs sm:text-sm tracking-widest uppercase font-medium mb-8
            transition-all duration-700 delay-[60ms]
            ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {CONTENT.tagline}
        </p> */}

        {/* ── Main CTA button ── */}
        <div
          className={`flex justify-center transition-all duration-700 delay-[120ms]
            ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <a
            href={CONTENT.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative flex items-center gap-3 bg-[#0f172a] hover:bg-[#1e293b]
              text-white font-bold tracking-[0.18em] uppercase text-xs sm:text-sm
              px-8 sm:px-10 py-4 sm:py-5 rounded-full shadow-xl shadow-[#0f172a]/20
              hover:shadow-2xl hover:shadow-[#0f172a]/30
              transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            {/* Animated gradient ring on hover */}
            <span
              className={`absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none
                ${hovered ? "opacity-100" : "opacity-0"}`}
              style={{
                background: "linear-gradient(90deg,#3b82f6,#6366f1,#3b82f6)",
                backgroundSize: "200%",
                padding: "2px",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "destination-out",
                maskComposite: "exclude",
                animation: hovered ? "gradientSpin 2s linear infinite" : "none",
              }}
            />

            {/* Globe-style Instagram icon */}
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
              <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </span>

            <span>{CONTENT.label}</span>

            {/* Live follower count badge */}
            <span className="ml-1 bg-blue-600 text-white text-[9px] font-black tracking-wider px-2 py-0.5 rounded-full">
              246
            </span>
          </a>
        </div>

        {/* ── Handle label ── */}
        <p
          className={`text-center text-gray-300 text-xs mt-5 font-medium tracking-wider
            transition-all duration-700 delay-[180ms]
            ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {CONTENT.handle}
        </p>
      </div>

      <style>{`
        @keyframes gradientSpin {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </section>
  );
}
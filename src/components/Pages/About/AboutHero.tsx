"use client";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#0a0f1a]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a] via-[#0a0f1a]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent" />
      </div>

      {/* Floating orbs */}
      <div
        className="absolute top-20 right-[15%] w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none"
        style={{ animation: "float 7s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-20 right-[30%] w-48 h-48 rounded-full bg-indigo-500/8 blur-2xl pointer-events-none"
        style={{ animation: "float 9s ease-in-out infinite reverse" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="h-px w-8 bg-blue-500" />
            <span className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase">
              Our Story
            </span>
            <div className="h-px w-8 bg-blue-500" />
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-8">
            Crafted With
            <br />
            <span className="italic text-blue-400">Intention.</span>
            <br />
            Built to Last.
          </h1>

          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl mb-10">
            Since 2012, LUXE has been redefining what it means to own something
            truly extraordinary — where premium materials meet meticulous craft,
            and where every detail whispers purpose.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#story"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-900/40 text-sm"
            >
              Discover Our Story <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#team"
              className="flex items-center gap-2 border border-white/15 text-white hover:bg-white/5 font-semibold px-7 py-3.5 rounded-xl transition-all text-sm"
            >
              Meet the Team <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-12px); }
        }
      `}</style>
    </section>
  );
}
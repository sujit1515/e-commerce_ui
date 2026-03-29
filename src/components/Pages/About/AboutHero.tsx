"use client";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden" style={{ backgroundColor: "#F8F4F0" }}>
      {/* Background image with reduced opacity */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80"
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8F4F0] via-[#F8F4F0]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8F4F0] via-transparent to-transparent" />
      </div>

      {/* Floating orbs - changed to maroon */}
      <div
        className="absolute top-20 right-[15%] w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-maroon/10 blur-3xl pointer-events-none"
        style={{ 
          backgroundColor: "#800000",
          opacity: 0.1,
          animation: "float 7s ease-in-out infinite" 
        }}
      />
      <div
        className="absolute bottom-20 right-[30%] w-48 h-48 rounded-full bg-maroon/8 blur-2xl pointer-events-none"
        style={{ 
          backgroundColor: "#800000",
          opacity: 0.08,
          animation: "float 9s ease-in-out infinite reverse" 
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="h-px w-8" style={{ backgroundColor: "#800000" }} />
            <span className="text-maroon text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "#800000" }}>
              Our Story
            </span>
            <div className="h-px w-8" style={{ backgroundColor: "#800000" }} />
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-8">
            <span className="text-black">Crafted With</span>
            <br />
            <span className="italic" style={{ color: "#800000" }}>Intention.</span>
            <br />
            <span className="text-black">Built to Last.</span>
          </h1>

          <p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-xl mb-10">
            Since 2012, LUXE has been redefining what it means to own something
            truly extraordinary — where premium materials meet meticulous craft,
            and where every detail whispers purpose.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#story"
              className="flex items-center gap-2 text-white font-bold px-7 py-3.5 rounded-xl transition-all shadow-lg text-sm"
              style={{ 
                backgroundColor: "#800000",
                boxShadow: "0 10px 25px -5px rgba(128, 0, 0, 0.3)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#5C0000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#800000";
              }}
            >
              Discover Our Story <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#team"
              className="flex items-center gap-2 border border-gray-300 text-black hover:text-maroon hover:border-maroon font-semibold px-7 py-3.5 rounded-xl transition-all text-sm"
              style={{ 
                borderColor: "#d1d5db",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#800000";
                e.currentTarget.style.color = "#800000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#d1d5db";
                e.currentTarget.style.color = "#000000";
              }}
            >
              Meet the Team <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade to cream */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F8F4F0] to-transparent" />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-12px); }
        }
        
        /* Maroon color utility */
        .text-maroon {
          color: #800000 !important;
        }
        
        .bg-maroon {
          background-color: #800000 !important;
        }
        
        .border-maroon {
          border-color: #800000 !important;
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          h1 {
            font-size: 3rem !important;
          }
          .px-7 {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
          }
          .py-3\\.5 {
            padding-top: 0.75rem !important;
            padding-bottom: 0.75rem !important;
          }
        }
        
        /* Animation for buttons */
        .btn-hover-effect {
          transition: all 0.3s ease;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  );
}
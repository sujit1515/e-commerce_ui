"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function AboutCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden" style={{ backgroundColor: "#F8F4F0" }}>
      {/* Subtle background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=70"
          alt=""
          className="w-full h-full object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8F4F0] via-[#F8F4F0]/95 to-[#F8F4F0]/80" />
      </div>

      {/* Top / bottom accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-maroon/30 to-transparent" style={{ background: "linear-gradient(to right, transparent, #800000, transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-maroon/30 to-transparent" style={{ background: "linear-gradient(to right, transparent, #800000, transparent)" }} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          ref={ref}
          className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-6" style={{ backgroundColor: "#800000" }} />
            <span className="text-maroon text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "#800000" }}>Join LUXE</span>
            <div className="h-px w-6" style={{ backgroundColor: "#800000" }} />
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span style={{ color: "#000000" }}>Own Something</span>
            <br />
            <span className="italic" style={{ color: "#800000" }}>Worth Keeping</span>
          </h2>

          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Join 2.4 million discerning individuals who've chosen craftsmanship over convenience,
            intention over impulse, and quality that only improves with time.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/"
              className="flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg text-sm"
              style={{ 
                backgroundColor: "#800000",
                boxShadow: "0 10px 25px -5px rgba(128, 0, 0, 0.3)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#5C0000";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 15px 30px -8px rgba(128, 0, 0, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#800000";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(128, 0, 0, 0.3)";
              }}
            >
              Shop the Collection <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/journal"
              className="flex items-center gap-2 border font-semibold px-8 py-4 rounded-xl transition-all text-sm"
              style={{ 
                borderColor: "#800000",
                color: "#800000",
                backgroundColor: "transparent",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#800000";
                e.currentTarget.style.color = "#FFFFFF";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(128, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#800000";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Read Our Journal
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&display=swap');
        
        .font-display {
          font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif !important;
        }
        
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
          .text-4xl {
            font-size: 2rem !important;
          }
          .px-8 {
            padding-left: 1.5rem !important;
            padding-right: 1.5rem !important;
          }
          .py-4 {
            padding-top: 0.75rem !important;
            padding-bottom: 0.75rem !important;
          }
          .gap-4 {
            gap: 1rem !important;
          }
        }
        
        @media (min-width: 641px) and (max-width: 768px) {
          .text-4xl {
            font-size: 2.5rem !important;
          }
        }
        
        /* Animation keyframes */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Arrow animation on hover */
        a:hover .w-4 {
          transform: translateX(4px);
          transition: transform 0.3s ease;
        }
        
        /* Smooth transitions */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Button hover effects */
        a {
          cursor: pointer;
        }
        
        /* Secondary button specific styles */
        a[href="/journal"] {
          border-width: 1px;
          border-style: solid;
        }
      `}</style>
    </section>
  );
}
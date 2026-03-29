"use client";
import { useEffect, useRef, useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
interface Stat {
  value: string;
  suffix: string;
  label: string;
}

// ── Data (easy to edit) ──────────────────────────────────────────────────────
const STATS: Stat[] = [
  { value: "2012", suffix: "",   label: "Founded"           },
  { value: "180",  suffix: "+",  label: "Countries Shipped" },
  { value: "2.4",  suffix: "M+", label: "Happy Customers"   },
  { value: "98",   suffix: "%",  label: "Satisfaction Rate" },
];

// ── Animated counter ─────────────────────────────────────────────────────────
function Counter({ value, suffix, inView }: { value: string; suffix: string; inView: boolean }) {
  const num = parseFloat(value);
  const isDecimal = value.includes(".");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const DURATION = 1800;
    const STEPS = 60;
    let step = 0;
    const id = setInterval(() => {
      step++;
      const eased = 1 - Math.pow(1 - step / STEPS, 3);
      setCount(num * eased);
      if (step >= STEPS) { setCount(num); clearInterval(id); }
    }, DURATION / STEPS);
    return () => clearInterval(id);
  }, [inView, num]);

  return (
    <span>
      {isDecimal ? count.toFixed(1) : Math.round(count)}
      {suffix}
    </span>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AboutStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section style={{ backgroundColor: "#F8F4F0" }} className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden shadow-lg"
          style={{ backgroundColor: "#800000", borderColor: "#800000" }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              className="px-6 sm:px-8 py-10 text-center group transition-all duration-300 cursor-default"
              style={{ 
                backgroundColor: "#F8F4F0",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#800000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#F8F4F0";
              }}
            >
              <p 
                className="font-display text-4xl sm:text-5xl font-bold transition-colors mb-2"
                style={{ 
                  color: "#000000",
                  transition: "color 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  const parent = e.currentTarget.parentElement;
                  if (parent && parent.style.backgroundColor === "#800000") {
                    e.currentTarget.style.color = "#F8F4F0";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#000000";
                }}
              >
                <Counter value={s.value} suffix={s.suffix} inView={inView} />
              </p>
              <p 
                className="text-xs font-bold tracking-widest uppercase transition-colors"
                style={{ 
                  color: "#666666",
                  transition: "color 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  const parent = e.currentTarget.parentElement;
                  if (parent && parent.style.backgroundColor === "#800000") {
                    e.currentTarget.style.color = "#F8F4F0";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#666666";
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .stat-card {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .stat-card:nth-child(1) { animation-delay: 0.1s; }
        .stat-card:nth-child(2) { animation-delay: 0.2s; }
        .stat-card:nth-child(3) { animation-delay: 0.3s; }
        .stat-card:nth-child(4) { animation-delay: 0.4s; }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .px-6 {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          .py-10 {
            padding-top: 2rem !important;
            padding-bottom: 2rem !important;
          }
          .text-4xl {
            font-size: 2rem !important;
          }
        }
        
        @media (min-width: 641px) and (max-width: 768px) {
          .text-4xl {
            font-size: 2.25rem !important;
          }
        }
        
        /* Smooth transitions */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </section>
  );
}
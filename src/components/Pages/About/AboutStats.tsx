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
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden shadow-sm"
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              className="bg-white px-6 sm:px-8 py-10 text-center group hover:bg-black transition-colors duration-300 cursor-default"
            >
              <p className="font-display text-4xl sm:text-5xl font-bold text-black group-hover:text-white transition-colors mb-2">
                <Counter value={s.value} suffix={s.suffix} inView={inView} />
              </p>
              <p className="text-xs font-bold tracking-widest uppercase text-gray-400 group-hover:text-red-500 transition-colors">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
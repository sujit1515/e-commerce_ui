"use client";
import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
//  ContactMap.tsx
//  Embedded map section with store details overlay card.
//  Replace MAP_EMBED_URL with your real Google Maps embed URL.
// ─────────────────────────────────────────────────────────────────────────────

const STORE = {
  name: "Gandhi Institute of Excellent Technocrats",
  address: "Bhubaneswar",
  city: "Odisha — India",
  hours: "Mon – Sat: 9:00–17:00",
  mapsUrl: "https://maps.google.com/?q=Gandhi+Institute+of+Excellent+Technocrats+Bhubaneswar",
};

// Replace with your actual embed URL from Google Maps → Share → Embed
const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.26531748305!2d85.723609!3d20.289282300000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19077849f9fba1%3A0xa943079bb639666!2sGandhi%20Institute%20of%20Excellent%20Technocrats%20GIET%20Bhubaneswar%20Odisha!5e0!3m2!1sen!2sin!4v1772536525780!5m2!1sen!2sin";
export default function ContactMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          ref={ref}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-6 bg-blue-500" />
            <span className="text-blue-600 text-xs font-bold tracking-[0.3em] uppercase">Find Us</span>
            <div className="h-px w-6 bg-blue-500" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#0f172a] leading-tight">
            Visit Our
            <br />
            <span className="italic text-blue-600">Bhubaneswar</span>
          </h2>
        </div>

        {/* Map + overlay */}
        <div
          className={`relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 delay-150
            ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Map iframe */}
          <div className="aspect-[16/8] sm:aspect-[16/7] lg:aspect-[16/6] w-full">
            <iframe
              src={MAP_EMBED_URL}
              className="w-full h-full border-0 grayscale contrast-[1.1]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bhubaneswar Store Location"
            />
          </div>

          {/* Overlay card */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 z-10">
            <div className="bg-[#0f172a]/95 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl max-w-xs sm:max-w-sm">
              {/* Dot + label */}
              <div className="flex items-center gap-2 mb-4">
                <div className="relative flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-50" />
                </div>
                <span className="text-blue-400 text-xs font-bold tracking-widest uppercase">Open Now</span>
              </div>

              <h3 className="font-bold text-white text-base sm:text-lg mb-1">{STORE.name}</h3>
              <div className="flex items-start gap-2 mb-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-300 text-sm">{STORE.address}</p>
                  <p className="text-gray-500 text-xs">{STORE.city}</p>
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-2 leading-relaxed">{STORE.hours}</p>

              <a
                href={STORE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-900/40"
              >
                <Navigation className="w-3.5 h-3.5" /> Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
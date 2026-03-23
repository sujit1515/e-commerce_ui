"use client";
import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
//  ContactInfo.tsx
//  Four info cards: Email · Phone · Address · Hours
//  Responsive: 2 columns on mobile, 2 on tablet, 4 on desktop
// ─────────────────────────────────────────────────────────────────────────────

interface InfoCard {
  icon: React.ElementType;
  label: string;
  title: string;
  detail: string;
  link?: string;
  linkLabel?: string;
  color: "red" | "red-dark" | "red-light" | "red-bright";
}

const INFO_CARDS: InfoCard[] = [
  {
    icon: Mail,
    label: "Email Us",
    title: "hello@luxe.com",
    detail: "We reply to every message within 24 hours on business days.",
    link: "mailto:hello@luxe.com",
    linkLabel: "Send email",
    color: "red",
  },
  {
    icon: Phone,
    label: "Call Us",
    title: "+1 (800) 589-2200",
    detail: "Speak with our concierge team Monday – Friday, 9 AM – 7 PM EST.",
    link: "tel:+18005892200",
    linkLabel: "Call now",
    color: "red-dark",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    title: "42 Rue Saint-Honoré",
    detail: "Paris, 75001 — Our flagship atelier and showroom.",
    link: "https://maps.google.com",
    linkLabel: "Get directions",
    color: "red-light",
  },
  {
    icon: Clock,
    label: "Opening Hours",
    title: "Mon – Sat",
    detail: "10:00 AM – 8:00 PM\nSunday: 12:00 PM – 6:00 PM",
    color: "red-bright",
  },
];

const COLOR = {
  red:       { bg: "bg-red-500/10",    border: "border-red-500/20",    icon: "text-red-600",    hover: "group-hover:border-red-500/40",    link: "text-red-600 hover:text-red-700" },
  "red-dark": { bg: "bg-red-700/10",    border: "border-red-700/20",    icon: "text-red-700",    hover: "group-hover:border-red-700/40",    link: "text-red-700 hover:text-red-800" },
  "red-light": { bg: "bg-red-400/10",   border: "border-red-400/20",    icon: "text-red-500",    hover: "group-hover:border-red-400/40",    link: "text-red-500 hover:text-red-600" },
  "red-bright": { bg: "bg-red-600/10",  border: "border-red-600/20",    icon: "text-red-600",    hover: "group-hover:border-red-600/40",    link: "text-red-600 hover:text-red-700" },
};

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, vis, delay };
}

function InfoCard({ card, index }: { card: InfoCard; index: number }) {
  const { ref, vis } = useFadeIn();
  const c = COLOR[card.color];
  const Icon = card.icon;

  return (
    <div
      ref={ref}
      className={`group relative bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-7 shadow-sm
        hover:shadow-xl hover:-translate-y-1.5 ${c.hover} transition-all duration-500 cursor-default
        ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: vis ? `${index * 90}ms` : "0ms" }}
    >
      {/* Icon */}
      <div className={`w-10 sm:w-12 h-10 sm:h-12 ${c.bg} ${c.border} border rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-5`}>
        <Icon className={`w-4 sm:w-5 h-4 sm:h-5 ${c.icon}`} />
      </div>

      <p className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-gray-500 mb-1">{card.label}</p>
      <h3 className="font-bold text-black text-sm sm:text-base lg:text-lg mb-2 leading-snug">{card.title}</h3>
      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">{card.detail}</p>

      {card.link && (
        <a
          href={card.link}
          className={`inline-flex items-center gap-1 mt-3 sm:mt-4 text-xs sm:text-sm font-semibold ${c.link} transition-colors`}
        >
          {card.linkLabel} <ArrowUpRight className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
        </a>
      )}
    </div>
  );
}

export default function ContactInfo() {
  const headRef = useRef<HTMLDivElement>(null);
  const [headVis, setHeadVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeadVis(true); }, { threshold: 0.2 });
    if (headRef.current) obs.observe(headRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          ref={headRef}
          className={`text-center mb-10 sm:mb-12 lg:mb-14 transition-all duration-700 ${headVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <div className="h-px w-4 sm:w-6 bg-red-600" />
            <span className="text-red-600 text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase">Contact Details</span>
            <div className="h-px w-4 sm:w-6 bg-red-600" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight px-4 sm:px-0">
            Multiple Ways to
            <br />
            <span className="italic text-red-600">Reach Us</span>
          </h2>
        </div>

        {/* Cards - Responsive Grid: 2 on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {INFO_CARDS.map((card, i) => (
            <InfoCard key={i} card={card} index={i} />
          ))}
        </div>
      </div>

      {/* Custom breakpoint styles */}
      <style>{`
        @media (min-width: 480px) {
          .xs\\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </section>
  );
}
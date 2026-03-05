"use client";
import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
//  ContactInfo.tsx
//  Four info cards: Email · Phone · Address · Hours
//  Reusable: edit INFO_CARDS array.
// ─────────────────────────────────────────────────────────────────────────────

interface InfoCard {
  icon: React.ElementType;
  label: string;
  title: string;
  detail: string;
  link?: string;
  linkLabel?: string;
  color: "blue" | "emerald" | "amber" | "rose";
}

const INFO_CARDS: InfoCard[] = [
  {
    icon: Mail,
    label: "Email Us",
    title: "hello@luxe.com",
    detail: "We reply to every message within 24 hours on business days.",
    link: "mailto:hello@luxe.com",
    linkLabel: "Send email",
    color: "blue",
  },
  {
    icon: Phone,
    label: "Call Us",
    title: "+1 (800) 589-2200",
    detail: "Speak with our concierge team Monday – Friday, 9 AM – 7 PM EST.",
    link: "tel:+18005892200",
    linkLabel: "Call now",
    color: "emerald",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    title: "42 Rue Saint-Honoré",
    detail: "Paris, 75001 — Our flagship atelier and showroom.",
    link: "https://maps.google.com",
    linkLabel: "Get directions",
    color: "amber",
  },
  {
    icon: Clock,
    label: "Opening Hours",
    title: "Mon – Sat",
    detail: "10:00 AM – 8:00 PM\nSunday: 12:00 PM – 6:00 PM",
    color: "rose",
  },
];

const COLOR = {
  blue:    { bg: "bg-blue-500/10",    border: "border-blue-500/20",    icon: "text-blue-400",    hover: "group-hover:border-blue-500/40",    link: "text-blue-400 hover:text-blue-300" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: "text-emerald-400", hover: "group-hover:border-emerald-500/40", link: "text-emerald-400 hover:text-emerald-300" },
  amber:   { bg: "bg-amber-500/10",   border: "border-amber-500/20",   icon: "text-amber-400",   hover: "group-hover:border-amber-500/40",   link: "text-amber-400 hover:text-amber-300" },
  rose:    { bg: "bg-rose-500/10",    border: "border-rose-500/20",    icon: "text-rose-400",    hover: "group-hover:border-rose-500/40",    link: "text-rose-400 hover:text-rose-300" },
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
      className={`group relative bg-white border border-gray-100 rounded-2xl p-6 sm:p-7 shadow-sm
        hover:shadow-xl hover:-translate-y-1.5 ${c.hover} transition-all duration-500 cursor-default
        ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: vis ? `${index * 90}ms` : "0ms" }}
    >
      {/* Icon */}
      <div className={`w-12 h-12 ${c.bg} ${c.border} border rounded-xl flex items-center justify-center mb-5`}>
        <Icon className={`w-5 h-5 ${c.icon}`} />
      </div>

      <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">{card.label}</p>
      <h3 className="font-bold text-[#0f172a] text-base sm:text-lg mb-2 leading-snug">{card.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">{card.detail}</p>

      {card.link && (
        <a
          href={card.link}
          className={`inline-flex items-center gap-1.5 mt-4 text-sm font-semibold ${c.link} transition-colors`}
        >
          {card.linkLabel} <ArrowUpRight className="w-3.5 h-3.5" />
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
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          ref={headRef}
          className={`text-center mb-14 transition-all duration-700 ${headVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-6 bg-blue-500" />
            <span className="text-blue-600 text-xs font-bold tracking-[0.3em] uppercase">Contact Details</span>
            <div className="h-px w-6 bg-blue-500" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#0f172a] leading-tight">
            Multiple Ways to
            <br />
            <span className="italic text-blue-600">Reach Us</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {INFO_CARDS.map((card, i) => (
            <InfoCard key={i} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
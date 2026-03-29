"use client";
import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";


interface InfoCard {
  icon: React.ElementType;
  label: string;
  title: string;
  detail: string;
  link?: string;
  linkLabel?: string;
  color: "maroon" | "maroon-dark" | "maroon-light" | "maroon-bright";
}

const INFO_CARDS: InfoCard[] = [
  {
    icon: Mail,
    label: "Email Us",
    title: "hello@luxe.com",
    detail: "We reply to every message within 24 hours on business days.",
    link: "mailto:hello@luxe.com",
    linkLabel: "Send email",
    color: "maroon",
  },
  {
    icon: Phone,
    label: "Call Us",
    title: "+1 (800) 589-2200",
    detail: "Speak with our concierge team Monday – Friday, 9 AM – 7 PM EST.",
    link: "tel:+18005892200",
    linkLabel: "Call now",
    color: "maroon-dark",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    title: "42 Rue Saint-Honoré",
    detail: "Paris, 75001 — Our flagship atelier and showroom.",
    link: "https://maps.google.com",
    linkLabel: "Get directions",
    color: "maroon-light",
  },
  {
    icon: Clock,
    label: "Opening Hours",
    title: "Mon – Sat",
    detail: "10:00 AM – 8:00 PM\nSunday: 12:00 PM – 6:00 PM",
    color: "maroon-bright",
  },
];

const COLOR = {
  maroon:       { bg: "bg-maroon/10",    border: "border-maroon/20",    icon: "text-maroon",    hover: "group-hover:border-maroon/40",    link: "text-maroon hover:text-maroon-dark" },
  "maroon-dark": { bg: "bg-maroon-dark/10", border: "border-maroon-dark/20", icon: "text-maroon-dark", hover: "group-hover:border-maroon-dark/40", link: "text-maroon-dark hover:text-maroon-darker" },
  "maroon-light": { bg: "bg-maroon-light/10", border: "border-maroon-light/20", icon: "text-maroon-light", hover: "group-hover:border-maroon-light/40", link: "text-maroon-light hover:text-maroon" },
  "maroon-bright": { bg: "bg-maroon/10",  border: "border-maroon/20",    icon: "text-maroon",    hover: "group-hover:border-maroon/40",    link: "text-maroon hover:text-maroon-dark" },
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
      className={`group relative bg-white border rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-7 shadow-sm
        hover:shadow-xl hover:-translate-y-1.5 ${c.hover} transition-all duration-500 cursor-default
        ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ 
        transitionDelay: vis ? `${index * 90}ms` : "0ms",
        borderColor: "rgba(128, 0, 0, 0.1)"
      }}
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
    <section className="py-16 sm:py-20 lg:py-24" style={{ backgroundColor: "#F8F4F0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          ref={headRef}
          className={`text-center mb-10 sm:mb-12 lg:mb-14 transition-all duration-700 ${headVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <div className="h-px w-4 sm:w-6" style={{ backgroundColor: "#800000" }} />
            <span className="text-maroon text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase" style={{ color: "#800000" }}>Contact Details</span>
            <div className="h-px w-4 sm:w-6" style={{ backgroundColor: "#800000" }} />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight px-4 sm:px-0">
            <span style={{ color: "#000000" }}>Multiple Ways to</span>
            <br />
            <span className="italic" style={{ color: "#800000" }}>Reach Us</span>
          </h2>
        </div>

        {/* Cards - Responsive Grid: 2 on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {INFO_CARDS.map((card, i) => (
            <InfoCard key={i} card={card} index={i} />
          ))}
        </div>
      </div>

      {/* Custom styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&display=swap');
        
        .font-display {
          font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif !important;
        }
        
        .text-maroon {
          color: #800000 !important;
        }
        
        .text-maroon-dark {
          color: #5C0000 !important;
        }
        
        .text-maroon-light {
          color: #9D2A2A !important;
        }
        
        .bg-maroon\\/10 {
          background-color: rgba(128, 0, 0, 0.1) !important;
        }
        
        .bg-maroon-dark\\/10 {
          background-color: rgba(92, 0, 0, 0.1) !important;
        }
        
        .bg-maroon-light\\/10 {
          background-color: rgba(157, 42, 42, 0.1) !important;
        }
        
        .border-maroon\\/20 {
          border-color: rgba(128, 0, 0, 0.2) !important;
        }
        
        .border-maroon-dark\\/20 {
          border-color: rgba(92, 0, 0, 0.2) !important;
        }
        
        .border-maroon-light\\/20 {
          border-color: rgba(157, 42, 42, 0.2) !important;
        }
        
        .group-hover\\:border-maroon\\/40:hover {
          border-color: rgba(128, 0, 0, 0.4) !important;
        }
        
        .group-hover\\:border-maroon-dark\\/40:hover {
          border-color: rgba(92, 0, 0, 0.4) !important;
        }
        
        .group-hover\\:border-maroon-light\\/40:hover {
          border-color: rgba(157, 42, 42, 0.4) !important;
        }
        
        .hover\\:text-maroon-dark:hover {
          color: #5C0000 !important;
        }
        
        .hover\\:text-maroon-darker:hover {
          color: #4a0000 !important;
        }
        
        @media (min-width: 480px) {
          .xs\\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .text-3xl {
            font-size: 1.75rem !important;
          }
          .p-5 {
            padding: 1rem !important;
          }
          .gap-4 {
            gap: 0.75rem !important;
          }
        }
        
        /* Card hover effects */
        .group:hover {
          border-color: rgba(128, 0, 0, 0.3) !important;
        }
        
        /* Smooth transitions */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Icon hover animation */
        .group:hover .w-4,
        .group:hover .w-5 {
          transform: scale(1.1);
          transition: transform 0.3s ease;
        }
      `}</style>
    </section>
  );
}
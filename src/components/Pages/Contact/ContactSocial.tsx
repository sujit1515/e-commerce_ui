"use client";
import { useEffect, useRef, useState } from "react";
import { Instagram, Twitter, Youtube, Linkedin, ArrowUpRight } from "lucide-react";

interface Social {
  icon: React.ElementType;
  name: string;
  handle: string;
  desc: string;
  url: string;
  color: string;
  hoverBg: string;
}

const SOCIALS: Social[] = [
  {
    icon: Instagram,
    name: "Instagram",
    handle: "@luxe.official",
    desc: "Behind-the-scenes, new drops, and the LUXE lifestyle.",
    url: "https://instagram.com",
    color: "text-maroon",
    hoverBg: "hover:border-maroon/40 hover:bg-maroon/5",
  },
  {
    icon: Twitter,
    name: "Twitter / X",
    handle: "@luxebrand",
    desc: "News, opinions, and conversations that matter.",
    url: "https://twitter.com",
    color: "text-maroon",
    hoverBg: "hover:border-maroon/40 hover:bg-maroon/5",
  },
  {
    icon: Youtube,
    name: "YouTube",
    handle: "LUXE Official",
    desc: "Craft films, lookbooks, and the stories behind each collection.",
    url: "https://youtube.com",
    color: "text-maroon",
    hoverBg: "hover:border-maroon/40 hover:bg-maroon/5",
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    handle: "LUXE Lifestyle Brand",
    desc: "Company updates, sustainability reports, and career opportunities.",
    url: "https://linkedin.com",
    color: "text-maroon",
    hoverBg: "hover:border-maroon/40 hover:bg-maroon/5",
  },
];

function SocialCard({ s, index }: { s: Social; index: number }) {
  const ref = useRef<HTMLAnchorElement | null>(null); 
  const [vis, setVis] = useState(false);
  const Icon = s.icon;

  useEffect(() => {
    if (!ref.current) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVis(true);
        }
      },
      { threshold: 0.15 }
    );

    obs.observe(ref.current);

    return () => {
      if (ref.current) obs.unobserve(ref.current);
    };
  }, []);

  return (
    <a
      ref={ref} 
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col gap-4 rounded-2xl p-6 ${s.hoverBg}
        hover:-translate-y-1.5 transition-all duration-300 cursor-pointer
        ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ 
        transitionDelay: vis ? `${index * 80}ms` : "0ms",
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(128, 0, 0, 0.1)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
      }}
    >
      <div className="flex items-start justify-between">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.color}`}
          style={{ 
            backgroundColor: "rgba(128, 0, 0, 0.1)", 
            border: "1px solid rgba(128, 0, 0, 0.2)" 
          }}
        >
          <Icon className="w-5 h-5" style={{ color: "#800000" }} />
        </div>
        <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-maroon transition-colors" style={{ color: "rgba(128, 0, 0, 0.5)" }} />
      </div>

      <div>
        <p className={`font-bold text-sm ${s.color}`} style={{ color: "#800000" }}>{s.name}</p>
        <p className="text-black font-semibold text-xs mt-0.5">
          {s.handle}
        </p>
      </div>

      <p className="text-gray-500 text-xs leading-relaxed">
        {s.desc}
      </p>
    </a>
  );
}

export default function ContactSocial() {
  const headRef = useRef<HTMLDivElement>(null);
  const [headVis, setHeadVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeadVis(true); }, { threshold: 0.2 });
    if (headRef.current) obs.observe(headRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-20 sm:py-24 relative overflow-hidden" style={{ backgroundColor: "#F8F4F0" }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-maroon/30 to-transparent" style={{ background: "linear-gradient(to right, transparent, #800000, transparent)" }} />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#800000 1px,transparent 1px),linear-gradient(90deg,#800000 1px,transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headRef}
          className={`text-center mb-12 transition-all duration-700 ${headVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-6" style={{ backgroundColor: "#800000" }} />
            <span className="text-maroon text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "#800000" }}>Stay Connected</span>
            <div className="h-px w-6" style={{ backgroundColor: "#800000" }} />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
            <span style={{ color: "#000000" }}>Follow the</span>
            <br />
            <span className="italic" style={{ color: "#800000" }}>LUXE World</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {SOCIALS.map((s, i) => <SocialCard key={i} s={s} index={i} />)}
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
        
        @media (max-width: 640px) {
          .text-4xl {
            font-size: 2rem !important;
          }
          .p-6 {
            padding: 1rem !important;
          }
          .gap-4 {
            gap: 0.75rem !important;
          }
        }
        
        /* Card hover effects */
        .group:hover {
          border-color: rgba(128, 0, 0, 0.3) !important;
          box-shadow: 0 10px 25px -5px rgba(128, 0, 0, 0.1), 0 8px 10px -6px rgba(128, 0, 0, 0.05) !important;
        }
        
        /* Icon hover animation */
        .group:hover .w-5.h-5 {
          transform: scale(1.1);
          transition: transform 0.3s ease;
        }
      `}</style>
    </section>
  );
}
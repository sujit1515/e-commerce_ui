"use client";
import { useEffect, useRef, useState } from "react";
import { Instagram, Twitter, Youtube, Linkedin, ArrowUpRight } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
//  ContactSocial.tsx
//  Social media channels section — dark themed.
//  Edit SOCIALS array to update handles / URLs.
// ─────────────────────────────────────────────────────────────────────────────

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
    color: "text-pink-400",
    hoverBg: "hover:border-pink-500/40 hover:bg-pink-500/5",
  },
  {
    icon: Twitter,
    name: "Twitter / X",
    handle: "@luxebrand",
    desc: "News, opinions, and conversations that matter.",
    url: "https://twitter.com",
    color: "text-sky-400",
    hoverBg: "hover:border-sky-500/40 hover:bg-sky-500/5",
  },
  {
    icon: Youtube,
    name: "YouTube",
    handle: "LUXE Official",
    desc: "Craft films, lookbooks, and the stories behind each collection.",
    url: "https://youtube.com",
    color: "text-red-400",
    hoverBg: "hover:border-red-500/40 hover:bg-red-500/5",
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    handle: "LUXE Lifestyle Brand",
    desc: "Company updates, sustainability reports, and career opportunities.",
    url: "https://linkedin.com",
    color: "text-blue-400",
    hoverBg: "hover:border-blue-500/40 hover:bg-blue-500/5",
  },
];

function SocialCard({ s, index }: { s: Social; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const Icon = s.icon;

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <a
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      className={`group flex flex-col gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 ${s.hoverBg}
        hover:-translate-y-1.5 transition-all duration-300 cursor-pointer
        ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: vis ? `${index * 80}ms` : "0ms" }}
    >
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center ${s.color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
      </div>
      <div>
        <p className={`font-bold text-sm ${s.color}`}>{s.name}</p>
        <p className="text-white font-semibold text-xs mt-0.5">{s.handle}</p>
      </div>
      <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
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
    <section className="py-20 sm:py-24 bg-[#0f172a] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headRef}
          className={`text-center mb-12 transition-all duration-700 ${headVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-6 bg-blue-500" />
            <span className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase">Stay Connected</span>
            <div className="h-px w-6 bg-blue-500" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
            Follow the
            <br />
            <span className="italic text-blue-400">LUXE World</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {SOCIALS.map((s, i) => <SocialCard key={i} s={s} index={i} />)}
        </div>
      </div>
    </section>
  );
}
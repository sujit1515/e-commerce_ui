"use client";
import { useEffect, useRef, useState } from "react";
import { Instagram, Twitter, Linkedin } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  img: string;
  social: { ig: string; tw: string; li: string };
}

// ── Data ─────────────────────────────────────────────────────────────────────
const TEAM: TeamMember[] = [
  {
    name: "Eleanor Voss",
    role: "Founder & Creative Director",
    bio: "Former Hermès designer with 20 years shaping luxury aesthetics across three continents.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=85",
    social: { ig: "#", tw: "#", li: "#" },
  },
  {
    name: "Marcus Chen",
    role: "Chief Design Officer",
    bio: "Parsons graduate. Believes design is not decoration — it's the architecture of desire.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=85",
    social: { ig: "#", tw: "#", li: "#" },
  },
  {
    name: "Ifeoma Adeyemi",
    role: "Head of Sustainability",
    bio: "Pioneering zero-waste supply chains. Named one of Forbes' 30 Under 30 in sustainability.",
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=85",
    social: { ig: "#", tw: "#", li: "#" },
  },
  {
    name: "Julien Moreau",
    role: "Master Craftsman",
    bio: "Third-generation artisan from Lyon. 25 years perfecting the techniques that define LUXE.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=85",
    social: { ig: "#", tw: "#", li: "#" },
  },
];

// ── Single team card ──────────────────────────────────────────────────────────
function TeamCard({ member, delay }: { member: TeamMember; delay: number }) {
  const ref              = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl
        transition-all duration-500 hover:-translate-y-2
        ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: vis ? `${delay}ms` : "0ms" }}
    >
      {/* Portrait */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={member.img}
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/20 to-transparent" />

        {/* Social icons — slide up on hover */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          {[
            { Icon: Instagram, href: member.social.ig },
            { Icon: Twitter,   href: member.social.tw },
            { Icon: Linkedin,  href: member.social.li },
          ].map(({ Icon, href }, j) => (
            <a
              key={j}
              href={href}
              className="w-8 h-8 bg-white/15 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
            >
              <Icon className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>
      </div>

      {/* Text */}
      <div className="p-5">
        <h3 className="font-bold text-[#0f172a] text-base">{member.name}</h3>
        <p className="text-blue-600 text-xs font-semibold mb-2">{member.role}</p>
        <p className="text-gray-400 text-xs leading-relaxed">{member.bio}</p>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AboutTeam() {
  const headRef              = useRef<HTMLDivElement>(null);
  const [headVis, setHeadVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeadVis(true); },
      { threshold: 0.2 }
    );
    if (headRef.current) obs.observe(headRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="team" className="py-20 sm:py-28 bg-[#f8f9fb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          ref={headRef}
          className={`text-center mb-14 transition-all duration-700 ${headVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-6 bg-blue-500" />
            <span className="text-blue-600 text-xs font-bold tracking-[0.3em] uppercase">The People</span>
            <div className="h-px w-6 bg-blue-500" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0f172a] leading-tight">
            The Minds Behind
            <br />
            <span className="italic text-blue-600">Every Detail</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-4 max-w-xl mx-auto">
            A small, fiercely dedicated team united by one belief: that the objects we surround
            ourselves with shape who we become.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {TEAM.map((member, i) => (
            <TeamCard key={i} member={member} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
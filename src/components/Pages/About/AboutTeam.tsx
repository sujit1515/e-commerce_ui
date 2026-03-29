"use client";
import { useEffect, useRef, useState } from "react";
import { Instagram, Twitter, Linkedin } from "lucide-react";

// ── Types
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  img: string;
  social: { ig: string; tw: string; li: string };
}

// ── Data 
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
  const ref = useRef<HTMLDivElement>(null);
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
      className={`group rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl
        transition-all duration-500 hover:-translate-y-2
        ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ 
        transitionDelay: vis ? `${delay}ms` : "0ms",
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(128, 0, 0, 0.1)"
      }}
    >
      {/* Portrait */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={member.img}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Dark gradient overlay on hover only */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-transparent transition-all duration-500 group-hover:from-black/70 group-hover:via-black/30" />

        {/* Social icons — slide up on hover */}
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 flex gap-1.5 sm:gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          {[
            { Icon: Instagram, href: member.social.ig },
            { Icon: Twitter,   href: member.social.tw },
            { Icon: Linkedin,  href: member.social.li },
          ].map(({ Icon, href }, j) => (
            <a
              key={j}
              href={href}
              className="w-7 sm:w-8 h-7 sm:h-8 bg-black/50 backdrop-blur-sm border border-white/30 rounded-lg flex items-center justify-center text-white hover:bg-maroon hover:border-maroon transition-all duration-300 hover:scale-110"
              aria-label={`${member.name}'s social link ${j + 1}`}
            >
              <Icon className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            </a>
          ))}
        </div>
      </div>

      {/* Text */}
      <div className="p-3 sm:p-4 lg:p-5">
        <h3 className="font-bold text-black text-sm sm:text-base lg:text-lg leading-tight transition-colors duration-300 group-hover:text-maroon">
          {member.name}
        </h3>
        <p className="text-gray-500 text-[10px] sm:text-xs font-semibold mb-1.5 sm:mb-2 transition-colors duration-300 group-hover:text-maroon">
          {member.role}
        </p>
        <p className="text-gray-500 text-[10px] sm:text-xs leading-relaxed line-clamp-3 sm:line-clamp-none">
          {member.bio}
        </p>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AboutTeam() {
  const headRef = useRef<HTMLDivElement>(null);
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
    <section id="team" className="py-16 sm:py-20 lg:py-28" style={{ backgroundColor: "#F8F4F0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          ref={headRef}
          className={`text-center mb-10 sm:mb-12 lg:mb-14 transition-all duration-700 ${headVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            <div className="h-px w-4 sm:w-6" style={{ backgroundColor: "#800000" }} />
            <span className="text-maroon text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase" style={{ color: "#800000" }}>
              The People
            </span>
            <div className="h-px w-4 sm:w-6" style={{ backgroundColor: "#800000" }} />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight px-4 sm:px-0">
            <span style={{ color: "#000000" }}>The Minds Behind</span>
            <br />
            <span className="italic" style={{ color: "#800000" }}>Every Detail</span>
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm lg:text-base mt-3 sm:mt-4 max-w-xl mx-auto px-4 sm:px-6 lg:px-0">
            A small, fiercely dedicated team united by one belief: that the objects we surround
            ourselves with shape who we become.
          </p>
        </div>

        {/* Team grid - Responsive: 2 on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
          {TEAM.map((member, i) => (
            <TeamCard key={i} member={member} delay={i * 100} />
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
        
        .bg-maroon {
          background-color: #800000 !important;
        }
        
        .hover\\:bg-maroon:hover {
          background-color: #800000 !important;
        }
        
        .hover\\:border-maroon:hover {
          border-color: #800000 !important;
        }
        
        /* Social icon hover effect */
        .group:hover .hover\\:bg-maroon {
          background-color: #800000;
        }
        
        @media (max-width: 380px) {
          .grid {
            gap: 0.5rem;
          }
          .p-3 {
            padding: 0.5rem;
          }
          .text-sm {
            font-size: 0.7rem;
          }
          .text-maroon {
            font-size: 0.6rem;
          }
        }
        
        /* Card hover effect */
        .group:hover {
          border-color: rgba(128, 0, 0, 0.3) !important;
          box-shadow: 0 20px 25px -12px rgba(128, 0, 0, 0.15) !important;
        }
        
        /* Smooth transitions */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Image zoom effect */
        .group:hover img {
          transform: scale(1.1);
        }
        
        /* Text hover effects */
        .group:hover h3 {
          color: #800000;
        }
        
        .group:hover .text-gray-500:first-of-type {
          color: #800000;
        }
        
        /* Social icon animations */
        .group:hover .absolute.bottom-2 {
          transform: translateY(0);
          opacity: 1;
        }
        
        /* Overlay transition */
        .absolute.inset-0 {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </section>
  );
}
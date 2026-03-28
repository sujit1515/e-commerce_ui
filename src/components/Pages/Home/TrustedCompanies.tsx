"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";

// ─── Type Definitions ────────────────────────────────────────────────────────
interface Company {
  name: string;
  logo: string;
}

interface CompanyCardProps {
  company: Company;
  cardWidth: number;
}

// ─── Demo companies — swap logo src + name whenever you're ready ──────────────
const COMPANIES: Company[] = [
  {
    name: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "Meta",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
  },
  {
    name: "Netflix",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  },
  {
    name: "Spotify",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
  },
  {
    name: "Adobe",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png",
  },
];

// ─── Duplicate list so the loop is seamless ──────────────────────────────────
const TICKER: Company[] = [...COMPANIES, ...COMPANIES];

// ─── Responsive card width hook ───────────────────────────────────────────────
const useResponsiveCardWidth = (): number => {
  const [cardWidth, setCardWidth] = useState<number>(220);

  useEffect(() => {
    const handleResize = (): void => {
      const width = window.innerWidth;
      if (width < 380) setCardWidth(130);
      else if (width < 480) setCardWidth(140);
      else if (width < 640) setCardWidth(160);
      else if (width < 768) setCardWidth(180);
      else if (width < 1024) setCardWidth(200);
      else setCardWidth(220);
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return cardWidth;
};

// ─── Company Card Component ───────────────────────────────────────────────────
const CompanyCard: React.FC<CompanyCardProps> = ({ company, cardWidth }) => {
  const [imageError, setImageError] = useState<boolean>(false);

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(128, 0, 0, 0.12)" }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="flex flex-shrink-0 flex-col items-center justify-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-maroon/10 bg-white/80 backdrop-blur-sm px-2 xs:px-3 sm:px-4 md:px-6 py-2 xs:py-3 sm:py-4 md:py-5 cursor-default transition-all duration-300 hover:border-maroon/30"
      style={{
        width: cardWidth,
        boxShadow: "0 2px 12px rgba(128, 0, 0, 0.05)",
      }}
    >
      {/* Logo */}
      <div className="flex h-6 xs:h-8 sm:h-10 md:h-12 w-full items-center justify-center">
        {imageError ? (
          <div className="w-8 h-8 rounded-full bg-maroon/10 flex items-center justify-center">
            <span className="text-[8px] xs:text-[10px] text-maroon font-medium">
              {company.name.charAt(0)}
            </span>
          </div>
        ) : (
          <img
            src={company.logo}
            alt={`${company.name} logo`}
            className="max-h-5 xs:max-h-6 sm:max-h-8 md:max-h-10 max-w-[60px] xs:max-w-[80px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-[140px] object-contain transition-all duration-300 group-hover:opacity-80"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        )}
      </div>

      {/* Divider - Maroon color */}
      <div className="h-px w-4 xs:w-6 sm:w-8 md:w-10 bg-maroon/30" />

      {/* Name - Maroon color */}
      <span
        className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-medium tracking-wide text-maroon text-center px-1 transition-colors duration-300 hover:text-maroon-dark"
        style={{ 
          fontFamily: "'Cormorant Garamond', serif",
          letterSpacing: "0.04em",
        }}
      >
        {company.name}
      </span>
    </motion.div>
  );
};

// ─── Marquee Component ────────────────────────────────────────────────────────
const InfiniteMarquee: React.FC = () => {
  const cardWidth = useResponsiveCardWidth();
  const gap = 12; // Base gap - responsive through className
  const setWidth = (cardWidth + gap) * COMPANIES.length;

  return (
    <section className="w-full overflow-hidden bg-[#F8F4F0] border-t border-b border-maroon/10 py-8 sm:py-12 md:py-16">
      {/* Section heading */}
      <div className="mb-6 sm:mb-8 md:mb-10 text-center px-4">
        <p
          className="text-[10px] xs:text-xs uppercase tracking-[0.18em] sm:tracking-[0.22em] text-maroon/60 font-medium mb-1.5 sm:mb-2"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Trusted By
        </p>
        
        {/* Decorative Maroon Elements */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-12 bg-maroon/30"></div>
          <div className="w-1.5 h-1.5 bg-maroon transform rotate-45"></div>
          <div className="h-px w-12 bg-maroon/30"></div>
        </div>
        
        <h2
          className="text-xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-light text-maroon px-2"
          style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            letterSpacing: "0.04em",
            fontWeight: 500,
          }}
        >
          Our Partner Companies
        </h2>
        
        <div className="mx-auto mt-3 sm:mt-4 h-px w-12 sm:w-16 bg-maroon/30" />
        
        <p
          className="text-xs xs:text-sm max-w-md mx-auto mt-3 sm:mt-4 text-maroon/80 italic px-4"
          style={{ 
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
          }}
        >
          Leading brands that trust our craftsmanship and quality
        </p>
      </div>

      {/* Marquee with fade masks - Updated to match cream background */}
      <div className="relative">
        {/* Left fade - using cream gradient */}
        <div 
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 xs:w-16 sm:w-20 md:w-40 bg-gradient-to-r from-[#F8F4F0] via-[#F8F4F0]/80 to-transparent" 
        />
        
        {/* Right fade - using cream gradient */}
        <div 
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 xs:w-16 sm:w-20 md:w-40 bg-gradient-to-l from-[#F8F4F0] via-[#F8F4F0]/80 to-transparent" 
        />

        {/* Infinite scroll track */}
        <motion.div
          className="flex"
          style={{ 
            gap: `${gap}px`, 
            width: `${setWidth * 2}px`,
          }}
          animate={{ x: [0, -setWidth] }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {TICKER.map((company, index) => (
            <CompanyCard 
              key={`${company.name}-${index}`} 
              company={company} 
              cardWidth={cardWidth}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const PartnerCompanies: React.FC = () => {
  return (
    <>
      <Head>
        <title>Pareenita – Trusted Partners</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Custom responsive breakpoint and maroon color variables */}
      <style>{`
        /* Maroon Color Variables */
        :root {
          --maroon: #800000;
          --maroon-dark: #5C0000;
          --maroon-light: #9D2A2A;
          --maroon-soft: #F5E6E6;
          --cream: #F8F4F0;
        }
        
        /* Apply maroon to text */
        .text-maroon {
          color: var(--maroon);
        }
        .text-maroon-dark {
          color: var(--maroon-dark);
        }
        .bg-maroon {
          background-color: var(--maroon);
        }
        .bg-maroon-soft {
          background-color: var(--maroon-soft);
        }
        .border-maroon {
          border-color: var(--maroon);
        }
        
        /* Hover effects */
        .hover\\:border-maroon\\/30:hover {
          border-color: rgba(128, 0, 0, 0.3);
        }
        
        /* Extra small devices (below 480px) */
        @media (min-width: 380px) {
          .xs\\:text-xs { font-size: 0.75rem; }
          .xs\\:text-sm { font-size: 0.875rem; }
          .xs\\:text-base { font-size: 1rem; }
          .xs\\:max-h-6 { max-height: 1.5rem; }
          .xs\\:max-h-8 { max-height: 2rem; }
          .xs\\:max-w-\\[80px\\] { max-width: 80px; }
          .xs\\:px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
        }
        
        /* Reduce animation speed if user prefers reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .motion-div {
            animation: none !important;
          }
        }
        
        /* Custom maroon gradient for special effects */
        .maroon-gradient {
          background: linear-gradient(135deg, var(--maroon), var(--maroon-dark));
        }
        
        /* Card hover effect enhancement */
        .company-card:hover {
          border-color: rgba(128, 0, 0, 0.2);
          box-shadow: 0 8px 24px rgba(128, 0, 0, 0.08);
        }
        
        /* Cream background utility */
        .bg-cream {
          background-color: var(--cream);
        }
      `}</style>

      <InfiniteMarquee />
    </>
  );
};

export default PartnerCompanies;
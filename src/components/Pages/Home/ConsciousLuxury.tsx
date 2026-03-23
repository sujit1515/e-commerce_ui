"use client";

import React, { useState, useEffect } from "react";

interface FeaturePillProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeaturePill: React.FC<FeaturePillProps> = ({ icon, title, description }) => {
  return (
    <div className="w-full">
      <div
        className="w-8 sm:w-9 h-8 sm:h-9 rounded-full flex items-center justify-center mb-2 sm:mb-3"
        style={{ backgroundColor: "#ef4444" }}
      >
        {icon}
      </div>
      <h4
        className="font-semibold text-sm sm:text-base mb-1"
        style={{ 
          color: "#111827", 
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 600,
        }}
      >
        {title}
      </h4>
      <p
        className="text-xs sm:text-sm leading-relaxed"
        style={{ 
          color: "#6b7280", 
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 400,
        }}
      >
        {description}
      </p>
    </div>
  );
};

const ConsciousLuxury: React.FC = () => {
  const [imageError, setImageError] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleImageError = (): void => {
    setImageError(true);
  };

  // Icons as JSX elements
  const leafIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 sm:w-5 h-4 sm:h-5">
      <path d="M15.75 8.25c0 3.314-2.686 6-6 6a6 6 0 01-5.985-5.57C3.682 8.55 3.6 8.427 3.6 8.25c0-4.97 4.03-9 9-9 .174 0 .347.005.519.014A9.027 9.027 0 0115.75 8.25z" />
      <path fillRule="evenodd" d="M3.75 21a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm.75-3.75a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5z" clipRule="evenodd" />
    </svg>
  );

  const medalIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 sm:w-5 h-4 sm:h-5">
      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
  );

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&display=swap');
        
        * {
          font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif !important;
        }
        
        svg, [class*="lucide-"] {
          font-family: inherit !important;
        }

        /* Responsive text adjustments */
        @media (max-width: 640px) {
          .text-responsive-headline {
            font-size: 2.5rem !important;
            line-height: 1.1 !important;
          }
          .text-responsive-body {
            font-size: 1rem !important;
          }
        }

        @media (max-width: 480px) {
          .text-responsive-headline {
            font-size: 2rem !important;
          }
        }

        /* Smooth transitions */
        .btn-transition {
          transition: all 0.3s ease;
        }
      `}</style>

      <section
        className="w-full py-12 sm:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 xl:px-16"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-12 xl:gap-16">

            {/* ── LEFT: Text Content ── */}
            <div className="flex-1 w-full lg:max-w-[52%] order-2 lg:order-1">

              {/* Tag */}
              <p
                className="text-[10px] sm:text-xs font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-3 sm:mb-4 text-center lg:text-left"
                style={{ 
                  color: "#ef4444", 
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 500,
                }}
              >
                Our Commitment
              </p>

              {/* Headline */}
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.05] mb-4 sm:mb-5 lg:mb-6 text-center lg:text-left px-2 sm:px-0"
                style={{
                  color: "#111827",
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 700,
                }}
              >
                Conscious Luxury for the Modern Individual.
              </h2>

              {/* Body */}
              <p
                className="text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left px-4 sm:px-6 lg:px-0"
                style={{ 
                  color: "#4b5563", 
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 400,
                  fontStyle: "italic",
                }}
              >
                At LUXE, we believe that true elegance lies in simplicity. Our
                philosophy is rooted in the pursuit of perfection through the
                subtraction of the unnecessary. Each piece is crafted with
                purpose, using only the finest ethically-sourced materials.
              </p>

              {/* Feature pills - Responsive grid */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10 px-4 sm:px-6 lg:px-0">
                {/* Sustainability */}
                <FeaturePill 
                  icon={leafIcon}
                  title="Sustainability"
                  description="Recycled fabrics and carbon-neutral shipping."
                />

                {/* Heritage Quality */}
                <FeaturePill 
                  icon={medalIcon}
                  title="Heritage Quality"
                  description="Handcrafted by artisans with lifelong expertise."
                />
              </div>

              {/* CTA Button - Centered on mobile, left on desktop */}
              <div className="flex justify-center lg:justify-start px-4 sm:px-6 lg:px-0">
                <button
                  className="px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-medium tracking-widest uppercase border-2 
                    transition-all duration-300 hover:bg-red-600 hover:text-white active:scale-95 btn-transparent
                    w-full xs:w-auto"
                  style={{
                    borderColor: isHovered ? "#ef4444" : "#111827",
                    color: isHovered ? "#ffffff" : "#111827",
                    backgroundColor: isHovered ? "#ef4444" : "transparent",
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    letterSpacing: "0.1em",
                    fontWeight: 500,
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Read Our Journal
                </button>
              </div>
            </div>

            {/* ── RIGHT: Image with decorative border ── */}
            <div className="flex-1 w-full lg:max-w-[45%] flex items-center justify-center lg:justify-end order-1 lg:order-2 mb-6 lg:mb-0">
              <div className="relative w-full max-w-[380px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[480px] mx-auto lg:mx-0">

                {/* Decorative red border offset behind image */}
                <div
                  className="absolute rounded-xl sm:rounded-2xl"
                  style={{
                    border: "2px solid #ef4444",
                    top: "-12px sm:-14px lg:-16px",
                    right: "-12px sm:-14px lg:-16px",
                    bottom: "12px sm:14px lg:16px",
                    left: "12px sm:14px lg:16px",
                    zIndex: 0,
                    borderRadius: "1rem",
                    boxShadow: "0 10px 30px rgba(239,68,68,0.1)",
                  }}
                />

                {/* Image container */}
                <div
                  className="relative z-10 w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-lg"
                  style={{ 
                    backgroundColor: "#f8f8f8",
                    aspectRatio: "4/5",
                    boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)"
                  }}
                >
                  {imageError ? (
                    <div className="w-full h-full flex items-center justify-center flex-col gap-2 sm:gap-3 p-4">
                      <span className="text-6xl sm:text-7xl md:text-8xl select-none">🧥</span>
                      <p className="text-[10px] sm:text-xs tracking-widest uppercase text-center" style={{ color: "#9ca3af" }}>
                        Add your image here
                      </p>
                    </div>
                  ) : (
                    <img 
                      src="/Images/Shop/luxery-1.jpg" 
                      alt="Conscious Luxury - Sustainable fashion" 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                      onError={handleImageError}
                    />
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default ConsciousLuxury;
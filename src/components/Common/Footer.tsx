"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const [logoError, setLogoError] = useState(false);

  // Check if on electronics page
  const isElectronicsPage = pathname === "/electronics" || pathname?.startsWith("/electronics/");

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  // Get footer colors based on page
  const getFooterColors = () => {
    if (isElectronicsPage) {
      return {
        mainBg: "#080808",
        topBorder: "border-gray-800",
        bottomBar: "#050505",
        borderColor: "border-gray-800/30",
        headingColor: "text-white/90",
        textColor: "text-gray-300",
        hoverColor: "hover:text-red-500",
        accentColor: "text-red-500",
        circleColors: ["#ef4444", "#ef4444/70", "#ef4444/50"],
        mapBorder: "border-gray-800"
      };
    }
    return {
      mainBg: "#4A0E0E",
      topBorder: "border-red-800/30",
      bottomBar: "#3A0B0B",
      borderColor: "border-red-800/30",
      headingColor: "text-white/90",
      textColor: "text-gray-200",
      hoverColor: "hover:text-red-300",
      accentColor: "text-red-300",
      circleColors: ["#ef4444", "#ef4444/70", "#ef4444/50"],
      mapBorder: "border-red-800/30"
    };
  };

  const colors = getFooterColors();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&display=swap');
        
        * {
          font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif !important;
        }
        
        /* Keep icons with their original styling */
        svg, [class*="lucide-"] {
          font-family: inherit !important;
        }
        
        /* Logo placeholder animation */
        .logo-placeholder {
          transition: all 0.3s ease;
        }
        
        .logo-placeholder:hover {
          transform: scale(1.05);
          opacity: 0.9;
        }
        
        /* Responsive map container */
        .map-container {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
          height: 0;
          overflow: hidden;
          border-radius: 0.5rem;
        }
        
        .map-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .footer-grid {
            gap: 2rem !important;
          }
          .footer-logo {
            width: 80px !important;
            height: auto !important;
          }
          .footer-logo-svg {
            width: 32px !important;
            height: 32px !important;
          }
          .footer-text-sm {
            font-size: 0.75rem !important;
          }
          .footer-heading {
            font-size: 1rem !important;
            margin-bottom: 0.75rem !important;
          }
          .footer-link {
            font-size: 0.75rem !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            text-align: center !important;
            gap: 1rem !important;
          }
          .footer-bottom-links {
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 1rem !important;
          }
        }
        
        @media (min-width: 641px) and (max-width: 768px) {
          .footer-logo {
            width: 100px !important;
            height: auto !important;
          }
          .footer-grid {
            gap: 1.5rem !important;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .footer-grid {
            gap: 2rem !important;
          }
        }
        
        /* Smooth transition for theme changes */
        footer {
          transition: background-color 0.3s ease;
        }
        
        /* Reduce top section padding */
        .footer-top-section {
          padding-top: 1rem !important;
          padding-bottom: 1rem !important;
        }
      `}</style>

      <footer className="w-full" style={{ backgroundColor: colors.mainBg }}>

        {/* TOP SECTION - LOGO - Reduced padding */}
        <div className={`w-full py-3 sm:py-4 md:py-5 ${colors.topBorder} border-b`}>
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-center items-center">
              {/* Logo - Smaller size */}
              <div 
                className="logo-placeholder cursor-pointer" 
                onClick={() => handleNavigation("/")}
              >
                {!logoError ? (
                  <div className="footer-logo w-20 sm:w-24 md:w-28 lg:w-32 h-auto">
                    <Image
                      src="/Images/logo/logo.png"
                      alt="Company Logo"
                      width={120}
                      height={45}
                      className="w-full h-auto object-contain"
                      onError={() => setLogoError(true)}
                      priority
                    />
                  </div>
                ) : (
                  /* Fallback if logo fails to load */
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: isElectronicsPage ? "#ef4444" : "#ef4444" }}
                      />
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: isElectronicsPage ? "#ef4444/60" : "#ef4444", opacity: 0.6 }}
                      />
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: isElectronicsPage ? "#ef4444/30" : "#ef4444", opacity: 0.3 }}
                      />
                    </div>
                    <span 
                      className="font-semibold tracking-widest text-base sm:text-lg"
                      style={{ 
                        fontFamily: "'Cormorant Garamond', Georgia, serif", 
                        fontWeight: 600,
                        color: colors.textColor
                      }}
                    >
                      LUXE
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MAIN FOOTER CONTENT - Reduced padding */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 md:py-10 lg:py-12">
          <div className="container mx-auto">
            <div className="footer-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">

              {/* Brand Description */}
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2 sm:mb-3">
                  <div className="flex gap-0.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" style={{ backgroundColor: colors.circleColors[0] }} />
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" style={{ backgroundColor: colors.circleColors[1], opacity: 0.7 }} />
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" style={{ backgroundColor: colors.circleColors[2], opacity: 0.5 }} />
                  </div>
                </div>
                <p className={`footer-text-sm ${colors.textColor} text-xs sm:text-sm leading-relaxed max-w-xs mx-auto sm:mx-0`} style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}>
                  Defining modern elegance through timeless design and premium craftsmanship since 2012.
                </p>
              </div>

              {/* Shop */}
              <div className="text-center sm:text-left">
                <h4 className={`footer-heading font-semibold mb-2 sm:mb-3 ${colors.headingColor} text-sm sm:text-base md:text-lg`} style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
                  Shop
                </h4>
                <ul className="space-y-1.5 sm:space-y-2">
                  {[
                    { name: "Home", path: "/shop/all" },
                    { name: "Mens Collection", path: "/shop/men" },
                    { name: "Women Collection", path: "/shop/women" },
                    { name: "Kid Collection", path: "/shop/kid" },
                    { name: "GenZ", path: "/shop/genz" }
                  ].map((item) => (
                    <li key={item.name}>
                      <button
                        onClick={() => handleNavigation(item.path)}
                        className={`footer-link ${colors.textColor} ${colors.hoverColor} text-xs sm:text-sm cursor-pointer transition-colors duration-200`}
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div className="text-center sm:text-left">
                <h4 className={`footer-heading font-semibold mb-2 sm:mb-3 ${colors.headingColor} text-sm sm:text-base md:text-lg`} style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
                  Company
                </h4>
                <ul className="space-y-1.5 sm:space-y-2">
                  {[
                    { name: "Our Story", path: "/about" },
                    { name: "About", path: "/about" },
                    { name: "Contact Us", path: "/contact" },
                    { name: "Stores", path: "/stores" }
                  ].map((item) => (
                    <li key={item.name}>
                      <button
                        onClick={() => handleNavigation(item.path)}
                        className={`footer-link ${colors.textColor} ${colors.hoverColor} text-xs sm:text-sm cursor-pointer transition-colors duration-200`}
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Map Section */}
              <div>
                <h4 className={`footer-heading font-semibold mb-2 sm:mb-3 ${colors.headingColor} text-sm sm:text-base md:text-lg text-center sm:text-left`} style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
                  Visit Us
                </h4>
                <div className={`map-container w-full h-28 sm:h-32 md:h-36 bg-gray-900 rounded-lg overflow-hidden mb-2 border ${colors.mapBorder}`}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bb7b5f1%3A0x3b8b7f8f8f8f8f8f!2sWall%20Street%2C%20New%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Store Location"
                  />
                </div>
                <p className={`footer-text-sm ${colors.textColor} text-xs sm:text-sm text-center sm:text-left`} style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}>
                  123 Luxury Avenue<br />
                  New York, NY 10005
                </p>
                <p className={`footer-text-sm ${colors.textColor} text-xs sm:text-sm mt-1.5 text-center sm:text-left`} style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}>
                  📞 +1 (212) 555-0123
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM BAR - Reduced padding */}
        <div className={`border-t ${colors.borderColor}`} style={{ backgroundColor: colors.bottomBar }}>
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-3 sm:py-4">
            <div className="footer-bottom flex flex-col md:flex-row items-center justify-between gap-2">
              <p className={`footer-text-sm ${colors.textColor} text-xs sm:text-sm text-center md:text-left`} style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}>
                © 2024 LUXE Lifestyle Brand. All rights reserved.
              </p>

              <div className="footer-bottom-links flex flex-wrap items-center justify-center gap-3 sm:gap-6">
                {[
                  { name: "Privacy Policy", path: "/privacypolicy" },
                  { name: "Terms of Service", path: "/terms" },
                  { name: "Cookie Settings", path: "/cookie-settings" }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.path)}
                    className={`footer-link ${colors.textColor} ${colors.hoverColor} text-xs sm:text-sm transition-colors duration-200`}
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </footer>
    </>
  );
}
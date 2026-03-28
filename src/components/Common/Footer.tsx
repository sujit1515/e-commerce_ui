"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Footer() {
  const router = useRouter();
  const [logoError, setLogoError] = useState(false);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

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
            height: 80px !important;
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
            height: 100px !important;
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
      `}</style>

      <footer className="w-full" style={{ backgroundColor: "#4A0E0E" }}>

        {/* TOP SECTION - LOGO */}
        <div className="w-full py-6 sm:py-8 md:py-10 border-b border-red-800/30">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-center items-center">
              {/* Logo - Using Next.js Image component */}
              <div 
                className="logo-placeholder cursor-pointer" 
                onClick={() => handleNavigation("/")}
              >
                {!logoError ? (
                  <div className="footer-logo w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-red-800/20 flex items-center justify-center border-2 border-red-600/40 hover:border-red-400/60 transition-all duration-300 overflow-hidden">
                    <Image
                      src="/Images/logo/logo.png"
                      alt="Company Logo"
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                      onError={() => setLogoError(true)}
                      priority
                    />
                  </div>
                ) : (
                  /* Fallback placeholder if logo fails to load */
                  <div className="footer-logo w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-red-800/20 flex items-center justify-center border-2 border-red-600/40 hover:border-red-400/60 transition-all duration-300">
                    <div className="text-center px-2">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="footer-logo-svg w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-red-300/60 mx-auto mb-1 sm:mb-2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                      </svg>
                      <p className="text-[8px] sm:text-[10px] md:text-xs text-red-300/40">Logo Here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MAIN FOOTER CONTENT */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 md:py-12 lg:py-14">
          <div className="container mx-auto">
            <div className="footer-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">

              {/* Brand Description */}
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-3 sm:mb-4">
                  <div className="flex gap-0.5">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-400 rounded-full" />
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-300/70 rounded-full" />
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-200/50 rounded-full" />
                  </div>
                </div>
                <p className="footer-text-sm text-gray-200 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto sm:mx-0" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}>
                  Defining modern elegance through timeless design and premium craftsmanship since 2012.
                </p>
              </div>

              {/* Shop */}
              <div className="text-center sm:text-left">
                <h4 className="footer-heading font-semibold mb-3 sm:mb-4 text-white/90 text-sm sm:text-base md:text-lg" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>Shop</h4>
                <ul className="space-y-2 sm:space-y-3">
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
                        className="footer-link text-gray-200 text-xs sm:text-sm hover:text-red-300 cursor-pointer transition-colors duration-200"
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
                <h4 className="footer-heading font-semibold mb-3 sm:mb-4 text-white/90 text-sm sm:text-base md:text-lg" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>Company</h4>
                <ul className="space-y-2 sm:space-y-3">
                  {[
                    { name: "Our Story", path: "/about" },
                    { name: "About", path: "/about" },
                    { name: "Contact Us", path: "/contact" },
                    { name: "Stores", path: "/stores" }
                  ].map((item) => (
                    <li key={item.name}>
                      <button
                        onClick={() => handleNavigation(item.path)}
                        className="footer-link text-gray-200 text-xs sm:text-sm hover:text-red-300 cursor-pointer transition-colors duration-200"
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
                <h4 className="footer-heading font-semibold mb-3 sm:mb-4 text-white/90 text-sm sm:text-base md:text-lg text-center sm:text-left" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>Visit Us</h4>
                <div className="map-container w-full h-32 sm:h-36 md:h-40 bg-gray-800 rounded-lg overflow-hidden mb-3 border border-red-800/30">
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
                <p className="footer-text-sm text-gray-200 text-xs sm:text-sm text-center sm:text-left" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}>
                  123 Luxury Avenue<br />
                  New York, NY 10005
                </p>
                <p className="footer-text-sm text-gray-200 text-xs sm:text-sm mt-2 text-center sm:text-left" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}>
                  📞 +1 (212) 555-0123
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-red-800/30" style={{ backgroundColor: "#3A0B0B" }}>
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-5">
            <div className="footer-bottom flex flex-col md:flex-row items-center justify-between gap-3">
              <p className="footer-text-sm text-gray-300 text-xs sm:text-sm text-center md:text-left" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}>
                © 2024 LUXE Lifestyle Brand. All rights reserved.
              </p>

              <div className="footer-bottom-links flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                {[
                  { name: "Privacy Policy", path: "/privacypolicy" },
                  { name: "Terms of Service", path: "/terms" },
                  { name: "Cookie Settings", path: "/cookie-settings" }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.path)}
                    className="footer-link text-gray-300 text-xs sm:text-sm hover:text-red-300 transition-colors duration-200"
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
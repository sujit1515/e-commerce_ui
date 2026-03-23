"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

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
      `}</style>

      <footer className="w-screen bg-white border-t border-gray-200">

        {/* TOP FOOTER */}
        <div className="w-screen px-4 md:px-8 lg:px-18 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  <div className="w-2.5 h-2.5 bg-red-600 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-red-500/60 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-red-400/30 rounded-full" />
                </div>
                <span className="font-semibold tracking-widest text-black" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>LUXE</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}>
                Defining modern elegance through timeless design and premium craftsmanship since 2012.
              </p>
            </div>

            {/* Shop */}
            <div>
              <h4 className="font-semibold mb-4 text-black" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>Shop</h4>
              <ul className="space-y-3">
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
                      className="text-gray-600 text-sm hover:text-red-600 cursor-pointer transition-colors duration-200"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4 text-black" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>Company</h4>
              <ul className="space-y-3">
                {[
                  { name: "Our Story", path: "/about" },
                  { name: "About", path: "/about" },
                  { name: "Contact Us", path: "/contact" },
                  { name: "Stores", path: "/stores" }
                ].map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNavigation(item.path)}
                      className="text-gray-600 text-sm hover:text-red-600 cursor-pointer transition-colors duration-200"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Map Section - Replaced Newsletter */}
            <div>
              <h4 className="font-semibold mb-4 text-black" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>Visit Us</h4>
              <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden mb-3 border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bb7b5f1%3A0x3b8b7f8f8f8f8f8f!2sWall%20Street%2C%20New%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Store Location"
                  // Removed grayscale filter for original colors
                />
              </div>
              <p className="text-gray-600 text-sm" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}>
                123 Luxury Avenue<br />
                New York, NY 10005
              </p>
              <p className="text-gray-600 text-sm mt-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}>
                📞 +1 (212) 555-0123
              </p>
            </div>

          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="w-screen px-4 md:px-8 lg:px-16 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-gray-500 text-xs" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}>
              © 2024 LUXE Lifestyle Brand. All rights reserved.
            </p>

            <div className="flex gap-6">
              {[
                { name: "Privacy Policy", path: "/privacypolicy" },
                { name: "Terms of Service", path: "/terms" },
                { name: "Cookie Settings", path: "/cookie-settings" }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className="text-gray-500 text-xs hover:text-red-600 transition-colors duration-200"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>

      </footer>
    </>
  );
}
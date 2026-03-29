// components/Common/ElectronicsNavbar.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { 
  Zap, Laptop, Smartphone, Headphones, Watch, Camera, Gamepad2, 
  Tv, Speaker, Tablet, HardDrive, Cpu, ChevronDown, ChevronRight,
  Tag, TrendingUp, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ElectronicsNavbarProps {
  onCategorySelect?: (category: string) => void;
  navbarVisible?: boolean;
}

const electronicsCategories = [
  { name: "All Products", icon: Zap, href: "/electronics", color: "red" },
  { name: "Laptops", icon: Laptop, href: "/electronics/laptops", color: "blue" },
  { name: "Smartphones", icon: Smartphone, href: "/electronics/smartphones", color: "green" },
  { name: "Headphones", icon: Headphones, href: "/electronics/headphones", color: "purple" },
  { name: "Smartwatches", icon: Watch, href: "/electronics/smartwatches", color: "cyan" },
  { name: "Cameras", icon: Camera, href: "/electronics/cameras", color: "orange" },
  { name: "Gaming", icon: Gamepad2, href: "/electronics/gaming", color: "pink" },
  { name: "TV & Audio", icon: Tv, href: "/electronics/tv-audio", color: "indigo" },
  { name: "Tablets", icon: Tablet, href: "/electronics/tablets", color: "teal" },
  { name: "Storage", icon: HardDrive, href: "/electronics/storage", color: "yellow" },
  { name: "Components", icon: Cpu, href: "/electronics/components", color: "lime" },
  { name: "Speakers", icon: Speaker, href: "/electronics/speakers", color: "rose" },
];

const quickLinks = [
  { name: "Deals", icon: Tag, href: "/electronics/deals" },
  { name: "New Arrivals", icon: Sparkles, href: "/electronics/new-arrivals" },
  { name: "Trending", icon: TrendingUp, href: "/electronics/trending" },
];

export default function ElectronicsNavbar({ onCategorySelect, navbarVisible = true }: ElectronicsNavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Find active category based on current path
    const currentCategory = electronicsCategories.find(cat => pathname === cat.href);
    if (currentCategory) {
      setActiveCategory(currentCategory.name);
    } else if (pathname === "/electronics") {
      setActiveCategory("All Products");
    }
  }, [pathname]);

  // Handle scroll effect for background and visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for background
      setScrolled(currentScrollY > 20);
      
      // Sync visibility with main navbar
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavigation = (href: string, categoryName: string) => {
    setActiveCategory(categoryName);
    if (onCategorySelect) onCategorySelect(categoryName);
    router.push(href);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&display=swap');
        
        .electronics-subnav {
          font-family: 'Cormorant Garamond', Georgia, serif !important;
        }
        
        .category-chip {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .category-chip::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s ease;
        }
        
        .category-chip:hover::before {
          left: 100%;
        }
        
        .category-chip:hover {
          transform: translateY(-2px);
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @media (max-width: 768px) {
          .category-chip, .quick-link {
            min-height: 40px;
          }
        }
      `}</style>

      {/* Secondary Navbar - Syncs with main navbar visibility */}
      <motion.div 
        initial={{ y: 0 }}
        animate={{ 
          y: (navbarVisible && isVisible) ? 0 : -100,
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
        className={`electronics-subnav sticky top-[60px] z-40 w-full transition-all duration-300
          ${scrolled ? "bg-black/95 backdrop-blur-lg shadow-lg border-b border-gray-800" : "bg-black border-b border-gray-800"}`}
        style={{ height: "50px" }}
      >
        <div className="w-full h-full px-3 sm:px-4 lg:px-6">
          
          {/* Desktop View - Horizontal Scrollable Categories */}
          <div className="hidden md:flex items-center justify-between h-full gap-4">
            {/* Categories - Horizontal Scroll */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide flex-1">
              {electronicsCategories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleNavigation(category.href, category.name)}
                  className={`category-chip flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                    transition-all duration-200 whitespace-nowrap
                    ${pathname === category.href 
                      ? "bg-red-500/20 text-red-500 border border-red-500/30" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                >
                  <category.icon className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">{category.name}</span>
                </button>
              ))}
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-2 flex-shrink-0 pl-4 border-l border-gray-800">
              {quickLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link.href, link.name)}
                  className="quick-link flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                    bg-gradient-to-r from-red-500/10 to-red-600/10 text-red-400 hover:text-red-300
                    hover:from-red-500/20 hover:to-red-600/20 transition-all duration-200 whitespace-nowrap"
                >
                  <link.icon className="w-3 h-3" />
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile View - Collapsed with toggle */}
          <div className="flex md:hidden items-center justify-between h-full">
            {/* Active Category Display */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-white text-sm font-medium"
            >
              <Zap className="w-4 h-4 text-red-500" />
              <span className="max-w-[150px] truncate">{activeCategory}</span>
              {mobileMenuOpen ? (
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              )}
            </button>

            {/* Quick Links Row */}
            <div className="flex items-center gap-2">
              {quickLinks.slice(0, 2).map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link.href, link.name)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-red-500/10 text-red-400 text-xs font-medium"
                >
                  <link.icon className="w-3 h-3" />
                  <span className="hidden xs:inline">{link.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[110px] left-0 right-0 z-30 bg-black/95 backdrop-blur-lg border-b border-gray-800 md:hidden overflow-hidden"
            style={{ maxHeight: "calc(100vh - 110px)", overflowY: "auto" }}
          >
            <div className="p-4 space-y-4">
              {/* All Categories */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-2 px-2">
                  All Categories
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {electronicsCategories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => handleNavigation(category.href, category.name)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all
                        ${pathname === category.href 
                          ? "bg-red-500/20 text-red-500 border border-red-500/30" 
                          : "bg-gray-900/50 text-gray-300 hover:bg-gray-900"
                        }`}
                    >
                      <category.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Links Section */}
              <div className="pt-2 border-t border-gray-800">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-2 px-2">
                  Quick Links
                </p>
                <div className="flex gap-2">
                  {quickLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => handleNavigation(link.href, link.name)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg
                        bg-gradient-to-r from-red-500/10 to-red-600/10 text-red-400 text-sm font-medium
                        hover:from-red-500/20 hover:to-red-600/20 transition-all"
                    >
                      <link.icon className="w-4 h-4" />
                      {link.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 480px) {
          .electronics-subnav {
            height: 45px !important;
          }
          .category-chip {
            padding-left: 0.5rem !important;
            padding-right: 0.5rem !important;
          }
        }
        
        @media (max-width: 360px) {
          .electronics-subnav {
            height: 42px !important;
          }
        }
        
        @media (max-width: 768px) and (orientation: landscape) {
          .electronics-subnav {
            height: 42px !important;
          }
        }
      `}</style>
    </>
  );
}
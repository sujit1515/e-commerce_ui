"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, User, Search, Menu, X, ChevronDown, Heart, Bell } from "lucide-react";

const navLinks = [
   {
    label: "Home",
    path: "/home",
    dropdown: null,
  },
  
  {
    label: "Men",
    path: "/shop/men",
    dropdown: null,
  },
  {
    label: "Women",
    path: "/shop/women",
    dropdown: null,
  }, 
  {
    label: "Kid",
    path: "/shop/kid",
    dropdown: null,
  },
   {
    label: "Genz",
    path: "/shop/genz",
    dropdown: null,
  },
  {
    label: "About",
    path: "/about",
    dropdown: null,
  },
   {
    label: "Contact",
    path: "/contact",
    dropdown: null,
  },

  // {
  //   label: "Shop",
  //   path: "/shop",
  //   dropdown: ["About", "contact", ],
  // },
];

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [cartCount] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
      setMenuOpen(false);
    }
  };

  const handleNavigation = (path) => {
    router.push(path);
    setMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleDropdownItemClick = (category, item) => {
    // Convert "All Products" to "/shop/all" or similar pattern
    const itemPath = item.toLowerCase().replace(/\s+/g, '-');
    router.push(`/${category.toLowerCase()}/${itemPath}`);
    setActiveDropdown(null);
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#0f172a] text-white text-xs text-center py-2 px-4 tracking-widest font-medium">
        ✦ FREE SHIPPING ON ORDERS OVER ₹150 &nbsp;·&nbsp; USE CODE: <span className="text-blue-400 font-bold">LUXE24</span> &nbsp;·&nbsp; NEW COLLECTION NOW LIVE ✦
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
            : "bg-white border-b border-gray-100"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* ── LOGO ── */}
            <button 
              onClick={() => handleNavigation("/")}
              className="flex items-center gap-2.5 group flex-shrink-0"
            >
              <div className="relative flex items-center gap-0.5">
                {[1, 0.65, 0.35].map((op, i) => (
                  <div
                    key={i}
                    className="w-2.5 h-2.5 rounded-full bg-[#0f172a] transition-transform duration-300 group-hover:scale-110"
                    style={{ opacity: op, transitionDelay: `${i * 40}ms` }}
                  />
                ))}
              </div>
              <span className="text-[1.2rem] font-black tracking-[0.18em] text-[#0f172a] select-none">
                LUXE
              </span>
            </button>

            {/* ── DESKTOP NAV LINKS ── */}
            <div className="hidden md:flex items-center gap-1 ">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => !link.dropdown && handleNavigation(link.path)}
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                      activeDropdown === link.label
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                    {link.dropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          activeDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Dropdown */}
                  {link.dropdown && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fadeIn">
                      {link.dropdown.map((item) => (
                        <button
                          key={item}
                          onClick={() => handleDropdownItemClick(link.label, item)}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* ── RIGHT ICONS ── */}
            <div className="flex items-center gap-1">
              {/* Desktop Search */}
              <div className="hidden md:flex">
                {searchOpen ? (
                  <form onSubmit={handleSearch} className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 w-60 animate-slideIn">
                    <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input
                      autoFocus
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="bg-transparent text-sm text-gray-700 outline-none w-full placeholder-gray-400"
                    />
                    <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
                      <X className="w-4 h-4 text-gray-400 hover:text-gray-700" />
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200"
                    aria-label="Search"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Wishlist — desktop only */}
              <button 
                onClick={() => handleNavigation("/wishlist")}
                className="hidden md:flex p-2.5 text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all duration-200 cursor-pointer" 
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
              </button>

              {/* Account */}
              <button 
                onClick={() => handleNavigation("/account")}
                className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200 cursor-pointer" 
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Cart */}
              <button 
                onClick={() => handleNavigation("/cart")}
                className="relative p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200 group cursor-pointer" 
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2.5 text-gray-700 hover:bg-gray-100 rounded-full transition-colors ml-1"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-gray-100 bg-white px-4 pt-4 pb-6 space-y-1">
            {/* Mobile Search */}
            <form 
              onSubmit={handleSearch}
              className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3 mb-4"
            >
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="bg-transparent text-sm text-gray-700 outline-none w-full placeholder-gray-400"
              />
            </form>

            {/* Mobile Nav Links */}
            {navLinks.map((link, i) => (
              <div key={link.label}>
                <button
                  onClick={() => {
                    if (link.dropdown) {
                      // For mobile, you might want to expand dropdown or navigate to main category
                      handleNavigation(link.path);
                    } else {
                      handleNavigation(link.path);
                    }
                  }}
                  className="flex items-center justify-between w-full px-3 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {link.label}
                  {link.dropdown && <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                
                {/* For mobile, you could also show dropdown items here if needed */}
                {link.dropdown && menuOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {link.dropdown.map((item) => (
                      <button
                        key={item}
                        onClick={() => handleDropdownItemClick(link.label, item)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Bottom Row */}
            <div className="pt-3 mt-3 border-t border-gray-100 flex items-center gap-3">
              <button 
                onClick={() => handleNavigation("/account")}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-100 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <User className="w-4 h-4" /> Account
              </button>
              <button 
                onClick={() => handleNavigation("/wishlist")}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-100 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <Heart className="w-4 h-4" /> Wishlist
              </button>
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; width: 0; }
          to { opacity: 1; width: 15rem; }
        }
        .animate-fadeIn { animation: fadeIn 0.18s ease-out forwards; }
        .animate-slideIn { animation: slideIn 0.2s ease-out forwards; }
      `}</style>
    </>
  );
}
"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ShoppingBag, User, Search, Menu, X, ChevronDown, Heart, Settings, LogOut, UserCircle, LogIn, UserPlus, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import AuthManager from "../Auth/AuthManager/AuthManager";
import { logoutApi } from "@/api/auth";
import { getWishlist } from "@/api/wishlist";
import { getCart } from "@/api/cart";
import { Variants } from "framer-motion";
import ElectronicsNavbar from "./ElectronicsNavbar";

// Define types
interface NavLink {
  label: string;
  path: string;
  dropdown: string[] | null;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface NavbarProps {
  wishlistCount?: number;
  cartCount?: number;
}

const navLinks: NavLink[] = [
  {
    label: "Home",
    path: "/",
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
    label: "Electronics",
    path: "/electronics",
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
];

export default function Navbar({ 
  wishlistCount: propWishlistCount = 0, 
  cartCount: propCartCount = 0,
}: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authView, setAuthView] = useState<"login" | "signup">("login");
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [logoError, setLogoError] = useState<boolean>(false);
  const [wishlistCount, setWishlistCount] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(0);
  
  // Scroll hide/show state
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [navbarVisible, setNavbarVisible] = useState<boolean>(true);

  // Check if on electronics page
  const isElectronicsPage = pathname === "/electronics" || pathname?.startsWith("/electronics/");

  // Fetch wishlist and cart counts
  const fetchCounts = async () => {
    if (!loggedIn) {
      setWishlistCount(0);
      setCartCount(0);
      return;
    }

    try {
      // Fetch wishlist
      const wishlistRes = await getWishlist();
      if (wishlistRes?.success && wishlistRes?.wishlist) {
        setWishlistCount(wishlistRes.wishlist.length);
      } else {
        setWishlistCount(0);
      }
    } catch (error) {
      console.error("Error fetching wishlist count:", error);
      setWishlistCount(0);
    }

    try {
      // Fetch cart
      const cartRes = await getCart();
      if (cartRes && Array.isArray(cartRes)) {
        const totalItems = cartRes.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
        setCartCount(totalItems);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
      setCartCount(0);
    }
  };

  // Check login when Navbar loads
  useEffect(() => {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    const storedUser =
      localStorage.getItem("user") ||
      sessionStorage.getItem("user");

    if (token && storedUser) {
      setLoggedIn(true);
      setCurrentUser(JSON.parse(storedUser));
    } else {
      setLoggedIn(false);
      setCurrentUser(null);
    }
  }, []);

  // Fetch counts when login status changes
  useEffect(() => {
    if (loggedIn) {
      fetchCounts();
    } else {
      setWishlistCount(0);
      setCartCount(0);
    }
  }, [loggedIn]);

  // Also fetch counts when the page becomes visible (user might have added items from another tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && loggedIn) {
        fetchCounts();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [loggedIn]);

  // Check if user is admin
  const isAdmin = currentUser?.role === "admin";

  // Handle scroll to hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setNavbarVisible(true);
      } 
      // Hide navbar when scrolling down and not at the top
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavbarVisible(false);
        // Close mobile menu when navbar hides
        setMenuOpen(false);
        setUserMenuOpen(false);
      }
      
      // Update scrolled state for background opacity
      setScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-menu-container')) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
      setMenuOpen(false);
    }
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setMenuOpen(false);
    setActiveDropdown(null);
    setUserMenuOpen(false);
  };

  const handleDropdownItemClick = (category: string, item: string) => {
    const itemPath = item.toLowerCase().replace(/\s+/g, '-');
    router.push(`/${category.toLowerCase()}/${itemPath}`);
    setActiveDropdown(null);
  };

  const handleUserClick = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleLoginClick = () => {
    setAuthModalOpen(true);
    setAuthView("login");
    setUserMenuOpen(false);
  };

  const handleSignupClick = () => {
    setAuthModalOpen(true);
    setAuthView("signup");
    setUserMenuOpen(false);
  };

 const handleLogout = async () => {
  try {
    await logoutApi();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setLoggedIn(false);
    setCurrentUser(null);
    setWishlistCount(0);
    setCartCount(0);
    setUserMenuOpen(false);
    setMenuOpen(false);
    router.push("/");
  } catch (error) {
    console.error("Logout error:", error);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("user");
    setLoggedIn(false);
    setCurrentUser(null);
    setWishlistCount(0);
    setCartCount(0);
    setUserMenuOpen(false);
    setMenuOpen(false);
    router.push("/");
  }
};

  const handleAuthClose = () => {
    setAuthModalOpen(false);
  };

  const handleAuthSuccess = () => {
    const storedUser =
      localStorage.getItem("user") ||
      sessionStorage.getItem("user");

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setLoggedIn(true);
    }

    setAuthModalOpen(false);
  };

  const totalCartItems = cartCount;

  const userMenuVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.2
      }
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.2
      }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2
      }
    })
  };

  // Determine navbar background based on page and scroll
  const getNavbarBackground = () => {
    if (isElectronicsPage) {
      // On electronics page - always black with slight transparency when scrolled
      if (scrolled) {
        return "bg-black/95 backdrop-blur-lg shadow-xl";
      }
      return "bg-black border-b border-gray-800";
    } else {
      // On other pages - original cream color
      if (scrolled) {
        return "bg-[#F8F4F0]/98 backdrop-blur-lg shadow-lg";
      }
      return "bg-[#F8F4F0] border-b border-gray-200";
    }
  };

  // Get text color based on page
  const getTextColor = (isHovered: boolean = false, isActive: boolean = false) => {
    if (isElectronicsPage) {
      if (isActive) return "#ef4444"; // Red for active on electronics
      return "#ffffff"; // White text on electronics
    }
    if (isActive) return "#800000"; // Maroon for active on other pages
    return "#000000"; // Black text on other pages
  };

  // Get icon color based on page
  const getIconColor = () => {
    if (isElectronicsPage) return "#ffffff";
    return "#000000";
  };

  // Get hover color based on page
  const getHoverColor = () => {
    if (isElectronicsPage) return "#ef4444";
    return "#800000";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&display=swap');
        
        * {
          font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif !important;
        }
        
        /* Brand Colors */
        :root {
          --black: #000000;
          --maroon: #800000;
          --maroon-light: #9d2a2a;
          --cream: #F8F4F0;
          --white: #ffffff;
          --gray-light: #f5f5f5;
        }
        
        /* Placeholder text */
        input::placeholder {
          color: ${isElectronicsPage ? '#9ca3af' : '#9ca3af'} !important;
          opacity: 1;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.18s ease-out forwards; }
        
        /* Hover styles for all interactive elements */
        .nav-link {
          transition: all 0.2s ease;
          position: relative;
        }
        
        /* Bottom underline animation on hover */
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          width: 0;
          height: 2px;
          background-color: ${getHoverColor()};
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        
        .nav-link:hover::after {
          width: 80%;
        }
        
        .nav-link:hover {
          color: ${getHoverColor()} !important;
        }
        
        /* Active link underline */
        .nav-link.active::after {
          width: 80%;
          background-color: ${getHoverColor()};
        }
        
        /* Icon button hover effect */
        .icon-btn {
          transition: all 0.2s ease;
        }
        .icon-btn:hover {
          color: ${getHoverColor()} !important;
        }
        .icon-btn:hover svg {
          color: ${getHoverColor()} !important;
        }
        
        /* Dropdown item hover */
        .dropdown-item {
          transition: all 0.2s ease;
        }
        .dropdown-item:hover {
          color: ${getHoverColor()} !important;
          background-color: ${isElectronicsPage ? '#1a1a1a' : '#fff0f0'} !important;
        }
        
        /* Mobile menu item hover */
        .mobile-nav-item:hover {
          color: ${getHoverColor()} !important;
        }
        
        /* Cart icon specific hover */
        .cart-btn:hover svg {
          color: ${getHoverColor()} !important;
          transform: scale(1.1);
        }
      `}</style>

      {/* Main Navbar with hide/show animation */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ 
          y: navbarVisible ? 0 : -100,
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${getNavbarBackground()}`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* LOGO */}
            <button 
              onClick={() => handleNavigation("/")}
              className="flex items-center gap-2 group flex-shrink-0"
            >
              {!logoError ? (
                <div className="relative h-12 w-auto md:h-20">
                  <Image
                    src="/Images/logo/logo.png"
                    alt="Company Logo"
                    width={120}
                    height={40}
                    className="object-contain h-full w-auto"
                    priority
                    onError={() => setLogoError(true)}
                  />
                </div>
              ) : (
                /* Fallback if logo fails to load */
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    <div 
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: isElectronicsPage ? "#ef4444" : "#800000" }}
                    />
                    <div 
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: isElectronicsPage ? "#ef4444/60" : "#800000", opacity: 0.6 }}
                    />
                    <div 
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: isElectronicsPage ? "#ef4444/30" : "#800000", opacity: 0.3 }}
                    />
                  </div>
                  <span 
                    className="font-semibold tracking-widest"
                    style={{ 
                      fontFamily: "'Cormorant Garamond', Georgia, serif", 
                      fontWeight: 600,
                      color: isElectronicsPage ? "#ffffff" : "#000000"
                    }}
                  >
                    LUXE
                  </span>
                </div>
              )}
            </button>

            {/* DESKTOP NAV LINKS */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.path || pathname?.startsWith(link.path + "/");
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      onClick={() => !link.dropdown && handleNavigation(link.path)}
                      className={`nav-link flex items-center gap-1 px-4 py-2 text-base font-medium tracking-wide rounded-lg transition-all duration-200 cursor-pointer ${isActive ? 'active' : ''}`}
                      style={{ 
                        color: activeDropdown === link.label || isActive 
                          ? getHoverColor() 
                          : getTextColor(false, isActive)
                      }}
                    >
                      {link.label}
                      {link.dropdown && (
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            activeDropdown === link.label ? "rotate-180" : ""
                          }`}
                          style={{ color: activeDropdown === link.label ? getHoverColor() : getIconColor() }}
                        />
                      )}
                    </button>

                    {/* Dropdown */}
                    {link.dropdown && activeDropdown === link.label && (
                      <div 
                        className="absolute top-full left-0 mt-1 w-48 rounded-lg shadow-xl border py-2 animate-fadeIn"
                        style={{ 
                          backgroundColor: isElectronicsPage ? "#1a1a1a" : "#ffffff",
                          borderColor: isElectronicsPage ? "#333333" : "#e5e7eb"
                        }}
                      >
                        {link.dropdown.map((item) => (
                          <button
                            key={item}
                            onClick={() => handleDropdownItemClick(link.label, item)}
                            className="dropdown-item w-full text-left px-4 py-2.5 text-base transition-all duration-200"
                            style={{ 
                              color: isElectronicsPage ? "#ffffff" : "#000000",
                            }}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Admin Dashboard Link - Desktop */}
              {isAdmin && (
                <button
                  onClick={() => handleNavigation("/admin")}
                  className="flex items-center gap-1 px-4 py-2 text-base font-medium tracking-wide rounded-lg transition-all duration-200 cursor-pointer ml-2"
                  style={{ 
                    color: getHoverColor(),
                    backgroundColor: isElectronicsPage ? "rgba(239, 68, 68, 0.1)" : "rgba(128, 0, 0, 0.1)",
                  }}
                >
                  <LayoutDashboard className="w-4 h-4" style={{ color: getHoverColor() }} />
                  <span>Admin</span>
                </button>
              )}
            </div>

            {/* RIGHT ICONS */}
            <div className="flex items-center justify-end gap-1 md:gap-2">
              {/* Desktop Search */}
              <div className="hidden md:flex items-center">
                {searchOpen ? (
                  <motion.form 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "15rem", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSearch} 
                    className="flex items-center gap-2 rounded-full px-4 py-2 w-60"
                    style={{ 
                      backgroundColor: isElectronicsPage ? "#1a1a1a" : "#f3f4f6",
                    }}
                  >
                    <Search className="w-4 h-4 flex-shrink-0" style={{ color: isElectronicsPage ? "#9ca3af" : "#4b5563" }} />
                    <input
                      autoFocus
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="bg-transparent text-base outline-none w-full"
                      style={{ 
                        color: isElectronicsPage ? "#ffffff" : "#000000",
                      }}
                    />
                    <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
                      <X className="w-4 h-4 transition-colors" style={{ color: isElectronicsPage ? "#9ca3af" : "#6b7280" }} />
                    </button>
                  </motion.form>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSearchOpen(true)}
                    className="icon-btn p-2 transition-all duration-200"
                    aria-label="Search"
                  >
                    <Search className="w-5 h-5 transition-colors duration-200" style={{ color: getIconColor() }} />
                  </motion.button>
                )}
              </div>

              {/* Wishlist */}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigation("/wishlist")}
                className="icon-btn hidden md:flex relative p-2 transition-all duration-200 cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 transition-colors duration-200" style={{ color: getIconColor() }} />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm"
                    style={{ backgroundColor: getHoverColor() }}
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Account with User Menu */}
              <div className="relative user-menu-container">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUserClick}
                  className="icon-btn p-2 transition-all duration-200 cursor-pointer relative flex items-center justify-center"
                  aria-label="Account"
                >
                  <User className="w-5 h-5 transition-colors duration-200" style={{ color: getIconColor() }} />
                </motion.button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      variants={userMenuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute right-0 mt-2 w-56 rounded-lg shadow-xl border py-2 overflow-hidden z-50"
                      style={{ 
                        backgroundColor: isElectronicsPage ? "#1a1a1a" : "#ffffff",
                        borderColor: isElectronicsPage ? "#333333" : "#e5e7eb"
                      }}
                    >
                      {loggedIn ? (
                        <>
                          <div className="px-4 py-3 border-b" style={{ borderColor: isElectronicsPage ? "#333333" : "#e5e7eb" }}>
                            <p className="text-base font-medium" style={{ color: isElectronicsPage ? "#ffffff" : "#000000" }}>
                              {currentUser?.name || "User"}
                            </p>
                            <p className="text-sm mt-0.5" style={{ color: isElectronicsPage ? "#9ca3af" : "#4b5563" }}>
                              {currentUser?.email || ""}
                            </p>
                            {isAdmin && (
                              <span className="inline-block mt-1 px-2 py-0.5 text-xs font-semibold rounded-full" style={{ color: getHoverColor(), backgroundColor: isElectronicsPage ? "rgba(239, 68, 68, 0.1)" : "rgba(128, 0, 0, 0.1)" }}>
                                Admin
                              </span>
                            )}
                          </div>

                          {isAdmin && (
                            <motion.button
                              custom={0}
                              variants={menuItemVariants}
                              initial="hidden"
                              animate="visible"
                              onClick={() => handleNavigation("/admin")}
                              className="dropdown-item w-full flex items-center gap-3 px-4 py-2.5 text-base transition-colors"
                              style={{ color: getHoverColor() }}
                            >
                              <LayoutDashboard className="w-4 h-4" style={{ color: getHoverColor() }} />
                              <span>Admin Dashboard</span>
                            </motion.button>
                          )}

                          <motion.button
                            custom={isAdmin ? 1 : 0}
                            variants={menuItemVariants}
                            initial="hidden"
                            animate="visible"
                            onClick={() => handleNavigation("/profile")}
                            className="dropdown-item w-full flex items-center gap-3 px-4 py-2.5 text-base transition-colors"
                            style={{ color: isElectronicsPage ? "#ffffff" : "#000000" }}
                          >
                            <UserCircle className="w-4 h-4" style={{ color: isElectronicsPage ? "#ffffff" : "#000000" }} />
                            <span>Profile</span>
                          </motion.button>

                          <motion.button
                            custom={isAdmin ? 2 : 1}
                            variants={menuItemVariants}
                            initial="hidden"
                            animate="visible"
                            onClick={() => handleNavigation("/settings")}
                            className="dropdown-item w-full flex items-center gap-3 px-4 py-2.5 text-base transition-colors"
                            style={{ color: isElectronicsPage ? "#ffffff" : "#000000" }}
                          >
                            <Settings className="w-4 h-4" style={{ color: isElectronicsPage ? "#ffffff" : "#000000" }} />
                            <span>Settings</span>
                          </motion.button>

                          <motion.button
                            custom={isAdmin ? 3 : 2}
                            variants={menuItemVariants}
                            initial="hidden"
                            animate="visible"
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-base transition-colors border-t mt-1"
                            style={{ 
                              color: getHoverColor(),
                              borderColor: isElectronicsPage ? "#333333" : "#e5e7eb"
                            }}
                          >
                            <LogOut className="w-4 h-4" style={{ color: getHoverColor() }} />
                            <span>Logout</span>
                          </motion.button>
                        </>
                      ) : (
                        <>
                          <div className="px-4 py-3 border-b" style={{ borderColor: isElectronicsPage ? "#333333" : "#e5e7eb" }}>
                            <p className="text-base font-medium" style={{ color: isElectronicsPage ? "#ffffff" : "#000000" }}>
                              Welcome, Guest!
                            </p>
                            <p className="text-sm mt-0.5" style={{ color: isElectronicsPage ? "#9ca3af" : "#6b7280" }}>
                              Sign in to your account
                            </p>
                          </div>

                          <motion.button
                            custom={0}
                            variants={menuItemVariants}
                            initial="hidden"
                            animate="visible"
                            onClick={handleLoginClick}
                            className="dropdown-item w-full flex items-center gap-3 px-4 py-3 text-base transition-colors border-b"
                            style={{ 
                              color: isElectronicsPage ? "#ffffff" : "#000000",
                              borderColor: isElectronicsPage ? "#333333" : "#e5e7eb"
                            }}
                          >
                            <LogIn className="w-4 h-4" style={{ color: isElectronicsPage ? "#ffffff" : "#000000" }} />
                            <span>Login</span>
                          </motion.button>

                          <motion.button
                            custom={1}
                            variants={menuItemVariants}
                            initial="hidden"
                            animate="visible"
                            onClick={handleSignupClick}
                            className="dropdown-item w-full flex items-center gap-3 px-4 py-3 text-base transition-colors"
                            style={{ color: isElectronicsPage ? "#ffffff" : "#000000" }}
                          >
                            <UserPlus className="w-4 h-4" style={{ color: isElectronicsPage ? "#ffffff" : "#000000" }} />
                            <span>Create Account</span>
                          </motion.button>

                          <div className="px-4 py-2 mt-1" style={{ backgroundColor: isElectronicsPage ? "#111111" : "#f9fafb" }}>
                            <p className="text-xs text-center" style={{ color: isElectronicsPage ? "#6b7280" : "#6b7280" }}>
                              Sign in for personalized experience
                            </p>
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart */}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigation("/cart")}
                className="cart-btn relative p-2 transition-all duration-200 group cursor-pointer flex items-center justify-center"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5 transition-all duration-200 group-hover:scale-110" style={{ color: getIconColor() }} />
                {totalCartItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm"
                    style={{ backgroundColor: getHoverColor() }}
                  >
                    {totalCartItems}
                  </motion.span>
                )}
              </motion.button>

              {/* Mobile hamburger */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="md:hidden p-2 transition-all duration-200 flex items-center justify-center icon-btn"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? 
                  <X className="w-5 h-5 transition-colors duration-200" style={{ color: getIconColor() }} /> : 
                  <Menu className="w-5 h-5 transition-colors duration-200" style={{ color: getIconColor() }} />
                }
              </motion.button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div 
                className="border-t px-4 pt-4 pb-6 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto"
                style={{ 
                  backgroundColor: isElectronicsPage ? "#000000" : "#F8F4F0",
                  borderColor: isElectronicsPage ? "#333333" : "#e5e7eb"
                }}
              >
                {/* Mobile Search */}
                <form 
                  onSubmit={handleSearch}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 mb-4"
                  style={{ backgroundColor: isElectronicsPage ? "#1a1a1a" : "#f3f4f6" }}
                >
                  <Search className="w-4 h-4 flex-shrink-0" style={{ color: isElectronicsPage ? "#9ca3af" : "#6b7280" }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="bg-transparent text-base outline-none w-full"
                    style={{ color: isElectronicsPage ? "#ffffff" : "#000000" }}
                  />
                </form>

                {isAdmin && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0 }}
                  >
                    <button
                      onClick={() => handleNavigation("/admin")}
                      className="flex items-center gap-2 w-full px-3 py-3 text-base font-medium rounded-xl transition-all mb-2"
                      style={{ 
                        color: getHoverColor(),
                        backgroundColor: isElectronicsPage ? "rgba(239, 68, 68, 0.1)" : "#fff0f0"
                      }}
                    >
                      <LayoutDashboard className="w-5 h-5" style={{ color: getHoverColor() }} />
                      Admin Dashboard
                    </button>
                  </motion.div>
                )}

                {navLinks.map((link, i) => {
                  const isActive = pathname === link.path || pathname?.startsWith(link.path + "/");
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <button
                        onClick={() => handleNavigation(link.path)}
                        className="flex items-center justify-between w-full px-3 py-3 text-base font-medium rounded-xl transition-all duration-200"
                        style={{ 
                          color: isActive ? getHoverColor() : (isElectronicsPage ? "#ffffff" : "#000000"),
                        }}
                      >
                        {link.label}
                        {link.dropdown && <ChevronDown className="w-4 h-4" style={{ color: isElectronicsPage ? "#9ca3af" : "#6b7280" }} />}
                      </button>
                      
                      {link.dropdown && menuOpen && (
                        <div className="ml-4 mt-1 space-y-1">
                          {link.dropdown.map((item) => (
                            <button
                              key={item}
                              onClick={() => handleDropdownItemClick(link.label, item)}
                              className="block w-full text-left px-4 py-2 text-base rounded-lg transition-all duration-200"
                              style={{ color: isElectronicsPage ? "#d1d5db" : "#4b5563" }}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  );
                })}

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-3 mt-3 border-t space-y-2"
                  style={{ borderColor: isElectronicsPage ? "#333333" : "#e5e7eb" }}
                >
                  {loggedIn ? (
                    <>
                      <div className="px-3 py-2 rounded-xl" style={{ backgroundColor: isElectronicsPage ? "#1a1a1a" : "#f9fafb" }}>
                        <p className="text-base font-medium" style={{ color: isElectronicsPage ? "#ffffff" : "#000000" }}>
                          {currentUser?.name || "User"}
                        </p>
                        <p className="text-sm truncate mt-0.5" style={{ color: isElectronicsPage ? "#9ca3af" : "#6b7280" }}>
                          {currentUser?.email || ""}
                        </p>
                        {isAdmin && (
                          <span className="inline-block mt-1 px-2 py-0.5 text-xs font-semibold rounded-full" style={{ color: getHoverColor(), backgroundColor: isElectronicsPage ? "rgba(239, 68, 68, 0.1)" : "rgba(128, 0, 0, 0.1)" }}>
                            Admin
                          </span>
                        )}
                      </div>

                      <button 
                        onClick={() => handleNavigation("/profile")}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium transition-all duration-200"
                        style={{ 
                          backgroundColor: isElectronicsPage ? "#1a1a1a" : "#f3f4f6",
                          color: isElectronicsPage ? "#ffffff" : "#000000"
                        }}
                      >
                        <UserCircle className="w-5 h-5 transition-colors duration-200" style={{ color: isElectronicsPage ? "#ffffff" : "#000000" }} />
                        Profile
                      </button>

                      <button 
                        onClick={() => handleNavigation("/settings")}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium transition-all duration-200"
                        style={{ 
                          backgroundColor: isElectronicsPage ? "#1a1a1a" : "#f3f4f6",
                          color: isElectronicsPage ? "#ffffff" : "#000000"
                        }}
                      >
                        <Settings className="w-5 h-5 transition-colors duration-200" style={{ color: isElectronicsPage ? "#ffffff" : "#000000" }} />
                        Settings
                      </button>

                      <button 
                        onClick={() => handleNavigation("/wishlist")}
                        className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-base font-medium transition-all duration-200"
                        style={{ 
                          backgroundColor: isElectronicsPage ? "#1a1a1a" : "#f3f4f6",
                          color: isElectronicsPage ? "#ffffff" : "#000000"
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <Heart className="w-5 h-5 transition-colors duration-200" style={{ color: isElectronicsPage ? "#ffffff" : "#000000" }} />
                          Wishlist
                        </div>
                        {wishlistCount > 0 && (
                          <span className="px-2 py-0.5 text-white text-xs font-bold rounded-full" style={{ backgroundColor: getHoverColor() }}>
                            {wishlistCount}
                          </span>
                        )}
                      </button>

                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium transition-all duration-200"
                        style={{ 
                          color: getHoverColor(),
                          backgroundColor: isElectronicsPage ? "rgba(239, 68, 68, 0.1)" : "#fff0f0"
                        }}
                      >
                        <LogOut className="w-5 h-5 transition-colors duration-200" style={{ color: getHoverColor() }} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={handleLoginClick}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-base font-medium transition-all duration-200"
                        style={{ 
                          backgroundColor: isElectronicsPage ? "#1a1a1a" : "#f3f4f6",
                          color: isElectronicsPage ? "#ffffff" : "#000000"
                        }}
                      >
                        <LogIn className="w-4 h-4 transition-colors duration-200" style={{ color: isElectronicsPage ? "#ffffff" : "#000000" }} /> Login
                      </button>
                      <button 
                        onClick={handleSignupClick}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-base font-medium transition-all duration-200"
                        style={{ 
                          backgroundColor: isElectronicsPage ? "#1a1a1a" : "#f3f4f6",
                          color: isElectronicsPage ? "#ffffff" : "#000000"
                        }}
                      >
                        <UserPlus className="w-4 h-4 transition-colors duration-200" style={{ color: isElectronicsPage ? "#ffffff" : "#000000" }} /> Sign Up
                      </button>
                    </div>
                  )}
                </motion.div>
                
                {totalCartItems > 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="pt-2 text-sm text-center"
                    style={{ color: isElectronicsPage ? "#9ca3af" : "#6b7280" }}
                  >
                    {totalCartItems} item{totalCartItems !== 1 ? 's' : ''} in cart
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Electronics Secondary Navbar - Shows only on electronics page */}
      {isElectronicsPage && <ElectronicsNavbar />}

      <AuthManager 
        isOpen={authModalOpen}
        onClose={handleAuthClose}
        initialView={authView}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}
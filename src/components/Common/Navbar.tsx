"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, User, Search, Menu, X, ChevronDown, Heart, Settings, LogOut, UserCircle, LogIn, UserPlus, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import AuthManager from "../Auth/AuthManager/AuthManager";
import { logoutApi } from "@/api/auth";

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
  wishlistCount = 0, 
  cartCount = 0,
}: NavbarProps) {
  const router = useRouter();
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

  // Check login when Navbar loads
  useEffect(() => {
    const token =
      localStorage.getItem("authToken") ||
      sessionStorage.getItem("authToken");

    const storedUser =
      localStorage.getItem("user") ||
      sessionStorage.getItem("user");

    if (token && storedUser) {
      setLoggedIn(true);
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // Check if user is admin
  const isAdmin = currentUser?.role === "admin";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    // Call backend logout API
    await logoutApi();

    // Remove tokens from storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    // Reset state
    setLoggedIn(false);
    setCurrentUser(null);
    setUserMenuOpen(false);
    setMenuOpen(false); // Close mobile menu on logout

    // Redirect to home
    router.push("/");
  } catch (error) {
    console.error("Logout error:", error);

    // Even if API fails, clear local session
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("user");

    setLoggedIn(false);
    setCurrentUser(null);
    setUserMenuOpen(false);
    setMenuOpen(false); // Close mobile menu on logout

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

  // Animation variants for user menu
  const userMenuVariants = {
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
        damping: 25,
        duration: 0.3
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

  // Animation variants for menu items
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

  return (
    <>
      {/* Google Fonts Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&display=swap');
        
        * {
          font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif !important;
        }
        
        /* Keep icons with their original font family */
        .lucide, [class*="lucide-"] {
          font-family: inherit !important;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.18s ease-out forwards; }
      `}</style>

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
              className="flex items-center gap-2 group flex-shrink-0"
            >
              <div className="relative h-12 w-auto md:h-20">
                <Image
                  src="/logo/quick-kart.png" 
                  alt="Company Logo"
                  width={120}
                  height={40}
                  className="object-contain h-full w-auto"
                  priority
                />
              </div>
            </button>

            {/* ── DESKTOP NAV LINKS ── */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => !link.dropdown && handleNavigation(link.path)}
                    className={`flex items-center gap-1 px-4 py-2 text-base font-medium tracking-wide rounded-lg transition-all duration-200 cursor-pointer ${
                      activeDropdown === link.label
                        ? "text-red-600"
                        : "text-black hover:text-red-600"
                    }`}
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
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
                          className="w-full text-left px-4 py-2.5 text-base text-black hover:text-red-600 transition-colors"
                          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Admin Dashboard Link - Desktop */}
              {isAdmin && (
                <button
                  onClick={() => handleNavigation("/admin")}
                  className="flex items-center gap-1 px-4 py-2 text-base font-medium tracking-wide rounded-lg transition-all duration-200 cursor-pointer text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 ml-2"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Admin
                </button>
              )}
            </div>

            {/* ── RIGHT ICONS ── */}
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
                    className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 w-60"
                  >
                    <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input
                      autoFocus
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="bg-transparent text-base text-black outline-none w-full placeholder-gray-400"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    />
                    <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
                      <X className="w-4 h-4 text-gray-400 hover:text-black" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSearchOpen(true)}
                    className="p-2 text-black hover:text-red-600 transition-all duration-200"
                    aria-label="Search"
                  >
                    <Search className="w-5 h-5" />
                  </motion.button>
                )}
              </div>

              {/* Wishlist — desktop only - with count badge */}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigation("/wishlist")}
                className="hidden md:flex relative p-2 text-black hover:text-red-600 transition-all duration-200 cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm"
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
                  className="p-2 text-black hover:text-red-600 transition-all duration-200 cursor-pointer relative flex items-center justify-center"
                  aria-label="Account"
                >
                  <User className="w-5 h-5" />
                </motion.button>

                {/* User Dropdown Menu with Framer Motion */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      variants={userMenuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden z-50"
                    >
                      {loggedIn ? (
                        /* Logged In State */
                        <>
                          {/* User Info Header */}
                          <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-base font-medium text-black" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                              {currentUser?.name || "User"}
                            </p>
                            <p className="text-sm text-gray-500" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                              {currentUser?.email || ""}
                            </p>
                            {isAdmin && (
                              <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                                Admin
                              </span>
                            )}
                          </div>

                          {/* Admin Dashboard Link - in dropdown for admin users */}
                          {isAdmin && (
                            <motion.button
                              custom={0}
                              variants={menuItemVariants}
                              initial="hidden"
                              animate="visible"
                              onClick={() => handleNavigation("/admin")}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-base text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-colors"
                              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                            >
                              <LayoutDashboard className="w-4 h-4" />
                              <span>Admin Dashboard</span>
                            </motion.button>
                          )}

                          {/* Profile Link */}
                          <motion.button
                            custom={isAdmin ? 1 : 0}
                            variants={menuItemVariants}
                            initial="hidden"
                            animate="visible"
                            onClick={() => handleNavigation("/profile")}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-base text-black hover:text-red-600 transition-colors"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                          >
                            <UserCircle className="w-4 h-4" />
                            <span>Profile</span>
                          </motion.button>

                          {/* Settings Link */}
                          <motion.button
                            custom={isAdmin ? 2 : 1}
                            variants={menuItemVariants}
                            initial="hidden"
                            animate="visible"
                            onClick={() => handleNavigation("/settings")}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-base text-black hover:text-red-600 transition-colors"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                          >
                            <Settings className="w-4 h-4" />
                            <span>Settings</span>
                          </motion.button>

                          {/* Logout Button */}
                          <motion.button
                            custom={isAdmin ? 3 : 2}
                            variants={menuItemVariants}
                            initial="hidden"
                            animate="visible"
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-base text-red-600 hover:text-red-700 transition-colors border-t border-gray-100 mt-1"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                          </motion.button>
                        </>
                      ) : (
                        /* Logged Out State - Login & Signup Buttons */
                        <>
                          {/* Guest Header */}
                          <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-base font-medium text-black" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Welcome, Guest!</p>
                            <p className="text-sm text-gray-500" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Sign in to your account</p>
                          </div>

                          {/* Login Button */}
                          <motion.button
                            custom={0}
                            variants={menuItemVariants}
                            initial="hidden"
                            animate="visible"
                            onClick={handleLoginClick}
                            className="w-full flex items-center gap-3 px-4 py-3 text-base text-black hover:text-red-600 transition-colors border-b border-gray-100"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                          >
                            <LogIn className="w-4 h-4" />
                            <span>Login</span>
                          </motion.button>

                          {/* Signup Button */}
                          <motion.button
                            custom={1}
                            variants={menuItemVariants}
                            initial="hidden"
                            animate="visible"
                            onClick={handleSignupClick}
                            className="w-full flex items-center gap-3 px-4 py-3 text-base text-black hover:text-red-600 transition-colors"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                          >
                            <UserPlus className="w-4 h-4" />
                            <span>Create Account</span>
                          </motion.button>

                          {/* Optional: Add a message for guest users */}
                          <div className="px-4 py-2 mt-1 bg-gray-50">
                            <p className="text-xs text-gray-500 text-center" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
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
                className="relative p-2 text-black hover:text-red-600 transition-all duration-200 group cursor-pointer flex items-center justify-center"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {totalCartItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm"
                  >
                    {totalCartItems}
                  </motion.span>
                )}
              </motion.button>

              {/* Mobile hamburger */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="md:hidden p-2 text-black hover:text-red-600 transition-colors flex items-center justify-center"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="border-t border-gray-100 bg-white px-4 pt-4 pb-6 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
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
                    className="bg-transparent text-base text-black outline-none w-full placeholder-gray-400"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  />
                </form>

                {/* Admin Dashboard Link - Mobile (for admin users) */}
                {isAdmin && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0 }}
                  >
                    <button
                      onClick={() => handleNavigation("/admin")}
                      className="flex items-center gap-2 w-full px-3 py-3 text-base font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-xl transition-all mb-2"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      Admin Dashboard
                    </button>
                  </motion.div>
                )}

                {/* Mobile Nav Links */}
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <button
                      onClick={() => {
                        if (link.dropdown) {
                          handleNavigation(link.path);
                        } else {
                          handleNavigation(link.path);
                        }
                      }}
                      className="flex items-center justify-between w-full px-3 py-3 text-base font-medium text-black hover:text-red-600 rounded-xl transition-all"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
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
                            className="block w-full text-left px-4 py-2 text-base text-black hover:text-red-600 rounded-lg"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Mobile User Section - Updated to include Logout for logged-in users */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-3 mt-3 border-t border-gray-100 space-y-2"
                >
                  {loggedIn ? (
                    /* Logged In Mobile View */
                    <>
                      {/* User Info */}
                      <div className="px-3 py-2 bg-gray-50 rounded-xl">
                        <p className="text-base font-medium text-black" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                          {currentUser?.name || "User"}
                        </p>
                        <p className="text-sm text-gray-500 truncate" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                          {currentUser?.email || ""}
                        </p>
                        {isAdmin && (
                          <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                            Admin
                          </span>
                        )}
                      </div>

                      {/* Mobile Profile Link */}
                      <button 
                        onClick={() => handleNavigation("/profile")}
                        className="w-full flex items-center gap-3 px-3 py-3 bg-gray-100 rounded-xl text-base font-medium text-black hover:text-red-600 transition-colors"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        <UserCircle className="w-5 h-5" />
                        Profile
                      </button>

                      {/* Mobile Settings Link */}
                      <button 
                        onClick={() => handleNavigation("/settings")}
                        className="w-full flex items-center gap-3 px-3 py-3 bg-gray-100 rounded-xl text-base font-medium text-black hover:text-red-600 transition-colors"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        <Settings className="w-5 h-5" />
                        Settings
                      </button>

                      {/* Mobile Wishlist */}
                      <button 
                        onClick={() => handleNavigation("/wishlist")}
                        className="w-full flex items-center gap-3 px-3 py-3 bg-gray-100 rounded-xl text-base font-medium text-black hover:text-red-600 transition-colors relative"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        <Heart className="w-5 h-5" />
                        Wishlist
                        {wishlistCount > 0 && (
                          <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                            {wishlistCount}
                          </span>
                        )}
                      </button>

                      {/* Mobile Logout Button */}
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-3 bg-red-50 rounded-xl text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-100 transition-colors"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        <LogOut className="w-5 h-5" />
                        Logout
                      </button>
                    </>
                  ) : (
                    /* Logged Out Mobile View */
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={handleLoginClick}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 rounded-xl text-base font-medium text-black hover:text-red-600 transition-colors"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        <LogIn className="w-4 h-4" /> Login
                      </button>
                      <button 
                        onClick={handleSignupClick}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 rounded-xl text-base font-medium text-black hover:text-red-600 transition-colors"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        <UserPlus className="w-4 h-4" /> Sign Up
                      </button>
                    </div>
                  )}
                </motion.div>
                
                {/* Mobile Cart Info - optional */}
                {totalCartItems > 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="pt-2 text-sm text-gray-500 text-center"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {totalCartItems} item{totalCartItems !== 1 ? 's' : ''} in cart
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Auth Modal */}
      <AuthManager 
        isOpen={authModalOpen}
        onClose={handleAuthClose}
        initialView={authView}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, User, Search, Menu, X, ChevronDown, Heart, Settings, LogOut, UserCircle, LogIn, UserPlus, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import AuthManager from "../Auth/AuthManager/AuthManager";
import { logoutApi } from "@/api/auth";
import { Variants } from "framer-motion";

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
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

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
    await logoutApi();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setLoggedIn(false);
    setCurrentUser(null);
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
          --white: #ffffff;
          --gray-light: #f5f5f5;
        }
        
        /* Placeholder text */
        input::placeholder {
          color: #9ca3af !important;
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
        }
        .nav-link:hover {
          color: #800000 !important;
        }
        
        /* Icon button hover effect */
        .icon-btn {
          transition: all 0.2s ease;
        }
        .icon-btn:hover {
          color: #800000 !important;
        }
        .icon-btn:hover svg {
          color: #800000 !important;
        }
        
        /* Dropdown item hover */
        .dropdown-item {
          transition: all 0.2s ease;
        }
        .dropdown-item:hover {
          color: #800000 !important;
          background-color: #fff0f0 !important;
        }
        
        /* Mobile menu item hover */
        .mobile-nav-item:hover {
          color: #800000 !important;
        }
        
        /* Cart icon specific hover */
        .cart-btn:hover svg {
          color: #800000 !important;
          transform: scale(1.1);
        }
      `}</style>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/98 backdrop-blur-lg shadow-lg"
            : "bg-white border-b border-gray-200"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* LOGO */}
            <button 
              onClick={() => handleNavigation("/")}
              className="flex items-center gap-2 group flex-shrink-0"
            >
              <div className="relative h-12 w-auto md:h-20">
                <Image
                  src="/logo/quick-kart.png" 
                  alt="Quick Kart"
                  width={120}
                  height={40}
                  className="object-contain h-full w-auto"
                  priority
                />
              </div>
            </button>

            {/* DESKTOP NAV LINKS */}
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
                    className={`nav-link flex items-center gap-1 px-4 py-2 text-base font-medium tracking-wide rounded-lg transition-all duration-200 cursor-pointer ${
                      activeDropdown === link.label ? "text-maroon" : "text-black"
                    }`}
                    style={{ color: activeDropdown === link.label ? "#800000" : "#000000" }}
                  >
                    {link.label}
                    {link.dropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          activeDropdown === link.label ? "rotate-180" : ""
                        }`}
                        style={{ color: activeDropdown === link.label ? "#800000" : "#000000" }}
                      />
                    )}
                  </button>

                  {/* Dropdown */}
                  {link.dropdown && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 animate-fadeIn">
                      {link.dropdown.map((item) => (
                        <button
                          key={item}
                          onClick={() => handleDropdownItemClick(link.label, item)}
                          className="dropdown-item w-full text-left px-4 py-2.5 text-base text-black transition-all duration-200"
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
                  className="flex items-center gap-1 px-4 py-2 text-base font-medium tracking-wide rounded-lg transition-all duration-200 cursor-pointer bg-maroon/10 hover:bg-maroon/20 ml-2"
                  style={{ color: "#800000" }}
                >
                  <LayoutDashboard className="w-4 h-4" style={{ color: "#800000" }} />
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
                    className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 w-60"
                  >
                    <Search className="w-4 h-4 text-gray-600 flex-shrink-0" />
                    <input
                      autoFocus
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="bg-transparent text-base text-black outline-none w-full"
                    />
                    <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
                      <X className="w-4 h-4 text-gray-600 hover:text-maroon transition-colors" />
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
                    <Search className="w-5 h-5 text-black transition-colors duration-200" />
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
                <Heart className="w-5 h-5 text-black transition-colors duration-200" />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-maroon text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm"
                    style={{ backgroundColor: "#800000" }}
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
                  <User className="w-5 h-5 text-black transition-colors duration-200" />
                </motion.button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      variants={userMenuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 overflow-hidden z-50"
                    >
                      {loggedIn ? (
                        <>
                          <div className="px-4 py-3 border-b border-gray-200">
                            <p className="text-base font-medium text-black">
                              {currentUser?.name || "User"}
                            </p>
                            <p className="text-sm text-gray-600 mt-0.5">
                              {currentUser?.email || ""}
                            </p>
                            {isAdmin && (
                              <span className="inline-block mt-1 px-2 py-0.5 bg-maroon/10 text-maroon text-xs font-semibold rounded-full" style={{ color: "#800000" }}>
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
                              style={{ color: "#800000" }}
                            >
                              <LayoutDashboard className="w-4 h-4" style={{ color: "#800000" }} />
                              <span>Admin Dashboard</span>
                            </motion.button>
                          )}

                          <motion.button
                            custom={isAdmin ? 1 : 0}
                            variants={menuItemVariants}
                            initial="hidden"
                            animate="visible"
                            onClick={() => handleNavigation("/profile")}
                            className="dropdown-item w-full flex items-center gap-3 px-4 py-2.5 text-base text-black transition-colors"
                          >
                            <UserCircle className="w-4 h-4" />
                            <span>Profile</span>
                          </motion.button>

                          <motion.button
                            custom={isAdmin ? 2 : 1}
                            variants={menuItemVariants}
                            initial="hidden"
                            animate="visible"
                            onClick={() => handleNavigation("/settings")}
                            className="dropdown-item w-full flex items-center gap-3 px-4 py-2.5 text-base text-black transition-colors"
                          >
                            <Settings className="w-4 h-4" />
                            <span>Settings</span>
                          </motion.button>

                          <motion.button
                            custom={isAdmin ? 3 : 2}
                            variants={menuItemVariants}
                            initial="hidden"
                            animate="visible"
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-base transition-colors border-t border-gray-200 mt-1"
                            style={{ color: "#800000" }}
                          >
                            <LogOut className="w-4 h-4" style={{ color: "#800000" }} />
                            <span>Logout</span>
                          </motion.button>
                        </>
                      ) : (
                        <>
                          <div className="px-4 py-3 border-b border-gray-200">
                            <p className="text-base font-medium text-black">Welcome, Guest!</p>
                            <p className="text-sm text-gray-600 mt-0.5">Sign in to your account</p>
                          </div>

                          <motion.button
                            custom={0}
                            variants={menuItemVariants}
                            initial="hidden"
                            animate="visible"
                            onClick={handleLoginClick}
                            className="dropdown-item w-full flex items-center gap-3 px-4 py-3 text-base text-black transition-colors border-b border-gray-200"
                          >
                            <LogIn className="w-4 h-4" />
                            <span>Login</span>
                          </motion.button>

                          <motion.button
                            custom={1}
                            variants={menuItemVariants}
                            initial="hidden"
                            animate="visible"
                            onClick={handleSignupClick}
                            className="dropdown-item w-full flex items-center gap-3 px-4 py-3 text-base text-black transition-colors"
                          >
                            <UserPlus className="w-4 h-4" />
                            <span>Create Account</span>
                          </motion.button>

                          <div className="px-4 py-2 mt-1 bg-gray-50">
                            <p className="text-xs text-gray-500 text-center">
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
                <ShoppingBag className="w-5 h-5 text-black transition-all duration-200 group-hover:text-maroon group-hover:scale-110" />
                {totalCartItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-maroon text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm"
                    style={{ backgroundColor: "#800000" }}
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
                  <X className="w-5 h-5 text-black transition-colors duration-200" /> : 
                  <Menu className="w-5 h-5 text-black transition-colors duration-200" />
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
              <div className="border-t border-gray-200 bg-white px-4 pt-4 pb-6 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
                {/* Mobile Search */}
                <form 
                  onSubmit={handleSearch}
                  className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3 mb-4"
                >
                  <Search className="w-4 h-4 text-gray-600 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="bg-transparent text-base text-black outline-none w-full"
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
                      style={{ color: "#800000", backgroundColor: "#fff0f0" }}
                    >
                      <LayoutDashboard className="w-5 h-5" style={{ color: "#800000" }} />
                      Admin Dashboard
                    </button>
                  </motion.div>
                )}

                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <button
                      onClick={() => handleNavigation(link.path)}
                      className="flex items-center justify-between w-full px-3 py-3 text-base font-medium text-black hover:text-maroon rounded-xl transition-all duration-200"
                    >
                      {link.label}
                      {link.dropdown && <ChevronDown className="w-4 h-4 text-gray-500" />}
                    </button>
                    
                    {link.dropdown && menuOpen && (
                      <div className="ml-4 mt-1 space-y-1">
                        {link.dropdown.map((item) => (
                          <button
                            key={item}
                            onClick={() => handleDropdownItemClick(link.label, item)}
                            className="block w-full text-left px-4 py-2 text-base text-black hover:text-maroon rounded-lg transition-all duration-200"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-3 mt-3 border-t border-gray-200 space-y-2"
                >
                  {loggedIn ? (
                    <>
                      <div className="px-3 py-2 bg-gray-50 rounded-xl">
                        <p className="text-base font-medium text-black">
                          {currentUser?.name || "User"}
                        </p>
                        <p className="text-sm text-gray-600 truncate mt-0.5">
                          {currentUser?.email || ""}
                        </p>
                        {isAdmin && (
                          <span className="inline-block mt-1 px-2 py-0.5 bg-maroon/10 text-maroon text-xs font-semibold rounded-full" style={{ color: "#800000" }}>
                            Admin
                          </span>
                        )}
                      </div>

                      <button 
                        onClick={() => handleNavigation("/profile")}
                        className="w-full flex items-center gap-3 px-3 py-3 bg-gray-100 rounded-xl text-base font-medium text-black hover:text-maroon hover:bg-red-50 transition-all duration-200"
                      >
                        <UserCircle className="w-5 h-5 transition-colors duration-200" />
                        Profile
                      </button>

                      <button 
                        onClick={() => handleNavigation("/settings")}
                        className="w-full flex items-center gap-3 px-3 py-3 bg-gray-100 rounded-xl text-base font-medium text-black hover:text-maroon hover:bg-red-50 transition-all duration-200"
                      >
                        <Settings className="w-5 h-5 transition-colors duration-200" />
                        Settings
                      </button>

                      <button 
                        onClick={() => handleNavigation("/wishlist")}
                        className="w-full flex items-center justify-between px-3 py-3 bg-gray-100 rounded-xl text-base font-medium text-black hover:text-maroon hover:bg-red-50 transition-all duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <Heart className="w-5 h-5 transition-colors duration-200" />
                          Wishlist
                        </div>
                        {wishlistCount > 0 && (
                          <span className="px-2 py-0.5 bg-maroon text-white text-xs font-bold rounded-full" style={{ backgroundColor: "#800000" }}>
                            {wishlistCount}
                          </span>
                        )}
                      </button>

                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium transition-all duration-200"
                        style={{ color: "#800000", backgroundColor: "#fff0f0" }}
                      >
                        <LogOut className="w-5 h-5 transition-colors duration-200" style={{ color: "#800000" }} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={handleLoginClick}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 rounded-xl text-base font-medium text-black hover:text-maroon hover:bg-red-50 transition-all duration-200"
                      >
                        <LogIn className="w-4 h-4 transition-colors duration-200" /> Login
                      </button>
                      <button 
                        onClick={handleSignupClick}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 rounded-xl text-base font-medium text-black hover:text-maroon hover:bg-red-50 transition-all duration-200"
                      >
                        <UserPlus className="w-4 h-4 transition-colors duration-200" /> Sign Up
                      </button>
                    </div>
                  )}
                </motion.div>
                
                {totalCartItems > 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="pt-2 text-sm text-gray-500 text-center"
                  >
                    {totalCartItems} item{totalCartItems !== 1 ? 's' : ''} in cart
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AuthManager 
        isOpen={authModalOpen}
        onClose={handleAuthClose}
        initialView={authView}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}
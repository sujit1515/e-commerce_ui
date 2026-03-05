"use client";

import { useState } from "react";
import { ShoppingBag, User, Search, Menu, X } from "lucide-react";
import AuthManager from "../Auth/AuthManager/AuthManager"; 

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const cartCount = 2;

  const handleUserClick = () => {
    setAuthModalOpen(true);
  };

  const handleAuthClose = () => {
    setAuthModalOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-screen bg-white border-b border-gray-200">
        {/* FULL WIDTH CONTAINER */}
        <div className="w-screen px-4 md:px-8 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-gray-900 rounded-full" />
                <div className="w-3 h-3 bg-gray-900/60 rounded-full" />
                <div className="w-3 h-3 bg-gray-900/30 rounded-full" />
              </div>
              <span className="text-xl font-bold tracking-widest">LUXE</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {["Shop", "New Arrivals", "Sale", "About"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm font-medium text-gray-700 hover:text-black"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 w-56">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  placeholder="Search products..."
                  className="bg-transparent text-sm outline-none w-full"
                />
              </div>

              {/* User - Now opens auth modal */}
              <button 
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={handleUserClick}
              >
                <User className="w-5 h-5" />
              </button>

              {/* Cart */}
              <button className="relative p-2 rounded-full hover:bg-gray-100">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden border-t py-4 flex flex-col gap-4">
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  placeholder="Search products..."
                  className="bg-transparent text-sm outline-none w-full"
                />
              </div>

              {["Shop", "New Arrivals", "Sale", "About"].map((item) => (
                <a key={item} href="#" className="text-sm font-medium">
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthManager 
        isOpen={authModalOpen}
        onClose={handleAuthClose}
        initialView="login"
      />
    </>
  );
}
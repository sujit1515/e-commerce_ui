"use client";
import { useState } from "react";
import { User, Package, Heart, MapPin, LogOut, ChevronRight } from "lucide-react";

// ── DATA ─────────────────────────────────────────────────────────────────────
const user = {
  name: "Alexandra Chen",
  email: "alex.chen@gmail.com",
  phone: "+1 (415) 902-3347",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
};

const orders = [
  {
    id: "#LX-9841",
    date: "Feb 28, 2026",
    status: "Delivered",
    items: [
      { name: "Chronos Leather Watch", price: 340 },
      { name: "Classic Linen Tee", price: 75 },
    ],
    total: 415,
  },
  {
    id: "#LX-9723",
    date: "Feb 12, 2026",
    status: "Shipped",
    items: [
      { name: "SoundPro Studio Max", price: 499 },
    ],
    total: 499,
  },
];

const wishlist = [
  { name: "Autumn Tote Bag", price: 220 },
  { name: "Merino Wool Sweater", price: 195 },
];

const addresses = [
  { id: 1, label: "Home", address: "42 Maple Street, Apt 3B, San Francisco, CA 94102", default: true },
  { id: 2, label: "Work", address: "500 Market Street, Floor 12, San Francisco, CA 94104", default: false },
];

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch(activeTab) {
      case "profile":
        return <ProfileInfo user={user} />;
      case "orders":
        return <Orders orders={orders} />;
      case "wishlist":
        return <Wishlist items={wishlist} />;
      case "addresses":
        return <Addresses addresses={addresses} />;
      default:
        return <ProfileInfo user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 border-r border-gray-100 bg-gray-50/50">
              <div className="p-4">
                {/* User Profile Summary */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <nav className="space-y-1">
                  <NavButton 
                    icon={User} 
                    label="Profile" 
                    active={activeTab === "profile"} 
                    onClick={() => setActiveTab("profile")} 
                  />
                  <NavButton 
                    icon={Package} 
                    label="Orders" 
                    active={activeTab === "orders"} 
                    onClick={() => setActiveTab("orders")} 
                  />
                  <NavButton 
                    icon={Heart} 
                    label="Wishlist" 
                    active={activeTab === "wishlist"} 
                    onClick={() => setActiveTab("wishlist")} 
                  />
                  <NavButton 
                    icon={MapPin} 
                    label="Addresses" 
                    active={activeTab === "addresses"} 
                    onClick={() => setActiveTab("addresses")} 
                  />
                  
                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <NavButton 
                      icon={LogOut} 
                      label="Logout" 
                      onClick={() => console.log("Logout")} 
                      className="text-red-600 hover:bg-red-50"
                    />
                  </div>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Navigation Button Component
function NavButton({ icon: Icon, label, active, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
        active 
          ? "bg-blue-50 text-blue-600 font-semibold" 
          : "text-gray-600 hover:bg-gray-100 font-medium"
      } ${className}`}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4" />
        <span>{label}</span>
      </div>
      {active && <ChevronRight className="w-4 h-4" />}
    </button>
  );
}

// Profile Info Component
function ProfileInfo({ user }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</label>
          <p className="text-gray-900 mt-1">{user.name}</p>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</label>
          <p className="text-gray-900 mt-1">{user.email}</p>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</label>
          <p className="text-gray-900 mt-1">{user.phone}</p>
        </div>
      </div>
    </div>
  );
}

// Orders Component
function Orders({ orders }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-xl p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-gray-900">{order.id}</p>
                  <p className="text-xs text-gray-500">{order.date}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  order.status === "Delivered" ? "bg-green-100 text-green-700" :
                  order.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                  "bg-yellow-100 text-yellow-700"
                }`}>
                  {order.status}
                </span>
              </div>
              <div className="space-y-2 mb-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.name}</span>
                    <span className="font-medium">${item.price}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold text-blue-600">${order.total}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Wishlist Component
function Wishlist({ items }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">My Wishlist</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">No saved items</p>
      ) : (
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="flex justify-between items-center border border-gray-200 rounded-xl p-4">
              <span className="font-medium text-gray-900">{item.name}</span>
              <span className="text-blue-600 font-semibold">${item.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Addresses Component
function Addresses({ addresses }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Saved Addresses</h2>
      {addresses.length === 0 ? (
        <p className="text-gray-500">No addresses saved</p>
      ) : (
        <div className="space-y-3">
          {addresses.map((addr) => (
            <div key={addr.id} className={`border rounded-xl p-4 ${addr.default ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-gray-900">{addr.label}</span>
                {addr.default && (
                  <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">Default</span>
                )}
              </div>
              <p className="text-sm text-gray-600">{addr.address}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Footer() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Handle newsletter subscription
      console.log("Subscribe email:", email);
      // You can add your API call here
      setEmail("");
      // Optionally show success message
    }
  };

  return (
    <footer className="w-screen bg-gray-100">

      {/* TOP FOOTER */}
      <div className="w-screen px-4 md:px-8 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                <div className="w-2.5 h-2.5 bg-gray-900 rounded-full" />
                <div className="w-2.5 h-2.5 bg-gray-900/60 rounded-full" />
                <div className="w-2.5 h-2.5 bg-gray-900/30 rounded-full" />
              </div>
              <span className="font-bold tracking-widest">LUXE</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Defining modern elegance through timeless design and premium craftsmanship since 2012.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-bold mb-4 ">Shop</h4>
            <ul className="space-y-3 ">
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
                    className="text-gray-500 text-sm hover:text-gray-900 cursor-pointer"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4">Company</h4>
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
                    className="text-gray-500 text-sm hover:text-gray-900 cursor-pointer"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className="text-gray-500 text-sm mb-4 max-w-xs">
              Subscribe to receive updates on new collections and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none bg-white"
                required
              />
              <button
                type="submit"
                className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800"
              >
                Join
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-200">
        <div className="w-screen px-4 md:px-8 lg:px-16 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-400 text-xs">
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
                className="text-gray-400 text-xs hover:text-gray-700"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
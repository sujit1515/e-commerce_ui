// "use client";

// import { useState } from "react";
// import { ShoppingBag } from "lucide-react";
// import { toggleWishlist } from "../../../api/wishlist";

// const products = [
//   {
//     id: 1,
//     name: "Sand Linen Dress",
//     category: "Summer Essentials",
//     price: 185.0,
//     image: "/Images/Shop/summer-1.jpg", 
//     emoji: "👗",
//     bg: "#f5f0e8",
//   },
//   {
//     id: 2,
//     name: "Pleated Trousers",
//     category: "Tailored Goods",
//     price: 220.0,
//     image: "/Images/Shop/summer-4.jpg",
//     emoji: "👖",
//     bg: "#f0ede6",
//   },
//   {
//     id: 3,
//     name: "Boxy Cotton Shirt",
//     category: "Essentials",
//     price: 125.0,
//     image: "/Images/Shop/summer-2.jpg",
//     emoji: "👔",
//     bg: "#ededec",
//   },
//   {
//     id: 4,
//     name: "Soft Leather Mules",
//     category: "Footwear",
//     price: 295.0,
//     image: "/Images/Shop/summer-5.jpg",
//     emoji: "👡",
//     bg: "#eee9e0",
//   },
// ];

// interface WishlistButtonProps {
//   active: boolean;
//   onToggle: () => void;
//   loading?: boolean;
// }

// function WishlistButton({ active, onToggle, loading }: WishlistButtonProps) {
//   return (
//     <button
//       onClick={onToggle}
//       disabled={loading}
//       aria-label="Add to wishlist"
//       className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95 group disabled:opacity-50 disabled:cursor-not-allowed"
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 24 24"
//         fill={active ? "#800000" : "none"}
//         stroke={active ? "#800000" : "#000000"}
//         strokeWidth={active ? "0" : "1.5"}
//         className="w-4 h-4 transition-all duration-300 group-hover:scale-110 group-hover:stroke-maroon"
//       >
//         <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
//       </svg>
//     </button>
//   );
// }

// interface Product {
//   id: number;
//   name: string;
//   category: string;
//   price: number;
//   image: string;
//   emoji: string;
//   bg: string;
// }

// function ProductCard({ product }: { product: Product }) {
//   const [wished, setWished] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [addedToCart, setAddedToCart] = useState(false);
//   const [imageError, setImageError] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   const handleAddToCart = () => {
//     setAddedToCart(true);
//     console.log(`Added to cart: ${product.name}`);
//     setTimeout(() => setAddedToCart(false), 1800);
//   };

//   const handleBuyNow = () => {
//     console.log(`Buy now: ${product.name}`);
//     // Add your buy now logic here
//   };

//   const handleWishlistToggle = async () => {
//     try {
//       setLoading(true);
//       const res = await toggleWishlist(product.id.toString());
//       if (res.success) {
//         setWished(res.isInWishlist);
//       } else {
//         console.log(res.message);
//       }
//     } catch (error) {
//       console.log("Wishlist error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div 
//       className="group flex flex-col"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Image card - matching Signature Style aspect ratio and styling */}
//       <div
//         className="relative rounded-xl overflow-hidden mb-4 aspect-[3/4] bg-white border border-gray-100 transition-all duration-500 group-hover:shadow-2xl"
//         style={{ 
//           backgroundColor: product.bg,
//           boxShadow: isHovered 
//             ? "0 20px 40px rgba(128, 0, 0, 0.15)" 
//             : "0 4px 20px rgba(128, 0, 0, 0.1)",
//           transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
//         }}
//       >
//         <WishlistButton active={wished} onToggle={handleWishlistToggle} loading={loading} />

//         {!imageError && product.image ? (
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
//             style={{
//               transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
//             }}
//             onError={() => setImageError(true)}
//           />
//         ) : (
//           /* Fallback placeholder with emoji */
//           <div className="w-full h-full flex items-center justify-center">
//             <span
//               className="text-[5rem] sm:text-[6rem] md:text-[7rem] select-none transition-all duration-500 group-hover:scale-110"
//               style={{ 
//                 filter: isHovered 
//                   ? "drop-shadow(0 8px 24px rgba(128, 0, 0, 0.15))" 
//                   : "drop-shadow(0 4px 12px rgba(128, 0, 0, 0.08))",
//                 transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
//               }}
//             >
//               {product.emoji}
//             </span>
//           </div>
//         )}
        
//         {/* Animated overlay on hover */}
//         <div 
//           className="absolute inset-0 bg-gradient-to-t from-maroon/0 via-maroon/0 to-maroon/0 transition-all duration-500 group-hover:from-maroon/5 group-hover:via-maroon/0 group-hover:to-maroon/0"
//           style={{
//             transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
//           }}
//         />
//       </div>

//       {/* Product info - matching Signature Style typography with maroon hover animations */}
//       <div className="px-1">
//         {/* Product Name with maroon hover animation */}
//         <h3
//           className="font-semibold text-base sm:text-lg leading-tight mb-1 transition-all duration-300 cursor-pointer"
//           style={{ 
//             color: isHovered ? "#800000" : "#000000",
//             fontFamily: "'Cormorant Garamond', Georgia, serif",
//             fontWeight: 600,
//             letterSpacing: "0.02em",
//             transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//             transform: isHovered ? "translateX(4px)" : "translateX(0)",
//           }}
//         >
//           {product.name}
//         </h3>
        
//         {/* Category with maroon color and hover animation */}
//         <p 
//           className="text-sm mb-2 transition-all duration-300"
//           style={{ 
//             color: "#800000",
//             fontFamily: "'Cormorant Garamond', Georgia, serif",
//             fontWeight: 400,
//             opacity: isHovered ? 0.85 : 0.7,
//             transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//             transform: isHovered ? "translateX(4px)" : "translateX(0)",
//           }}
//         >
//           {product.category}
//         </p>
        
//         {/* Price and Actions row */}
//         <div className="flex items-center justify-between">
//           {/* Price with maroon hover animation */}
//           <p 
//             className="font-semibold text-base transition-all duration-300" 
//             style={{ 
//               color: isHovered ? "#800000" : "#000000",
//               fontFamily: "'Cormorant Garamond', Georgia, serif",
//               fontWeight: 600,
//               transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//               transform: isHovered ? "scale(1.05)" : "scale(1)",
//               transformOrigin: "left",
//             }}
//           >
//             ${product.price.toFixed(2)}
//           </p>
          
//           {/* Buy Now and Cart Icons - Updated to Maroon with enhanced animations */}
//           <div className="flex items-center gap-2">
//             {/* Buy Now Button - Enhanced animations */}
//             <button
//               onClick={handleBuyNow}
//               className="text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden group/buy"
//               style={{
//                 backgroundColor: isHovered ? "#5C0000" : "#800000",
//                 color: "#fff",
//                 fontFamily: "'Cormorant Garamond', Georgia, serif",
//                 letterSpacing: "0.05em",
//                 transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                 transform: isHovered ? "translateY(-2px)" : "translateY(0)",
//                 boxShadow: isHovered 
//                   ? "0 4px 12px rgba(128, 0, 0, 0.3)" 
//                   : "0 2px 6px rgba(128, 0, 0, 0.2)",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = "#5C0000";
//                 e.currentTarget.style.transform = "translateY(-2px)";
//                 e.currentTarget.style.boxShadow = "0 6px 16px rgba(128, 0, 0, 0.4)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = isHovered ? "#5C0000" : "#800000";
//                 e.currentTarget.style.transform = isHovered ? "translateY(-2px)" : "translateY(0)";
//                 e.currentTarget.style.boxShadow = isHovered 
//                   ? "0 4px 12px rgba(128, 0, 0, 0.3)" 
//                   : "0 2px 6px rgba(128, 0, 0, 0.2)";
//               }}
//             >
//               <span className="relative z-10 cursor-pointer">Buy Now</span>
//               <div className="absolute inset-0 bg-[#4a0000] transform scale-x-0 group-hover/buy:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
//             </button>
            
//             {/* Cart Icon Button - Enhanced animations */}
//             <button
//               onClick={handleAddToCart}
//               className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 relative overflow-hidden group/cart"
//               style={{
//                 backgroundColor: addedToCart ? "#10b981" : (isHovered ? "#5C0000" : "#800000"),
//                 color: "#fff",
//                 transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                 transform: isHovered && !addedToCart ? "scale(1.05)" : "scale(1)",
//                 boxShadow: isHovered && !addedToCart 
//                   ? "0 4px 12px rgba(128, 0, 0, 0.3)" 
//                   : "0 2px 6px rgba(128, 0, 0, 0.2)",
//               }}
//               onMouseEnter={(e) => {
//                 if (!addedToCart) {
//                   e.currentTarget.style.backgroundColor = "#4a0000";
//                   e.currentTarget.style.transform = "scale(1.1)";
//                   e.currentTarget.style.boxShadow = "0 6px 16px rgba(128, 0, 0, 0.4)";
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (!addedToCart) {
//                   e.currentTarget.style.backgroundColor = isHovered ? "#5C0000" : "#800000";
//                   e.currentTarget.style.transform = isHovered ? "scale(1.05)" : "scale(1)";
//                   e.currentTarget.style.boxShadow = isHovered && !addedToCart 
//                     ? "0 4px 12px rgba(128, 0, 0, 0.3)" 
//                     : "0 2px 6px rgba(128, 0, 0, 0.2)";
//                 }
//               }}
//               aria-label="Add to cart"
//             >
//               <span className="relative z-10">
//                 <ShoppingBag className="w-4 h-4 transition-all duration-300 group-hover/cart:rotate-12 group-hover/cart:scale-110" />
//               </span>
//               <div className="absolute inset-0 bg-[#4a0000] transform scale-x-0 group-hover/cart:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced success message animation */}
//       {addedToCart && (
//         <div className="fixed bottom-4 right-4 bg-maroon text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in z-50" style={{ backgroundColor: "#800000" }}>
//           Added to cart! ✨
//         </div>
//       )}
//     </div>
//   );
// }

// export default function CuratedSelection() {
//   const [isViewAllHovered, setIsViewAllHovered] = useState(false);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&display=swap');
        
//         /* Brand Colors */
//         :root {
//           --maroon: #800000;
//           --maroon-dark: #5C0000;
//           --maroon-darker: #4a0000;
//           --maroon-light: #9D2A2A;
//           --cream: #F8F4F0;
//           --black: #000000;
//           --white: #ffffff;
//         }
        
//         /* Apply Cormorant Garamond as the primary font */
//         * {
//           font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif !important;
//         }
        
//         /* Keep icons with their original styling */
//         svg, [class*="lucide-"] {
//           font-family: inherit !important;
//         }
        
//         /* Custom animations */
//         @keyframes slideIn {
//           from {
//             transform: translateX(100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }
        
//         @keyframes bounce {
//           0%, 100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//         }
        
//         @keyframes pulse {
//           0%, 100% {
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.7;
//           }
//         }
        
//         @keyframes shimmer {
//           0% {
//             background-position: -1000px 0;
//           }
//           100% {
//             background-position: 1000px 0;
//           }
//         }
        
//         .animate-slide-in {
//           animation: slideIn 0.5s ease-out;
//         }
        
//         .animate-bounce {
//           animation: bounce 0.5s ease-in-out;
//         }
        
//         .animate-pulse-slow {
//           animation: pulse 2s ease-in-out infinite;
//         }
        
//         /* Maroon text utility */
//         .text-maroon {
//           color: #800000 !important;
//         }
        
//         .hover\\:text-maroon:hover {
//           color: #800000 !important;
//         }
        
//         /* Button hover animations */
//         .btn-maroon {
//           transition: all 0.3s ease;
//         }
        
//         .btn-maroon:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 8px 20px rgba(128, 0, 0, 0.2);
//         }
        
//         /* Dark maroon hover for View All button */
//         .view-all-btn {
//           background-color: #800000 !important;
//           transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
//           position: relative;
//           overflow: hidden;
//         }
        
//         .view-all-btn::before {
//           content: '';
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           width: 0;
//           height: 0;
//           border-radius: 50%;
//           background: rgba(255, 255, 255, 0.2);
//           transform: translate(-50%, -50%);
//           transition: width 0.6s, height 0.6s;
//         }
        
//         .view-all-btn:hover::before {
//           width: 300px;
//           height: 300px;
//         }
        
//         .view-all-btn:hover {
//           background-color: #4a0000 !important;
//           transform: translateY(-3px) !important;
//           box-shadow: 0 12px 28px rgba(74, 0, 0, 0.4) !important;
//           letter-spacing: 0.15em !important;
//         }
        
//         .view-all-btn:active {
//           transform: translateY(-1px) !important;
//         }
        
//         /* Grid item hover effect */
//         .grid > div {
//           transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//         }
        
//         /* Scroll reveal animation */
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .animate-fade-in-up {
//           animation: fadeInUp 0.8s ease-out forwards;
//         }
//       `}</style>

//       <section
//         className="w-full py-16 px-4 sm:px-6 lg:px-8"
//         style={{ 
//           backgroundColor: "#F8F4F0",
//           padding: "4rem 1rem",
//         }}
//       >
//         <div className="max-w-6xl mx-auto">
//           {/* ── Header with Signature Style styling and maroon accents ── */}
//           <div className="text-center mb-12 sm:mb-16 animate-fade-in-up" style={{ marginBottom: "3rem" }}>
//             {/* Decorative Maroon Line with hover animation */}
//             <div className="flex items-center justify-center gap-4 mb-4 group">
//               <div 
//                 className="h-px w-16 bg-maroon opacity-30 transition-all duration-500 group-hover:w-20 group-hover:opacity-60" 
//                 style={{ backgroundColor: "#800000" }}
//               ></div>
//               <div 
//                 className="w-2 h-2 bg-maroon transform rotate-45 opacity-50 transition-all duration-500 group-hover:scale-150 group-hover:opacity-100" 
//                 style={{ backgroundColor: "#800000" }}
//               ></div>
//               <div 
//                 className="h-px w-16 bg-maroon opacity-30 transition-all duration-500 group-hover:w-20 group-hover:opacity-60" 
//                 style={{ backgroundColor: "#800000" }}
//               ></div>
//             </div>
            
//             <h2
//               className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-4 transition-all duration-500 hover:tracking-wider hover:scale-105 cursor-default"
//               style={{
//                 color: "#800000",
//                 fontFamily: "'Cormorant Garamond', Georgia, serif",
//                 fontWeight: 600,
//                 letterSpacing: "0.25em",
//                 fontSize: "clamp(1.5rem, 4vw, 2.4rem)",
//                 margin: "0 0 0.5rem 0",
//                 transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//               }}
//             >
//               SUMMER MINIMAL
//             </h2>
//             <p
//               className="text-base sm:text-lg max-w-md mx-auto italic transition-all duration-500 hover:text-maroon hover:scale-105"
//               style={{ 
//                 color: "#800000",
//                 fontFamily: "'Cormorant Garamond', Georgia, serif",
//                 fontWeight: 500,
//                 fontStyle: "italic",
//                 fontSize: "clamp(0.85rem, 2vw, 1rem)",
//                 letterSpacing: "0.05em",
//                 transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//               }}
//             >
//               Breathable fabrics and effortless silhouettes designed for the
//               warmest days of the year.
//             </p>
//           </div>

//           {/* ── Product Grid with matching gap to Signature Style ── */}
//           <div 
//             className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
//             style={{ gap: "2rem" }}
//           >
//             {products.map((product, index) => (
//               <div
//                 key={product.id}
//                 className="animate-fade-in-up"
//                 style={{
//                   animationDelay: `${index * 0.1}s`,
//                   animationFillMode: "backwards",
//                 }}
//               >
//                 <ProductCard product={product} />
//               </div>
//             ))}
//           </div>

//           {/* ── View All CTA - Enhanced Maroon Button with Dark Maroon Hover ── */}
//           <div className="mt-12 sm:mt-16 text-center" style={{ marginTop: "2rem" }}>
//             <button
//               className="view-all-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium tracking-wider uppercase transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 group relative overflow-hidden"
//               style={{
//                 backgroundColor: "#800000",
//                 color: "#fff",
//                 fontFamily: "'Cormorant Garamond', Georgia, serif",
//                 letterSpacing: "0.12em",
//                 fontWeight: 500,
//               }}
//               onMouseEnter={() => setIsViewAllHovered(true)}
//               onMouseLeave={() => setIsViewAllHovered(false)}
//             >
//               <span className="relative z-10 flex items-center gap-2 cursor-pointer">
//                 View All Collection
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={2}
//                   stroke="currentColor"
//                   className="w-4 h-4 transition-all duration-500 group-hover:translate-x-2 group-hover:scale-110"
//                   style={{
//                     transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//                   }}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
//                   />
//                 </svg>
//               </span>
//               <div className="absolute inset-0 bg-gradient-to-r from-[#4a0000] to-[#5C0000] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></div>
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Responsive adjustments */}
//       <style>{`
//         @media (max-width: 900px) {
//           .grid {
//             gap: 1rem !important;
//           }
//           section {
//             padding: 3rem 1rem !important;
//           }
//         }

//         @media (max-width: 640px) {
//           .grid {
//             gap: 1.5rem !important;
//             max-width: 380px;
//             margin: 0 auto;
//           }
//           .text-center {
//             margin-bottom: 2rem !important;
//           }
//           section {
//             padding: 2.5rem 1.25rem !important;
//           }
//         }

//         @media (max-width: 400px) {
//           .grid {
//             max-width: 100%;
//           }
//         }
//       `}</style>
//     </>
//   );
// }



"use client";

import { useState, useEffect, useRef } from "react";
import { ProductCard } from "./SeasonalMinimal/Productcard";
import { SeasonTabs } from "./SeasonalMinimal/Seasontabs";
import { getProductsBySeason, type Product } from "@/api/seasonalProducts";
import { seasonMeta, type Season } from "./SeasonalMinimal/Products";

export default function CuratedSelection() {
  const [activeSeason, setActiveSeason] = useState<Season>("summer");
  const [isAnimating, setIsAnimating] = useState(false);
  const [displaySeason, setDisplaySeason] = useState<Season>("summer");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Fetch products when season changes
  useEffect(() => {
    fetchProductsBySeason(displaySeason);
  }, [displaySeason]);

  const fetchProductsBySeason = async (season: Season) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProductsBySeason(season, 1, 4);
      if (response.success && response.products) {
        setProducts(response.products);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Cross-fade when season changes
  const handleSeasonChange = (season: Season) => {
    if (season === activeSeason || isAnimating) return;
    setIsAnimating(true);

    // 1. Fade out
    if (gridRef.current) {
      gridRef.current.style.opacity = "0";
      gridRef.current.style.transform = "translateY(12px)";
    }

    setTimeout(() => {
      setDisplaySeason(season);
      setActiveSeason(season);

      // 2. Fade in
      requestAnimationFrame(() => {
        if (gridRef.current) {
          gridRef.current.style.transition = "none";
          gridRef.current.style.opacity = "0";
          gridRef.current.style.transform = "translateY(12px)";
          requestAnimationFrame(() => {
            if (gridRef.current) {
              gridRef.current.style.transition =
                "opacity 0.45s ease, transform 0.45s ease";
              gridRef.current.style.opacity = "1";
              gridRef.current.style.transform = "translateY(0)";
            }
          });
        }
      });

      setTimeout(() => setIsAnimating(false), 450);
    }, 280);
  };

  const meta = seasonMeta[displaySeason];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&display=swap');

        .curated-section * {
          font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif !important;
        }

        /* preserve icon rendering */
        .curated-section svg { font-family: inherit !important; }

        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes taglineSwap {
          0%   { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0);   }
        }

        .animate-slide-in  { animation: slideIn  0.45s ease-out; }
        .animate-fade-up   { animation: fadeInUp 0.8s  ease-out forwards; }
        .animate-tagline   { animation: taglineSwap 0.4s ease-out forwards; }

        .season-grid-wrapper {
          transition: opacity 0.45s ease, transform 0.45s ease;
        }

        /* View-All hover shimmer */
        .view-all-btn { position: relative; overflow: hidden; }
        .view-all-btn::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          width: 0; height: 0;
          border-radius: 50%;
          background: rgba(255,255,255,0.18);
          transform: translate(-50%,-50%);
          transition: width .55s, height .55s;
        }
        .view-all-btn:hover::before { width: 320px; height: 320px; }
        .view-all-btn:hover {
          background-color: #4a0000 !important;
          transform: translateY(-3px) !important;
          box-shadow: 0 12px 28px rgba(74,0,0,.4) !important;
          letter-spacing: .15em !important;
        }
        .view-all-btn:active { transform: translateY(-1px) !important; }

        @media (max-width: 900px) {
          .curated-grid { gap: 1rem !important; }
          .curated-section { padding: 3rem 1rem !important; }
        }
        @media (max-width: 640px) {
          .curated-grid { gap: 1.25rem !important; max-width: 380px; margin: 0 auto; }
          .curated-section { padding: 2.5rem 1.25rem !important; }
        }
        @media (max-width: 400px) {
          .curated-grid { max-width: 100%; }
        }
      `}</style>

      <section
        className="curated-section w-full"
        style={{
          backgroundColor: "#F8F4F0",
          padding: "4rem 1rem",
        }}
      >
        <div className="max-w-6xl mx-auto">

          {/* ── Header ── */}
          <div
            className="text-center mb-10 animate-fade-up"
            style={{ animationDelay: "0s" }}
          >
            {/* Diamond rule */}
            <div className="flex items-center justify-center gap-4 mb-4 group">
              <div
                className="h-px w-16 opacity-30 transition-all duration-500 group-hover:w-20 group-hover:opacity-60"
                style={{ backgroundColor: "#800000" }}
              />
              <div
                className="w-2 h-2 transform rotate-45 opacity-50 transition-all duration-500 group-hover:scale-150 group-hover:opacity-100"
                style={{ backgroundColor: "#800000" }}
              />
              <div
                className="h-px w-16 opacity-30 transition-all duration-500 group-hover:w-20 group-hover:opacity-60"
                style={{ backgroundColor: "#800000" }}
              />
            </div>

            <h2
              className="mb-3 transition-all duration-500 hover:tracking-wider hover:scale-105 cursor-default"
              style={{
                color: "#800000",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600,
                letterSpacing: "0.25em",
                fontSize: "clamp(1.5rem, 4vw, 2.4rem)",
              }}
            >
              SEASONAL MINIMAL
            </h2>

            {/* Animated tagline — re-mounts on season change */}
            <p
              key={displaySeason}
              className="animate-tagline text-base max-w-md mx-auto italic"
              style={{
                color: "#800000",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(0.85rem, 2vw, 1rem)",
                letterSpacing: "0.05em",
              }}
            >
              {meta.tagline}
            </p>

            {/* ── Season Tabs ── */}
            <SeasonTabs active={activeSeason} onChange={handleSeasonChange} />
          </div>

          {/* ── Product Grid ── */}
          <div
            ref={gridRef}
            className="curated-grid season-grid-wrapper grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4"
            style={{ gap: "2rem", opacity: 1, transform: "translateY(0)" }}
          >
            {loading ? (
              // Loading skeletons
              Array(4).fill(0).map((_, index) => (
                <div key={`skeleton-${index}`} className="animate-pulse">
                  <div className="bg-gray-200 rounded-xl aspect-[3/4] mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))
            ) : error ? (
              <div className="col-span-full text-center py-12">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={() => fetchProductsBySeason(displaySeason)}
                  className="px-6 py-2 bg-maroon text-white rounded-full hover:bg-maroon/90 transition-colors"
                  style={{ backgroundColor: "#800000" }}
                >
                  Try Again
                </button>
              </div>
            ) : products.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 mb-2">No products available for {displaySeason} season yet</p>
                <p className="text-sm text-gray-400">Check back soon for new arrivals!</p>
              </div>
            ) : (
              products.map((product, index) => (
                <div
                  key={`${displaySeason}-${product._id}`}
                  className="animate-fade-up"
                  style={{
                    animationDelay: `${index * 0.08}s`,
                    animationFillMode: "backwards",
                  }}
                >
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>

          {/* ── View All CTA ── */}
          {products.length > 0 && (
            <div className="mt-12 text-center">
              <button
                className="view-all-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium tracking-wider uppercase transition-all duration-500 hover:shadow-2xl active:translate-y-0 group"
                style={{
                  backgroundColor: "#800000",
                  color: "#fff",
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  letterSpacing: "0.12em",
                  fontWeight: 500,
                }}
                onClick={() => {
                  // Navigate to shop page with season filter
                  window.location.href = `/shop?season=${activeSeason}`;
                }}
              >
                <span className="relative z-10 flex items-center gap-2 cursor-pointer">
                  View{" "}
                  {activeSeason.charAt(0).toUpperCase() + activeSeason.slice(1)}{" "}
                  Collection
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 transition-all duration-500 group-hover:translate-x-2 group-hover:scale-110"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a0000] to-[#5C0000] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
              </button>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
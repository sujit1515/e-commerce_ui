// "use client";

// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState, useRef, useCallback } from "react";
// import { 
//   ChevronLeft, ChevronRight, ChevronDown, ChevronUp, ZoomIn, 
//   Heart, Eye, Star, Ruler, Zap, ShoppingCart, Image as ImageIcon, Minus, Plus, CheckCircle
// } from "lucide-react";
// import { getProductById } from "@/api/product";
// import { getWishlist, toggleWishlist } from "@/api/wishlist"
// import { addToCart, getCart } from "@/api/cart";
// import { createOrderApi } from "@/api/order";
// import Navbar from "@/components/Common/Navbar";

// // TYPES
// interface Product {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   images: string[];
//   sizes?: string[];
//   colors?: string[];
//   rating?: number;
//   reviewCount?: number;
//   stock?: number;
// }

// interface GalleryImage {
//   src: string;
//   alt: string;
// }

// interface ProductData {
//   _id: string;
//   badge: string;
//   viewCount: number;
//   name: string;
//   price: number;
//   rating: number;
//   reviewCount: number;
//   colors: { name: string; hex: string }[];
//   sizes: string[];
//   outOfStock?: string[];
//   description: string;
//   material: string;
//   shipping: string;
//   stock?: number;
// }

// interface Recommendation {
//   name: string;
//   price: number;
//   img: string;
// }

// // Toast Notification Component
// function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 3000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div className={`fixed bottom-20 left-4 right-4 sm:left-auto sm:right-4 sm:bottom-4 z-50 animate-in`}>
//       <div className={`px-4 py-3 rounded-lg shadow-lg ${
//         type === 'success' ? 'bg-maroon' : 'bg-maroon-dark'
//       } text-white text-center text-sm font-medium`}>
//         {message}
//       </div>
//     </div>
//   );
// }

// // ============================================================================
// // COMPONENT: QuantitySelector
// // ============================================================================

// function QuantitySelector({ 
//   quantity, 
//   onQuantityChange, 
//   maxStock = 99,
//   disabled = false 
// }: { 
//   quantity: number; 
//   onQuantityChange: (quantity: number) => void;
//   maxStock?: number;
//   disabled?: boolean;
// }) {
//   const increment = () => {
//     if (quantity < maxStock && !disabled) {
//       onQuantityChange(quantity + 1);
//     }
//   };

//   const decrement = () => {
//     if (quantity > 1 && !disabled) {
//       onQuantityChange(quantity - 1);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = parseInt(e.target.value);
//     if (!isNaN(value) && value >= 1 && value <= maxStock && !disabled) {
//       onQuantityChange(value);
//     }
//   };

//   return (
//     <div className="flex items-center gap-2">
//       <button
//         onClick={decrement}
//         disabled={quantity <= 1 || disabled}
//         className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all
//           ${quantity <= 1 || disabled
//             ? "border-gray-200 text-gray-300 cursor-not-allowed"
//             : "border-gray-300 text-gray-600 hover:border-maroon hover:text-maroon hover:bg-gray-50"
//           }`}
//         aria-label="Decrease quantity"
//       >
//         <Minus className="w-3 h-3" />
//       </button>
      
//       <input
//         type="number"
//         value={quantity}
//         onChange={handleInputChange}
//         disabled={disabled}
//         min="1"
//         max={maxStock}
//         className="w-14 h-8 text-center border border-gray-200 rounded-lg text-sm font-medium
//           focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon
//           disabled:bg-gray-50 disabled:text-gray-400"
//       />
      
//       <button
//         onClick={increment}
//         disabled={quantity >= maxStock || disabled}
//         className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all
//           ${quantity >= maxStock || disabled
//             ? "border-gray-200 text-gray-300 cursor-not-allowed"
//             : "border-gray-300 text-gray-600 hover:border-maroon hover:text-maroon hover:bg-gray-50"
//           }`}
//         aria-label="Increase quantity"
//       >
//         <Plus className="w-3 h-3" />
//       </button>
      
//       {maxStock < 10 && (
//         <span className="text-[10px] text-gray-400 ml-1">
//           Only {maxStock} left
//         </span>
//       )}
//     </div>
//   );
// }

// // ============================================================================
// // COMPONENT: ProductImageGallery
// // ============================================================================

// function ProductImageGallery({ images }: { images: GalleryImage[] }) {
//   const [active, setActive] = useState(0);
//   const [zoomed, setZoomed] = useState(false);
//   const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
//   const [touchStart, setTouchStart] = useState(0);
//   const [touchEnd, setTouchEnd] = useState(0);

//   const prev = () => setActive(i => (i - 1 + images.length) % images.length);
//   const next = () => setActive(i => (i + 1) % images.length);

//   const handleTouchStart = (e: React.TouchEvent) => {
//     setTouchStart(e.targetTouches[0].clientX);
//   };

//   const handleTouchMove = (e: React.TouchEvent) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const handleTouchEnd = () => {
//     if (touchStart - touchEnd > 50) {
//       next();
//     }
//     if (touchStart - touchEnd < -50) {
//       prev();
//     }
//   };

//   const handleImageError = (index: number) => {
//     setImageErrors(prev => ({ ...prev, [index]: true }));
//   };

//   if (!images.length) {
//     return (
//       <div className="flex items-center justify-center bg-gray-100 rounded-xl sm:rounded-2xl" style={{ aspectRatio: "3/4", minHeight: "280px" }}>
//         <div className="text-center text-gray-400">
//           <ImageIcon className="w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-2" />
//           <p className="text-xs sm:text-sm">No images available</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-2 sm:gap-4">
//       {/* Main image */}
//       <div 
//         className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100 group"
//         style={{ aspectRatio: "3/4", minHeight: "280px" }}
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//       >
//         {imageErrors[active] ? (
//           <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 text-center">
//             <ImageIcon className="w-12 sm:w-16 h-12 sm:h-16 text-gray-400 mb-2 sm:mb-3" />
//             <p className="text-gray-500 text-xs sm:text-sm font-medium">{images[active]?.alt || 'Product image'}</p>
//             <p className="text-gray-400 text-[10px] sm:text-xs mt-1 sm:mt-2">Image failed to load</p>
//           </div>
//         ) : (
//           <img
//             src={images[active].src}
//             alt={images[active].alt}
//             className={`w-full h-full object-cover object-top transition-all duration-500
//               ${zoomed ? "scale-150 cursor-zoom-out" : "group-hover:scale-[1.02] cursor-zoom-in"}`}
//             onClick={() => setZoomed(!zoomed)}
//             onError={() => handleImageError(active)}
//           />
//         )}

//         {/* Zoom hint */}
//         {!zoomed && !imageErrors[active] && (
//           <div className="hidden sm:flex absolute top-3 sm:top-4 right-3 sm:right-4 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-white/80 backdrop-blur-sm
//             flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
//             <ZoomIn className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-maroon" />
//           </div>
//         )}

//         {/* Image alt text badge */}
//         <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full max-w-[80%] truncate">
//           {images[active]?.alt}
//         </div>

//         {/* Prev / Next arrows */}
//         {images.length > 1 && (
//           <>
//             <button
//               onClick={prev}
//               className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-8 lg:w-9 h-8 lg:h-9 rounded-full
//                 bg-white/80 backdrop-blur-sm shadow-md items-center justify-center
//                 opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110"
//             >
//               <ChevronLeft className="w-3.5 lg:w-4 h-3.5 lg:h-4 text-maroon" />
//             </button>
//             <button
//               onClick={next}
//               className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-8 lg:w-9 h-8 lg:h-9 rounded-full
//                 bg-white/80 backdrop-blur-sm shadow-md items-center justify-center
//                 opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110"
//             >
//               <ChevronRight className="w-3.5 lg:w-4 h-3.5 lg:h-4 text-maroon" />
//             </button>
//           </>
//         )}

//         {/* Dot indicators */}
//         <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 sm:hidden">
//           {images.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setActive(i)}
//               className={`transition-all duration-200 min-w-[20px] h-1.5
//                 ${i === active ? "w-5 bg-maroon" : "w-1.5 bg-gray-300"}`}
//               aria-label={`Go to image ${i + 1}`}
//             />
//           ))}
//         </div>

//         {/* Image counter */}
//         <div className="absolute top-2 right-2 sm:hidden bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full">
//           {active + 1} / {images.length}
//         </div>
//       </div>

//       {/* Thumbnail strip */}
//       {images.length > 1 && (
//         <div className="flex flex-row gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
//           {images.map((img, i) => (
//             <button
//               key={i}
//               onClick={() => setActive(i)}
//               className={`flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-200
//                 w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-gray-100
//                 ${i === active
//                   ? "border-maroon shadow-md scale-[1.02]"
//                   : "border-transparent hover:border-gray-300"}`}
//             >
//               {imageErrors[i] ? (
//                 <div className="w-full h-full flex items-center justify-center bg-gray-200">
//                   <ImageIcon className="w-4 sm:w-6 h-4 sm:h-6 text-gray-400" />
//                 </div>
//               ) : (
//                 <img
//                   src={img.src}
//                   alt={`${img.alt} - view ${i + 1}`}
//                   className="w-full h-full object-cover object-top"
//                   onError={() => handleImageError(i)}
//                 />
//               )}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // ============================================================================
// // COMPONENT: Accordion
// // ============================================================================

// function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="border-b border-gray-100">
//       <button
//         onClick={() => setOpen(!open)}
//         className="w-full flex items-center justify-between py-3 sm:py-4 text-left group"
//       >
//         <span className="text-[10px] sm:text-[11px] font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase text-maroon group-hover:text-maroon-light transition-colors">
//           {title}
//         </span>
//         {open
//           ? <ChevronUp className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-gray-400 flex-shrink-0" />
//           : <ChevronDown className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-gray-400 flex-shrink-0" />}
//       </button>
//       {open && (
//         <div className="pb-3 sm:pb-4 text-gray-500 text-xs sm:text-sm leading-relaxed animate-in">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// }

// // ============================================================================
// // COMPONENT: ProductInfo (Fixed with proper wishlist sync and cart status)
// // ============================================================================

// function ProductInfo({ 
//   product, 
//   onToast,
//   initialWishlistStatus = false,
//   onWishlistToggle,
//   isInCart = false,
//   onCartStatusChange
// }: { 
//   product: ProductData;
//   onToast: (message: string, type: 'success' | 'error') => void;
//   initialWishlistStatus?: boolean;
//   onWishlistToggle?: (isWishlisted: boolean) => void;
//   isInCart?: boolean;
//   onCartStatusChange?: (isInCart: boolean) => void;
// }) {
//   const router = useRouter();
//   const [selectedColor, setColor] = useState(product.colors[0]?.name || "");
//   const [selectedSize, setSize] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [wishlisted, setWish] = useState(initialWishlistStatus);
//   const [cartFlash, setCart] = useState(false);
//   const [isAddedToCart, setIsAddedToCart] = useState(isInCart);
//   const [sizeError, setSizeError] = useState(false);
//   const [quantityError, setQuantityError] = useState(false);
//   const [isWishlistLoading, setIsWishlistLoading] = useState(false);
//   const [maxStock, setMaxStock] = useState(product.stock || 99);
//   const [isAddingToCart, setIsAddingToCart] = useState(false);

//   // Sync with initialWishlistStatus when it changes
//   useEffect(() => {
//     setWish(initialWishlistStatus);
//   }, [initialWishlistStatus]);

//   // Sync with isInCart when it changes
//   useEffect(() => {
//     setIsAddedToCart(isInCart);
//   }, [isInCart]);

//   // Update max stock when size changes
//   useEffect(() => {
//     if (selectedSize && product.stock) {
//       setMaxStock(product.stock);
//     }
//     setQuantity(1);
//   }, [selectedSize, product.stock]);

//   const handleToggleWishlist = async () => {
//     if (isWishlistLoading) return;
    
//     setIsWishlistLoading(true);
//     try {
//       const result = await toggleWishlist(product._id);
      
//       if (result?.success) {
//         const newWishlistStatus = !wishlisted;
//         setWish(newWishlistStatus);
//         onWishlistToggle?.(newWishlistStatus);
//         onToast(
//           newWishlistStatus ? "Added to wishlist" : "Removed from wishlist",
//           "success"
//         );
//       } else {
//         onToast(
//           result?.message || "Failed to update wishlist",
//           "error"
//         );
//       }
//     } catch (error) {
//       console.error("Wishlist toggle error:", error);
//       onToast("Something went wrong", "error");
//     } finally {
//       setIsWishlistLoading(false);
//     }
//   };

// const handleBuy = async () => {
//   if (!selectedSize) { 
//     setSizeError(true); 
//     return; 
//   }

//   try {
//     const res = await createOrderApi({
//       productId: product._id,
//       quantity,
//       size: selectedSize,
//       color: selectedColor,
//     });

//     if (res?.success) {
//       // ✅ Only pass orderId
//       router.push(`/address?orderId=${res.orderId}`);
//     } else {
//       onToast(res?.message || "Failed to create order", "error");
//     }

//   } catch (error) {
//     console.error(error);
//     onToast("Something went wrong", "error");
//   }
// };

//   const handleCart = async () => {
//     if (!selectedSize) { 
//       setSizeError(true); 
//       return; 
//     }
//     setSizeError(false);

//     if (quantity > maxStock) {
//       setQuantityError(true);
//       onToast(`Only ${maxStock} items available`, "error");
//       return;
//     }
//     setQuantityError(false);

//     setIsAddingToCart(true);
//     try {
//       const res = await addToCart({
//         productId: product._id,
//         quantity,
//         size: selectedSize,
//         color: selectedColor,
//       });

//       if (res?.success) {
//         setCart(true);
//         setIsAddedToCart(true);
//         onCartStatusChange?.(true);
//         setTimeout(() => setCart(false), 1800);
//         onToast(`${quantity} item${quantity > 1 ? 's' : ''} added to cart`, "success");
//       } else {
//         onToast(res?.message || "Failed to add to cart", "error");
//       }
//     } catch (error: any) {
//       console.error("Add to cart error:", error);
//       onToast(error?.response?.data?.message || "Something went wrong", "error");
//     } finally {
//       setIsAddingToCart(false);
//     }
//   };

//   const handleGoToCart = () => {
//     router.push('/cart');
//   };

//   const totalPrice = product.price * quantity;

//   return (
//     <div className="flex flex-col gap-0">
//       {/* Top badges */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 flex-wrap mb-4 sm:mb-5">
//         <span className="bg-maroon text-white text-[8px] sm:text-[9px] font-black tracking-[0.15em] sm:tracking-[0.18em] uppercase px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
//           {product.badge}
//         </span>
//         <div className="flex items-center gap-1 sm:gap-1.5 text-gray-400">
//           <Eye className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
//           <span className="text-[10px] sm:text-[11px] font-medium">
//             Recently viewed by {product.viewCount}+ people
//           </span>
//         </div>
//       </div>

//       {/* Title */}
//       <h1 className="font-display font-bold text-black text-2xl sm:text-3xl lg:text-4xl leading-tight mb-3 sm:mb-5">
//         {product.name}
//       </h1>

//       {/* Price + Stars */}
//       <div className="flex flex-col xs:flex-row xs:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-100">
//         <div className="flex items-center gap-2">
//           <span className="font-black text-black text-2xl sm:text-3xl">
//             ${totalPrice.toFixed(2)}
//           </span>
//           {quantity > 1 && (
//             <span className="text-sm text-gray-400">
//               (${product.price.toFixed(2)} each)
//             </span>
//           )}
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="flex gap-0.5">
//             {Array.from({ length: 5 }).map((_, i) => (
//               <Star
//                 key={i}
//                 className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${
//                   i < Math.floor(product.rating)
//                     ? "fill-maroon text-maroon"
//                     : i < product.rating
//                     ? "fill-maroon-light text-maroon-light"
//                     : "fill-gray-200 text-gray-200"
//                 }`}
//               />
//             ))}
//           </div>
//           <a href="#reviews" className="text-xs sm:text-sm font-bold text-maroon hover:underline">
//             {product.reviewCount} Reviews
//           </a>
//         </div>
//       </div>

//       {/* Color selector */}
//       {product.colors.length > 0 && (
//         <div className="mb-4 sm:mb-6">
//           <p className="text-[10px] sm:text-[11px] font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase text-black mb-2 sm:mb-3">
//             Color: <span className="text-maroon font-black">{selectedColor.toUpperCase()}</span>
//           </p>
//           <div className="flex gap-2 sm:gap-2.5 flex-wrap">
//             {product.colors.map(c => (
//               <button
//                 key={c.name}
//                 onClick={() => setColor(c.name)}
//                 title={c.name}
//                 className={`w-8 sm:w-9 h-8 sm:h-9 rounded-full border-2 transition-all duration-200
//                   ${selectedColor === c.name
//                     ? "border-maroon scale-110 shadow-md"
//                     : "border-gray-200 hover:border-gray-500 hover:scale-105"}`}
//                 style={{ backgroundColor: c.hex }}
//                 aria-label={`Select ${c.name} color`}
//               />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Size selector */}
//       {product.sizes.length > 0 && (
//         <div className="mb-4 sm:mb-6">
//           <div className="flex items-center justify-between mb-2 sm:mb-3">
//             <p className="text-[10px] sm:text-[11px] font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase text-black">
//               Select Size
//             </p>
//             <button className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-maroon hover:text-maroon-dark transition-colors">
//               <Ruler className="w-3 h-3" /> Size Guide
//             </button>
//           </div>
//           <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-2">
//             {product.sizes.map(s => {
//               const oos = product.outOfStock?.includes(s);
//               const active = selectedSize === s;
//               return (
//                 <button
//                   key={s}
//                   onClick={() => { if (!oos) { setSize(s); setSizeError(false); } }}
//                   disabled={oos}
//                   className={`py-2 sm:py-2.5 text-[10px] sm:text-xs font-bold rounded-lg sm:rounded-xl border transition-all duration-200
//                     ${oos
//                       ? "border-gray-100 text-gray-300 line-through cursor-not-allowed bg-gray-50"
//                       : active
//                       ? "border-maroon bg-maroon/5 text-maroon shadow-sm"
//                       : "border-gray-200 text-gray-600 hover:border-maroon hover:text-maroon"}`}
//                 >
//                   {s}
//                 </button>
//               );
//             })}
//           </div>
//           {sizeError && (
//             <p className="mt-2 text-[10px] sm:text-xs font-semibold text-maroon">
//               Please select a size before continuing
//             </p>
//           )}
//         </div>
//       )}

//       {/* Quantity Selector */}
//       <div className="mb-4 sm:mb-6">
//         <p className="text-[10px] sm:text-[11px] font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase text-black mb-2 sm:mb-3">
//           Quantity
//         </p>
//         <QuantitySelector 
//           quantity={quantity}
//           onQuantityChange={setQuantity}
//           maxStock={maxStock}
//           disabled={!selectedSize}
//         />
//         {quantityError && (
//           <p className="mt-2 text-[10px] sm:text-xs font-semibold text-maroon">
//             Selected quantity exceeds available stock
//           </p>
//         )}
//       </div>

//       {/* CTAs - Show different buttons based on cart status */}
//       <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-6">
//         {isAddedToCart ? (
//           <>
//             <button
//               onClick={handleGoToCart}
//               className="w-full sm:flex-1 bg-green-600 hover:bg-green-700 text-white font-black text-xs sm:text-sm
//                 tracking-[0.15em] sm:tracking-[0.18em] uppercase py-4 sm:py-4 rounded-xl sm:rounded-2xl transition-all shadow-md
//                 hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 min-h-[48px]"
//             >
//               <ShoppingCart className="w-4 sm:w-4 h-4 sm:h-4" /> Go to Cart
//             </button>
            
//             <button
//               onClick={handleBuy}
//               className="w-full sm:flex-1 bg-black hover:bg-maroon text-white font-black text-xs sm:text-sm
//                 tracking-[0.15em] sm:tracking-[0.18em] uppercase py-4 sm:py-4 rounded-xl sm:rounded-2xl transition-all shadow-md
//                 hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 min-h-[48px]"
//             >
//               <Zap className="w-4 sm:w-4 h-4 sm:h-4" /> Buy It Now
//             </button>
//           </>
//         ) : (
//           <>
//             <button
//               onClick={handleCart}
//               disabled={isAddingToCart}
//               className="w-full sm:flex-1 bg-black hover:bg-maroon text-white font-black text-xs sm:text-sm
//                 tracking-[0.15em] sm:tracking-[0.18em] uppercase py-4 sm:py-4 rounded-xl sm:rounded-2xl transition-all shadow-md
//                 hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 min-h-[48px]
//                 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isAddingToCart ? (
//                 <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
//                 </svg> Adding...</>
//               ) : (
//                 <><ShoppingCart className="w-4 sm:w-4 h-4 sm:h-4" /> Add to Cart</>
//               )}
//             </button>

//             <button
//               onClick={handleBuy}
//               className="w-full sm:flex-1 border-2 border-black text-black font-black text-xs sm:text-sm
//                 tracking-[0.15em] sm:tracking-[0.18em] uppercase py-4 sm:py-3.5 rounded-xl sm:rounded-2xl transition-all
//                 hover:bg-gray-50 active:scale-[0.98] flex items-center justify-center gap-2 min-h-[48px]"
//             >
//               <Zap className="w-4 sm:w-4 h-4 sm:h-4" /> Buy It Now
//             </button>
//           </>
//         )}
        
//         <button
//           onClick={handleToggleWishlist}
//           disabled={isWishlistLoading}
//           className={`w-full sm:w-14 h-12 sm:h-14 rounded-xl sm:rounded-2xl border-2 flex items-center justify-center flex-shrink-0
//             transition-all duration-200 hover:scale-105 active:scale-95 min-h-[48px]
//             ${isWishlistLoading ? "opacity-50 cursor-wait" : ""}
//             ${wishlisted
//               ? "border-maroon bg-maroon/5 text-maroon"
//               : "border-gray-200 text-gray-400 hover:border-gray-400"}`}
//           aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
//         >
//           <Heart className={`w-5 sm:w-5 h-5 sm:h-5 ${wishlisted ? "fill-maroon" : ""}`} />
//         </button>
//       </div>

//       {/* Accordions */}
//       <div className="border-t border-gray-100">
//         <Accordion title="Product Description">
//           <p>{product.description}</p>
//         </Accordion>
//         <Accordion title="Material & Care">
//           <p>{product.material}</p>
//         </Accordion>
//         <Accordion title="Shipping & Returns">
//           <p>{product.shipping}</p>
//         </Accordion>
//       </div>
//     </div>
//   );
// }

// // ============================================================================
// // MAIN COMPONENT: ProductDetailPage
// // ============================================================================

// export default function ProductDetailPage() {
//   const params = useParams();
//   const id = params?.id as string;
//   const router = useRouter();
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [stickyBar, setStickyBar] = useState(false);
//   const [mobileWishlist, setMobileWishlist] = useState(false);
//   const [isMobileWishlistLoading, setIsMobileWishlistLoading] = useState(false);
//   const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
//   const [selectedSizeForMobile, setSelectedSizeForMobile] = useState("");
//   const [selectedColorForMobile, setSelectedColorForMobile] = useState("");
//   const [mobileQuantity, setMobileQuantity] = useState(1);
//   const [maxMobileStock, setMaxMobileStock] = useState(99);
//   const [wishlistStatus, setWishlistStatus] = useState(false);
//   const [isCheckingWishlist, setIsCheckingWishlist] = useState(true);
//   const [isInCart, setIsInCart] = useState(false);
//   const [isCheckingCart, setIsCheckingCart] = useState(true);
//   const [isMobileAddingToCart, setIsMobileAddingToCart] = useState(false);
//   const [mobileIsInCart, setMobileIsInCart] = useState(false);

//   // Check if product is in cart
//   const checkIfInCart = async (productId: string) => {
//     try {
//       const cartData = await getCart();
//       if (cartData && Array.isArray(cartData)) {
//         const exists = cartData.some((item: any) => {
//           const itemProductId = item.productId?._id || item.productId || item._id;
//           return itemProductId === productId;
//         });
//         setIsInCart(exists);
//         setMobileIsInCart(exists);
//       }
//     } catch (error) {
//       console.error("Error checking cart:", error);
//     } finally {
//       setIsCheckingCart(false);
//     }
//   };

//   // Fetch Product and check wishlist & cart status
//   useEffect(() => {
//     const fetchProductAndCheckStatus = async () => {
//       if (!id || typeof id !== "string") return;

//       try {
//         setLoading(true);
//         setIsCheckingWishlist(true);
//         setIsCheckingCart(true);
        
//         const productData = await getProductById(id as string);

//         if (!productData) {
//           setLoading(false);
//           setIsCheckingWishlist(false);
//           setIsCheckingCart(false);
//           return;
//         }

//         setProduct(productData);
//         setMaxMobileStock(productData.stock ?? 99);

//         // Check wishlist status
//         try {
//           const wishlistData = await getWishlist();
          
//           if (wishlistData?.success && wishlistData?.wishlist) {
//             let isInWishlist = false;
            
//             if (Array.isArray(wishlistData.wishlist)) {
//               isInWishlist = wishlistData.wishlist.some((item: any) => {
//                 const productId = item.productId || item.product?._id || item._id;
//                 return productId === productData._id;
//               });
//             } else if (wishlistData.wishlist.items && Array.isArray(wishlistData.wishlist.items)) {
//               isInWishlist = wishlistData.wishlist.items.some((item: any) => {
//                 const productId = item.productId || item.product?._id || item._id;
//                 return productId === productData._id;
//               });
//             }
            
//             setWishlistStatus(isInWishlist);
//             setMobileWishlist(isInWishlist);
//           } else {
//             setWishlistStatus(false);
//             setMobileWishlist(false);
//           }
//         } catch (wishlistError) {
//           console.error("Error checking wishlist status:", wishlistError);
//           setWishlistStatus(false);
//           setMobileWishlist(false);
//         }

//         // Check cart status
//         await checkIfInCart(productData._id);

//       } catch (error) {
//         console.error('Error fetching product:', error);
//       } finally {
//         setLoading(false);
//         setIsCheckingWishlist(false);
//       }
//     };

//     fetchProductAndCheckStatus();
//   }, [id]);

//   // Sticky bar on scroll (mobile only)
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 400) {
//         setStickyBar(true);
//       } else {
//         setStickyBar(false);
//       }
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleToast = (message: string, type: 'success' | 'error') => {
//     setToast({ message, type });
//   };

//   const handleWishlistToggle = (newStatus: boolean) => {
//     setWishlistStatus(newStatus);
//     setMobileWishlist(newStatus);
//   };

//   const handleCartStatusChange = (inCart: boolean) => {
//     setIsInCart(inCart);
//     setMobileIsInCart(inCart);
//   };

//   const handleMobileToggleWishlist = async () => {
//     if (isMobileWishlistLoading || !product) return;
    
//     setIsMobileWishlistLoading(true);
//     try {
//       const result = await toggleWishlist(product._id);
//       if (result?.success) {
//         const newStatus = !mobileWishlist;
//         setMobileWishlist(newStatus);
//         setWishlistStatus(newStatus);
//         handleToast(
//           newStatus ? "Added to wishlist" : "Removed from wishlist",
//           "success"
//         );
//       } else {
//         handleToast(
//           result?.message || "Failed to update wishlist",
//           "error"
//         );
//       }
//     } catch (error) {
//       console.error("Mobile wishlist toggle error:", error);
//       handleToast("Something went wrong", "error");
//     } finally {
//       setIsMobileWishlistLoading(false);
//     }
//   };

//   const handleMobileAddToCart = async () => {
//     if (!selectedSizeForMobile) {
//       handleToast("Please select a size", "error");
//       return;
//     }

//     if (mobileQuantity > maxMobileStock) {
//       handleToast(`Only ${maxMobileStock} items available`, "error");
//       return;
//     }

//     setIsMobileAddingToCart(true);
//     try {
//       const res = await addToCart({
//         productId: product!._id,
//         quantity: mobileQuantity,
//         size: selectedSizeForMobile,
//         color: selectedColorForMobile,
//       });

//       if (res?.success) {
//         setIsInCart(true);
//         setMobileIsInCart(true);
//         handleToast(`${mobileQuantity} item added to cart`, "success");
//       } else {
//         handleToast(res?.message || "Failed to add", "error");
//       }
//     } catch (error: any) {
//       console.error(error);
//       handleToast(error?.response?.data?.message || "Error adding to cart", "error");
//     } finally {
//       setIsMobileAddingToCart(false);
//     }
//   };

//   const handleMobileGoToCart = () => {
//     router.push('/cart');
//   };

//   const handleMobileBuyNow = async () => {
//   if (!selectedSizeForMobile) {
//     handleToast("Please select a size", "error");
//     return;
//   }

//   if (mobileQuantity > maxMobileStock) {
//     handleToast(`Only ${maxMobileStock} items available`, "error");
//     return;
//   }

//   try {
//     const res = await createOrderApi({
//       productId: product!._id,
//       quantity: mobileQuantity,
//       size: selectedSizeForMobile,
//       color: selectedColorForMobile,
//     });

//     if (res?.success) {
//       router.push(`/address?orderId=${res.orderId}`);
//     } else {
//       handleToast(res?.message || "Failed to create order", "error");
//     }
//   } catch (error) {
//     console.error(error);
//     handleToast("Something went wrong", "error");
//   }
// };

//   // Loading State
//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F8F4F0' }}>
//           <div className="text-center">
//             <div className="w-12 h-12 border-4 border-gray-200 border-t-maroon rounded-full animate-spin mx-auto mb-4"></div>
//             <p className="text-gray-500 text-sm sm:text-lg">Loading product...</p>
//           </div>
//         </div>
//       </>
//     );
//   }

//   // Product Not Found
//   if (!product) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F8F4F0' }}>
//           <p className="text-maroon text-sm sm:text-lg">Product not found</p>
//         </div>
//       </>
//     );
//   }

//   // Fallback images
//   const FALLBACK_IMAGES = [
//     "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=85",
//     "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=85",
//     "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=85",
//     "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=85",
//   ];

//   // Convert images for gallery
//   const galleryImages: GalleryImage[] = product.images?.length 
//     ? product.images.map((img) => ({
//         src: img,
//         alt: product.name,
//       }))
//     : FALLBACK_IMAGES.map((img) => ({
//         src: img,
//         alt: product.name,
//       }));

//   // Format data for ProductInfo component
//   const productInfo: ProductData = {
//     _id: product._id,
//     badge: "New Collection",
//     viewCount: 20,
//     name: product.name,
//     price: product.price,
//     rating: product.rating || 4.5,
//     reviewCount: product.reviewCount || 0,
//     colors: product.colors?.map((color) => ({
//       name: color,
//       hex: getColorHex(color),
//     })) || [],
//     sizes: product.sizes || [],
//     outOfStock: [],
//     description: product.description,
//     material: "Premium Fabric",
//     shipping: "Free shipping available",
//     stock: product.stock || 99,
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');
//         .font-display { font-family:'Cormorant Garamond',serif; }
//         * { font-family:'DM Sans',sans-serif; }
//         @keyframes animate-in { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }
//         .animate-in { animation: animate-in 0.2s ease; }
//         .scrollbar-hide::-webkit-scrollbar { display: none; }
//         .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
//         .text-maroon { color: #800000; }
//         .text-maroon-light { color: #9D2A2A; }
//         .text-maroon-dark { color: #5C0000; }
//         .bg-maroon { background-color: #800000; }
//         .bg-maroon-dark { background-color: #5C0000; }
//         .border-maroon { border-color: #800000; }
//         .hover\\:text-maroon:hover { color: #800000; }
//         .hover\\:text-maroon-dark:hover { color: #5C0000; }
//         .hover\\:bg-maroon:hover { background-color: #800000; }
//         .focus\\:border-maroon:focus { border-color: #800000; }
//         .focus\\:ring-maroon:focus { --tw-ring-color: #800000; }
//         .fill-maroon { fill: #800000; }
//       `}</style>

//       <Navbar />
      
//       <div className="min-h-screen pb-20 sm:pb-0" style={{ backgroundColor: '#F8F4F0' }}>
//         {/* Breadcrumb */}
//         <div className="hidden sm:block max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
//           <nav className="flex items-center gap-1.5 flex-wrap">
//             <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-gray-400">Home</span>
//             <ChevronRight className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-gray-300" />
//             <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-gray-400">Products</span>
//             <ChevronRight className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-gray-300" />
//             <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-black truncate max-w-[200px]">
//               {product.name}
//             </span>
//           </nav>
//         </div>

//         {/* Product Layout */}
//         <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
//           <div className="flex flex-col lg:grid lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] gap-6 lg:gap-10 xl:gap-16">
//             {/* Product Images */}
//             <div className="w-full">
//               <ProductImageGallery images={galleryImages} />
//             </div>

//             {/* Product Info */}
//             <div className="w-full lg:sticky lg:top-6 lg:self-start">
//               {isCheckingWishlist || isCheckingCart ? (
//                 <div className="flex justify-center items-center py-20">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-maroon"></div>
//                 </div>
//               ) : (
//                 <ProductInfo 
//                   product={productInfo} 
//                   onToast={handleToast}
//                   initialWishlistStatus={wishlistStatus}
//                   onWishlistToggle={handleWishlistToggle}
//                   isInCart={isInCart}
//                   onCartStatusChange={handleCartStatusChange}
//                 />
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Mobile Sticky Bar */}
//         {stickyBar && !isCheckingWishlist && !isCheckingCart && (
//           <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 sm:hidden z-50 shadow-lg animate-in">
//             <div className="space-y-2">
//               <div className="flex gap-2">
//                 <select
//                   value={selectedSizeForMobile}
//                   onChange={(e) => setSelectedSizeForMobile(e.target.value)}
//                   className="flex-1 p-2 border border-gray-200 rounded-lg text-sm bg-white"
//                 >
//                   <option value="">Select Size</option>
//                   {product.sizes?.map((size) => (
//                     <option key={size} value={size}>{size}</option>
//                   ))}
//                 </select>
                
//                 <div className="flex items-center gap-1 bg-gray-50 rounded-lg px-2 border border-gray-200">
//                   <button
//                     onClick={() => mobileQuantity > 1 && setMobileQuantity(mobileQuantity - 1)}
//                     className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg"
//                   >
//                     <Minus className="w-3 h-3" />
//                   </button>
//                   <span className="w-10 text-center text-sm font-medium">{mobileQuantity}</span>
//                   <button
//                     onClick={() => mobileQuantity < maxMobileStock && setMobileQuantity(mobileQuantity + 1)}
//                     className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg"
//                   >
//                     <Plus className="w-3 h-3" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleMobileToggleWishlist}
//                   disabled={isMobileWishlistLoading}
//                   className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center flex-shrink-0 transition-all
//                     ${isMobileWishlistLoading ? "opacity-50 cursor-wait" : "active:scale-95"}
//                     ${mobileWishlist
//                       ? "border-maroon bg-maroon/5 text-maroon"
//                       : "border-gray-200 text-gray-400 hover:border-gray-400"}`}
//                 >
//                   <Heart className={`w-5 h-5 ${mobileWishlist ? "fill-maroon" : ""}`} />
//                 </button>
                
//                 {mobileIsInCart ? (
//                   <>
//                     <button
//                       onClick={handleMobileGoToCart}
//                       className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold text-xs
//                         tracking-wider uppercase rounded-xl transition-all py-3 active:scale-95"
//                     >
//                       <ShoppingCart className="w-4 h-4 inline mr-1" /> Go to Cart
//                     </button>
//                     <button
//                       onClick={handleMobileBuyNow}
//                       className="flex-1 border-2 border-black text-black font-bold text-xs
//                         tracking-wider uppercase rounded-xl transition-all py-3 active:scale-95 bg-white"
//                     >
//                       Buy Now
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button
//                       onClick={handleMobileAddToCart}
//                       disabled={isMobileAddingToCart}
//                       className="flex-1 bg-black hover:bg-maroon text-white font-bold text-xs
//                         tracking-wider uppercase rounded-xl transition-all py-3 active:scale-95
//                         disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {isMobileAddingToCart ? (
//                         <><svg className="animate-spin w-4 h-4 inline mr-1" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
//                         </svg> Adding...</>
//                       ) : (
//                         <>Add to Cart ({mobileQuantity})</>
//                       )}
//                     </button>
//                     <button
//                       onClick={handleMobileBuyNow}
//                       className="flex-1 border-2 border-black text-black font-bold text-xs
//                         tracking-wider uppercase rounded-xl transition-all py-3 active:scale-95 bg-white"
//                     >
//                       Buy Now
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Toast Notifications */}
//         {toast && (
//           <Toast
//             message={toast.message}
//             type={toast.type}
//             onClose={() => setToast(null)}
//           />
//         )}
//       </div>
//     </>
//   );
// }

// // Helper function to convert color names to hex values
// function getColorHex(colorName: string): string {
//   const colorMap: Record<string, string> = {
//     'black': '#111111',
//     'white': '#FFFFFF',
//     'red': '#FF0000',
//     'blue': '#0000FF',
//     'green': '#00FF00',
//     'yellow': '#FFFF00',
//     'purple': '#800080',
//     'orange': '#FFA500',
//     'brown': '#A52A2A',
//     'pink': '#FFC0CB',
//     'gray': '#808080',
//     'grey': '#808080',
//     'navy': '#000080',
//     'beige': '#F5F5DC',
//     'camel': '#C19A6B',
//     'olive': '#6B7C45',
//     'maroon': '#800000',
//     'teal': '#008080',
//     'lavender': '#E6E6FA',
//     'coral': '#FF7F50',
//     'peach': '#FFE5B4',
//     'mint': '#98FB98',
//     'gold': '#FFD700',
//     'silver': '#C0C0C0',
//     'bronze': '#CD7F32',
//   };
  
//   return colorMap[colorName.toLowerCase()] || '#CCCCCC';
// }


"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import { 
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp, ZoomIn, 
  Heart, Eye, Star, Ruler, Zap, ShoppingCart, Image as ImageIcon, Minus, Plus, CheckCircle
} from "lucide-react";
import { getProductById } from "@/api/product";
import { getWishlist, toggleWishlist } from "@/api/wishlist"
import { addToCart, getCart } from "@/api/cart";
import { createOrderApi } from "@/api/order";
import Navbar from "@/components/Common/Navbar";

// TYPES
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  sizes?: string[];
  colors?: string[];
  rating?: number;
  reviewCount?: number;
  stock?: number;
}

interface GalleryImage {
  src: string;
  alt: string;
}

interface ProductData {
  _id: string;
  badge: string;
  viewCount: number;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  colors: { name: string; hex: string }[];
  sizes: string[];
  outOfStock?: string[];
  description: string;
  material: string;
  shipping: string;
  stock?: number;
}

interface Recommendation {
  name: string;
  price: number;
  img: string;
}

// Toast Notification Component
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-20 left-4 right-4 sm:left-auto sm:right-4 sm:bottom-4 z-50 animate-in`}>
      <div className={`px-4 py-3 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-maroon' : 'bg-maroon-dark'
      } text-white text-center text-sm font-medium`}>
        {message}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT: QuantitySelector
// ============================================================================

function QuantitySelector({ 
  quantity, 
  onQuantityChange, 
  maxStock = 99,
  disabled = false 
}: { 
  quantity: number; 
  onQuantityChange: (quantity: number) => void;
  maxStock?: number;
  disabled?: boolean;
}) {
  const increment = () => {
    if (quantity < maxStock && !disabled) {
      onQuantityChange(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1 && !disabled) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= maxStock && !disabled) {
      onQuantityChange(value);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={decrement}
        disabled={quantity <= 1 || disabled}
        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all
          ${quantity <= 1 || disabled
            ? "border-gray-200 text-gray-300 cursor-not-allowed"
            : "border-gray-300 text-gray-600 hover:border-maroon hover:text-maroon hover:bg-gray-50"
          }`}
        aria-label="Decrease quantity"
      >
        <Minus className="w-3 h-3" />
      </button>
      
      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        disabled={disabled}
        min="1"
        max={maxStock}
        className="w-14 h-8 text-center border border-gray-200 rounded-lg text-sm font-medium
          focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon
          disabled:bg-gray-50 disabled:text-gray-400"
      />
      
      <button
        onClick={increment}
        disabled={quantity >= maxStock || disabled}
        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all
          ${quantity >= maxStock || disabled
            ? "border-gray-200 text-gray-300 cursor-not-allowed"
            : "border-gray-300 text-gray-600 hover:border-maroon hover:text-maroon hover:bg-gray-50"
          }`}
        aria-label="Increase quantity"
      >
        <Plus className="w-3 h-3" />
      </button>
      
      {maxStock < 10 && (
        <span className="text-[10px] text-gray-400 ml-1">
          Only {maxStock} left
        </span>
      )}
    </div>
  );
}

// ============================================================================
// COMPONENT: ProductImageGallery (FIXED - with image size constraints)
// ============================================================================

function ProductImageGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const prev = () => setActive(i => (i - 1 + images.length) % images.length);
  const next = () => setActive(i => (i + 1) % images.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      next();
    }
    if (touchStart - touchEnd < -50) {
      prev();
    }
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  if (!images.length) {
    return (
      <div className="flex items-center justify-center bg-gray-100 rounded-xl sm:rounded-2xl" 
           style={{ aspectRatio: "3/4", minHeight: "280px", maxWidth: "600px", margin: "0 auto" }}>
        <div className="text-center text-gray-400">
          <ImageIcon className="w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-2" />
          <p className="text-xs sm:text-sm">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 sm:gap-4 max-w-[600px] mx-auto w-full">
      {/* Main image container with constraints */}
      <div 
        className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100 shadow-lg mx-auto"
        style={{ 
          aspectRatio: "3/4", 
          minHeight: "280px",
          maxWidth: "600px",
          width: "100%"
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {imageErrors[active] ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 text-center">
            <ImageIcon className="w-12 sm:w-16 h-12 sm:h-16 text-gray-400 mb-2 sm:mb-3" />
            <p className="text-gray-500 text-xs sm:text-sm font-medium">{images[active]?.alt || 'Product image'}</p>
            <p className="text-gray-400 text-[10px] sm:text-xs mt-1 sm:mt-2">Image failed to load</p>
          </div>
        ) : (
          <img
            src={images[active].src}
            alt={images[active].alt}
            className={`w-full h-full object-contain transition-all duration-500
              ${zoomed ? "scale-150 cursor-zoom-out" : "group-hover:scale-[1.02] cursor-zoom-in"}`}
            onClick={() => setZoomed(!zoomed)}
            onError={() => handleImageError(active)}
            style={{ maxWidth: "600px", maxHeight: "800px", margin: "0 auto" }}
          />
        )}

        {/* Zoom hint */}
        {!zoomed && !imageErrors[active] && (
          <div className="hidden sm:flex absolute top-3 sm:top-4 right-3 sm:right-4 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-white/80 backdrop-blur-sm
            flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-maroon" />
          </div>
        )}

        {/* Image alt text badge */}
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full max-w-[80%] truncate">
          {images[active]?.alt}
        </div>

        {/* Prev / Next arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-8 lg:w-9 h-8 lg:h-9 rounded-full
                bg-white/80 backdrop-blur-sm shadow-md items-center justify-center
                opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110"
            >
              <ChevronLeft className="w-3.5 lg:w-4 h-3.5 lg:h-4 text-maroon" />
            </button>
            <button
              onClick={next}
              className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-8 lg:w-9 h-8 lg:h-9 rounded-full
                bg-white/80 backdrop-blur-sm shadow-md items-center justify-center
                opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110"
            >
              <ChevronRight className="w-3.5 lg:w-4 h-3.5 lg:h-4 text-maroon" />
            </button>
          </>
        )}

        {/* Dot indicators */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 sm:hidden">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`transition-all duration-200 min-w-[20px] h-1.5
                ${i === active ? "w-5 bg-maroon" : "w-1.5 bg-gray-300"}`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>

        {/* Image counter */}
        <div className="absolute top-2 right-2 sm:hidden bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full">
          {active + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex flex-row gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide justify-center">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-200
                w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-gray-100
                ${i === active
                  ? "border-maroon shadow-md scale-[1.02]"
                  : "border-transparent hover:border-gray-300"}`}
            >
              {imageErrors[i] ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <ImageIcon className="w-4 sm:w-6 h-4 sm:h-6 text-gray-400" />
                </div>
              ) : (
                <img
                  src={img.src}
                  alt={`${img.alt} - view ${i + 1}`}
                  className="w-full h-full object-cover object-top"
                  onError={() => handleImageError(i)}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// COMPONENT: Accordion
// ============================================================================

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 sm:py-4 text-left group"
      >
        <span className="text-[10px] sm:text-[11px] font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase text-maroon group-hover:text-maroon-light transition-colors">
          {title}
        </span>
        {open
          ? <ChevronUp className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-gray-400 flex-shrink-0" />
          : <ChevronDown className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-gray-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="pb-3 sm:pb-4 text-gray-500 text-xs sm:text-sm leading-relaxed animate-in">
          {children}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// COMPONENT: ProductInfo
// ============================================================================

function ProductInfo({ 
  product, 
  onToast,
  initialWishlistStatus = false,
  onWishlistToggle,
  isInCart = false,
  onCartStatusChange
}: { 
  product: ProductData;
  onToast: (message: string, type: 'success' | 'error') => void;
  initialWishlistStatus?: boolean;
  onWishlistToggle?: (isWishlisted: boolean) => void;
  isInCart?: boolean;
  onCartStatusChange?: (isInCart: boolean) => void;
}) {
  const router = useRouter();
  const [selectedColor, setColor] = useState(product.colors[0]?.name || "");
  const [selectedSize, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWish] = useState(initialWishlistStatus);
  const [cartFlash, setCart] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(isInCart);
  const [sizeError, setSizeError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [maxStock, setMaxStock] = useState(product.stock || 99);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Sync with initialWishlistStatus when it changes
  useEffect(() => {
    setWish(initialWishlistStatus);
  }, [initialWishlistStatus]);

  // Sync with isInCart when it changes
  useEffect(() => {
    setIsAddedToCart(isInCart);
  }, [isInCart]);

  // Update max stock when size changes
  useEffect(() => {
    if (selectedSize && product.stock) {
      setMaxStock(product.stock);
    }
    setQuantity(1);
  }, [selectedSize, product.stock]);

  const handleToggleWishlist = async () => {
    if (isWishlistLoading) return;
    
    setIsWishlistLoading(true);
    try {
      const result = await toggleWishlist(product._id);
      
      if (result?.success) {
        const newWishlistStatus = !wishlisted;
        setWish(newWishlistStatus);
        onWishlistToggle?.(newWishlistStatus);
        onToast(
          newWishlistStatus ? "Added to wishlist" : "Removed from wishlist",
          "success"
        );
      } else {
        onToast(
          result?.message || "Failed to update wishlist",
          "error"
        );
      }
    } catch (error) {
      console.error("Wishlist toggle error:", error);
      onToast("Something went wrong", "error");
    } finally {
      setIsWishlistLoading(false);
    }
  };

const handleBuy = async () => {
  if (!selectedSize) { 
    setSizeError(true); 
    return; 
  }

  try {
    const res = await createOrderApi({
      productId: product._id,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });

    if (res?.success) {
      router.push(`/address?orderId=${res.orderId}`);
    } else {
      onToast(res?.message || "Failed to create order", "error");
    }

  } catch (error) {
    console.error(error);
    onToast("Something went wrong", "error");
  }
};

  const handleCart = async () => {
    if (!selectedSize) { 
      setSizeError(true); 
      return; 
    }
    setSizeError(false);

    if (quantity > maxStock) {
      setQuantityError(true);
      onToast(`Only ${maxStock} items available`, "error");
      return;
    }
    setQuantityError(false);

    setIsAddingToCart(true);
    try {
      const res = await addToCart({
        productId: product._id,
        quantity,
        size: selectedSize,
        color: selectedColor,
      });

      if (res?.success) {
        setCart(true);
        setIsAddedToCart(true);
        onCartStatusChange?.(true);
        setTimeout(() => setCart(false), 1800);
        onToast(`${quantity} item${quantity > 1 ? 's' : ''} added to cart`, "success");
      } else {
        onToast(res?.message || "Failed to add to cart", "error");
      }
    } catch (error: any) {
      console.error("Add to cart error:", error);
      onToast(error?.response?.data?.message || "Something went wrong", "error");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleGoToCart = () => {
    router.push('/cart');
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="flex flex-col gap-0">
      {/* Top badges */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 flex-wrap mb-4 sm:mb-5">
        <span className="bg-maroon text-white text-[8px] sm:text-[9px] font-black tracking-[0.15em] sm:tracking-[0.18em] uppercase px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
          {product.badge}
        </span>
        <div className="flex items-center gap-1 sm:gap-1.5 text-gray-400">
          <Eye className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
          <span className="text-[10px] sm:text-[11px] font-medium">
            Recently viewed by {product.viewCount}+ people
          </span>
        </div>
      </div>

      {/* Title */}
      <h1 className="font-display font-bold text-black text-2xl sm:text-3xl lg:text-4xl leading-tight mb-3 sm:mb-5">
        {product.name}
      </h1>

      {/* Price + Stars */}
      <div className="flex flex-col xs:flex-row xs:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="font-black text-black text-2xl sm:text-3xl">
            ${totalPrice.toFixed(2)}
          </span>
          {quantity > 1 && (
            <span className="text-sm text-gray-400">
              (${product.price.toFixed(2)} each)
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-maroon text-maroon"
                    : i < product.rating
                    ? "fill-maroon-light text-maroon-light"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
          <a href="#reviews" className="text-xs sm:text-sm font-bold text-maroon hover:underline">
            {product.reviewCount} Reviews
          </a>
        </div>
      </div>

      {/* Color selector */}
      {product.colors.length > 0 && (
        <div className="mb-4 sm:mb-6">
          <p className="text-[10px] sm:text-[11px] font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase text-black mb-2 sm:mb-3">
            Color: <span className="text-maroon font-black">{selectedColor.toUpperCase()}</span>
          </p>
          <div className="flex gap-2 sm:gap-2.5 flex-wrap">
            {product.colors.map(c => (
              <button
                key={c.name}
                onClick={() => setColor(c.name)}
                title={c.name}
                className={`w-8 sm:w-9 h-8 sm:h-9 rounded-full border-2 transition-all duration-200
                  ${selectedColor === c.name
                    ? "border-maroon scale-110 shadow-md"
                    : "border-gray-200 hover:border-gray-500 hover:scale-105"}`}
                style={{ backgroundColor: c.hex }}
                aria-label={`Select ${c.name} color`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size selector */}
      {product.sizes.length > 0 && (
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <p className="text-[10px] sm:text-[11px] font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase text-black">
              Select Size
            </p>
            <button className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-maroon hover:text-maroon-dark transition-colors">
              <Ruler className="w-3 h-3" /> Size Guide
            </button>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-2">
            {product.sizes.map(s => {
              const oos = product.outOfStock?.includes(s);
              const active = selectedSize === s;
              return (
                <button
                  key={s}
                  onClick={() => { if (!oos) { setSize(s); setSizeError(false); } }}
                  disabled={oos}
                  className={`py-2 sm:py-2.5 text-[10px] sm:text-xs font-bold rounded-lg sm:rounded-xl border transition-all duration-200
                    ${oos
                      ? "border-gray-100 text-gray-300 line-through cursor-not-allowed bg-gray-50"
                      : active
                      ? "border-maroon bg-maroon/5 text-maroon shadow-sm"
                      : "border-gray-200 text-gray-600 hover:border-maroon hover:text-maroon"}`}
                >
                  {s}
                </button>
              );
            })}
          </div>
          {sizeError && (
            <p className="mt-2 text-[10px] sm:text-xs font-semibold text-maroon">
              Please select a size before continuing
            </p>
          )}
        </div>
      )}

      {/* Quantity Selector */}
      <div className="mb-4 sm:mb-6">
        <p className="text-[10px] sm:text-[11px] font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase text-black mb-2 sm:mb-3">
          Quantity
        </p>
        <QuantitySelector 
          quantity={quantity}
          onQuantityChange={setQuantity}
          maxStock={maxStock}
          disabled={!selectedSize}
        />
        {quantityError && (
          <p className="mt-2 text-[10px] sm:text-xs font-semibold text-maroon">
            Selected quantity exceeds available stock
          </p>
        )}
      </div>

      {/* CTAs - Show different buttons based on cart status */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-6">
        {isAddedToCart ? (
          <>
            <button
              onClick={handleGoToCart}
              className="w-full sm:flex-1 bg-green-600 hover:bg-green-700 text-white font-black text-xs sm:text-sm
                tracking-[0.15em] sm:tracking-[0.18em] uppercase py-4 sm:py-4 rounded-xl sm:rounded-2xl transition-all shadow-md
                hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 min-h-[48px]"
            >
              <ShoppingCart className="w-4 sm:w-4 h-4 sm:h-4" /> Go to Cart
            </button>
            
            <button
              onClick={handleBuy}
              className="w-full sm:flex-1 bg-black hover:bg-maroon text-white font-black text-xs sm:text-sm
                tracking-[0.15em] sm:tracking-[0.18em] uppercase py-4 sm:py-4 rounded-xl sm:rounded-2xl transition-all shadow-md
                hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Zap className="w-4 sm:w-4 h-4 sm:h-4" /> Buy It Now
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleCart}
              disabled={isAddingToCart}
              className="w-full sm:flex-1 bg-black hover:bg-maroon text-white font-black text-xs sm:text-sm
                tracking-[0.15em] sm:tracking-[0.18em] uppercase py-4 sm:py-4 rounded-xl sm:rounded-2xl transition-all shadow-md
                hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 min-h-[48px]
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAddingToCart ? (
                <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg> Adding...</>
              ) : (
                <><ShoppingCart className="w-4 sm:w-4 h-4 sm:h-4" /> Add to Cart</>
              )}
            </button>

            <button
              onClick={handleBuy}
              className="w-full sm:flex-1 border-2 border-black text-black font-black text-xs sm:text-sm
                tracking-[0.15em] sm:tracking-[0.18em] uppercase py-4 sm:py-3.5 rounded-xl sm:rounded-2xl transition-all
                hover:bg-gray-50 active:scale-[0.98] flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Zap className="w-4 sm:w-4 h-4 sm:h-4" /> Buy It Now
            </button>
          </>
        )}
        
        <button
          onClick={handleToggleWishlist}
          disabled={isWishlistLoading}
          className={`w-full sm:w-14 h-12 sm:h-14 rounded-xl sm:rounded-2xl border-2 flex items-center justify-center flex-shrink-0
            transition-all duration-200 hover:scale-105 active:scale-95 min-h-[48px]
            ${isWishlistLoading ? "opacity-50 cursor-wait" : ""}
            ${wishlisted
              ? "border-maroon bg-maroon/5 text-maroon"
              : "border-gray-200 text-gray-400 hover:border-gray-400"}`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-5 sm:w-5 h-5 sm:h-5 ${wishlisted ? "fill-maroon" : ""}`} />
        </button>
      </div>

      {/* Accordions */}
      <div className="border-t border-gray-100">
        <Accordion title="Product Description">
          <p>{product.description}</p>
        </Accordion>
        <Accordion title="Material & Care">
          <p>{product.material}</p>
        </Accordion>
        <Accordion title="Shipping & Returns">
          <p>{product.shipping}</p>
        </Accordion>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT: ProductDetailPage
// ============================================================================

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [stickyBar, setStickyBar] = useState(false);
  const [mobileWishlist, setMobileWishlist] = useState(false);
  const [isMobileWishlistLoading, setIsMobileWishlistLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [selectedSizeForMobile, setSelectedSizeForMobile] = useState("");
  const [selectedColorForMobile, setSelectedColorForMobile] = useState("");
  const [mobileQuantity, setMobileQuantity] = useState(1);
  const [maxMobileStock, setMaxMobileStock] = useState(99);
  const [wishlistStatus, setWishlistStatus] = useState(false);
  const [isCheckingWishlist, setIsCheckingWishlist] = useState(true);
  const [isInCart, setIsInCart] = useState(false);
  const [isCheckingCart, setIsCheckingCart] = useState(true);
  const [isMobileAddingToCart, setIsMobileAddingToCart] = useState(false);
  const [mobileIsInCart, setMobileIsInCart] = useState(false);

  // Check if product is in cart
  const checkIfInCart = async (productId: string) => {
    try {
      const cartData = await getCart();
      if (cartData && Array.isArray(cartData)) {
        const exists = cartData.some((item: any) => {
          const itemProductId = item.productId?._id || item.productId || item._id;
          return itemProductId === productId;
        });
        setIsInCart(exists);
        setMobileIsInCart(exists);
      }
    } catch (error) {
      console.error("Error checking cart:", error);
    } finally {
      setIsCheckingCart(false);
    }
  };

  // Fetch Product and check wishlist & cart status
  useEffect(() => {
    const fetchProductAndCheckStatus = async () => {
      if (!id || typeof id !== "string") return;

      try {
        setLoading(true);
        setIsCheckingWishlist(true);
        setIsCheckingCart(true);
        
        const productData = await getProductById(id as string);

        if (!productData) {
          setLoading(false);
          setIsCheckingWishlist(false);
          setIsCheckingCart(false);
          return;
        }

        setProduct(productData);
        setMaxMobileStock(productData.stock ?? 99);

        // Check wishlist status
        try {
          const wishlistData = await getWishlist();
          
          if (wishlistData?.success && wishlistData?.wishlist) {
            let isInWishlist = false;
            
            if (Array.isArray(wishlistData.wishlist)) {
              isInWishlist = wishlistData.wishlist.some((item: any) => {
                const productId = item.productId || item.product?._id || item._id;
                return productId === productData._id;
              });
            } else if (wishlistData.wishlist.items && Array.isArray(wishlistData.wishlist.items)) {
              isInWishlist = wishlistData.wishlist.items.some((item: any) => {
                const productId = item.productId || item.product?._id || item._id;
                return productId === productData._id;
              });
            }
            
            setWishlistStatus(isInWishlist);
            setMobileWishlist(isInWishlist);
          } else {
            setWishlistStatus(false);
            setMobileWishlist(false);
          }
        } catch (wishlistError) {
          console.error("Error checking wishlist status:", wishlistError);
          setWishlistStatus(false);
          setMobileWishlist(false);
        }

        // Check cart status
        await checkIfInCart(productData._id);

      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
        setIsCheckingWishlist(false);
      }
    };

    fetchProductAndCheckStatus();
  }, [id]);

  // Sticky bar on scroll (mobile only)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setStickyBar(true);
      } else {
        setStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const handleWishlistToggle = (newStatus: boolean) => {
    setWishlistStatus(newStatus);
    setMobileWishlist(newStatus);
  };

  const handleCartStatusChange = (inCart: boolean) => {
    setIsInCart(inCart);
    setMobileIsInCart(inCart);
  };

  const handleMobileToggleWishlist = async () => {
    if (isMobileWishlistLoading || !product) return;
    
    setIsMobileWishlistLoading(true);
    try {
      const result = await toggleWishlist(product._id);
      if (result?.success) {
        const newStatus = !mobileWishlist;
        setMobileWishlist(newStatus);
        setWishlistStatus(newStatus);
        handleToast(
          newStatus ? "Added to wishlist" : "Removed from wishlist",
          "success"
        );
      } else {
        handleToast(
          result?.message || "Failed to update wishlist",
          "error"
        );
      }
    } catch (error) {
      console.error("Mobile wishlist toggle error:", error);
      handleToast("Something went wrong", "error");
    } finally {
      setIsMobileWishlistLoading(false);
    }
  };

  const handleMobileAddToCart = async () => {
    if (!selectedSizeForMobile) {
      handleToast("Please select a size", "error");
      return;
    }

    if (mobileQuantity > maxMobileStock) {
      handleToast(`Only ${maxMobileStock} items available`, "error");
      return;
    }

    setIsMobileAddingToCart(true);
    try {
      const res = await addToCart({
        productId: product!._id,
        quantity: mobileQuantity,
        size: selectedSizeForMobile,
        color: selectedColorForMobile,
      });

      if (res?.success) {
        setIsInCart(true);
        setMobileIsInCart(true);
        handleToast(`${mobileQuantity} item added to cart`, "success");
      } else {
        handleToast(res?.message || "Failed to add", "error");
      }
    } catch (error: any) {
      console.error(error);
      handleToast(error?.response?.data?.message || "Error adding to cart", "error");
    } finally {
      setIsMobileAddingToCart(false);
    }
  };

  const handleMobileGoToCart = () => {
    router.push('/cart');
  };

  const handleMobileBuyNow = async () => {
  if (!selectedSizeForMobile) {
    handleToast("Please select a size", "error");
    return;
  }

  if (mobileQuantity > maxMobileStock) {
    handleToast(`Only ${maxMobileStock} items available`, "error");
    return;
  }

  try {
    const res = await createOrderApi({
      productId: product!._id,
      quantity: mobileQuantity,
      size: selectedSizeForMobile,
      color: selectedColorForMobile,
    });

    if (res?.success) {
      router.push(`/address?orderId=${res.orderId}`);
    } else {
      handleToast(res?.message || "Failed to create order", "error");
    }
  } catch (error) {
    console.error(error);
    handleToast("Something went wrong", "error");
  }
};

  // Loading State
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F8F4F0' }}>
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-maroon rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500 text-sm sm:text-lg">Loading product...</p>
          </div>
        </div>
      </>
    );
  }

  // Product Not Found
  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F8F4F0' }}>
          <p className="text-maroon text-sm sm:text-lg">Product not found</p>
        </div>
      </>
    );
  }

  // Fallback images
  const FALLBACK_IMAGES = [
    "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=85",
    "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=85",
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=85",
    "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=85",
  ];

  // Convert images for gallery
  const galleryImages: GalleryImage[] = product.images?.length 
    ? product.images.map((img) => ({
        src: img,
        alt: product.name,
      }))
    : FALLBACK_IMAGES.map((img) => ({
        src: img,
        alt: product.name,
      }));

  // Format data for ProductInfo component
  const productInfo: ProductData = {
    _id: product._id,
    badge: "New Collection",
    viewCount: 20,
    name: product.name,
    price: product.price,
    rating: product.rating || 4.5,
    reviewCount: product.reviewCount || 0,
    colors: product.colors?.map((color) => ({
      name: color,
      hex: getColorHex(color),
    })) || [],
    sizes: product.sizes || [],
    outOfStock: [],
    description: product.description,
    material: "Premium Fabric",
    shipping: "Free shipping available",
    stock: product.stock || 99,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');
        .font-display { font-family:'Cormorant Garamond',serif; }
        * { font-family:'DM Sans',sans-serif; }
        @keyframes animate-in { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }
        .animate-in { animation: animate-in 0.2s ease; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        .text-maroon { color: #800000; }
        .text-maroon-light { color: #9D2A2A; }
        .text-maroon-dark { color: #5C0000; }
        .bg-maroon { background-color: #800000; }
        .bg-maroon-dark { background-color: #5C0000; }
        .border-maroon { border-color: #800000; }
        .hover\\:text-maroon:hover { color: #800000; }
        .hover\\:text-maroon-dark:hover { color: #5C0000; }
        .hover\\:bg-maroon:hover { background-color: #800000; }
        .focus\\:border-maroon:focus { border-color: #800000; }
        .focus\\:ring-maroon:focus { --tw-ring-color: #800000; }
        .fill-maroon { fill: #800000; }
      `}</style>

      <Navbar />
      
      <div className="min-h-screen pb-20 sm:pb-0" style={{ backgroundColor: '#F8F4F0' }}>
        {/* Breadcrumb */}
        <div className="hidden sm:block max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <nav className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-gray-400">Home</span>
            <ChevronRight className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-gray-300" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-gray-400">Products</span>
            <ChevronRight className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-gray-300" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-black truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>

        {/* Product Layout */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] gap-6 lg:gap-10 xl:gap-16">
            {/* Product Images */}
            <div className="w-full">
              <ProductImageGallery images={galleryImages} />
            </div>

            {/* Product Info */}
            <div className="w-full lg:sticky lg:top-6 lg:self-start">
              {isCheckingWishlist || isCheckingCart ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-maroon"></div>
                </div>
              ) : (
                <ProductInfo 
                  product={productInfo} 
                  onToast={handleToast}
                  initialWishlistStatus={wishlistStatus}
                  onWishlistToggle={handleWishlistToggle}
                  isInCart={isInCart}
                  onCartStatusChange={handleCartStatusChange}
                />
              )}
            </div>
          </div>
        </div>

        {/* Mobile Sticky Bar */}
        {stickyBar && !isCheckingWishlist && !isCheckingCart && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 sm:hidden z-50 shadow-lg animate-in">
            <div className="space-y-2">
              <div className="flex gap-2">
                <select
                  value={selectedSizeForMobile}
                  onChange={(e) => setSelectedSizeForMobile(e.target.value)}
                  className="flex-1 p-2 border border-gray-200 rounded-lg text-sm bg-white"
                >
                  <option value="">Select Size</option>
                  {product.sizes?.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                
                <div className="flex items-center gap-1 bg-gray-50 rounded-lg px-2 border border-gray-200">
                  <button
                    onClick={() => mobileQuantity > 1 && setMobileQuantity(mobileQuantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-10 text-center text-sm font-medium">{mobileQuantity}</span>
                  <button
                    onClick={() => mobileQuantity < maxMobileStock && setMobileQuantity(mobileQuantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={handleMobileToggleWishlist}
                  disabled={isMobileWishlistLoading}
                  className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center flex-shrink-0 transition-all
                    ${isMobileWishlistLoading ? "opacity-50 cursor-wait" : "active:scale-95"}
                    ${mobileWishlist
                      ? "border-maroon bg-maroon/5 text-maroon"
                      : "border-gray-200 text-gray-400 hover:border-gray-400"}`}
                >
                  <Heart className={`w-5 h-5 ${mobileWishlist ? "fill-maroon" : ""}`} />
                </button>
                
                {mobileIsInCart ? (
                  <>
                    <button
                      onClick={handleMobileGoToCart}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold text-xs
                        tracking-wider uppercase rounded-xl transition-all py-3 active:scale-95"
                    >
                      <ShoppingCart className="w-4 h-4 inline mr-1" /> Go to Cart
                    </button>
                    <button
                      onClick={handleMobileBuyNow}
                      className="flex-1 border-2 border-black text-black font-bold text-xs
                        tracking-wider uppercase rounded-xl transition-all py-3 active:scale-95 bg-white"
                    >
                      Buy Now
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleMobileAddToCart}
                      disabled={isMobileAddingToCart}
                      className="flex-1 bg-black hover:bg-maroon text-white font-bold text-xs
                        tracking-wider uppercase rounded-xl transition-all py-3 active:scale-95
                        disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isMobileAddingToCart ? (
                        <><svg className="animate-spin w-4 h-4 inline mr-1" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg> Adding...</>
                      ) : (
                        <>Add to Cart ({mobileQuantity})</>
                      )}
                    </button>
                    <button
                      onClick={handleMobileBuyNow}
                      className="flex-1 border-2 border-black text-black font-bold text-xs
                        tracking-wider uppercase rounded-xl transition-all py-3 active:scale-95 bg-white"
                    >
                      Buy Now
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Toast Notifications */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </>
  );
}

// Helper function to convert color names to hex values
function getColorHex(colorName: string): string {
  const colorMap: Record<string, string> = {
    'black': '#111111',
    'white': '#FFFFFF',
    'red': '#FF0000',
    'blue': '#0000FF',
    'green': '#00FF00',
    'yellow': '#FFFF00',
    'purple': '#800080',
    'orange': '#FFA500',
    'brown': '#A52A2A',
    'pink': '#FFC0CB',
    'gray': '#808080',
    'grey': '#808080',
    'navy': '#000080',
    'beige': '#F5F5DC',
    'camel': '#C19A6B',
    'olive': '#6B7C45',
    'maroon': '#800000',
    'teal': '#008080',
    'lavender': '#E6E6FA',
    'coral': '#FF7F50',
    'peach': '#FFE5B4',
    'mint': '#98FB98',
    'gold': '#FFD700',
    'silver': '#C0C0C0',
    'bronze': '#CD7F32',
  };
  
  return colorMap[colorName.toLowerCase()] || '#CCCCCC';
}
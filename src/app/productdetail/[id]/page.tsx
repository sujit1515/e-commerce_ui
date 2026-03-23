"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { 
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp, ZoomIn, 
  Heart, Eye, Star, Ruler, Zap, ShoppingCart, Image as ImageIcon
} from "lucide-react";

import { getProductById } from "@/api/product";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";

// ============================================================================
// TYPES
// ============================================================================

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
}

interface Recommendation {
  name: string;
  price: number;
  img: string;
}

// ============================================================================
// COMPONENT: ProductImageGallery (Mobile Optimized)
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
      // Swipe left
      next();
    }
    if (touchStart - touchEnd < -50) {
      // Swipe right
      prev();
    }
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  if (!images.length) {
    return (
      <div className="flex items-center justify-center bg-gray-100 rounded-xl sm:rounded-2xl" style={{ aspectRatio: "3/4", minHeight: "280px" }}>
        <div className="text-center text-gray-400">
          <ImageIcon className="w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-2" />
          <p className="text-xs sm:text-sm">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 sm:gap-4">
      {/* Main image - Mobile optimized with touch swipe */}
      <div 
        className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100 group"
        style={{ aspectRatio: "3/4", minHeight: "280px" }}
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
            className={`w-full h-full object-cover object-top transition-all duration-500
              ${zoomed ? "scale-150 cursor-zoom-out" : "group-hover:scale-[1.02] cursor-zoom-in"}`}
            onClick={() => setZoomed(!zoomed)}
            onError={() => handleImageError(active)}
          />
        )}

        {/* Zoom hint - hidden on mobile */}
        {!zoomed && !imageErrors[active] && (
          <div className="hidden sm:flex absolute top-3 sm:top-4 right-3 sm:right-4 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-white/80 backdrop-blur-sm
            flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#0f172a]" />
          </div>
        )}

        {/* Image alt text badge */}
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full max-w-[80%] truncate">
          {images[active]?.alt}
        </div>

        {/* Prev / Next arrows - hidden on mobile, visible on desktop */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-8 lg:w-9 h-8 lg:h-9 rounded-full
                bg-white/80 backdrop-blur-sm shadow-md items-center justify-center
                opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110"
            >
              <ChevronLeft className="w-3.5 lg:w-4 h-3.5 lg:h-4 text-[#0f172a]" />
            </button>
            <button
              onClick={next}
              className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-8 lg:w-9 h-8 lg:h-9 rounded-full
                bg-white/80 backdrop-blur-sm shadow-md items-center justify-center
                opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110"
            >
              <ChevronRight className="w-3.5 lg:w-4 h-3.5 lg:h-4 text-[#0f172a]" />
            </button>
          </>
        )}

        {/* Dot indicators — mobile only with touch targets */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 sm:hidden">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`transition-all duration-200 min-w-[20px] h-1.5
                ${i === active ? "w-5 bg-[#0f172a]" : "w-1.5 bg-gray-300"}`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>

        {/* Image counter - mobile only */}
        <div className="absolute top-2 right-2 sm:hidden bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full">
          {active + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail strip - horizontal scroll on mobile, vertical on desktop */}
      {images.length > 1 && (
        <div className="flex flex-row gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-200
                w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-gray-100
                ${i === active
                  ? "border-[#0f172a] shadow-md scale-[1.02]"
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
// COMPONENT: Accordion (Mobile Optimized)
// ============================================================================

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 sm:py-4 text-left group"
      >
        <span className="text-[10px] sm:text-[11px] font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#0f172a] group-hover:text-red-600 transition-colors">
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
// COMPONENT: ProductInfo (Mobile Optimized)
// ============================================================================

function ProductInfo({ product }: { product: ProductData }) {
  const router = useRouter();
  const [selectedColor, setColor] = useState(product.colors[0]?.name || "");
  const [selectedSize, setSize] = useState("");
  const [wishlisted, setWish] = useState(false);
  const [cartFlash, setCart] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const handleBuy = () => {
    if (!selectedSize) { 
      setSizeError(true); 
      return; 
    }
    setSizeError(false);
    
    const queryParams = new URLSearchParams({
      productId: product._id,
      size: selectedSize,
      color: selectedColor,
      price: product.price.toString()
    }).toString();
    
    router.push(`/payment?${queryParams}`);
  };

  const handleCart = () => {
    if (!selectedSize) { 
      setSizeError(true); 
      return; 
    }
    setSizeError(false);
    setCart(true);
    setTimeout(() => setCart(false), 1800);
  };

  return (
    <div className="flex flex-col gap-0">
      {/* Top badges row - stacked on mobile */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 flex-wrap mb-4 sm:mb-5">
        <span className="bg-red-600 text-white text-[8px] sm:text-[9px] font-black tracking-[0.15em] sm:tracking-[0.18em] uppercase px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
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
      <h1 className="font-display font-bold text-[#0f172a] text-2xl sm:text-3xl lg:text-4xl leading-tight mb-3 sm:mb-5">
        {product.name}
      </h1>

      {/* Price + Stars - stacked on mobile */}
      <div className="flex flex-col xs:flex-row xs:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-100">
        <span className="font-black text-[#0f172a] text-2xl sm:text-3xl">
          ${product.price.toFixed(2)}
        </span>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-red-500 text-red-500"
                    : i < product.rating
                    ? "fill-red-300 text-red-300"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
          <a href="#reviews" className="text-xs sm:text-sm font-bold text-red-500 hover:underline">
            {product.reviewCount} Reviews
          </a>
        </div>
      </div>

      {/* Color selector */}
      {product.colors.length > 0 && (
        <div className="mb-4 sm:mb-6">
          <p className="text-[10px] sm:text-[11px] font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#0f172a] mb-2 sm:mb-3">
            Color: <span className="text-red-600 font-black">{selectedColor.toUpperCase()}</span>
          </p>
          <div className="flex gap-2 sm:gap-2.5 flex-wrap">
            {product.colors.map(c => (
              <button
                key={c.name}
                onClick={() => setColor(c.name)}
                title={c.name}
                className={`w-8 sm:w-9 h-8 sm:h-9 rounded-full border-2 transition-all duration-200
                  ${selectedColor === c.name
                    ? "border-[#0f172a] scale-110 shadow-md"
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
            <p className="text-[10px] sm:text-[11px] font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#0f172a]">
              Select Size
            </p>
            <button className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-red-500 hover:text-red-700 transition-colors">
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
                      ? "border-red-500 bg-red-50 text-red-600 shadow-sm"
                      : "border-gray-200 text-gray-600 hover:border-gray-800 hover:text-[#0f172a]"}`}
                >
                  {s}
                </button>
              );
            })}
          </div>
          {sizeError && (
            <p className="mt-2 text-[10px] sm:text-xs font-semibold text-red-500">
              Please select a size before continuing
            </p>
          )}
        </div>
      )}

      {/* CTAs - stack on mobile, row on tablet/desktop */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-6">
        <button
          onClick={handleBuy}
          className="w-full sm:flex-1 bg-[#0f172a] hover:bg-red-600 text-white font-black text-xs sm:text-sm
            tracking-[0.15em] sm:tracking-[0.18em] uppercase py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all shadow-md
            hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Zap className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> Buy It Now
        </button>

        <button
          onClick={handleCart}
          className="w-full sm:flex-1 border-2 border-[#0f172a] text-[#0f172a] font-black text-xs sm:text-sm
            tracking-[0.15em] sm:tracking-[0.18em] uppercase py-3 sm:py-3.5 rounded-xl sm:rounded-2xl transition-all
            hover:bg-gray-50 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          {cartFlash ? "Added ✓" : "Add to Cart"}
        </button>
        
        <button
          onClick={() => setWish(!wishlisted)}
          className={`w-full sm:w-14 h-12 sm:h-14 rounded-xl sm:rounded-2xl border-2 flex items-center justify-center flex-shrink-0
            transition-all duration-200 hover:scale-105 active:scale-95
            ${wishlisted
              ? "border-red-500 bg-red-50 text-red-500"
              : "border-gray-200 text-gray-400 hover:border-gray-400"}`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 sm:w-5 h-4 sm:h-5 ${wishlisted ? "fill-red-500" : ""}`} />
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
// COMPONENT: RecommendCard (Mobile Optimized)
// ============================================================================

function RecommendCard({ item, delay }: { item: Recommendation; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [added, setAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      ref={ref}
      className={`group flex flex-col transition-all duration-500 cursor-pointer
        ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: vis ? `${delay}ms` : "0ms" }}
    >
      <div
        className="relative rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden bg-gray-100 mb-2 sm:mb-3 lg:mb-4 hover:-translate-y-1 transition-transform duration-300"
        style={{ aspectRatio: "3/4" }}
      >
        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-2 sm:p-4">
            <ImageIcon className="w-6 sm:w-8 h-6 sm:h-8 text-gray-400 mb-1 sm:mb-2" />
            <p className="text-gray-500 text-[8px] sm:text-xs text-center">{item.name}</p>
          </div>
        ) : (
          <img
            src={item.img}
            alt={item.name}
            className="w-full h-full object-cover object-top
              group-hover:scale-[1.04] transition-transform duration-700 ease-out"
            onError={() => setImageError(true)}
          />
        )}
        
        {/* Product name badge - hidden on mobile, show on hover desktop */}
        <div className="hidden sm:block absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white text-[8px] lg:text-[10px] px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          {item.name}
        </div>

        {/* Quick add button - always visible on mobile with touch target, hover on desktop */}
        <div className="absolute bottom-0 inset-x-0 p-2 sm:p-3
          sm:translate-y-full sm:group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button
            onClick={handleAdd}
            className="w-full bg-[#0f172a] sm:bg-[#0f172a]/90 backdrop-blur-sm text-white text-[9px] sm:text-[10px]
              font-bold tracking-widest uppercase py-2 sm:py-2.5 rounded-lg sm:rounded-xl
              flex items-center justify-center gap-1 sm:gap-2 hover:bg-red-600 transition-colors"
          >
            <ShoppingCart className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
            <span className="xs:inline">{added ? "Added ✓" : "Add"}</span>
          </button>
        </div>
      </div>
      <h3 className="font-bold text-[#0f172a] text-xs sm:text-sm leading-snug mb-1 line-clamp-2">{item.name}</h3>
      <p className="font-black text-[#0f172a] text-xs sm:text-sm lg:text-base">${item.price.toLocaleString()}.00</p>
    </div>
  );
}

// ============================================================================
// COMPONENT: StyleRecommendations (Mobile Optimized)
// ============================================================================

function StyleRecommendations({ recommendations }: { recommendations: Recommendation[] }) {
  const headRef = useRef<HTMLDivElement>(null);
  const [headVis, setHeadVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeadVis(true); },
      { threshold: 0.15 }
    );
    if (headRef.current) obs.observe(headRef.current);
    return () => obs.disconnect();
  }, []);

  if (!recommendations.length) return null;

  return (
    <section className="bg-[#f8f9fb] py-12 sm:py-16 lg:py-20 mt-12 sm:mt-16 lg:mt-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headRef}
          className={`text-center mb-8 sm:mb-10 lg:mb-12 transition-all duration-700
            ${headVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <h2 className="font-display font-bold text-[#0f172a] text-2xl sm:text-3xl lg:text-4xl mb-2">
            Style Recommendations
          </h2>
          <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-gray-400">
            Complete Your Look
          </p>
        </div>
        
        {/* Responsive grid - 2 on mobile, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {recommendations.map((item, i) => (
            <RecommendCard key={i} item={item} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN COMPONENT: ProductDetailPage (Responsive)
// ============================================================================

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [stickyBar, setStickyBar] = useState(false);
  const [mobileWishlist, setMobileWishlist] = useState(false);

  // 🔹 Fetch Product
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const data = await getProductById(id as string);
        console.log('Fetched product:', data);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 🔹 Sticky bar on scroll (mobile only)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setStickyBar(true);
      } else {
        setStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🔹 Loading State
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-[#0f172a] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500 text-sm sm:text-lg">Loading product...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // 🔹 Product Not Found
  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-500 text-sm sm:text-lg">Product not found</p>
        </div>
        <Footer />
      </>
    );
  }

  // 🔹 Fallback images
  const FALLBACK_IMAGES = [
    "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=85",
    "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=85",
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=85",
    "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=85",
  ];

  // 🔹 Convert images for gallery
  const galleryImages: GalleryImage[] = product.images?.length 
    ? product.images.map((img) => ({
        src: img,
        alt: product.name,
      }))
    : FALLBACK_IMAGES.map((img) => ({
        src: img,
        alt: product.name,
      }));

  // 🔹 Format data for ProductInfo component
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
  };

  // 🔹 Mock recommendations
  const recommendations: Recommendation[] = [
    { name: "Cashmere Turtleneck", price: 295, img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=85" },
    { name: "Raw Edge Denim", price: 185, img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=85" },
    { name: "Chelsea Leather Boots", price: 450, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=85" },
    { name: "Heritage Gold Watch", price: 1250, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=85" },
  ];

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
      `}</style>

      <Navbar />
      
      <div className="min-h-screen bg-white">
        {/* Breadcrumb - hidden on mobile */}
        <div className="hidden sm:block max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <nav className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-gray-400">Home</span>
            <ChevronRight className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-gray-300" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-gray-400">Products</span>
            <ChevronRight className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-gray-300" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-[#0f172a] truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>

        {/* Product Layout - Stack on mobile, 2 columns on desktop */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] gap-6 lg:gap-10 xl:gap-16">
            {/* Product Images */}
            <div className="w-full">
              <ProductImageGallery images={galleryImages} />
            </div>

            {/* Product Info */}
            <div className="w-full lg:sticky lg:top-6 lg:self-start">
              <ProductInfo product={productInfo} />
            </div>
          </div>
        </div>

        {/* Style Recommendations */}
        <StyleRecommendations recommendations={recommendations} />

        {/* Mobile Sticky Bottom Bar - Buy Now / Add to Cart */}
        {stickyBar && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 sm:hidden z-50 animate-in">
            <div className="flex gap-2">
              <button
                onClick={() => setMobileWishlist(!mobileWishlist)}
                className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center flex-shrink-0
                  ${mobileWishlist
                    ? "border-red-500 bg-red-50 text-red-500"
                    : "border-gray-200 text-gray-400"}`}
              >
                <Heart className={`w-5 h-5 ${mobileWishlist ? "fill-red-500" : ""}`} />
              </button>
              <button
                className="flex-1 bg-[#0f172a] hover:bg-red-600 text-white font-black text-xs
                  tracking-widest uppercase rounded-xl transition-all"
              >
                Add to Cart
              </button>
              <button
                className="flex-1 border-2 border-[#0f172a] text-[#0f172a] font-black text-xs
                  tracking-widest uppercase rounded-xl transition-all"
              >
                Buy Now
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
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
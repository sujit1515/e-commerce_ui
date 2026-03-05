"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const slides = [
  {
    id: 1,
    badge: "New Collection 2026",
    title: "Elevate Your",
    titleAccent: "Everyday Style",
    subtitle:
      "Experience the perfect blend of sophisticated design and premium quality with our new seasonal curation.",
    cta: "Shop Now",
    ctaSecondary: "View Lookbook",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=85",
    imgAlt: "Luxury Watch",
    accent: "#3b82f6",
    tag: "Watches",
  },
  {
    id: 2,
    badge: "Autumn Equinox",
    title: "Timeless Pieces",
    titleAccent: "Crafted For You",
    subtitle:
      "Celebrating the transition of light and shadow with natural textures, earthy tones, and premium materials.",
    cta: "Explore Collection",
    ctaSecondary: "View Lookbook",
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&q=85",
    imgAlt: "Luxury Bag",
    accent: "#f59e0b",
    tag: "Accessories",
  },
  {
    id: 3,
    badge: "Premium Apparel",
    title: "Wear The",
    titleAccent: "Extraordinary",
    subtitle:
      "Crafted from sustainable fabrics with an obsessive eye for detail. Clothing that moves with you and lasts a lifetime.",
    cta: "Shop Apparel",
    ctaSecondary: "View Lookbook",
    img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=900&q=85",
    imgAlt: "Premium Apparel",
    accent: "#10b981",
    tag: "Apparel",
  },
];

type Slide = {
  id: number;
  badge: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  cta: string;
  ctaSecondary: string;
  img: string;
  imgAlt: string;
  accent: string;
  tag: string;
};

export default function HeroSection() {
  const [current, setCurrent] = useState<number>(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
 const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef(null);
  const DELAY = 3000;
const goTo = (index: number, dir: "next" | "prev" = "next") => {
  if (animating || index === current) return;

  setDirection(dir);
  setPrev(current);
  setAnimating(true);
  setCurrent(index);
  setProgress(0);

  setTimeout(() => {
    setPrev(null);
    setAnimating(false);
  }, 700);
};

  const goNext = () => goTo((current + 1) % slides.length, "next");
  const goPrev = () => goTo((current - 1 + slides.length) % slides.length, "prev");

  // Auto-advance - FIXED VERSION
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Only set new timer if not paused and not animating
    if (!isPaused && !animating) {
      timerRef.current = setTimeout(goNext, DELAY);
    }

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [current, isPaused, animating, goNext]); // Added all dependencies

  // Progress bar
  // useEffect(() => {
  //   // Clear any existing progress interval
  //   if (progressRef.current) {
  //     clearInterval(progressRef.current);
  //   }

  //   setProgress(0);
    
  //   // Only run progress if not paused
  //   if (!isPaused && !animating) {
  //     const start = Date.now();
  //     progressRef.current = setInterval(() => {
  //       const elapsed = Date.now() - start;
  //       setProgress(Math.min((elapsed / DELAY) * 100, 100));
  //     }, 16);
  //   }

  //   return () => {
  //     if (progressRef.current) {
  //       clearInterval(progressRef.current);
  //     }
  //   };
  // }, [current, isPaused, animating, DELAY]); // Added all dependencies

  const slide = slides[current];
  const prevSlide = prev !== null ? slides[prev] : null;

  // Pause auto-advance on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <section 
      className="relative w-full overflow-hidden bg-[#f8f9fb]" 
      style={{ minHeight: "min(90vh, 640px)" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >

      {/* ── SLIDES ── */}
      <div className="relative w-full h-full" style={{ minHeight: "min(90vh, 640px)" }}>

        {/* Previous slide (exit) */}
        {prevSlide && (
          <div
            key={`prev-${prev}`}
            className="absolute inset-0 w-full h-full"
            style={{
              animation: `slideExit${direction === "next" ? "Left" : "Right"} 0.7s cubic-bezier(0.77,0,0.18,1) forwards`,
              zIndex: 1,
            }}
          >
            <SlideContent slide={prevSlide} active={false} />
          </div>
        )}

        {/* Current slide (enter) */}
        <div
          key={`curr-${current}`}
          className="absolute inset-0 w-full h-full"
          style={{
            animation: animating
              ? `slideEnter${direction === "next" ? "Right" : "Left"} 0.7s cubic-bezier(0.77,0,0.18,1) forwards`
              : "none",
            zIndex: 2,
          }}
        >
          <SlideContent slide={slide} active={true} animating={animating} />
        </div>
      </div>

      {/* ── PROGRESS BAR ── */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/10 z-20">
        <div
          className="h-full transition-none"
          style={{
            width: `${progress}%`,
            backgroundColor: slide.accent,
            transition: "width 0.05s linear",
          }}
        />
      </div> */}

      {/* ── PREV / NEXT ARROWS ── */}
      <button
        onClick={goPrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 backdrop-blur-sm border border-white/60 shadow-lg flex items-center justify-center text-gray-700 hover:bg-white hover:scale-110 transition-all duration-200"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 backdrop-blur-sm border border-white/60 shadow-lg flex items-center justify-center text-gray-700 hover:bg-white hover:scale-110 transition-all duration-200"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* ── DOT INDICATORS ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? "next" : "prev")}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? "28px" : "8px",
              height: "8px",
              backgroundColor: i === current ? slide.accent : "#d1d5db",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── SLIDE NUMBER ── */}
      {/* <div className="absolute top-6 right-16 md:right-24 z-20 hidden sm:flex items-center gap-2 text-xs font-semibold text-gray-400 tracking-widest">
        <span style={{ color: slide.accent }}>{String(current + 1).padStart(2, "0")}</span>
        <span>/</span>
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div> */}

      <style>{`
        @keyframes slideEnterRight {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        @keyframes slideEnterLeft {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
        @keyframes slideExitLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-100%); }
        }
        @keyframes slideExitRight {
          from { transform: translateX(0); }
          to   { transform: translateX(100%); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(1.08); }
          to   { opacity: 1; transform: scale(1); }
        }
        .anim-badge  { animation: fadeUp 0.5s ease 0.1s both; }
        .anim-title  { animation: fadeUp 0.5s ease 0.22s both; }
        .anim-sub    { animation: fadeUp 0.5s ease 0.34s both; }
        .anim-ctas   { animation: fadeUp 0.5s ease 0.46s both; }
        .anim-img    { animation: scaleIn 0.7s ease 0s both; }
        .anim-tag    { animation: fadeIn 0.5s ease 0.6s both; }
      `}</style>
    </section>
  );
}

function SlideContent({slide, active, animating = false,}: {slide: Slide; active: boolean; animating?: boolean;})  
 {
  const key = active ? slide.id : `s${slide.id}`;
  return (
    <div className="w-full h-full flex items-stretch bg-[#f8f9fb]" style={{ minHeight: "min(90vh, 640px)" }}>
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-0 py-10 md:py-0">

        {/* ── TEXT SIDE ── */}
        <div className="w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1 pt-6 md:pt-0 pb-16 md:pb-0 md:pr-10 lg:pr-16">
          {/* Badge */}
          <div
            key={`badge-${key}`}
            className={`inline-flex items-center gap-2 mb-4 self-start ${active && !animating ? "anim-badge" : ""}`}
          >
            <span
              className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
              style={{ backgroundColor: `${slide.accent}18`, color: slide.accent }}
            >
              ✦ {slide.badge}
            </span>
          </div>

          {/* Title */}
          <div key={`title-${key}`} className={active && !animating ? "anim-title" : ""}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] text-[#0f172a] mb-1">
              {slide.title}
            </h1>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] mb-5"
              style={{ color: slide.accent }}
            >
              {slide.titleAccent}
            </h1>
          </div>

          {/* Subtitle */}
          <p
            key={`sub-${key}`}
            className={`text-gray-500 text-sm sm:text-base leading-relaxed max-w-md mb-8 ${active && !animating ? "anim-sub" : ""}`}
          >
            {slide.subtitle}
          </p>

          {/* CTAs */}
          <div
            key={`ctas-${key}`}
            className={`flex flex-wrap gap-3 ${active && !animating ? "anim-ctas" : ""}`}
          >
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white shadow-lg hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200"
              style={{ backgroundColor: slide.accent, boxShadow: `0 8px 24px ${slide.accent}40` }}
            >
              {slide.cta} <ArrowRight className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-gray-700 border border-gray-200 bg-white hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm">
              {slide.ctaSecondary}
            </button>
          </div>
        </div>

        {/* ── IMAGE SIDE ── */}
        <div className="w-full md:w-1/2 flex items-center justify-center order-1 md:order-2 relative">
          {/* Background blob */}
          <div
            className="absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: slide.accent }}
          />
          {/* Image card */}
          <div
            key={`img-${key}`}
            className={`relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl w-full max-w-[320px] sm:max-w-[400px] md:max-w-none md:w-[90%] ${active && !animating ? "anim-img" : ""}`}
            style={{ aspectRatio: "4/3" }}
          >
            <img
              src={slide.img}
              alt={slide.imgAlt}
              className="w-full h-full object-cover"
            />
            {/* Overlay tag */}
            <div
              key={`tag-${key}`}
              className={`absolute top-4 left-4 ${active && !animating ? "anim-tag" : ""}`}
            >
              <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm text-gray-700">
                {slide.tag}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
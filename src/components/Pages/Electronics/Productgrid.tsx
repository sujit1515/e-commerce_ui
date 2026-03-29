"use client";

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import type { Easing } from "framer-motion";

// ── Products data — Add actual image dimensions ────────────────────────────
const FEATURED = {
  series: "Series 02",
  name: "Computing Slate",
  bg: "#1a1a1a",
  image: "/Images/electronics/laptop.png",
  width: 800,
  height: 600,
};

const SOUND = {
  series: "Series 01",
  name: "Sound Cylinder V3",
  price: "$899",
  bg: "#1a1a1a",
  image: "/Images/electronics/jbl.png",
  width: 400,
  height: 400,
};

const VISION = {
  name: "Vision Pad",
  bg: "#1a1a1a",
  image: "/Images/electronics/iphone.png",
  width: 400,
  height: 400,
};

const CHRONO = {
  name: "Chrono Core",
  bg: "#1a1a1a",
  image: "/images/electronics/smart-watch.png",
  width: 400,
  height: 400,
};

// ── Shared animation ───────────────────────────────────────────────────────
const ease: Easing = [0.22, 1, 0.36, 1];
const cardAnim = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease, delay },
});

// ── Image component with fixed container ────────────────────────────────
interface ProductImageProps {
  src?: string;
  alt?: string;
  bg?: string;
  width?: number;
  height?: number;
  className?: string;
}

function ProductImage({
  src,
  alt,
  bg,
  width,
  height,
  className = "",
}: ProductImageProps) {
  const [imageError, setImageError] = React.useState(false);

  if (!src || imageError) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ background: bg }}
      >
        <span className="text-xs font-medium uppercase tracking-widest opacity-25 text-white">
          {alt || "Product Image"}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ background: bg }}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
        onError={() => setImageError(true)}
        loading="lazy"
      />
    </div>
  );
}

export default function ProductGrid() {
  return (
    <>
      <Head>
        <title>Products — Electronics</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=yes" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>

      <section
        className="w-full px-4 py-8 sm:px-6 md:px-8 lg:px-12 xl:px-20"
        style={{ 
          fontFamily: "'Barlow', sans-serif",
          backgroundColor: "#0D0D0D",
        }}
      >
        {/* ── Section header ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-start sm:justify-between"
        >
          <h2
            className="text-white"
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: "clamp(1.2rem, 4vw, 2.2rem)",
              fontWeight: 400,
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
            }}
          >
            <span className="block sm:hidden">Objects of pure intent</span>
            <span className="hidden sm:block">
              Objects of pure intent and
              <br />
              uncompromising quality.
            </span>
          </h2>

          <motion.button
            whileHover={{ letterSpacing: "0.28em", color: "#ef4444" }}
            transition={{ duration: 0.3 }}
            className="self-start border-b border-gray-600 pb-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-300 hover:border-red-500 hover:text-red-500 sm:self-auto"
          >
            View All Archive
          </motion.button>
        </motion.div>

        {/* ── Grid with responsive breakpoints ────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          
          {/* CARD 1 — Computing Slate */}
          <motion.div
            {...cardAnim(0)}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-xl sm:rounded-2xl lg:col-span-2"
            style={{
              background: FEATURED.bg,
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div className="relative w-full" style={{ paddingBottom: "75% sm:56.25%" }}>
              <div className="absolute inset-0">
                <ProductImage
                  src={FEATURED.image}
                  alt={FEATURED.name}
                  bg={FEATURED.bg}
                  width={FEATURED.width}
                  height={FEATURED.height}
                  className="h-full w-full"
                />
              </div>
            </div>

            <div className="absolute left-3 top-3 sm:left-5 sm:top-5 z-10">
              <p className="text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] text-red-500">
                {FEATURED.series}
              </p>
              <p
                className="mt-0.5 sm:mt-1 text-sm sm:text-lg font-light text-white"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                {FEATURED.name}
              </p>
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 ring-1 ring-inset ring-white/10 transition-opacity duration-300 group-hover:opacity-100" />
          </motion.div>

          {/* CARD 2 — Sound Cylinder */}
          <motion.div
            {...cardAnim(0.12)}
            className="flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-gray-800"
            style={{ backgroundColor: "#0a0a0a" }}
          >
            <div className="relative w-full" style={{ paddingBottom: "75%" }}>
              <div className="absolute inset-0">
                <ProductImage
                  src={SOUND.image}
                  alt={SOUND.name}
                  bg={SOUND.bg}
                  width={SOUND.width}
                  height={SOUND.height}
                  className="h-full w-full"
                />
              </div>
              <div className="absolute left-3 top-3 sm:left-5 sm:top-5 z-10">
                <p className="text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] text-red-500">
                  {SOUND.series}
                </p>
                <p className="mt-0.5 text-xs sm:text-base font-light text-white">
                  {SOUND.name}
                </p>
              </div>
            </div>

            <div className="p-3 sm:p-4">
              <motion.button
                whileHover={{ background: "#ef4444", color: "#ffffff" }}
                transition={{ duration: 0.25 }}
                className="w-full rounded-lg border border-gray-700 bg-transparent px-3 py-2.5 sm:px-5 sm:py-3.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-gray-300 hover:border-red-500"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Add to Cart — {SOUND.price}
              </motion.button>
            </div>
          </motion.div>

          {/* CARD 3 — Vision Pad */}
          <motion.div
            {...cardAnim(0.18)}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-gray-800"
            style={{ background: VISION.bg }}
          >
            <div className="relative w-full" style={{ paddingBottom: "100%" }}>
              <div className="absolute inset-0">
                <ProductImage
                  src={VISION.image}
                  alt={VISION.name}
                  bg={VISION.bg}
                  width={VISION.width}
                  height={VISION.height}
                  className="h-full w-full"
                />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 z-10">
              <p className="text-xs sm:text-sm font-medium text-white">{VISION.name}</p>
            </div>
          </motion.div>

          {/* CARD 4 — Black Series promo */}
          <motion.div
            {...cardAnim(0.26)}
            whileHover={{ y: -4 }}
            className="group flex flex-col items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-900 to-black px-4 sm:px-8 text-center border border-gray-800"
            style={{ minHeight: "clamp(260px, 40vw, 320px)" }}
          >
            <p
              className="mb-2 sm:mb-3 text-[9px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-gray-400"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              Exclusive Matte Finish
            </p>
            <h3
              className="mb-6 sm:mb-8 text-white"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(1.2rem, 5vw, 2.2rem)",
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              THE BLACK
              <br />
              SERIES
            </h3>
            <motion.button
              whileHover={{ letterSpacing: "0.32em", color: "#ef4444" }}
              transition={{ duration: 0.3 }}
              className="border-b border-red-600 pb-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.24em] text-white hover:text-red-500"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              Discover
            </motion.button>
          </motion.div>

          {/* CARD 5 — Chrono Core */}
          <motion.div
            {...cardAnim(0.34)}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-gray-800"
            style={{ background: CHRONO.bg }}
          >
            <div className="relative w-full" style={{ paddingBottom: "100%" }}>
              <div className="absolute inset-0">
                <ProductImage
                  src={CHRONO.image}
                  alt={CHRONO.name}
                  bg={CHRONO.bg}
                  width={CHRONO.width}
                  height={CHRONO.height}
                  className="h-full w-full"
                />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 z-10">
              <p className="text-xs sm:text-sm font-medium text-white">{CHRONO.name}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 640px) {
          .grid {
            gap: 0.75rem;
          }
        }
        
        @media (min-width: 641px) and (max-width: 768px) {
          .grid {
            gap: 1rem;
          }
        }
        
        /* Touch-friendly tap targets for mobile */
        @media (max-width: 768px) {
          button, 
          [role="button"],
          .cursor-pointer {
            min-height: 44px;
          }
          
          button:active {
            transform: scale(0.98);
            transition: transform 0.1s ease;
          }
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Prevent text selection on buttons */
        button {
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Improve image rendering on mobile */
        @media (max-width: 768px) {
          img {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
          }
        }
        
        /* Landscape mode adjustments */
        @media (max-width: 768px) and (orientation: landscape) {
          section {
            padding-top: 1rem;
            padding-bottom: 1rem;
          }
        }
        
        /* High-resolution displays */
        @media (min-width: 1920px) {
          section {
            max-width: 1600px;
            margin: 0 auto;
          }
        }
      `}</style>
    </>
  );
}
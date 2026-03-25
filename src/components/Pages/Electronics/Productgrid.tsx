"use client";

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import Image from "next/image"; // Use Next.js Image component for better optimization
import type { Easing } from "framer-motion";

// ── Products data — Add actual image dimensions ────────────────────────────
const FEATURED = {
  series: "Series 02",
  name: "Computing Slate",
  bg: "#F5F5F5", // Light gray
  image: "/Images/electronics/laptop.png",
  width: 800, 
  height: 600, 
};

const SOUND = {
  series: "Series 01",
  name: "Sound Cylinder V3",
  price: "$899",
  bg: "#F8F8F8", // Light gray
  image: "/Images/electronics/jbl.png",
  width: 400,
  height: 400,
};

const VISION = {
  name: "Vision Pad",
  bg: "#F5F5F5", // Light gray
  image: "/Images/electronics/iphone.png",
  width: 400,
  height: 400,
};

const CHRONO = {
  name: "Chrono Core",
  bg: "#F0F0F0", // Light gray
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
        <span className="text-xs font-medium uppercase tracking-widest opacity-25">
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>

      <section
        className="w-full bg-white px-4 py-14 sm:px-8 md:px-12 xl:px-20"
        style={{ fontFamily: "'Barlow', sans-serif" }}
      >
        {/* ── Section header ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
        >
          <h2
            className="max-w-sm text-black"
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: "clamp(1.55rem, 3vw, 2.2rem)",
              fontWeight: 400,
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
            }}
          >
            Objects of pure intent and
            <br />
            uncompromising quality.
          </h2>

          <motion.button
            whileHover={{ letterSpacing: "0.28em", color: "#ef4444" }}
            transition={{ duration: 0.3 }}
            className="self-start border-b border-black pb-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-black hover:border-red-600 sm:self-auto"
          >
            View All Archive
          </motion.button>
        </motion.div>

        {/* ── Grid ────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {/* ── ROW 1 ─────────────────────────────────────────────────── */}

          {/* CARD 1 — Computing Slate (large, spans 2 cols on lg) */}
          <motion.div
            {...cardAnim(0)}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl lg:col-span-2"
            style={{
              background: FEATURED.bg,
            }}
          >
            {/* Fixed height container */}
            <div className="relative w-full" style={{ paddingBottom: "56.25%" /* 16:9 aspect ratio */ }}>
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

            {/* Label overlay - positioned absolute relative to card */}
            <div className="absolute left-5 top-5 z-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-red-600">
                {FEATURED.series}
              </p>
              <p
                className="mt-1 text-lg font-light text-black"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                {FEATURED.name}
              </p>
            </div>

            {/* hover shimmer */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-black/10 transition-opacity duration-300 group-hover:opacity-100" />
          </motion.div>

          {/* CARD 2 — Sound Cylinder (right column, row 1) */}
          <motion.div
            {...cardAnim(0.12)}
            className="flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-200"
          >
            {/* Fixed height image container */}
            <div className="relative w-full" style={{ paddingBottom: "75%" /* 4:3 aspect ratio */ }}>
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
              {/* Series tag - positioned absolute within image container */}
              <div className="absolute left-5 top-5 z-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-red-600">
                  {SOUND.series}
                </p>
                <p className="mt-0.5 text-base font-light text-black">{SOUND.name}</p>
              </div>
            </div>

            {/* Add to cart CTA - fixed height */}
            <div className="p-4">
              <motion.button
                whileHover={{ background: "#000000", color: "#ffffff" }}
                transition={{ duration: 0.25 }}
                className="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-black hover:border-black"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Add to Cart — {SOUND.price}
              </motion.button>
            </div>
          </motion.div>

          {/* ── ROW 2 ─────────────────────────────────────────────────── */}

          {/* CARD 3 — Vision Pad */}
          <motion.div
            {...cardAnim(0.18)}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl border border-gray-200"
            style={{ background: VISION.bg }}
          >
            <div className="relative w-full" style={{ paddingBottom: "100%" /* 1:1 square aspect ratio */ }}>
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
            <div className="absolute bottom-5 left-5 z-10">
              <p className="text-sm font-medium text-black">{VISION.name}</p>
            </div>
          </motion.div>

          {/* CARD 4 — Black Series promo (dark) */}
          <motion.div
            {...cardAnim(0.26)}
            whileHover={{ y: -4 }}
            className="group flex flex-col items-center justify-center rounded-2xl bg-black px-8 text-center"
            style={{ minHeight: 320 }}
          >
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-gray-400"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              Exclusive Matte Finish
            </p>
            <h3
              className="mb-8 text-white"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
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
              className="border-b border-red-600 pb-0.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white hover:text-red-500"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              Discover
            </motion.button>
          </motion.div>

          {/* CARD 5 — Chrono Core */}
          <motion.div
            {...cardAnim(0.34)}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl border border-gray-200"
            style={{ background: CHRONO.bg }}
          >
            <div className="relative w-full" style={{ paddingBottom: "100%" /* 1:1 square aspect ratio */ }}>
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
            <div className="absolute bottom-5 left-5 z-10">
              <p className="text-sm font-medium text-black">{CHRONO.name}</p>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}
"use client";

import React from "react";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";

// ── Animation helpers ──────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: 0.72, 
    ease: [0.22, 1, 0.36, 1] as const,
    delay 
  },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { 
    duration: 0.6, 
    ease: "easeOut" as const,
    delay 
  },
});

const slideRight = (delay = 0) => ({
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { 
    duration: 0.9, 
    ease: [0.22, 1, 0.36, 1] as const,
    delay 
  },
});

export default function HeroBanner() {
  return (
    <>
      <Head>
        <title>Pure. Form. Function. — Electronics</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Barlow Condensed for display headlines, Barlow for body */}
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Barlow:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* ── Root wrapper with dark background ────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ 
          minHeight: "100svh",
          backgroundColor: "#0D0D0D",
        }}
      >
        {/* subtle dot-grid background texture - adjusted for dark theme */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Subtle gradient overlay for depth */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* ── Two-column grid ─────────────────────────────────────────── */}
        <div
          className="relative z-10 mx-auto flex h-full min-h-screen w-full max-w-screen-2xl flex-col items-center lg:flex-row"
        >

          {/* ══ LEFT COLUMN ══════════════════════════════════════════════ */}
          <div className="flex w-full flex-col justify-center px-6 pb-10 pt-16 sm:px-10 md:px-14 lg:w-1/2 lg:py-24 xl:px-20">

            {/* Established tag - adjusted for dark theme */}
            <motion.p
              {...fadeIn(0.1)}
              className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-red-500"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              Established&nbsp;&nbsp;2024
            </motion.p>

            {/* Headline stack - updated colors for dark theme */}
            <div
              className="mb-6 leading-none"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              <motion.div {...fadeUp(0.2)}>
                <span
                  className="block font-bold text-white"
                  style={{ fontSize: "clamp(4rem, 11vw, 9.5rem)", letterSpacing: "-0.01em" }}
                >
                  PURE.
                </span>
              </motion.div>

              <motion.div {...fadeUp(0.32)}>
                <span
                  className="block font-bold text-white"
                  style={{ fontSize: "clamp(4rem, 11vw, 9.5rem)", letterSpacing: "-0.01em" }}
                >
                  FORM.
                </span>
              </motion.div>

              <motion.div {...fadeUp(0.44)}>
                <span
                  className="block font-extrabold italic text-red-500"
                  style={{
                    fontSize: "clamp(4rem, 11vw, 9.5rem)",
                    letterSpacing: "-0.01em",
                    fontStyle: "italic",
                  }}
                >
                  FUNCTION.
                </span>
              </motion.div>
            </div>

            {/* Body copy - adjusted for dark theme */}
            <motion.p
              {...fadeUp(0.56)}
              className="mb-10 max-w-sm text-gray-300"
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
                fontWeight: 300,
                lineHeight: 1.7,
              }}
            >
              Redefining the boundaries of consumer electronics
              <br className="hidden sm:block" />
              through radical minimalism and architectural
              <br className="hidden sm:block" />
              precision.
            </motion.p>

            {/* CTA buttons - adjusted for dark theme */}
            <motion.div
              {...fadeUp(0.68)}
              className="flex flex-wrap items-center gap-4"
            >
              {/* Primary */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="rounded-full bg-red-600 px-7 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white hover:bg-red-700"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Explore Series 01
              </motion.button>

              {/* Secondary - adjusted for dark theme */}
              <motion.button
                whileHover={{ scale: 1.03, background: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="rounded-full border border-gray-700 bg-transparent px-7 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white hover:border-red-500 hover:text-red-500"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                View Film
              </motion.button>
            </motion.div>
          </div>

          {/* ══ RIGHT COLUMN — Product card ══════════════════════════════ */}
          <motion.div
            {...slideRight(0.25)}
            className="relative flex w-full items-center justify-center px-6 pb-14 sm:px-10 lg:w-1/2 lg:py-10 lg:pr-10 xl:pr-16"
          >
            {/* Card - adjusted for dark theme */}
            <div
              className="relative w-full overflow-hidden rounded-[2rem]"
              style={{
                maxWidth: 580,
                aspectRatio: "4/5",
                boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)",
                background: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)",
              }}
            >
              {/* ── Product image ── */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <Image
                  src="/Images/electronics/head-phone.png"
                  alt="E-01 Silence Core Headphones"
                  fill
                  className="object-contain p-4"
                  priority
                  sizes="(max-width: 580px) 100vw, 580px"
                  onError={(e) => {
                    // Fallback if image doesn't load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = "absolute inset-0 flex items-center justify-center";
                      fallback.innerHTML = `
                        <svg class="h-3/5 w-3/5 opacity-20" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="100" cy="100" r="80" stroke="#ffffff" stroke-width="1" />
                          <circle cx="100" cy="100" r="55" stroke="#ffffff" stroke-width="1" />
                          <circle cx="100" cy="100" r="30" stroke="#ffffff" stroke-width="1" />
                          <rect x="85" y="40" width="30" height="120" rx="15" fill="#ffffff" opacity="0.18" />
                        </svg>
                        <p class="absolute text-center text-sm font-medium text-white opacity-30" style="font-family: 'Barlow', sans-serif; letter-spacing: 0.08em;">
                          HEADPHONE IMAGE
                        </p>
                      `;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>

              {/* Bottom label strip - adjusted for dark theme */}
              <div
                className="absolute bottom-0 left-0 right-0 p-6"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                }}
              >
                <p
                  className="mb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-red-500"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  New Release
                </p>
                <p
                  className="text-xl font-light text-white sm:text-2xl"
                  style={{ fontFamily: "'Barlow', sans-serif", letterSpacing: "0.01em" }}
                >
                  E-01 Silence Core
                </p>
              </div>

              {/* Corner accent dot - enhanced for dark theme */}
              <div
                className="absolute right-5 top-5 h-2.5 w-2.5 rounded-full bg-red-500"
                style={{ boxShadow: "0 0 12px #ef4444" }}
              />
              
              {/* Subtle border glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[2rem]"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
                }}
              />
            </div>

            {/* Floating stat badge — adjusted for dark theme */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-20 left-4 hidden rounded-2xl bg-black/80 px-5 py-4 shadow-xl backdrop-blur-sm sm:left-6 lg:flex lg:flex-col"
              style={{ 
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span
                className="text-[10px] font-semibold uppercase tracking-widest text-gray-400"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Series
              </span>
              <span
                className="mt-1 text-2xl font-bold text-white"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                01
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Decorative red accent line (bottom left) ─────────────── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 h-1 origin-left bg-red-500"
          style={{ width: "clamp(80px, 15vw, 200px)" }}
        />
        
        {/* Additional decorative elements for dark theme */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-red-500/5 blur-3xl"
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-red-500/5 blur-3xl"
        />
      </section>
    </>
  );
}
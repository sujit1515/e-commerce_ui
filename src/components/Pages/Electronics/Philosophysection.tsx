"use client";

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";

// ── Shared ease ───────────────────────────────────────────────────────────
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.75, ease, delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease, delay },
});

// ── Stacked card cluster (left side) ─────────────────────────────────────
function CardCluster() {
  return (
    <div className="relative flex h-[320px] w-full items-center justify-center sm:h-[420px] lg:h-[520px]">

      {/* Back card — light grey, tilted left */}
      <motion.div
        initial={{ opacity: 0, rotate: -6, y: 40 }}
        whileInView={{ opacity: 1, rotate: -6, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease, delay: 0.1 }}
        className="absolute left-0 top-4 sm:top-6 lg:top-8 rounded-xl sm:rounded-2xl bg-gray-800 shadow-md"
        style={{ width: "54%", aspectRatio: "3/4" }}
      >
        {/* Tiny "INSPIRA" label */}
        <p
          className="absolute left-3 sm:left-4 top-3 sm:top-5 text-[7px] sm:text-[9px] font-semibold uppercase tracking-[0.22em] text-gray-500"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          Inspira
        </p>
        {/* leaf SVG placeholder */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <svg viewBox="0 0 80 120" className="h-20 w-14 sm:h-28 sm:w-20" fill="none">
            <path
              d="M40 110 C40 110 5 70 5 40 C5 15 20 5 40 5 C60 5 75 15 75 40 C75 70 40 110 40 110Z"
              fill="#ffffff"
            />
            <line x1="40" y1="5" x2="40" y2="110" stroke="#fff" strokeWidth="1.2" />
            <line x1="20" y1="45" x2="40" y2="35" stroke="#fff" strokeWidth="0.8" />
            <line x1="22" y1="60" x2="40" y2="52" stroke="#fff" strokeWidth="0.8" />
            <line x1="60" y1="45" x2="40" y2="35" stroke="#fff" strokeWidth="0.8" />
            <line x1="58" y1="60" x2="40" y2="52" stroke="#fff" strokeWidth="0.8" />
          </svg>
        </div>
      </motion.div>

      {/* Middle card — black, slight tilt right */}
      <motion.div
        initial={{ opacity: 0, rotate: 3, y: 40 }}
        whileInView={{ opacity: 1, rotate: 3, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease, delay: 0.2 }}
        className="absolute right-2 sm:right-4 top-0 overflow-hidden rounded-xl sm:rounded-2xl bg-black shadow-xl"
        style={{ width: "50%", aspectRatio: "3/4" }}
      >
        {/* Abstract letter shapes */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-20 sm:opacity-30">
          <p
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-widest text-white"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            RATION
          </p>
          <p
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-widest text-white"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            2
          </p>
        </div>
        {/* Red glow circle */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-2xl"
          style={{ width: 80, height: 80, background: "#ef4444" }}
        />
        {/* Bottom text */}
        <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5">
          <p className="text-[7px] sm:text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-500"
             style={{ fontFamily: "'Barlow', sans-serif" }}>
            Silence Mode
          </p>
        </div>
      </motion.div>

      {/* Front floating quote card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, ease, delay: 0.38 }}
        whileHover={{ y: -6, boxShadow: "0 24px 60px rgba(0,0,0,0.3)" }}
        className="absolute bottom-4 left-4 sm:bottom-6 sm:left-8 z-10 rounded-xl sm:rounded-2xl bg-gray-900 px-4 py-3 sm:px-6 sm:py-5 shadow-2xl border border-gray-800"
        style={{
          width: "clamp(160px, 55%, 280px)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
        }}
      >
        <p
          className="mb-1 sm:mb-2 text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.22em] text-red-500"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          Our DNA
        </p>
        <p
          className="italic text-gray-200"
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: "clamp(0.7rem, 1.4vw, 0.95rem)",
            fontWeight: 300,
            lineHeight: 1.6,
          }}
        >
          "Everything that is not necessary is a burden to the soul."
        </p>
      </motion.div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────
export default function PhilosophySection() {
  return (
    <>
      <Head>
        <title>The Philosophy — ElectroSleek</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=yes" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;1,800&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>

      <section
        className="w-full px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-20"
        style={{ 
          fontFamily: "'Barlow', sans-serif",
          backgroundColor: "#0D0D0D",
        }}
      >
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">

          {/* ── LEFT — Card cluster ──────────────────────────────────── */}
          <motion.div
            {...fadeIn(0)}
            className="w-full"
          >
            <CardCluster />
          </motion.div>

          {/* ── RIGHT — Text content ─────────────────────────────────── */}
          <div className="flex flex-col">

            {/* Section label */}
            <motion.p
              {...fadeUp(0.1)}
              className="mb-3 sm:mb-5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.32em] text-gray-400"
            >
              The Philosophy
            </motion.p>

            {/* Headline */}
            <motion.div {...fadeUp(0.2)} className="mb-5 sm:mb-7 leading-none">
              <p
                className="font-bold text-white"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(1.8rem, 6vw, 5rem)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.05,
                }}
              >
                BEYOND THE
              </p>
              <p
                className="font-extrabold italic text-red-500"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(1.8rem, 6vw, 5rem)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.05,
                }}
              >
                DIGITAL NOISE.
              </p>
            </motion.div>

            {/* Body copy */}
            <motion.p
              {...fadeUp(0.3)}
              className="mb-8 sm:mb-10 text-gray-300"
              style={{
                fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
                fontWeight: 300,
                lineHeight: 1.7,
                maxWidth: 520,
              }}
            >
              At ElectroSleek, we believe that technology should be silent. It
              should exist in the background of your life, serving you through
              impeccable form and effortless utility. Our design language is
              rooted in the Bauhaus movement, updated for the post-digital age.
            </motion.p>

            {/* Pillars row */}
            <motion.div
              {...fadeUp(0.4)}
              className="mb-8 sm:mb-10 grid grid-cols-2 gap-4 border-t border-gray-800 pt-5 sm:pt-6"
            >
              {[
                { num: "01", label: "Honest Materials" },
                { num: "02", label: "Human Centric" },
              ].map(({ num, label }) => (
                <div key={num}>
                  <p
                    className="mb-1 text-2xl sm:text-3xl font-bold text-white"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.02em" }}
                  >
                    {num}
                  </p>
                  <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-400">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div {...fadeUp(0.5)}>
              <motion.button
                whileHover={{ letterSpacing: "0.28em", color: "#ef4444" }}
                transition={{ duration: 0.3 }}
                className="border-b-2 border-gray-600 pb-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-gray-300 hover:text-red-500 hover:border-red-500"
              >
                Read the Manifest
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 640px) {
          .rounded-2xl {
            border-radius: 0.75rem;
          }
        }
        
        /* Touch-friendly improvements */
        @media (max-width: 768px) {
          button, 
          [role="button"] {
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
      `}</style>
    </>
  );
}
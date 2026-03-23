"use client";

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";

// ── Shared ease ───────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1];

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
    <div className="relative flex h-[420px] w-full items-center justify-center sm:h-[480px] lg:h-[520px]">

      {/* Back card — light grey, tilted left */}
      <motion.div
        initial={{ opacity: 0, rotate: -6, y: 40 }}
        whileInView={{ opacity: 1, rotate: -6, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease, delay: 0.1 }}
        className="absolute left-0 top-8 rounded-2xl bg-gray-100 shadow-md"
        style={{ width: "54%", aspectRatio: "3/4" }}
      >
        {/* Tiny "INSPIRA" label */}
        <p
          className="absolute left-4 top-5 text-[9px] font-semibold uppercase tracking-[0.22em] text-gray-400"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          Inspira
        </p>
        {/* leaf SVG placeholder */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <svg viewBox="0 0 80 120" className="h-28 w-20" fill="none">
            <path
              d="M40 110 C40 110 5 70 5 40 C5 15 20 5 40 5 C60 5 75 15 75 40 C75 70 40 110 40 110Z"
              fill="#000000"
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
        className="absolute right-4 top-0 overflow-hidden rounded-2xl bg-black shadow-xl"
        style={{ width: "50%", aspectRatio: "3/4" }}
      >
        {/* Abstract letter shapes */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-30">
          <p
            className="text-4xl font-extrabold tracking-widest text-white"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            RATION
          </p>
          <p
            className="text-5xl font-extrabold tracking-widest text-white"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            2
          </p>
        </div>
        {/* Red glow circle */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-2xl"
          style={{ width: 120, height: 120, background: "#ef4444" }}
        />
        {/* Bottom text */}
        <div className="absolute bottom-5 left-5">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400"
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
        whileHover={{ y: -6, boxShadow: "0 24px 60px rgba(0,0,0,0.16)" }}
        className="absolute bottom-6 left-8 z-10 rounded-2xl bg-white px-6 py-5 shadow-2xl"
        style={{
          width: "clamp(200px, 55%, 280px)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.13)",
        }}
      >
        <p
          className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-red-600"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          Our DNA
        </p>
        <p
          className="italic text-black"
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: "clamp(0.82rem, 1.4vw, 0.95rem)",
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;1,800&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>

      <section
        className="w-full bg-white px-4 py-16 sm:px-8 md:px-12 xl:px-20"
        style={{ fontFamily: "'Barlow', sans-serif" }}
      >
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

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
              className="mb-5 text-[10px] font-semibold uppercase tracking-[0.32em] text-gray-500"
            >
              The Philosophy
            </motion.p>

            {/* Headline */}
            <motion.div {...fadeUp(0.2)} className="mb-7 leading-none">
              <p
                className="font-bold text-black"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(2.8rem, 6vw, 5rem)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.05,
                }}
              >
                BEYOND THE
              </p>
              <p
                className="font-extrabold italic text-red-600"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(2.8rem, 6vw, 5rem)",
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
              className="mb-10 text-gray-600"
              style={{
                fontSize: "clamp(0.88rem, 1.4vw, 1rem)",
                fontWeight: 300,
                lineHeight: 1.8,
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
              className="mb-10 grid grid-cols-2 gap-4 border-t border-gray-200 pt-6"
            >
              {[
                { num: "01", label: "Honest Materials" },
                { num: "02", label: "Human Centric" },
              ].map(({ num, label }) => (
                <div key={num}>
                  <p
                    className="mb-1 text-3xl font-bold text-black"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.02em" }}
                  >
                    {num}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-500">
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
                className="border-b-2 border-black pb-1 text-[11px] font-bold uppercase tracking-[0.22em] text-black"
              >
                Read the Manifest
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
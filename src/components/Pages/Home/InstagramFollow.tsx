"use client";

import React, { useEffect, useRef } from "react";
import Head from "next/head";

/* ── Instagram icon as inline SVG so no icon-lib dependency needed ── */
const InstagramIcon = ({ size = 28 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="6" ry="6" stroke="url(#igGrad)" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="4.5" stroke="url(#igGrad)" strokeWidth="1.8" />
    <circle cx="17.5" cy="6.5" r="1.1" fill="url(#igGrad)" />
    <defs>
      <linearGradient id="igGrad" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
  </svg>
);

/* ── Verified badge ── */
const VerifiedBadge = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Verified"
  >
    <circle cx="12" cy="12" r="11" fill="#3897f0" />
    <path
      d="M7 12.5l3.5 3.5 6.5-7"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function PareenitaInstagram() {
  const bgTextRef = useRef(null);

  /* subtle parallax on background text */
  useEffect(() => {
    const el = bgTextRef.current;
    if (!el) return;
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xOffset = ((clientX / window.innerWidth) - 0.5) * 18;
      const yOffset = ((clientY / window.innerHeight) - 0.5) * 8;
      el.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <Head>
        <title>Pareenita – Follow Us on Instagram</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Elegant serif + script via Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Dancing+Script:wght@600&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/*
        ── Wrapper ──────────────────────────────────────────────────────────
        White background, height only as tall as the content
      */}
      <section
        className="relative flex items-center justify-center overflow-hidden w-full bg-white py-16 sm:py-20"
      >
        {/* ── Ghost / watermark brand name ── */}
        <div
          ref={bgTextRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center transition-transform duration-75 ease-out"
          style={{ willChange: "transform" }}
        >
          <span
            className="select-none whitespace-nowrap font-[Cormorant_Garamond] font-bold uppercase tracking-widest"
            style={{
              fontSize: "clamp(5rem, 18vw, 16rem)",
              color: "transparent",
              WebkitTextStroke: "1px rgba(185,165,130,0.15)",
              letterSpacing: "0.06em",
              lineHeight: 1,
            }}
          >
            QUICK KART
          </span>
        </div>

        {/* ── Soft decorative circle blobs (very subtle on white) ── */}
        <div
          className="pointer-events-none absolute -top-32 -right-32 rounded-full opacity-5 blur-3xl"
          style={{ width: 480, height: 480, background: "#D4B896" }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-24 rounded-full opacity-5 blur-3xl"
          style={{ width: 360, height: 360, background: "#C9A87C" }}
        />

        {/* ── Foreground content ── */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
          {/* Thin top rule */}
          <div
            className="mb-6 h-px w-24 opacity-30"
            style={{ background: "linear-gradient(90deg, transparent, #8B6B52, transparent)" }}
          />

          {/* "Follow Us on Instagram" label */}
          <p
            className="mb-4 font-[Cormorant_Garamond] italic text-[#7A3A2A] opacity-80"
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
              fontWeight: 300,
              letterSpacing: "0.04em",
            }}
          >
            Follow Us on{" "}
            <span
              className="not-italic font-[Dancing_Script]"
              style={{
                fontWeight: 600,
                fontSize: "1.25em",
                color: "#5A2215",
              }}
            >
              Instagram
            </span>
          </p>

          {/* Handle pill */}
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full px-6 py-3 transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(185,155,120,0.2)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
            }}
            aria-label="Follow @pareenitabbsr on Instagram"
          >
            {/* Instagram icon */}
            <span className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <InstagramIcon size={26} />
            </span>

            {/* Handle text */}
            <span
              className="font-[Cormorant_Garamond] tracking-wide"
              style={{
                fontSize: "clamp(0.95rem, 2.2vw, 1.15rem)",
                fontWeight: 400,
                color: "#3D1F10",
                letterSpacing: "0.03em",
              }}
            >
              @sujit.pattnaik_
            </span>

            {/* Verified badge */}
            <span className="flex-shrink-0">
              <VerifiedBadge size={18} />
            </span>
          </a>

          {/* Thin bottom rule */}
          <div
            className="mt-6 h-px w-24 opacity-30"
            style={{ background: "linear-gradient(90deg, transparent, #8B6B52, transparent)" }}
          />
        </div>

        {/* ── Fade-in animation via style tag ── */}
        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          section > div.relative.z-10 > * {
            animation: fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both;
          }
          section > div.relative.z-10 > *:nth-child(1) { animation-delay: 0.1s; }
          section > div.relative.z-10 > *:nth-child(2) { animation-delay: 0.25s; }
          section > div.relative.z-10 > *:nth-child(3) { animation-delay: 0.4s; }

          /* hover lift on pill */
          a[href*="instagram"]:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.04);
          }
        `}</style>
      </section>
    </>
  );
}
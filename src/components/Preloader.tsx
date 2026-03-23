"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Always show on every page load / refresh
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  const letters = "QuicKart".split("");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden"
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
          }}
        >
          {/* Background grid lines */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(to right, #ffffff 1px, transparent 1px),
                linear-gradient(to bottom, #ffffff 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />

          {/* Red diagonal slash accent */}
          <motion.div
            className="absolute"
            style={{
              width: "3px",
              height: "200px",
              background: "linear-gradient(to bottom, transparent, #e00000, transparent)",
              rotate: "30deg",
              left: "calc(50% - 120px)",
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          />
          <motion.div
            className="absolute"
            style={{
              width: "3px",
              height: "200px",
              background: "linear-gradient(to bottom, transparent, #e00000, transparent)",
              rotate: "30deg",
              left: "calc(50% + 120px)",
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          />

          {/* Main brand letters */}
          <div className="flex items-end gap-2 mb-4">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                className="text-white font-black select-none"
                style={{
                  fontSize: "clamp(64px, 12vw, 120px)",
                  lineHeight: 1,
                  fontFamily: "'Playfair Display', 'Georgia', serif",
                  letterSpacing: "-0.02em",
                }}
                initial={{ y: 80, opacity: 0, rotateX: -90 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.1,
                  ease: [0.33, 1, 0.68, 1],
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            className="text-white/50 tracking-[0.4em] uppercase text-xs mb-10"
            style={{ fontFamily: "'Courier New', monospace" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            Fashion &bull; Style &bull; You
          </motion.p>

          {/* Progress bar container */}
          <div className="relative w-48 h-px bg-white/20">
            {/* Progress fill */}
            <motion.div
              className="absolute top-0 left-0 h-full bg-red-600"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              style={{ transformOrigin: "left" }}
              transition={{ duration: 2.2, delay: 0.8, ease: [0.33, 1, 0.68, 1] }}
            />
            {/* Glowing dot at tip */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-red-500"
              style={{ boxShadow: "0 0 8px #e00000, 0 0 16px #e00000" }}
              initial={{ left: "0%" }}
              animate={{ left: "calc(100% - 6px)" }}
              transition={{ duration: 2.2, delay: 0.8, ease: [0.33, 1, 0.68, 1] }}
            />
          </div>

          {/* Loading text */}
          <motion.p
            className="text-white/30 text-[10px] tracking-[0.3em] uppercase mt-4"
            style={{ fontFamily: "'Courier New', monospace" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.5, 1] }}
            transition={{ delay: 1, duration: 1.5, repeat: 1 }}
          >
            Loading...
          </motion.p>

          {/* Corner decorations */}
          {[
            { top: "24px", left: "24px" },
            { top: "24px", right: "24px" },
            { bottom: "24px", left: "24px" },
            { bottom: "24px", right: "24px" },
          ].map((style, i) => (
            <motion.div
              key={i}
              className="absolute w-5 h-5 border-red-600"
              style={{
                ...style,
                borderTopWidth: i < 2 ? "2px" : "0",
                borderBottomWidth: i >= 2 ? "2px" : "0",
                borderLeftWidth: i % 2 === 0 ? "2px" : "0",
                borderRightWidth: i % 2 === 1 ? "2px" : "0",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

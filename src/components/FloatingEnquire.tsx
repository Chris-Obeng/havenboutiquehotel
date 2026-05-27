import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

/**
 * FloatingEnquire
 *
 * Fixed pill CTA. Two liquid fill layers — both driven by Framer Motion so the
 * colour transitions are a proper liquid sweep rather than a CSS fade:
 *
 *   Layer 1 (cream) — slides in from left when the button sits over a dark
 *                     (#0E2820) section.  Slides back out when it leaves.
 *   Layer 2 (gold)  — slides in from left on hover, on top of layer 1.
 *
 * Text / border colours follow via `animate` so they also feel liquid.
 */

const DARK_SECTION_SELECTORS = ["#amenities", "#experiences", "#rooms"];
const LIQUID_EASE            = [0.76, 0, 0.24, 1] as const;

export default function FloatingEnquire() {
  const [visible,   setVisible]   = useState(false);
  const [isDark,    setIsDark]    = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docH    = document.documentElement.scrollHeight;
      const winH    = window.innerHeight;

      const pastHero   = scrollY > winH * 0.85;
      const nearBottom = scrollY + winH > docH - winH * 0.55;
      setVisible(pastHero && !nearBottom);

      /* Dark-bg detection — button centre ≈ 56 px from viewport bottom */
      const btnY     = winH - 56;
      let   overDark = false;
      for (const sel of DARK_SECTION_SELECTORS) {
        const el = document.querySelector(sel);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (btnY >= rect.top && btnY <= rect.bottom) { overDark = true; break; }
      }
      setIsDark(overDark);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Derived colours -------------------------------------------------- */
  const textCol   = isHovered ? "#1A1A18" : isDark ? "#1A1A18" : "#F5F0EB";
  const borderCol = isHovered || isDark
    ? "rgba(26,26,24,0.22)"
    : "rgba(245,240,235,0.25)";

  const textDelay   = isHovered ? 0.18 : isDark ? 0.22 : 0;
  const borderDelay = isHovered ? 0.18 : isDark ? 0.22 : 0;

  const liquidVariants = {
    hidden:  { x: "-105%", skewX: "10deg" },
    visible: { x: "0%",    skewX: "0deg"  },
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-7 right-6 z-50"
          initial={{ opacity: 0, y: 28, scale: 0.88 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          exit={{    opacity: 0, y: 20,  scale: 0.9  }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
        >
          <Link
            href="/contact"
            className="relative overflow-hidden flex items-center gap-3 pl-6 pr-5 py-[14px] md:py-3 rounded-full bg-[#0E2820] shadow-[0_8px_28px_rgba(14,40,32,0.30)] min-h-[48px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-testid="link-floating-enquire"
          >
            {/* ── Layer 1: cream fill — appears when over a dark section ── */}
            <motion.span
              className="absolute inset-0 rounded-full bg-[#F5F0EB] pointer-events-none"
              style={{ zIndex: 1 }}
              variants={liquidVariants}
              initial="hidden"
              animate={isDark ? "visible" : "hidden"}
              transition={{ duration: 0.58, ease: LIQUID_EASE }}
              aria-hidden="true"
            />

            {/* ── Layer 2: gold fill — appears on hover ─────────────────── */}
            <motion.span
              className="absolute inset-0 rounded-full bg-[#C9A96E] pointer-events-none"
              style={{ zIndex: 2 }}
              variants={liquidVariants}
              initial="hidden"
              animate={isHovered ? "visible" : "hidden"}
              transition={{ duration: 0.55, ease: LIQUID_EASE }}
              aria-hidden="true"
            />

            {/* ── Label ─────────────────────────────────────────────────── */}
            <motion.span
              className="uppercase text-[10px] tracking-[0.28em] font-sans font-light"
              style={{ position: "relative", zIndex: 10 }}
              animate={{ color: textCol }}
              transition={{ duration: 0.22, delay: textDelay, ease: "easeOut" }}
            >
              ENQUIRE
            </motion.span>

            {/* ── Arrow circle ──────────────────────────────────────────── */}
            <motion.span
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px]"
              style={{ position: "relative", zIndex: 10, borderWidth: 1, borderStyle: "solid" }}
              animate={{ borderColor: borderCol, color: textCol }}
              transition={{ duration: 0.22, delay: borderDelay, ease: "easeOut" }}
            >
              <motion.span
                animate={{ x: [0, 2, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="inline-block leading-none"
              >
                →
              </motion.span>
            </motion.span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

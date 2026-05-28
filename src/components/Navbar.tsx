import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const navLinks = [
  { label: "Rooms & Suites", href: "#rooms" },
  { label: "Dining", href: "#dining" },
  { label: "Experiences", href: "#experiences" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function smoothScrollTo(hash: string) {
  const target = document.querySelector(hash);
  if (!target) return;
  gsap.to(window, {
    scrollTo: { y: target as HTMLElement, offsetY: 72 },
    duration: 1.25,
    ease: "power3.inOut",
  });
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_EXPO = [0.76, 0, 0.24, 1] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setIsOpen(false);
      setTimeout(() => smoothScrollTo(href), 420);
    } else {
      setIsOpen(false);
    }
  };

  /* ── Colour states ─────────────────────────────────────────── */
  const onCream = !isOpen && scrolled;
  const textCol = onCream ? "text-[#1A1A18]" : "text-[#F5F0EB]";

  /* Logo is white+gold — needs a shadow when sitting on cream bg */
  const logoFilter = onCream
    ? "drop-shadow(0 1px 3px rgba(14,40,32,0.55))"
    : "none";

  return (
    <>
      {/* ── Bar ───────────────────────────────────────────────── */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 ${textCol}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE_OUT }}
        style={{
          backgroundColor: isOpen
            ? "transparent"
            : scrolled
              ? "#F5F0EB"
              : "transparent",
          transition: "background-color 0.4s ease, color 0.3s ease",
        }}
      >
        {/*
         * Three-column grid: [ENQUIRE] [LOGO] [MENU]
         * The "auto" centre col keeps logo truly centred regardless
         * of how wide the flanking items are.
         */}
        <div
          className="grid items-center px-5 md:px-14 h-[60px] md:h-[80px]"
          style={{ gridTemplateColumns: "1fr auto 1fr" }}
        >
          {/* ── Left: Menu toggle ─────────────────────────────── */}
          <div className="flex items-center">
            <button
              className="flex items-center gap-3 hover:opacity-50 transition-opacity duration-300 uppercase text-[9px] md:text-[10px] tracking-[0.28em] min-h-[44px] pr-2 font-sans"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation" : "Open navigation"}
              data-testid="button-menu-toggle"
            >
              {/* Animated hamburger / X */}
              <div className="w-[18px] h-[12px] relative flex flex-col justify-between">
                <motion.span
                  className="block w-full h-px bg-current origin-center"
                  animate={
                    isOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.38, ease: EASE_OUT }}
                />
                <motion.span
                  className="block w-full h-px bg-current"
                  animate={
                    isOpen
                      ? { opacity: 0, scaleX: 0 }
                      : { opacity: 1, scaleX: 1 }
                  }
                  style={{ originX: "50%" }}
                  transition={{ duration: 0.22 }}
                />
                <motion.span
                  className="block w-full h-px bg-current origin-center"
                  animate={
                    isOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.38, ease: EASE_OUT }}
                />
              </div>
              <span className="hidden sm:block">
                {isOpen ? "CLOSE" : "MENU"}
              </span>
            </button>
          </div>

          {/* ── Centre: Logo + Wordmark ───────────────────────── */}
          <Link
            href="/"
            className="flex items-center justify-center gap-2.5 md:gap-3"
            data-testid="link-home-logo"
          >
            {/* TH monogram */}
            <motion.img
              src="/haven-logo.png"
              alt="The Haven monogram"
              className="flex-shrink-0 select-none"
              style={{
                height: "clamp(44px, 5.5vw, 64px)",
                width: "auto",
                filter: logoFilter,
                transition: "filter 0.4s ease",
              }}
              animate={{ opacity: isOpen ? 0.85 : 1 }}
              transition={{ duration: 0.3 }}
              draggable={false}
            />

            {/* Thin divider */}
            <span
              className="hidden sm:block h-6 md:h-8 w-px flex-shrink-0 bg-current opacity-20"
              aria-hidden="true"
            />

            {/* Wordmark */}
            <motion.span
              className="font-serif text-[20px] md:text-[28px] tracking-[0.22em] leading-none select-none"
              animate={{ opacity: isOpen ? 0.85 : 1 }}
              transition={{ duration: 0.3 }}
            >
              HAVEN
            </motion.span>
          </Link>

          {/* ── Right: Enquire pill ───────────────────────────── */}
          <div className="flex items-center justify-end -mr-1 md:mr-0">
            <Link
              href="/contact"
              className="group relative overflow-hidden inline-flex items-center gap-2 min-h-[36px] md:min-h-[38px] px-5 md:px-6 rounded-full border border-current/30 hover:border-current/0 transition-[border-color] duration-500 font-sans"
              data-testid="link-nav-enquire"
            >
              {/* Liquid fill layer */}
              <motion.span
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: onCream ? "#F5F0EB" : "#F5F0EB",
                  originX: 0,
                }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                aria-hidden="true"
              />
              <span
                className={`relative z-10 uppercase text-[9px] md:text-[10px] tracking-[0.28em] transition-colors duration-300 ${
                  onCream
                    ? "group-hover:text-[#0D1F17]"
                    : "group-hover:text-[#F5F0EB]"
                }`}
              >
                ENQUIRE
              </span>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* ── Full-screen overlay ───────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#0B1E17] flex flex-col overflow-hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.72, ease: EASE_EXPO }}
          >
            {/* Watermark */}
            <span
              className="absolute right-0 bottom-0 font-serif text-[22vw] leading-none text-[#F5F0EB]/[0.025] select-none pointer-events-none"
              aria-hidden="true"
            >
              Haven
            </span>

            {/* Gold rule at top */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-px bg-[#C9A96E]/20"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: EASE_OUT }}
            />

            {/* ── Nav links ─────────────────────────────────── */}
            <div className="flex flex-col justify-center flex-1 px-8 md:px-20 pt-24 md:pt-32 pb-8">
              <nav
                aria-label="Site navigation"
                className="max-w-4xl mx-auto w-full"
              >
                {navLinks.map((link, i) => (
                  <div
                    key={link.href}
                    className="overflow-hidden border-b border-[#F5F0EB]/[0.06] last:border-b-0"
                  >
                    <motion.div
                      initial={{ y: "105%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "105%" }}
                      transition={{
                        delay: 0.32 + i * 0.06,
                        duration: 0.7,
                        ease: EASE_OUT,
                      }}
                    >
                      <Link
                        href={link.href.startsWith("#") ? "/" : link.href}
                        className="group flex items-center justify-between py-3 md:py-4"
                        onClick={(e) =>
                          handleNavClick(
                            e as unknown as React.MouseEvent,
                            link.href,
                          )
                        }
                        data-testid={`link-nav-${link.label.toLowerCase().replace(/ /g, "-")}`}
                      >
                        <span className="font-serif font-light text-[clamp(28px,4.5vw,52px)] leading-[1.1] text-[#F5F0EB]/50 group-hover:text-[#F5F0EB] transition-colors duration-300">
                          {link.label}
                        </span>
                        <span
                          className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-[#C9A96E] text-[18px] leading-none mr-1"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </nav>
            </div>

            {/* ── Footer strip ──────────────────────────────── */}
            <motion.div
              className="px-8 md:px-20 pb-8 md:pb-10"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.62, duration: 0.5, ease: EASE_OUT }}
            >
              <div className="w-full h-px bg-[#F5F0EB]/8 mb-6" />
              <div className="flex flex-col md:flex-row gap-3 md:gap-10 md:items-center">
                <a
                  href="mailto:hello@havenboutiquehotel.com"
                  className="uppercase text-[9px] tracking-[0.24em] text-[#F5F0EB]/28 hover:text-[#F5F0EB]/60 transition-colors duration-300 font-sans"
                >
                  hello@havenboutiquehotel.com
                </a>
                <a
                  href="tel:+233200000000"
                  className="uppercase text-[9px] tracking-[0.24em] text-[#F5F0EB]/28 hover:text-[#F5F0EB]/60 transition-colors duration-300 font-sans"
                >
                  +233204377379
                </a>
                <span className="md:ml-auto uppercase text-[9px] tracking-[0.22em] text-[#F5F0EB]/15 font-sans">
                  EJISU · ASHANTI REGION · GHANA
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

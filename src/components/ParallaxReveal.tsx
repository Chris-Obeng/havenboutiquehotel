import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ParallaxReveal
 *
 * Sticky section (300vh tall) that holds at the top of the viewport.
 * During scroll, three layers animate independently:
 *  1. Background image  → fades out + blurs (0–60% of scroll)
 *  2. Foreground image  → de-zooms from scale 1.12 → 1.0 (0–50%)
 *  3. Cream content panel → slides up from below (55–95%)
 *
 * No GSAP pin — CSS sticky handles the hold; no z-index conflicts.
 */
export default function ParallaxReveal() {
  const outerRef = useRef<HTMLDivElement>(null);
  const bgRef    = useRef<HTMLDivElement>(null);
  const fgRef    = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const textRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!outerRef.current) return;

      // ── 1. Background: fade out AND blur (0 → 60% of section) ──────────────
      if (bgRef.current) {
        gsap.set(bgRef.current, { filter: "blur(0px) brightness(1)", opacity: 1 });
        gsap.to(bgRef.current, {
          filter:  "blur(22px) brightness(0.55)",
          opacity: 0,
          scale:   1.04,
          ease:    "none",
          scrollTrigger: {
            trigger:          outerRef.current,
            start:            "top top",
            end:              "60% top",
            scrub:            0.9,
            invalidateOnRefresh: true,
          },
        });
      }

      // ── 2. Foreground card: de-zoom (0 → 50% of section) ──────────────────
      if (fgRef.current) {
        gsap.fromTo(
          fgRef.current,
          { scale: 1.12 },
          {
            scale: 1.0,
            ease:  "none",
            scrollTrigger: {
              trigger:          outerRef.current,
              start:            "top top",
              end:              "50% top",
              scrub:            1.3,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // ── 3. Editorial text: fade in (5 → 45% of section) ───────────────────
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y:       0,
            ease:    "none",
            scrollTrigger: {
              trigger:          outerRef.current,
              start:            "5% top",
              end:              "45% top",
              scrub:            1,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // ── 4. Cream panel: slides up from bottom (55 → 93% of section) ────────
      if (panelRef.current) {
        gsap.fromTo(
          panelRef.current,
          { yPercent: 100 },
          {
            yPercent: 0,
            ease:     "none",
            scrollTrigger: {
              trigger:          outerRef.current,
              start:            "55% top",
              end:              "93% top",
              scrub:            1,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    /*
     * Outer wrapper — 300 vh tall — gives the "slow scroll" duration.
     * The sticky child stays glued to the top while the user scrolls through.
     */
    <div ref={outerRef} style={{ height: "300vh" }} className="relative">

      {/* Sticky viewport — fixed size, clips everything outside it */}
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ backgroundColor: "#0D1F17" }}
      >

        {/* ── Layer 1: Background image ─────────────────────────────────── */}
        <div
          ref={bgRef}
          className="absolute inset-0"
          style={{ willChange: "filter, opacity, transform" }}
        >
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          {/* Layered vignette for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D1F17]/50 via-transparent to-[#0D1F17]/60 pointer-events-none" />
        </div>

        {/* ── Layer 2: Foreground card image ───────────────────────────── */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            ref={fgRef}
            className="w-[88vw] md:w-[72vw] max-w-[1040px]"
            style={{ willChange: "transform" }}
          >
            {/* Drop shadow gives it depth vs the blurring bg */}
            <div
              className="w-full overflow-hidden"
              style={{
                aspectRatio:    "16 / 10",
                boxShadow:      "0 40px 100px rgba(0,0,0,0.60), 0 12px 32px rgba(0,0,0,0.40)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1800&q=85"
                alt="Haven Boutique Hotel — poolside terrace, Ejisu"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* ── Layer 3: Editorial text (bottom-centre) ───────────────────── */}
        <div
          ref={textRef}
          className="absolute bottom-[10vh] w-full flex flex-col items-center text-center px-6 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <div className="w-[28px] h-[1px] bg-[#C9A96E] mx-auto mb-5" />
          <p className="font-serif italic text-[#F5F0EB]/80 text-[clamp(15px,1.8vw,20px)] max-w-sm leading-[1.75]">
            "A retreat shaped by the soul of the Ashanti Region"
          </p>
          <span className="mt-4 uppercase text-[9px] tracking-[0.32em] text-[#F5F0EB]/35 font-sans">
            EJISU · KUMASI · GHANA
          </span>
        </div>

        {/* ── Layer 4: Cream panel that slides up ───────────────────────── */}
        <div
          ref={panelRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-[#F5F0EB] text-[#1A1A18]"
          style={{ willChange: "transform" }}
        >
          {/* Gold accent */}
          <div className="w-[36px] h-[1px] bg-[#C9A96E] mb-8 mx-auto" />

          <span className="uppercase text-[11px] tracking-[0.3em] text-[#1A1A18]/40 mb-6 block font-sans">
            THE PROPERTY
          </span>

          <h2 className="font-serif font-light text-[clamp(34px,5vw,68px)] leading-[1.08] max-w-xl mb-0">
            Where Every Detail<br />Has Been Considered
          </h2>
        </div>

      </div>
    </div>
  );
}

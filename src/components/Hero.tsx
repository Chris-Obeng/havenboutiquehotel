import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import LiquidButton from "@/components/LiquidButton";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !imageWrapperRef.current) return;

      gsap.fromTo(
        imageWrapperRef.current,
        { y: "0%" },
        {
          y: "30%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100svh] overflow-hidden bg-[#0E2820]"
    >
      {/* Parallax image wrapper */}
      <div
        ref={imageWrapperRef}
        className="absolute inset-0 w-full"
        style={{ height: "140%", top: "-20%", willChange: "transform" }}
      >
        <picture>
          <source media="(max-width: 767px)" srcSet="/hero_mobile.png" />{" "}
          {/* Mobile image */}
          <img
            src="/hero.png"
            alt="Haven Boutique Hotel — pool and garden terrace"
            className="w-full h-full object-cover object-right md:object-cover md:object-[68%_center] md:scale-100"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F17]/88 via-[#0E2820]/20 to-[#0E2820]/10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E2820]/28 to-transparent h-48 pointer-events-none" />

      {/* Hero content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 pt-14 pb-20 md:pt-24 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.7 }}
            className="font-sans uppercase text-[9px] md:text-[11px] tracking-[0.38em] text-[#F5F0EB]/60 mb-5 md:mb-7"
          >
            KUMASI, GHANA · ASHANTI REGION
          </motion.span>

          <h1 className="font-serif text-[#F5F0EB] text-[clamp(36px,8vw,96px)] leading-[1.0] font-light max-w-[320px] sm:max-w-[560px] md:max-w-[900px] mb-5 md:mb-7">
            A Sanctuary In The
            <br className="hidden sm:block" /> Heart of Ashanti
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="h-[1px] bg-[#C9A96E] mb-9 md:mb-12 origin-center"
            style={{ width: "60px" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <LiquidButton
              href="/contact"
              variant="light"
              data-testid="link-hero-cta"
            >
              EXPLORE HAVEN
            </LiquidButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <span className="uppercase text-[8px] md:text-[9px] tracking-[0.42em] text-[#F5F0EB]/38 font-sans">
          SCROLL
        </span>
        <div className="relative w-[1px] h-10 md:h-14 bg-[#F5F0EB]/14 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-[#F5F0EB]/65"
            animate={{ y: ["0%", "200%"] }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: "easeInOut",
              repeatDelay: 0.4,
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}

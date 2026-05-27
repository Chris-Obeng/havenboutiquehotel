import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiquidButton from "@/components/LiquidButton";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  "BREAKFAST · LUNCH · DINNER",
  "INDOOR & GARDEN SEATING",
  "BAR & LOUNGE",
];

export default function Dining() {
  const containerRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current && imageContainerRef.current) {
        gsap.fromTo(
          imageRef.current,
          { y: "0%" },
          {
            y: "25%",
            ease: "none",
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      if (labelRef.current) {
        gsap.set(labelRef.current, { opacity: 0, y: 14 });
        gsap.to(labelRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        });
      }

      if (headingRef.current) {
        gsap.set(headingRef.current, { clipPath: "inset(0 0 100% 0)", y: 22 });
        gsap.to(headingRef.current, {
          clipPath: "inset(0 0 0% 0)",
          y: 0,
          duration: 1.25,
          ease: "power4.out",
          delay: 0.1,
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        });
      }

      [bodyRef.current, ctaRef.current, statsRef.current].forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { opacity: 0, y: 20 });
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.92,
          ease: "power3.out",
          delay: 0.2 + i * 0.14,
          scrollTrigger: { trigger: containerRef.current, start: "top 78%" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-[#F5F0EB] flex flex-col md:flex-row"
    >
      {/* Image — full width on mobile, left 55% on desktop */}
      <div
        ref={imageContainerRef}
        className="w-full md:w-[55%] overflow-hidden relative md:self-stretch"
        style={{ aspectRatio: "4/3" }}
      >
        <img
          ref={imageRef}
          src="/food.png"
          alt="The Garden Restaurant at Haven"
          className="w-full object-cover absolute left-0"
          style={{ height: "140%", top: "-20%", willChange: "transform" }}
          loading="lazy"
        />
      </div>

      {/* Text — right 45% */}
      <div className="w-full md:w-[45%] flex flex-col justify-center px-5 py-12 md:px-16 md:py-0 text-[#1A1A18]">
        <div className="max-w-md mx-auto md:mx-0">
          <span
            ref={labelRef}
            className="uppercase text-[10px] md:text-[11px] tracking-[0.26em] mb-5 md:mb-6 block text-[#1A1A18]/45 font-sans"
          >
            CULINARY
          </span>
          <h2
            ref={headingRef}
            className="font-serif font-light text-[clamp(28px,4.5vw,56px)] leading-[1.1] mb-6 md:mb-8"
          >
            The Haven Restaurant
          </h2>
          <p
            ref={bodyRef}
            className="font-light text-[14px] md:text-[16px] leading-[1.88] mb-8 md:mb-10 text-[#1A1A18]/72"
          >
            Our on-site restaurant celebrates the best of West African cuisine
            alongside European influences — from freshly prepared Fufu and local
            Ghanaian stews to continental breakfast spreads served in the open
            garden.
          </p>

          <div ref={ctaRef} className="mb-10 md:mb-16">
            <LiquidButton
              href="/dining"
              variant="dark"
              data-testid="link-dining-menu"
            >
              VIEW MENU
            </LiquidButton>
          </div>

          <div ref={statsRef} className="flex flex-col gap-0">
            {stats.map((stat, i) => (
              <div key={i} className="border-t border-[#1A1A18]/9 py-3 md:py-4">
                <span className="uppercase text-[9px] md:text-[10px] tracking-[0.28em] text-[#1A1A18]/45 font-sans">
                  {stat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

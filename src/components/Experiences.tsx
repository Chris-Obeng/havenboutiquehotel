import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiquidButton from "@/components/LiquidButton";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    number: "01",
    title:  "Cultural Heritage Tours",
    desc:   "Guided visits to Manhyia Palace, Kente weaving villages, and Kumasi Central Market",
  },
  {
    number: "02",
    title:  "The Garden Restaurant",
    desc:   "Authentic West African cuisine served in our open-air garden setting",
  },
  {
    number: "03",
    title:  "Ashanti Kente Experiences",
    desc:   "Private weaving demonstrations and kente cloth workshops with local artisans",
  },
  {
    number: "04",
    title:  "Conference & Events",
    desc:   "Intimate event spaces for retreats, weddings, and corporate gatherings",
  },
];

export default function Experiences() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const labelRef    = useRef<HTMLSpanElement>(null);
  const bodyRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const tilesRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        gsap.set(sectionRef.current, { y: 36, opacity: 0 });
        gsap.to(sectionRef.current, {
          y: 0, opacity: 1, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 84%" },
        });
      }

      if (headingRef.current) {
        gsap.set(headingRef.current, { clipPath: "inset(0 0 100% 0)", y: 22 });
        gsap.to(headingRef.current, {
          clipPath: "inset(0 0 0% 0)", y: 0,
          duration: 1.25, ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 76%" },
        });
      }

      [labelRef.current, bodyRef.current, ctaRef.current].forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { opacity: 0, y: 20 });
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          delay: 0.14 + i * 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        });
      });

      if (tilesRef.current) {
        const tiles = tilesRef.current.querySelectorAll<HTMLElement>(".exp-tile");
        tiles.forEach((tile, i) => {
          gsap.set(tile, { opacity: 0, y: 30 });
          gsap.to(tile, {
            opacity: 1, y: 0, duration: 0.88, ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: tilesRef.current, start: "top 84%" },
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-14 md:py-36 px-5 md:px-20 bg-[#0E2820] text-[#F5F0EB]"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20">

        {/* Left column */}
        <div className="w-full md:w-[38%] flex flex-col">
          <span
            ref={labelRef}
            className="uppercase text-[10px] md:text-[11px] tracking-[0.26em] opacity-38 block mb-6 md:mb-8 font-sans"
          >
            EXPERIENCES
          </span>
          <h2
            ref={headingRef}
            className="font-serif text-[clamp(30px,5vw,68px)] leading-[1.05] mb-5 md:mb-8 font-light"
          >
            Discover the Soul of Kumasi
          </h2>
          <p
            ref={bodyRef}
            className="font-light text-[14px] md:text-[16px] leading-[1.88] opacity-65 mb-8 md:mb-12 max-w-[340px]"
          >
            From the golden halls of Manhyia Palace Museum to the vivid tapestry
            of Kejetia Market — West Africa's largest open-air bazaar — Haven
            places you at the heart of Ashanti heritage.
          </p>

          <div ref={ctaRef}>
            <LiquidButton href="/contact" variant="light" data-testid="link-experiences-cta">
              PLAN YOUR STAY
            </LiquidButton>
          </div>
        </div>

        {/* Tiles 2×2 */}
        <div
          ref={tilesRef}
          className="w-full md:w-[62%] grid grid-cols-1 sm:grid-cols-2 gap-0"
        >
          {experiences.map((exp, i) => (
            <div
              key={exp.number}
              className={`exp-tile flex flex-col py-7 md:py-10 border-t border-[#F5F0EB]/10
                ${i % 2 === 0 ? "sm:pr-8 md:pr-12 sm:border-r sm:border-r-[#F5F0EB]/10" : "sm:pl-8 md:pl-12"}
              `}
            >
              <span className="font-sans text-[10px] tracking-[0.26em] text-[#C9A96E]/55 mb-4 md:mb-5 block">
                {exp.number}
              </span>
              <div className="w-6 h-[1px] bg-[#C9A96E]/55 mb-5 md:mb-6" />
              <h3 className="font-serif italic text-[18px] md:text-[20px] mb-3 md:mb-4 leading-[1.28] font-light">
                {exp.title}
              </h3>
              <p className="font-light text-[13px] md:text-[14px] opacity-58 leading-[1.82]">
                {exp.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiquidButton from "@/components/LiquidButton";

gsap.registerPlugin(ScrollTrigger);

export default function Introduction() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const pullQuoteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.set(headingRef.current, { clipPath: "inset(0 0 100% 0)", y: 28 });
        gsap.to(headingRef.current, {
          clipPath: "inset(0 0 0% 0)",
          y: 0,
          duration: 1.25,
          ease: "power4.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 88%" },
        });
      }

      const rightItems = [
        labelRef.current,
        bodyRef.current,
        dividerRef.current,
        ctaRef.current,
      ];
      rightItems.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { opacity: 0, y: 24 });
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: "power3.out",
          delay: i * 0.12,
          scrollTrigger: { trigger: labelRef.current, start: "top 86%" },
        });
      });

      if (imageWrapRef.current) {
        gsap.set(imageWrapRef.current, { opacity: 0, y: 48 });
        gsap.to(imageWrapRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: { trigger: imageWrapRef.current, start: "top 88%" },
        });
      }

      if (pullQuoteRef.current) {
        gsap.set(pullQuoteRef.current, { opacity: 0, y: 22 });
        gsap.to(pullQuoteRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: pullQuoteRef.current, start: "top 86%" },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-14 md:py-40 px-5 md:px-20 bg-[#F5F0EB] text-[#1A1A18]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading left · body right */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-20 mb-14 md:mb-32">
          <div className="w-full md:w-[42%]">
            <h2
              ref={headingRef}
              className="font-serif font-light text-[clamp(28px,4.5vw,58px)] leading-[1.12]"
            >
              Where Ghana's Culture
              <br />
              Meets Quiet Luxury
            </h2>
          </div>

          <div className="w-full md:w-[58%] flex flex-col items-start pt-0 md:pt-2">
            <span
              ref={labelRef}
              className="uppercase text-[10px] md:text-[11px] tracking-[0.26em] mb-6 md:mb-7 inline-block text-[#1A1A18]/48 font-sans"
            >
              OVERVIEW
            </span>

            <p
              ref={bodyRef}
              className="font-light text-[15px] md:text-[17px] leading-[1.85] mb-8 md:mb-10 text-[#1A1A18]/82"
            >
              Nestled in Ejisu — just 15 kilometres from Kumasi's vibrant city
              centre — Haven offers a rare retreat where the warmth of Ashanti
              culture and the comfort of boutique hospitality converge. Wake to
              garden views, dine on authentic West African cuisine, and discover
              the storied heritage of the Ashanti Kingdom at your doorstep.
            </p>

            <div
              ref={dividerRef}
              className="w-full h-px bg-[#1A1A18]/9 mb-8 md:mb-10"
            />

            <div ref={ctaRef}>
              <LiquidButton
                href="/about"
                variant="dark"
                data-testid="link-intro-story"
              >
                OUR STORY
              </LiquidButton>
            </div>
          </div>
        </div>

        {/* Image left · pull-quote right */}
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-20">
          <div ref={imageWrapRef} className="w-full md:w-[48%]">
            <div
              className="w-full overflow-hidden mb-3 md:mb-4"
              style={{ aspectRatio: "3/4" }}
            >
              <img
                src="/entrance_in-daylight.png"
                alt="Haven Garden Terrace Ejisu"
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04]"
                loading="lazy"
              />
            </div>
            <span className="uppercase text-[10px] md:text-[11px] tracking-[0.25em] text-[#1A1A18]/38 font-sans">
              HAVEN GARDEN TERRACE · EJISU
            </span>
          </div>

          <div className="w-full md:w-[52%] flex flex-col justify-center md:pt-16 md:pb-8 md:pl-8">
            <div className="w-7 h-px bg-[#C9A96E] mb-7 md:mb-10" />
            <p
              ref={pullQuoteRef}
              className="font-serif italic font-light text-[clamp(20px,2.8vw,34px)] leading-[1.52] text-[#1A1A18]/72 mb-8 md:mb-10"
            >
              "Every corner of Haven whispers of a place shaped by the land, the
              culture, and the warmth of its people."
            </p>
            <span className="uppercase text-[10px] md:text-[11px] tracking-[0.2em] text-[#1A1A18]/30 font-sans">
              HAVEN BOUTIQUE HOTEL
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

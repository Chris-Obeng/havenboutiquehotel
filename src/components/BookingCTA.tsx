import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiquidButton from "@/components/LiquidButton";

gsap.registerPlugin(ScrollTrigger);

export default function BookingCTA() {
  const sectionRef  = useRef<HTMLElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const bodyRef     = useRef<HTMLParagraphElement>(null);
  const buttonsRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "center" });
        gsap.to(lineRef.current, {
          scaleX: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        });
      }

      if (headingRef.current) {
        gsap.set(headingRef.current, { clipPath: "inset(0 0 100% 0)", y: 28 });
        gsap.to(headingRef.current, {
          clipPath: "inset(0 0 0% 0)", y: 0,
          duration: 1.3, ease: "power4.out",
          delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        });
      }

      [bodyRef.current, buttonsRef.current].forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { opacity: 0, y: 22 });
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.92, ease: "power3.out",
          delay: 0.28 + i * 0.16,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-[180px] px-5 md:px-20 bg-[#0E2820] text-[#F5F0EB] flex flex-col items-center justify-center text-center"
    >
      <div className="max-w-xl mx-auto">
        <div ref={lineRef} className="w-[40px] md:w-[52px] h-[1px] bg-[#C9A96E] mb-10 md:mb-14 mx-auto" />

        <h2
          ref={headingRef}
          className="font-serif font-light text-[clamp(30px,6vw,80px)] leading-[1.05] mb-5 md:mb-6"
        >
          Begin Your<br />Ashanti Story
        </h2>

        <p
          ref={bodyRef}
          className="font-light text-[13px] md:text-[15px] mb-10 md:mb-14 opacity-55 max-w-[260px] md:max-w-[280px] mx-auto leading-[1.85] font-sans"
        >
          Reach out to our team to check availability and arrange your stay at Haven.
        </p>

        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center"
        >
          <LiquidButton href="/contact" variant="light" fillDirection="bottom" data-testid="link-cta-enquire">
            ENQUIRE NOW
          </LiquidButton>
          <LiquidButton href="/contact" variant="ghost-light" fillDirection="bottom" data-testid="link-cta-contact">
            GET IN TOUCH
          </LiquidButton>
        </div>
      </div>
    </section>
  );
}

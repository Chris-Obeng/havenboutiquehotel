import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const quoteText =
  "A hotel that feels less like an accommodation and more like a personal invitation into the Ashanti way of life.";

export default function PullQuote() {
  const sectionRef     = useRef<HTMLElement>(null);
  const lineRef        = useRef<HTMLDivElement>(null);
  const quoteRef       = useRef<HTMLQuoteElement>(null);
  const attributionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "center" });
        gsap.to(lineRef.current, {
          scaleX: 1, duration: 1.0, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        });
      }

      if (quoteRef.current) {
        const words = quoteRef.current.querySelectorAll<HTMLElement>(".word");
        gsap.set(words, { opacity: 0, y: 8 });
        gsap.to(words, {
          opacity: 1,
          y:       0,
          duration: 0.55,
          stagger:  0.032,
          ease:    "power3.out",
          scrollTrigger: { trigger: quoteRef.current, start: "top 82%" },
        });
      }

      if (attributionRef.current) {
        gsap.set(attributionRef.current, { opacity: 0, y: 12 });
        gsap.to(attributionRef.current, {
          opacity: 0.45, y: 0, duration: 0.9, ease: "power3.out",
          delay: 0.6,
          scrollTrigger: { trigger: attributionRef.current, start: "top 84%" },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const words = quoteText.split(" ");

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-[140px] px-5 md:px-20 bg-[#F5F0EB] flex flex-col items-center justify-center text-center text-[#1A1A18]"
    >
      {/* Gold line */}
      <div ref={lineRef} className="w-[40px] md:w-[52px] h-[1px] bg-[#C9A96E] mb-8 md:mb-12" />

      {/* Decorative quote mark */}
      <span
        className="font-serif text-[80px] md:text-[140px] leading-[0] text-[#C9A96E]/10 mb-3 md:mb-4 select-none"
        aria-hidden="true"
      >
        "
      </span>

      <blockquote
        ref={quoteRef}
        className="font-serif italic font-light text-[clamp(19px,3.8vw,48px)] leading-[1.45] max-w-[620px] mb-10 md:mb-14 -mt-3 md:-mt-4"
      >
        {words.map((word, i) => (
          <span key={i} className="word inline-block mr-[0.2em]">
            {word}
          </span>
        ))}
      </blockquote>

      <cite
        ref={attributionRef}
        className="uppercase text-[9px] md:text-[10px] tracking-[0.32em] not-italic font-sans"
      >
        — Booking.com Guest · ★★★★★
      </cite>
    </section>
  );
}

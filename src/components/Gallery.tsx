import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    src: "/frontdesk.png",
    alt: "Presidential Suite at Haven",
    caption: "PRESIDENTIAL SUITE · HAVEN",
  },
  {
    src: "/dining_space.png",
    alt: "Boutique bathroom suite",
    caption: "THE GARDEN RESTAURANT",
  },
  {
    src: "/main_front.png",
    alt: "Haven pool and gardens",
    caption: "HAVEN POOL · EJISU",
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);

  // Wrapper (overflow-hidden) refs — used as scroll triggers
  const leftContainerRef = useRef<HTMLDivElement>(null);
  const rightContainerRef = useRef<HTMLDivElement>(null);
  const bottomContainerRef = useRef<HTMLDivElement>(null);

  // Image refs — these get the parallax translateY
  const leftImgRef = useRef<HTMLImageElement>(null);
  const rightImgRef = useRef<HTMLImageElement>(null);
  const bottomImgRef = useRef<HTMLImageElement>(null);

  // Outer wrapper refs — for fade-in entrance
  const leftWrapRef = useRef<HTMLDivElement>(null);
  const rightWrapRef = useRef<HTMLDivElement>(null);
  const bottomWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Entrance fade-ups ──
      if (leftWrapRef.current) {
        gsap.set(leftWrapRef.current, { opacity: 0, y: 40 });
        gsap.to(leftWrapRef.current, {
          opacity: 1, y: 0, duration: 1.1, ease: "power2.out",
          scrollTrigger: { trigger: leftWrapRef.current, start: "top 88%" },
        });
      }
      if (rightWrapRef.current) {
        gsap.set(rightWrapRef.current, { opacity: 0, y: 55 });
        gsap.to(rightWrapRef.current, {
          opacity: 1, y: 0, duration: 1.1, ease: "power2.out",
          delay: 0.12,
          scrollTrigger: { trigger: rightWrapRef.current, start: "top 88%" },
        });
      }
      if (bottomWrapRef.current) {
        gsap.set(bottomWrapRef.current, { opacity: 0, y: 30 });
        gsap.to(bottomWrapRef.current, {
          opacity: 1, y: 0, duration: 1.1, ease: "power2.out",
          scrollTrigger: { trigger: bottomWrapRef.current, start: "top 90%" },
        });
      }

      // ── Parallax: positive y = image drifts DOWN relative to container
      //    = image scrolls UP slower than page = classic parallax effect ──

      // Left image — slower (0.3× speed)
      if (leftImgRef.current && leftContainerRef.current) {
        gsap.fromTo(leftImgRef.current,
          { y: "0%" },
          {
            y: "22%",
            ease: "none",
            scrollTrigger: {
              trigger: leftContainerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // Right image — faster (0.5× speed) — more dramatic shift
      if (rightImgRef.current && rightContainerRef.current) {
        gsap.fromTo(rightImgRef.current,
          { y: "0%" },
          {
            y: "38%",
            ease: "none",
            scrollTrigger: {
              trigger: rightContainerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // Bottom full-bleed image — subtlest
      if (bottomImgRef.current && bottomContainerRef.current) {
        gsap.fromTo(bottomImgRef.current,
          { y: "0%" },
          {
            y: "18%",
            ease: "none",
            scrollTrigger: {
              trigger: bottomContainerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-28 px-6 md:px-20 bg-[#F5F0EB]">
      {/* Optional section label */}
      <div className="max-w-7xl mx-auto mb-14 md:mb-20">
        <span className="uppercase text-[11px] tracking-[0.25em] text-[#1A1A18]/40">
          THE PROPERTY
        </span>
      </div>

      <div className="max-w-7xl mx-auto">

        {/* Top two-column asymmetric pair */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-14 mb-12 md:mb-20">

          {/* Left — portrait, starts at top */}
          <div ref={leftWrapRef} className="w-full md:w-[44%] flex flex-col">
            {/* Overflow container = scroll trigger */}
            <div
              ref={leftContainerRef}
              className="w-full overflow-hidden mb-4 relative"
              style={{ aspectRatio: "4/5" }}
            >
              <img
                ref={leftImgRef}
                src={items[0].src}
                alt={items[0].alt}
                className="w-full object-cover absolute left-0"
                style={{
                  height: "140%",
                  top: "-20%",
                  willChange: "transform",
                }}
                loading="lazy"
              />
            </div>
            <span className="uppercase text-[11px] tracking-[0.25em] text-[#1A1A18]/45">
              {items[0].caption}
            </span>
          </div>

          {/* Right — landscape, offset down 100px */}
          <div ref={rightWrapRef} className="w-full md:w-[51%] flex flex-col md:mt-[100px]">
            <div
              ref={rightContainerRef}
              className="w-full overflow-hidden mb-4 relative"
              style={{ aspectRatio: "4/3" }}
            >
              <img
                ref={rightImgRef}
                src={items[1].src}
                alt={items[1].alt}
                className="w-full object-cover absolute left-0"
                style={{
                  height: "150%",
                  top: "-25%",
                  willChange: "transform",
                }}
                loading="lazy"
              />
            </div>
            <span className="uppercase text-[11px] tracking-[0.25em] text-[#1A1A18]/45">
              {items[1].caption}
            </span>
          </div>
        </div>

        {/* Bottom full-bleed */}
        <div ref={bottomWrapRef} className="w-full flex flex-col">
          <div
            ref={bottomContainerRef}
            className="w-full overflow-hidden mb-4 relative"
            style={{ aspectRatio: "16/7", minHeight: "220px" }}
          >
            <img
              ref={bottomImgRef}
              src={items[2].src}
              alt={items[2].alt}
              className="w-full object-cover absolute left-0"
              style={{
                height: "130%",
                top: "-15%",
                willChange: "transform",
              }}
              loading="lazy"
            />
          </div>
          {/* Caption removed as requested (HAVEN POOL · EJISU) */}
        </div>

      </div>
    </section>
  );
}

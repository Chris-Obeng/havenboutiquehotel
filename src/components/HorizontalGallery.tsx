import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const photos = [
  {
    src: "/peakock.png",
    alt: "Peacock at Haven",
    caption: "THE POOL",
    index: "01",
  },
  {
    src: "/staircase_shot.png",
    alt: "Staircase shot",
    caption: "PRESIDENTIAL SUITE",
    index: "02",
  },
  {
    src: "/shuttle.png",
    alt: "Shuttle",
    caption: "THE TERRACE",
    index: "03",
  },
  {
    src: "/courtyard.png",
    alt: "Courtyard",
    caption: "COURTYARD",
    index: "04",
  },
  {
    src: "/peakock2.png",
    alt: "Peacock 2",
    caption: "SUITE BATH",
    index: "05",
  },
  {
    src: "/patio.png",
    alt: "Patio",
    caption: "PATIO",
    index: "06",
  },
  {
    src: "/hallway.png",
    alt: "Hallway",
    caption: "GARDEN TERRACE",
    index: "07",
  },
  {
    src: "/neighbourhood_view.png",
    alt: "Neighbourhood view",
    caption: "THE RESTAURANT",
    index: "08",
  },
];

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const getScrollDist = () =>
        Math.max(0, track.scrollWidth - section.offsetWidth);

      gsap.set(track, { x: 0 });

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollDist()}`,
        pin: true,
        scrub: 1.1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate(self) {
          gsap.set(track, { x: -getScrollDist() * self.progress });

          if (progressFillRef.current) {
            gsap.set(progressFillRef.current, { scaleX: self.progress });
          }

          const idx = Math.min(
            photos.length,
            Math.max(1, Math.round(self.progress * (photos.length - 1)) + 1),
          );
          setCurrentIndex(idx);
        },
      });

      if (headerRef.current) {
        gsap.set(headerRef.current, { opacity: 0, y: 28 });
        gsap.to(headerRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
          },
        });
      }

      return () => st.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F5F0EB] overflow-hidden h-[65svh] md:h-[100svh]"
    >
      <div className="flex flex-col h-full pt-12 md:pt-20 pb-0 md:pb-20">
        {/* Header */}
        <div
          ref={headerRef}
          className="px-5 md:px-20 mb-7 md:mb-10 flex items-end justify-between"
        >
          <div>
            <span className="uppercase text-[9px] md:text-[10px] tracking-[0.32em] text-[#1A1A18]/35 font-sans block mb-2.5 md:mb-3">
              PHOTO JOURNAL
            </span>
            <h2 className="font-serif font-light text-[clamp(24px,4vw,52px)] leading-[1.05] text-[#1A1A18]">
              Life at Haven
            </h2>
          </div>

          <div className="flex flex-col items-end gap-1.5 md:gap-2">
            <span className="font-serif text-[clamp(22px,3vw,42px)] leading-none text-[#1A1A18]/18 tabular-nums">
              {String(currentIndex).padStart(2, "0")}
              <span className="text-[0.45em] align-middle text-[#1A1A18]/12 mx-1">
                /
              </span>
              <span className="text-[0.6em] text-[#1A1A18]/12">
                {String(photos.length).padStart(2, "0")}
              </span>
            </span>
            <span className="hidden md:block uppercase text-[9px] tracking-[0.3em] text-[#1A1A18]/28 font-sans">
              SCROLL TO EXPLORE
            </span>
            <span className="md:hidden uppercase text-[8px] tracking-[0.25em] text-[#1A1A18]/28 font-sans">
              SCROLL
            </span>
          </div>
        </div>

        {/* Track */}
        <div className="flex-1 overflow-visible min-h-0">
          <div
            ref={trackRef}
            className="flex gap-3 md:gap-6 h-full will-change-transform"
            style={{
              paddingLeft: "clamp(20px,5vw,80px)",
              paddingRight: "12vw",
              width: "max-content",
            }}
          >
            {photos.map((photo, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex flex-col gap-2.5 md:gap-3 h-full"
                style={{ width: "clamp(220px,72vw,340px)" }}
              >
                <div className="relative overflow-hidden h-[390px] md:flex-1">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                    draggable={false}
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 md:top-4 md:left-4 font-serif text-[10px] md:text-[11px] text-[#F5F0EB]/55 tracking-widest">
                    {photo.index}
                  </span>
                </div>
                {/* Caption removed as requested */}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-7 md:bottom-9 left-5 md:left-20 right-5 md:right-20 h-px bg-[#1A1A18]/10">
        <div
          ref={progressFillRef}
          className="h-full bg-[#C9A96E] origin-left"
            style={{ transform: "scaleX(0)", transformOrigin: "left" }}
        />
      </div>

      {/* Right-edge gradient */}
      <div
        className="absolute right-0 top-0 bottom-0 w-16 md:w-24 pointer-events-none"
        style={{
          background: "linear-gradient(to left, #F5F0EB 0%, transparent 100%)",
        }}
      />
    </section>
  );
}

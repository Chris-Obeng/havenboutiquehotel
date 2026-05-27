import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Utensils, Wifi, Car, Wine, Bell, Coffee } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const items = [
  { icon: Utensils, label: "Haven Restaurant" },
  { icon: Wifi, label: "Complimentary WiFi" },
  { icon: Car, label: "Airport Transportation" },
  { icon: Car, label: "Free Private Parking" },
  { icon: Wine, label: "Bar & Lounge" },
  { icon: Bell, label: "24-hour Front Desk" },
  { icon: Utensils, label: "Room Service" },
  { icon: Coffee, label: "Free Breakfast Included" },
];

export default function Amenities() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (labelRef.current) {
        gsap.set(labelRef.current, { opacity: 0, y: 12 });
        gsap.to(labelRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
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
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        });
      }

      if (gridRef.current) {
        const tiles =
          gridRef.current.querySelectorAll<HTMLElement>(".amenity-tile");
        tiles.forEach((tile, i) => {
          gsap.set(tile, { opacity: 0, y: 28 });
          gsap.to(tile, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            delay: i * 0.07,
            scrollTrigger: { trigger: gridRef.current, start: "top 86%" },
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="amenities"
      className="py-6 md:py-32 px-5 md:px-20 bg-[#0E2820] text-[#F5F0EB]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-16 flex flex-col gap-5">
          <span
            ref={labelRef}
            className="uppercase text-[10px] md:text-[11px] tracking-[0.28em] opacity-38 block font-sans"
          >
            INCLUDED WITH YOUR STAY
          </span>
          <h2
            ref={headingRef}
            className="font-serif font-light text-[clamp(28px,4.5vw,56px)] leading-[1.08]"
          >
            Everything You Need,
            <br />
            Nothing Unnecessary
          </h2>
        </div>

        {/* Grid — 2-col mobile, 4-col desktop */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 border-t border-[#F5F0EB]/8"
        >
          {items.map(({ icon: Icon, label }, i) => (
            <div
              key={label}
              className={[
                "amenity-tile flex flex-col items-start gap-3 md:gap-4",
                "py-7 md:py-9 px-4 md:px-6",
                "border-b border-[#F5F0EB]/8",
                "group transition-colors duration-300 hover:bg-[#F5F0EB]/4",
                /* right border logic:
                   mobile 2-col  → left col (even i) gets border-r
                   desktop 4-col → all except every 4th get border-r */
                i % 2 === 0 ? "border-r border-r-[#F5F0EB]/8" : "",
                "md:[&]:border-r md:[&]:border-r-[#F5F0EB]/8",
                (i + 1) % 4 === 0 ? "md:border-r-0" : "",
              ].join(" ")}
            >
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-[#F5F0EB]/12 flex items-center justify-center group-hover:border-[#C9A96E]/40 transition-colors duration-300">
                <Icon
                  size={14}
                  strokeWidth={1.25}
                  className="text-[#C9A96E]/70 group-hover:text-[#C9A96E] transition-colors duration-300"
                />
              </div>
              <span className="uppercase text-[9px] md:text-[10px] tracking-[0.22em] font-sans text-[#F5F0EB]/55 group-hover:text-[#F5F0EB]/80 transition-colors duration-300 leading-[1.6]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

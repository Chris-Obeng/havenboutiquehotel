import React, { useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const rooms = [
  {
    id: "executive-suite",
    title: "Executive Suite",
    image: "/rooms/executive_suite.png",
    aspectRatio: "3 / 2",
    meta: "FROM GH₵2,650 / NIGHT",
    size: "78 SQM",
    desc: "Our most expansive suite — a private terrace, king bed, and bespoke Ashanti-inspired furnishings for an unrivalled retreat.",
    features: ["King bed", "Private terrace", "Lounge area", "Rainfall shower"],
  },
  {
    id: "deluxe",
    title: "Deluxe Room",
    image: "/rooms/deluxe_room.png",
    aspectRatio: "3 / 2",
    meta: "FROM GH₵1,450 / NIGHT",
    size: "52 SQM",
    desc: "Generous proportions with a king bed, garden outlook, and warm hardwood interiors that celebrate the Ashanti craft tradition.",
    features: ["King bed", "Garden view", "Bathroom heater", "Writing desk"],
  },
  {
    id: "twin",
    title: "Twin Room",
    image: "/rooms/twin_room.png",
    aspectRatio: "4 / 3",
    meta: "FROM GH₵1,650 / NIGHT",
    size: "46 SQM",
    desc: "Two queen beds set within a calm, light-filled space — ideal for pairs seeking comfort without compromise.",
    features: [
      "Two queen beds",
      "Air conditioning",
      "Bathroom heater",
      "Seating area",
    ],
  },
  {
    id: "standard",
    title: "Standard Room",
    image: "/rooms/standard_room.png",
    aspectRatio: "3 / 2",
    meta: "FROM GH₵950 / NIGHT",
    size: "34 SQM",
    desc: "Thoughtfully appointed and serene — everything you need to rest deeply and wake renewed in the heart of Ashanti.",
    features: ["Queen bed", "Air conditioning", "Dining table", "Garden views"],
  },
];

export default function Rooms() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (labelRef.current) {
        gsap.set(labelRef.current, { opacity: 0, y: 14 });
        gsap.to(labelRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: labelRef.current, start: "top 88%" },
        });
      }
      if (headingRef.current) {
        gsap.set(headingRef.current, { clipPath: "inset(0 0 100% 0)", y: 22 });
        gsap.to(headingRef.current, {
          clipPath: "inset(0 0 0% 0)",
          y: 0,
          duration: 1.25,
          ease: "power4.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 88%" },
        });
      }
      if (cardsRef.current) {
        const cards =
          cardsRef.current.querySelectorAll<HTMLElement>(".room-card");
        cards.forEach((card, i) => {
          gsap.set(card, { opacity: 0, y: 48 });
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            delay: i * 0.11,
            scrollTrigger: { trigger: cardsRef.current, start: "top 84%" },
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-14 md:py-36 bg-[#F5F0EB]">
      {/* Header */}
      <div className="px-5 md:px-20 max-w-7xl mx-auto mb-10 md:mb-16">
        <span
          ref={labelRef}
          className="uppercase text-[10px] md:text-[11px] tracking-[0.26em] block mb-4 md:mb-5 text-[#1A1A18]/45 font-sans"
        >
          ACCOMMODATION
        </span>
        <div className="flex items-end justify-between gap-4">
          <h2
            ref={headingRef}
            className="font-serif font-light text-[clamp(32px,5.5vw,68px)] leading-[1.05]"
          >
            Rooms &amp; Suites
          </h2>
          <Link
            href="/rooms"
            className="group inline-flex items-center gap-2 uppercase text-[9px] md:text-[10px] tracking-[0.26em] text-[#1A1A18]/45 hover:text-[#1A1A18] transition-colors duration-300 font-sans mb-1 whitespace-nowrap"
          >
            VIEW ALL
            <span className="transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 inline-block">
              →
            </span>
          </Link>
        </div>
      </div>

      {/* 2×2 grid */}
      <div className="px-5 md:px-20">
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10 md:gap-x-10 md:gap-y-20"
        >
          {rooms.map((room, idx) => (
            <motion.div
              key={room.id}
              className="room-card flex flex-col group"
              data-testid={`card-room-${room.id}`}
            >
              {/* Image */}
              <div
                className="w-full overflow-hidden mb-5 md:mb-7 relative"
                style={{ aspectRatio: room.aspectRatio }}
              >
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.055] group-hover:brightness-[1.03]"
                  loading="lazy"
                />
                {/* Size badge */}
                <span className="absolute bottom-3 left-3 md:bottom-4 md:left-4 uppercase text-[8px] md:text-[9px] tracking-[0.28em] text-[#F5F0EB]/75 font-sans bg-[#0E2820]/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  {room.size}
                </span>
              </div>

              {/* Meta row — wrap on small screens */}
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2 md:mb-3">
                <h3 className="font-serif font-light text-[clamp(20px,2.8vw,32px)] leading-[1.1]">
                  {room.title}
                </h3>
                <span className="uppercase text-[8px] md:text-[9px] tracking-[0.18em] text-[#C9A96E] font-sans whitespace-nowrap">
                  {room.meta}
                </span>
              </div>

              <p className="font-light text-[13px] md:text-[15px] text-[#1A1A18]/58 mb-5 md:mb-6 leading-[1.82] font-sans">
                {room.desc}
              </p>

              {/* (Feature tags and CTA removed per design) */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

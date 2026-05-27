import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const distances = [
  { label: "CITY CENTRE", km: "15 KM" },
  { label: "KUMASI AIRPORT", km: "17 KM" },
  { label: "KNUST GARDENS", km: "11 KM" },
  { label: "MANHYIA PALACE", km: "18 KM" },
];

export default function Location() {
  const sectionRef     = useRef<HTMLElement>(null);
  const labelRef       = useRef<HTMLSpanElement>(null);
  const headingRef     = useRef<HTMLHeadingElement>(null);
  const bodyRef        = useRef<HTMLParagraphElement>(null);
  const distancesRef   = useRef<HTMLDivElement>(null);
  const mapRef         = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (labelRef.current) {
        gsap.set(labelRef.current, { opacity: 0, y: 10 });
        gsap.to(labelRef.current, {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        });
      }

      if (headingRef.current) {
        gsap.set(headingRef.current, { clipPath: "inset(0 0 100% 0)", y: 20 });
        gsap.to(headingRef.current, {
          clipPath: "inset(0 0 0% 0)", y: 0, duration: 1.2, ease: "power3.out",
          delay: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        });
      }

      if (bodyRef.current) {
        gsap.set(bodyRef.current, { opacity: 0, y: 20 });
        gsap.to(bodyRef.current, {
          opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
          delay: 0.25,
          scrollTrigger: { trigger: sectionRef.current, start: "top 83%" },
        });
      }

      if (distancesRef.current) {
        const items = distancesRef.current.querySelectorAll<HTMLElement>(".dist-item");
        items.forEach((el, i) => {
          gsap.set(el, { opacity: 0, x: -16 });
          gsap.to(el, {
            opacity: 1, x: 0, duration: 0.7, ease: "power2.out",
            delay: 0.1 + i * 0.1,
            scrollTrigger: { trigger: distancesRef.current, start: "top 85%" },
          });
        });
      }

      if (mapRef.current) {
        gsap.set(mapRef.current, { opacity: 0, scale: 0.94 });
        gsap.to(mapRef.current, {
          opacity: 1, scale: 1, duration: 1.3, ease: "power2.out",
          delay: 0.2,
          scrollTrigger: { trigger: mapRef.current, start: "top 85%" },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-14 md:py-36 px-5 md:px-20 bg-[#F5F0EB] text-[#1A1A18]"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 items-start">

        {/* Text column */}
        <div className="w-full md:w-[52%]">
          <span
            ref={labelRef}
            className="uppercase text-[10px] md:text-[11px] tracking-[0.25em] mb-5 md:mb-6 block text-[#1A1A18]/45 font-sans"
          >
            LOCATION
          </span>
          <h2
            ref={headingRef}
            className="font-serif font-light text-[clamp(28px,4.5vw,56px)] leading-[1.1] mb-6 md:mb-8 max-w-lg"
          >
            Rooted in Kumasi's Cultural Heart
          </h2>
          <p
            ref={bodyRef}
            className="font-light text-[14px] md:text-[16px] leading-[1.85] mb-8 md:mb-16 max-w-md text-[#1A1A18]/70"
          >
            Situated in the peaceful enclave of Ejisu, Haven provides a tranquil
            respite that remains intimately connected to the region's most
            significant landmarks. Manhyia Palace, KNUST Botanical Garden, and
            the vibrant Kejetia Market are all within a short, scenic drive.
          </p>

          {/* Distance callouts */}
          <div ref={distancesRef} className="grid grid-cols-2 gap-x-6 gap-y-0">
            {distances.map((d) => (
              <div key={d.label} className="dist-item border-t border-[#1A1A18]/10 py-4 md:py-6">
                <span className="uppercase text-[8px] md:text-[9px] tracking-[0.25em] text-[#1A1A18]/40 block mb-1.5 font-sans">
                  {d.label}
                </span>
                <span className="font-serif font-light text-[24px] md:text-[30px] leading-[1]">{d.km}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative compass */}
        <div
          ref={mapRef}
          className="w-full md:w-[48%] flex items-center justify-center py-4 md:py-0 md:mt-6"
        >
          <div className="w-full max-w-[760px]">
            <iframe
              src="https://www.google.com/maps?q=6.7222861,-1.4932188&z=17&output=embed"
              title="Haven Boutique Hotel location"
              className="w-full h-[300px] md:h-[420px] rounded-md border-0"
              loading="lazy"
              aria-hidden="false"
            />

            <div className="mt-4 text-center">
              <div className="font-serif font-light text-[18px] md:text-[20px]">Haven Boutique Hotel</div>
              <div className="text-sm text-[#1A1A18]/70">1 Cobbold Drive, Adako Jachie, Ejisu, Kumasi, Ghana</div>
              <a
                href="https://maps.google.com/?cid=2497286516822085084"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-[#C9A96E] hover:underline"
              >
                Get directions
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

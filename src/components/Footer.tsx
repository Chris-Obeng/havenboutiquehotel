import React from "react";
import { Link } from "wouter";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

const quickLinks = [
  { label: "Rooms & Suites", href: "/rooms" },
  { label: "Dining", href: "/dining" },
  { label: "Experiences", href: "/experiences" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0E2820] text-[#F5F0EB]">
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />

      <div className="px-5 md:px-20 pt-12 md:pt-20 pb-7 md:pb-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 mb-12 md:mb-20">
          {/* Col 1 — Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col">
            <Link
              href="/"
              className="font-serif text-[20px] md:text-[22px] tracking-[0.15em] mb-2.5 inline-block hover:opacity-70 transition-opacity"
            >
              HAVEN
            </Link>
            <span className="font-light text-[12px] md:text-[13px] text-[#F5F0EB]/55 mb-1 font-sans">
              Boutique Hotel · Kumasi, Ghana
            </span>
            <span className="font-light text-[12px] md:text-[13px] text-[#F5F0EB]/35 mb-7 font-sans">
              A private garden sanctuary in Ejisu.
            </span>
            <div className="w-[28px] h-[1px] bg-[#C9A96E]/40 mb-7" />
            <Link
              href="/contact"
              className="uppercase text-[9px] md:text-[10px] tracking-[0.25em] text-[#F5F0EB]/50 pb-0.5 border-b border-[#C9A96E]/30 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-colors inline-block w-fit font-sans"
              data-testid="link-footer-book"
            >
              ENQUIRE DIRECTLY
            </Link>
          </div>

          {/* Col 2 — Quick Links */}
          <div className="flex flex-col">
            <span className="uppercase text-[9px] md:text-[10px] tracking-[0.3em] mb-5 md:mb-7 text-[#F5F0EB]/35 font-sans">
              NAVIGATE
            </span>
            <ul className="flex flex-col gap-3 md:gap-[14px]">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="uppercase text-[10px] md:text-[11px] tracking-[0.2em] text-[#F5F0EB]/55 hover:text-[#F5F0EB] transition-colors duration-200 font-sans"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/ /g, "-")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div className="flex flex-col">
            <span className="uppercase text-[9px] md:text-[10px] tracking-[0.3em] mb-5 md:mb-7 text-[#F5F0EB]/35 font-sans">
              CONTACT
            </span>
            <address className="not-italic font-light text-[12px] md:text-[13px] text-[#F5F0EB]/55 flex flex-col gap-3 md:gap-4 font-sans">
              <span className="leading-[1.7]">
                Ejisu–Juaben Road
                <br />
                Ejisu, Ashanti Region
                <br />
                Ghana
              </span>
              <a
                href="mailto:hello@havenboutiquehotel.com"
                className="hover:text-[#C9A96E] transition-colors break-all"
              >
                hello@havenboutiquehotel.com
              </a>
              <a
                href="tel:+233200000000"
                className="hover:text-[#C9A96E] transition-colors"
              >
                +233204377379
              </a>
            </address>
          </div>

          {/* Col 4 — Social */}
          <div className="flex flex-col">
            <span className="uppercase text-[9px] md:text-[10px] tracking-[0.3em] mb-5 md:mb-7 text-[#F5F0EB]/35 font-sans">
              FOLLOW HAVEN
            </span>
            <div className="flex gap-4 mb-8 md:mb-10">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Haven on Instagram"
                className="w-11 h-11 rounded-full border border-[#F5F0EB]/15 flex items-center justify-center text-[#F5F0EB]/50 hover:text-[#F5F0EB] hover:border-[#F5F0EB]/40 transition-all duration-200"
                data-testid="link-footer-instagram"
              >
                <FaInstagram size={15} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Haven on Facebook"
                className="w-11 h-11 rounded-full border border-[#F5F0EB]/15 flex items-center justify-center text-[#F5F0EB]/50 hover:text-[#F5F0EB] hover:border-[#F5F0EB]/40 transition-all duration-200"
                data-testid="link-footer-facebook"
              >
                <FaFacebookF size={14} />
              </a>
            </div>
            <p className="font-light text-[12px] md:text-[13px] text-[#F5F0EB]/35 leading-[1.75] max-w-[200px] font-sans">
              Share your Haven experience — tag us at #HavenBoutiqueHotel
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto border-t border-[#F5F0EB]/8 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-3">
          <span className="text-[9px] md:text-[10px] tracking-[0.15em] text-[#F5F0EB]/25 font-sans">
            © 2026 Haven Boutique Hotel. All rights reserved.
          </span>
          <span className="text-[9px] md:text-[10px] tracking-[0.12em] text-[#F5F0EB]/20 font-sans">
            EJISU · ASHANTI REGION · GHANA
          </span>
        </div>
      </div>
    </footer>
  );
}

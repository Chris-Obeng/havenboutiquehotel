import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";

/**
 * LiquidButton — pill CTA with a liquid fill sweep on hover.
 *
 * fillDirection
 *   "left"    fill sweeps left → right (default)
 *   "bottom"  fill rises bottom → top
 *
 * Variants
 *   "dark"        cream/light backgrounds
 *   "light"       dark/green backgrounds
 *   "ghost-light" dark backgrounds, secondary CTA
 */

type Variant       = "dark" | "light" | "ghost-light";
type FillDirection = "left" | "bottom";

interface LiquidButtonProps {
  href:           string;
  children:       React.ReactNode;
  variant?:       Variant;
  fillDirection?: FillDirection;
  className?:     string;
  "data-testid"?: string;
}

const config: Record<
  Variant,
  { border: string; text: string; fill: string; hoverText: string }
> = {
  dark: {
    border:    "border-[#1A1A18]/60",
    text:      "text-[#1A1A18]",
    fill:      "bg-[#1A1A18]",
    hoverText: "group-hover:text-[#F5F0EB]",
  },
  light: {
    border:    "border-[#F5F0EB]/65",
    text:      "text-[#F5F0EB]",
    fill:      "bg-[#F5F0EB]",
    hoverText: "group-hover:text-[#0D1F17]",
  },
  "ghost-light": {
    border:    "border-[#F5F0EB]/30",
    text:      "text-[#F5F0EB]",
    fill:      "bg-[#F5F0EB]",
    hoverText: "group-hover:text-[#0D1F17]",
  },
};

export default function LiquidButton({
  href,
  children,
  variant       = "dark",
  fillDirection = "left",
  className     = "",
  "data-testid": testId,
}: LiquidButtonProps) {
  const v         = config[variant];
  const fillClass = fillDirection === "bottom" ? "haven-btn-fill-up" : "haven-btn-fill";

  return (
    <motion.div
      className="inline-block"
      whileTap={{ scale: 0.95, y: 1 }}
      transition={{ type: "spring", stiffness: 700, damping: 35 }}
    >
      <Link
        href={href}
        className={`
          haven-btn group
          relative inline-flex items-center justify-center
          overflow-hidden rounded-full border
          ${v.border} ${v.text}
          px-8 py-3 md:px-10 md:py-[14px]
          min-h-[44px]
          ${className}
        `}
        data-testid={testId}
      >
        <span
          className={`${fillClass} ${v.fill}`}
          aria-hidden="true"
        />
        <span
          className={`
            haven-btn-label
            uppercase tracking-[0.22em] md:tracking-[0.24em] text-[10px] md:text-[11px] font-sans font-light
            ${v.hoverText}
          `}
        >
          {children}
        </span>
      </Link>
    </motion.div>
  );
}

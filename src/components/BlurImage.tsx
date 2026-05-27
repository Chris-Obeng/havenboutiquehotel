import React, { useState, useRef, useEffect } from "react";

/**
 * BlurImage — blur-up image loading
 *
 * Shows a tiny blurred thumbnail (from Unsplash's CDN at 30px wide)
 * immediately, then cross-fades to the full-resolution image as it loads.
 * Eliminates layout shift and makes images feel intentional, not accidental.
 *
 * Compatible with any Unsplash URL. For other image sources, the component
 * falls back to a solid dark-green placeholder.
 */

interface BlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
}

function makeThumb(src: string): string {
  try {
    const url = new URL(src);
    url.searchParams.set("w", "40");
    url.searchParams.set("q", "10");
    url.searchParams.delete("auto");
    return url.toString();
  } catch {
    return "";
  }
}

export default function BlurImage({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  wrapperStyle,
  loading = "lazy",
  ...rest
}: BlurImageProps) {
  const [fullLoaded, setFullLoaded] = useState(false);
  const [thumbLoaded, setThumbLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const thumbSrc = makeThumb(src);

  // Handle the case where the image is already cached on mount
  useEffect(() => {
    if (imgRef.current?.complete) setFullLoaded(true);
  }, []);

  return (
    <div
      className={`relative overflow-hidden ${wrapperClassName}`}
      style={wrapperStyle}
    >
      {/* ── Blurred thumbnail — loads near-instantly ─────── */}
      {thumbSrc && (
        <img
          src={thumbSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          style={{
            filter:    "blur(12px)",
            transform: "scale(1.08)",
            opacity:   fullLoaded ? 0 : thumbLoaded ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
          onLoad={() => setThumbLoaded(true)}
        />
      )}

      {/* ── Solid fallback while thumbnail loads ─────────── */}
      <div
        className="absolute inset-0 bg-[#1E3028] pointer-events-none"
        style={{
          opacity:   fullLoaded || thumbLoaded ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
        aria-hidden="true"
      />

      {/* ── Full-resolution image ─────────────────────────── */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        className={`w-full h-full object-cover ${className}`}
        style={{
          opacity:    fullLoaded ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
        onLoad={() => setFullLoaded(true)}
        {...rest}
      />
    </div>
  );
}

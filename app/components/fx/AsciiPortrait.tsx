"use client";

import Image from "next/image";
import { useRef } from "react";
import { GLYPH_RAMP } from "../../lib/ascii";
import { AsciiCanvas } from "./AsciiCanvas";

/**
 * A portrait drawn in ASCII that resolves into the real photo on hover (and
 * stays a photo on touch, where there's no hover). The photo is the
 * accessible image; the ASCII layer is decorative.
 */
export function AsciiPortrait({ src, alt }: { src: string; alt: string }) {
  const source = useRef<HTMLImageElement>(null);
  return (
    <figure data-cursor="look" className="group relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-line bg-ink-2">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 420px, 90vw"
        className="object-cover opacity-100 transition-opacity duration-700 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100"
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- sampled by the canvas, never shown */}
      <img ref={source} src={src} alt="" aria-hidden="true" className="absolute h-px w-px opacity-0" />
      <div className="absolute inset-0 hidden transition-opacity duration-700 group-hover:opacity-0 [@media(hover:hover)]:block">
        <AsciiCanvas source={source} live={false} ramp={GLYPH_RAMP} cell={7} contrast={1.3} />
      </div>
      <figcaption className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 font-mono text-[11px] text-fg-muted backdrop-blur [@media(hover:none)]:hidden">
        hover to render
      </figcaption>
    </figure>
  );
}

"use client";

import { useRef, type ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../ui/icons";

/**
 * Apple's horizontal gallery: native scrolling with snap points (swipe on
 * touch, trackpad on desktop) plus round paddle buttons that move one card.
 */
export function ProjectsGallery({ children }: { children: ReactNode }) {
  const track = useRef<HTMLUListElement>(null);

  const move = (direction: 1 | -1) => {
    const element = track.current;
    if (!element) return;
    const card = element.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 20 : element.clientWidth * 0.8;
    element.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <div className="mt-14">
      <ul
        ref={track}
        data-testid="projects-gallery"
        className="gallery gap-5 px-5 pb-4 [scroll-padding-inline:1.25rem] sm:px-[max(2rem,calc((100vw-980px)/2+2rem))] sm:[scroll-padding-inline:max(2rem,calc((100vw-980px)/2+2rem))]"
      >
        {children}
      </ul>
      <div className="mx-auto mt-6 flex max-w-[980px] justify-end gap-3 px-5 sm:px-8">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous project"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-hairline-light/60 text-graphite transition-colors hover:bg-hairline-light"
        >
          <ChevronLeftIcon width={18} height={18} />
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Next project"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-hairline-light/60 text-graphite transition-colors hover:bg-hairline-light"
        >
          <ChevronRightIcon width={18} height={18} />
        </button>
      </div>
    </div>
  );
}

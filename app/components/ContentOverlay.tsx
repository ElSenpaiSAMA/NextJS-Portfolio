"use client";

import { HeroContent }     from "./sections/HeroContent";
import { ProjectsContent } from "./sections/ProjectsContent";
import { AboutContent }    from "./sections/AboutContent";

// Sections stack on top of each other.
// CameraRig drives each section's opacity+transform from useFrame.
const SECTIONS = [
  { id: "section-hero",     Component: HeroContent,     initialOp: 1 },
  { id: "section-projects", Component: ProjectsContent, initialOp: 0 },
  { id: "section-about",    Component: AboutContent,    initialOp: 0 },
] as const;

export function ContentOverlay() {
  return (
    <>
      {SECTIONS.map(({ id, Component, initialOp }) => (
        <div
          key={id}
          id={id}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 5,
            opacity: initialOp,
            pointerEvents: initialOp > 0 ? "auto" : "none",
            willChange: "opacity, transform",
          }}
        >
          <Component />
        </div>
      ))}
    </>
  );
}

"use client";

import { useSceneStore } from "../store/sceneStore";
import { HeroContent } from "./sections/HeroContent";
import { ProjectsContent } from "./sections/ProjectsContent";
import { AboutContent } from "./sections/AboutContent";
import { ContactContent } from "./sections/ContactContent";

const SECTIONS = [
  { id: "hero",     Component: HeroContent },
  { id: "projects", Component: ProjectsContent },
  { id: "about",    Component: AboutContent },
  { id: "contact",  Component: ContactContent },
] as const;

export function ContentOverlay() {
  const active = useSceneStore((s) => s.active);
  const index = SECTIONS.findIndex((s) => s.id === active);

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 5,
      overflow: "hidden",
      pointerEvents: "none",
    }}>
      <div style={{
        display: "flex",
        width: `${SECTIONS.length * 100}vw`,
        height: "100vh",
        transform: `translateX(-${index * 100}vw)`,
        transition: "transform 0.82s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        willChange: "transform",
      }}>
        {SECTIONS.map(({ id, Component }) => (
          <div
            key={id}
            style={{
              width: "100vw",
              height: "100vh",
              flexShrink: 0,
              position: "relative",
              pointerEvents: active === id ? "auto" : "none",
            }}
          >
            <Component />
          </div>
        ))}
      </div>
    </div>
  );
}

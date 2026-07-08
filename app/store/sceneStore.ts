import { create } from "zustand";

export type Section = "hero" | "projects" | "about";

// Where the camera aims when navigating to each section
export const SECTION_PROGRESS: Record<Section, number> = {
  hero:     0,
  projects: 0.35,
  about:    0.76,
};

interface SceneStore {
  active:            Section;
  scrollTarget:      number | null;
  /** Camera scroll progress (0–1), published by CameraRig via setState (no hook)
   *  so shaders/effects can read it without prop-drilling or per-frame re-renders. */
  scrollProgress:    number;
  setActive:         (s: Section) => void;
  navigateTo:        (s: Section) => void;
  clearScrollTarget: () => void;
  setScrollProgress: (p: number) => void;
}

export const useSceneStore = create<SceneStore>((set) => ({
  active:            "hero",
  scrollTarget:      null,
  scrollProgress:    0,
  setActive:         (active) => set({ active }),
  navigateTo:        (section) => set({ active: section, scrollTarget: SECTION_PROGRESS[section] }),
  clearScrollTarget: () => set({ scrollTarget: null }),
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
}));

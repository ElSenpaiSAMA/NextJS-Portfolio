import { create } from "zustand";

export type Section = "hero" | "projects" | "about";

export const SECTION_PROGRESS: Record<Section, number> = {
  hero:     0,
  projects: 0.4,
  about:    0.8,
};

interface SceneStore {
  active:            Section;
  scrollTarget:      number | null;
  setActive:         (s: Section) => void;
  navigateTo:        (s: Section) => void;
  clearScrollTarget: () => void;
}

export const useSceneStore = create<SceneStore>((set) => ({
  active:            "hero",
  scrollTarget:      null,
  setActive:         (active) => set({ active }),
  navigateTo:        (section) => set({ active: section, scrollTarget: SECTION_PROGRESS[section] }),
  clearScrollTarget: () => set({ scrollTarget: null }),
}));

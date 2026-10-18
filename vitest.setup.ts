import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

/*
 * jsdom lacks the browser APIs the animated sections rely on. Minimal,
 * inert stand-ins: no motion, nothing intersects, no WebGL (so the 3D scene
 * is never mounted in unit tests — it's covered by E2E in a real browser).
 */
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

class InertIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
Object.defineProperty(window, "IntersectionObserver", { writable: true, value: InertIntersectionObserver });

HTMLCanvasElement.prototype.getContext = (() => null) as typeof HTMLCanvasElement.prototype.getContext;

/**
 * Background footage. Real clips from Mixkit (free licence, see
 * docs/ai/04-content.md), re-encoded for the web: MP4 (H.264) first, WebM
 * (VP9) as fallback for browsers without H.264. Audio stripped.
 */

export interface VideoSources {
  mp4: string;
  webm: string;
}

export interface FootageClip {
  /** Still frame shown before (or instead of) the video. */
  poster: string;
  /** Short loop for phones and ambient use. */
  loop: VideoSources;
  /** Dense-keyframe version for scroll scrubbing (desktop). */
  scrub?: VideoSources;
  /** Where it came from — kept in code so credits never get lost. */
  source: { title: string; url: string };
}

export const heroFootage: FootageClip = {
  poster: "/media/hero-poster.jpg",
  loop: { mp4: "/media/hero-loop.mp4", webm: "/media/hero-loop.webm" },
  scrub: { mp4: "/media/hero-scrub.mp4", webm: "/media/hero-scrub.webm" },
  source: {
    title: "Large container area working at night (Mixkit 36318)",
    url: "https://mixkit.co/free-stock-video/large-container-area-working-at-night-36318/",
  },
};

export const contactFootage: FootageClip = {
  poster: "/media/ship-poster.jpg",
  loop: { mp4: "/media/ship.mp4", webm: "/media/ship.webm" },
  source: {
    title: "Flying over a cargo ship leaving a port (Mixkit 35869)",
    url: "https://mixkit.co/free-stock-video/flying-over-a-cargo-ship-leaving-a-port-35869/",
  },
};

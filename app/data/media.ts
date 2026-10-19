/**
 * Background footage. Real clips from Mixkit (free licence, see
 * docs/ai/04-content.md), re-encoded for the web: MP4 (H.264) first, WebM
 * (VP9) as fallback. Audio stripped.
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
  /** Dense-keyframe version (a keyframe every 8 frames) for scroll scrubbing. */
  scrub?: VideoSources;
  /** Where it came from — kept in code so credits never get lost. */
  source: { title: string; url: string };
}

/** Hero: walking down a server aisle — the scroll drives the camera. */
export const heroFootage: FootageClip = {
  poster: "/media/datacenter-poster.jpg",
  loop: { mp4: "/media/datacenter-loop.mp4", webm: "/media/datacenter-loop.webm" },
  scrub: { mp4: "/media/datacenter-scrub.mp4", webm: "/media/datacenter-scrub.webm" },
  source: {
    title: "Long hallway in data center (Mixkit 23219)",
    url: "https://mixkit.co/free-stock-video/long-hallway-in-data-center-23219/",
  },
};

/** Contact: a circuit board with amber lights, the site's accent colour. */
export const contactFootage: FootageClip = {
  poster: "/media/circuit-poster.jpg",
  loop: { mp4: "/media/circuit-loop.mp4", webm: "/media/circuit-loop.webm" },
  source: {
    title: "High tech circuit board with processor (Mixkit 47051)",
    url: "https://mixkit.co/free-stock-video/high-tech-circuit-board-with-processor-47051/",
  },
};

import { seededRandom } from "../../lib/hero-progress";

/*
 * Painted stand-in for the 3D harbour: the same sunset and a container-stack
 * skyline as flat SVG. Shown on phones (where WebGL costs too much battery and
 * main-thread time), without WebGL, and until the 3D scene has loaded.
 * Server component, generated deterministically — zero client JavaScript.
 */
const WIDTH = 1600;
const HEIGHT = 900;
const HORIZON = 600;
const SHADES = ["#1b0d33", "#22113f", "#2a1347", "#311852"];

interface Stack {
  x: number;
  width: number;
  height: number;
  shade: string;
}

function buildSkyline(): Stack[] {
  const random = seededRandom(11);
  const stacks: Stack[] = [];
  let x = -20;
  while (x < WIDTH) {
    // Leave the boulevard open in the middle, like the 3D scene.
    const distanceFromCenter = Math.abs(x - WIDTH / 2);
    const width = 40 + random() * 70;
    if (distanceFromCenter > 90) {
      const levels = 1 + Math.floor(random() * (2 + (distanceFromCenter / WIDTH) * 10));
      stacks.push({ x, width, height: levels * 34, shade: SHADES[Math.floor(random() * SHADES.length)] });
    }
    x += width + random() * 6;
  }
  return stacks;
}

const SKYLINE = buildSkyline();

export function StaticSkyline() {
  return (
    // The sky continues above the SVG on tall (portrait) screens, where the
    // drawing takes the lower part of the screen (cropping the sides) instead of
    // being zoomed in to fill the full height.
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{ background: "linear-gradient(180deg, #160b2e 0%, #3d1a5b 100%)" }}
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-x-0 bottom-0 h-[62%] w-full md:h-full"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          {/* Transparent at the top so it melts into the wrapper sky on tall screens */}
          <stop offset="0" stopColor="#3d1a5b" stopOpacity="0" />
          <stop offset="0.38" stopColor="#3d1a5b" />
          <stop offset="0.6" stopColor="#ff4f8b" />
          <stop offset="0.68" stopColor="#ff7849" />
        </linearGradient>
        <radialGradient id="sun" cx="0.5" cy="0.66" r="0.18">
          <stop offset="0" stopColor="#ffd2b3" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ff7849" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={WIDTH} height={HEIGHT} fill="url(#sky)" />
      <rect width={WIDTH} height={HEIGHT} fill="url(#sun)" />
      {SKYLINE.map((stack, i) => (
        <rect key={i} x={stack.x} y={HORIZON - stack.height} width={stack.width} height={stack.height} fill={stack.shade} />
      ))}
      <rect y={HORIZON} width={WIDTH} height={HEIGHT - HORIZON} fill="#120922" />
      {/* Boulevard lane markings converging on the sun */}
      {Array.from({ length: 7 }, (_, i) => {
        const t = i / 7;
        const y = HORIZON + 12 + t * t * (HEIGHT - HORIZON);
        const h = 6 + t * 40;
        return <rect key={i} x={WIDTH / 2 - 1 - t * 4} y={y} width={2 + t * 8} height={h} fill="#ff4f8b" opacity={0.85} />;
      })}
    </svg>
    </div>
  );
}

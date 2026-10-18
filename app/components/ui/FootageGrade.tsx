/**
 * Colour grade laid over real footage so any clip lands in the Night Shift
 * palette without drowning it: a dusk tint in soft-light (keeps the image's
 * own contrast and lights) plus a faint sunset glow on the horizon.
 * Purely decorative.
 */
export function FootageGrade({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#5b3a9e_0%,#ff4f8b_75%,#ff7849_100%)] opacity-55 mix-blend-soft-light" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(255,120,73,0.18),transparent_60%)] mix-blend-screen" />
    </div>
  );
}

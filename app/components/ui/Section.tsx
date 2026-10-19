import type { ReactNode } from "react";

export type Tone = "dark" | "paper" | "light";

/** Background + text colour per tone. Sections alternate like an Apple product page. */
export const TONES: Record<Tone, string> = {
  dark: "bg-black text-white",
  paper: "bg-paper text-graphite",
  light: "bg-white text-graphite",
};

/** Secondary text colour that passes contrast on each tone. */
export const MUTED: Record<Tone, string> = {
  dark: "text-mute-dark",
  paper: "text-mute-light",
  light: "text-mute-light",
};

interface SectionProps {
  id: string;
  title: ReactNode;
  tone: Tone;
  /** One plain sentence under the title. */
  intro?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** A page section: big tight headline (it rises in on scroll), then its content. */
export function Section({ id, title, tone, intro, className = "", children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`scroll-mt-12 py-24 sm:py-32 ${TONES[tone]} ${className}`}>
      <div className="mx-auto max-w-[980px] px-5 sm:px-8">
        <h2 id={headingId} data-rise className="headline text-[clamp(2.5rem,6vw,4.5rem)]">
          {title}
        </h2>
        {intro && (
          <p data-rise className={`mt-5 max-w-2xl text-xl leading-snug sm:text-2xl ${MUTED[tone]}`}>
            {intro}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

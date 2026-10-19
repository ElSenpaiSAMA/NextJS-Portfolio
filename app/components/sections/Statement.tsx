import { profile } from "../../data/profile";

/**
 * Apple's "words light up as you read" paragraph: the intro set huge, one
 * span per word. ScrollChoreography dims them and scrubs each to full white
 * as you scroll; without JavaScript (or with reduced motion) it's plain text.
 */
export function Statement() {
  const words = profile.intro.split(" ");
  return (
    <section aria-label="Introduction" className="bg-black px-5 py-28 sm:px-8 sm:py-44">
      <p data-statement className="headline mx-auto max-w-[980px] text-[clamp(1.75rem,4.2vw,3.25rem)] leading-[1.15] text-white">
        {words.map((word, i) => (
          <span key={i} data-word>
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </p>
    </section>
  );
}

import { STORY } from "../../data/highlights";
import { storyFootage } from "../../data/media";
import { ScrubVideo } from "../ui/ScrubVideo";

/**
 * Build. Ship. Run. — a pinned chapter over circuit-board footage. On desktop
 * ScrollChoreography pins it, scrubs the video and swaps the three captions
 * in place (it sets `data-scrubbing`, which stacks them in one grid cell).
 * Everywhere else the captions simply read top to bottom over a muted loop.
 */
export function Story() {
  return (
    <section id="how-i-work" aria-labelledby="how-i-work-heading" data-story className="relative isolate overflow-hidden bg-black text-white md:min-h-[100svh]">
      <div className="absolute inset-0 -z-10">
        <ScrubVideo clip={storyFootage} name="story" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgb(0_0_0/0.85)_0%,rgb(0_0_0/0.55)_55%,rgb(0_0_0/0.2)_100%)]" />
      </div>

      <div className="mx-auto flex max-w-[980px] flex-col justify-center px-5 py-28 sm:px-8 md:min-h-[100svh]">
        <h2 id="how-i-work-heading" className="text-lg font-semibold text-mute-dark sm:text-xl">
          How I work
        </h2>
        <ol className="mt-6 grid gap-14">
          {STORY.map((chapter) => (
            <li key={chapter.title} data-story-caption>
              <h3 className="headline text-[clamp(3.5rem,10vw,8rem)] leading-none">{chapter.title}</h3>
              <p className="mt-5 max-w-lg text-xl leading-snug text-mute-dark sm:text-2xl">{chapter.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

import { SECTION_LABELS } from "../../data/ship";
import { ConfigEditor } from "../ship/ConfigEditor";
import { Section } from "../ui/Section";

/** The visitor gets the keyboard: edit the site's config and watch the whole page follow. */
export function Config() {
  return (
    <Section
      id="config"
      label={SECTION_LABELS.config}
      title="Make it yours."
      intro="This page reads its look from a config file. Change a value below (accent, theme, radius, font) and everything follows, with the same validation an editor would give you."
    >
      <div className="mx-auto mt-12 grid max-w-6xl gap-8 px-5 sm:px-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center">
        <div data-reveal>
          <ConfigEditor />
        </div>
        <ul data-reveal className="space-y-4 text-fg-muted">
          <li>
            <span className="font-mono text-sm text-fg">theme: &quot;dark&quot;</span> flips every colour token at once.
          </li>
          <li>
            <span className="font-mono text-sm text-fg">accent</span> takes any hex colour; buttons, links and the deploy bar pick it up.
          </li>
          <li>
            <span className="font-mono text-sm text-fg">radius</span> reshapes every corner, from 0 to 32.
          </li>
          <li>Break it on purpose: invalid values show up as problems and the rest keeps working.</li>
        </ul>
      </div>
    </Section>
  );
}

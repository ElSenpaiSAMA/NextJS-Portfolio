import { GLYPH_RAMP } from "../../lib/ascii";
import { circuitFootage } from "../../data/media";
import { profile } from "../../data/profile";
import { SECTION_PATHS } from "../../data/source";
import { AsciiFootage } from "../fx/AsciiFootage";
import { GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from "../ui/icons";
import { ContactForm } from "./ContactForm";

const CHANNELS = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon, external: false },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phoneHref}`, Icon: PhoneIcon, external: false },
  // Display text derives from the URL so the two can never drift apart.
  { label: "LinkedIn", value: profile.linkedinUrl.replace(/^https:\/\/(www\.)?/, ""), href: profile.linkedinUrl, Icon: LinkedInIcon, external: true },
  { label: "GitHub", value: profile.githubUrl.replace(/^https:\/\//, ""), href: profile.githubUrl, Icon: GitHubIcon, external: true },
] as const;

/** Closing section over the circuit board in ASCII: one big line, the direct channels and the form. */
export function Contact() {
  const title = "Let's work together";
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative isolate scroll-mt-14 overflow-hidden bg-ink py-28 sm:py-40">
      <div className="absolute inset-0 -z-10">
        <AsciiFootage clip={circuitFootage} name="contact" ramp={GLYPH_RAMP} cell={10} intensity={0.35} />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,var(--ink)_0%,transparent_30%,transparent_70%,var(--ink)_100%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p aria-hidden="true" className="font-mono text-sm text-fg-subtle">
          <span className="text-accent">~/</span>
          {SECTION_PATHS.contact}
        </p>
        <h2 id="contact-heading" aria-label={title} className="display mt-4 max-w-4xl text-[clamp(3.25rem,10vw,8.5rem)]">
          <span aria-hidden="true" data-scramble>
            {title}
          </span>
          <span aria-hidden="true" className="text-accent">
            .
          </span>
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted sm:text-xl">
          Open to Platform / DevOps and backend roles. Email is the quickest way to reach me.
        </p>

        <div className="mt-14 grid gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {CHANNELS.map(({ label, value, href, Icon, external }) => (
              <li key={label} data-reveal>
                <a
                  href={href}
                  data-magnetic
                  data-cursor={external ? "open" : "write"}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 rounded-xl border border-line bg-ink-2/80 px-5 py-4 backdrop-blur transition-colors hover:border-accent"
                >
                  <Icon width={20} height={20} className="shrink-0 text-fg-subtle transition-colors group-hover:text-accent" />
                  <span className="min-w-0">
                    <span className="block font-mono text-xs text-fg-subtle">{label}</span>
                    <span className="block truncate font-medium">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div data-reveal className="rounded-xl border border-line bg-ink-2/90 p-6 backdrop-blur sm:p-8">
            <h3 className="font-mono text-sm text-accent">
              <span aria-hidden="true">$ </span>send-message
            </h3>
            <div className="mt-6">
              <ContactForm formId={profile.formspreeId} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

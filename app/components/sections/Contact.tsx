import { profile } from "../../data/profile";
import { SECTION_LABELS } from "../../data/ship";
import { GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from "../ui/icons";
import { Section } from "../ui/Section";
import { ContactForm } from "./ContactForm";

const CHANNELS = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon, external: false },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phoneHref}`, Icon: PhoneIcon, external: false },
  // Display text derives from the URL so the two can never drift apart.
  { label: "LinkedIn", value: profile.linkedinUrl.replace(/^https:\/\/(www\.)?/, ""), href: profile.linkedinUrl, Icon: LinkedInIcon, external: true },
  { label: "GitHub", value: profile.githubUrl.replace(/^https:\/\//, ""), href: profile.githubUrl, Icon: GitHubIcon, external: true },
] as const;

/** Contact as "open an issue": the direct channels, and a new-issue form. */
export function Contact() {
  return (
    <Section
      id="contact"
      label={SECTION_LABELS.contact}
      title="Let's work together"
      intro="Open to Platform / DevOps and backend roles. Email is the quickest way to reach me."
      className="pb-32"
    >
      <div className="mx-auto mt-12 grid max-w-6xl gap-5 px-5 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <ul className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {CHANNELS.map(({ label, value, href, Icon, external }) => (
            <li key={label} data-reveal>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center gap-4 rounded-ui border border-line bg-surface px-5 py-4 transition-colors hover:border-accent"
              >
                <Icon width={20} height={20} className="shrink-0 text-fg-subtle transition-colors group-hover:text-accent-text" />
                <span className="min-w-0">
                  <span className="block font-mono text-xs text-fg-subtle">{label}</span>
                  <span className="block truncate font-medium">{value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div data-reveal className="overflow-hidden rounded-ui border border-line bg-surface">
          <div className="flex items-center gap-2 border-b border-line px-5 py-3">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full border-2 border-ok" />
            <h3 className="font-semibold">New issue</h3>
            <span className="ml-auto rounded-full bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-fg-muted">label: opportunity</span>
          </div>
          <div className="p-5 sm:p-6">
            <ContactForm formId={profile.formspreeId} />
          </div>
        </div>
      </div>
    </Section>
  );
}

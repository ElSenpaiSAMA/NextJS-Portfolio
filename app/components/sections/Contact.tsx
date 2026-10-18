import { profile } from "../../data/profile";
import { GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from "../ui/icons";
import { Section } from "../ui/Section";
import { Window } from "../ui/Window";
import { ContactForm } from "./ContactForm";

const CHANNELS = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon, external: false },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phoneHref}`, Icon: PhoneIcon, external: false },
  // Display text derives from the URL so the two can never drift apart.
  { label: "LinkedIn", value: profile.linkedinUrl.replace(/^https:\/\/(www\.)?/, ""), href: profile.linkedinUrl, Icon: LinkedInIcon, external: true },
  { label: "GitHub", value: profile.githubUrl.replace(/^https:\/\//, ""), href: profile.githubUrl, Icon: GitHubIcon, external: true },
] as const;

/** Closing section: the direct channels, and a message form in its own window. */
export function Contact() {
  return (
    <Section
      id="contact"
      title="Let's ship something"
      intro="Open to Platform / DevOps and backend roles. Email is the quickest way to reach me."
      className="pb-24 pt-24 sm:pb-32 sm:pt-32"
    >
      <div className="mx-auto mt-12 grid max-w-6xl gap-8 px-5 sm:px-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
        <ul className="space-y-3">
          {CHANNELS.map(({ label, value, href, Icon, external }) => (
            <li key={label} data-reveal>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center gap-4 rounded-lg border border-line bg-panel px-5 py-4 transition-colors hover:border-amber"
              >
                <Icon width={20} height={20} className="shrink-0 text-fg-subtle transition-colors group-hover:text-amber" />
                <span className="min-w-0">
                  <span className="block font-mono text-xs text-fg-subtle">{label}</span>
                  <span className="block truncate font-mono text-base font-medium text-fg transition-colors group-hover:text-amber sm:text-lg">
                    {value}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <Window title={<span aria-hidden="true">~/portfolio/message.txt</span>} className="self-start" bodyClassName="p-6 sm:p-8">
          <h3 className="font-mono text-lg font-bold text-fg">Send a message</h3>
          <div className="mt-6">
            <ContactForm formId={profile.formspreeId} />
          </div>
        </Window>
      </div>
    </Section>
  );
}

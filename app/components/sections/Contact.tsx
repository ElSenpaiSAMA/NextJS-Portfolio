import { profile } from "../../data/profile";
import { GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from "../ui/icons";
import { ContactForm } from "./ContactForm";

const CHANNELS = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon, external: false },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phoneHref}`, Icon: PhoneIcon, external: false },
  // Display text derives from the URL so the two can never drift apart.
  { label: "LinkedIn", value: profile.linkedinUrl.replace(/^https:\/\/(www\.)?/, ""), href: profile.linkedinUrl, Icon: LinkedInIcon, external: true },
  { label: "GitHub", value: profile.githubUrl.replace(/^https:\/\//, ""), href: profile.githubUrl, Icon: GitHubIcon, external: true },
] as const;

/** Closing scene: a sunset-lit sign and the ways to reach me. */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative overflow-hidden pb-24 pt-28 sm:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-[radial-gradient(ellipse_at_50%_120%,rgba(255,79,139,0.35),transparent_65%)]"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 id="contact-heading" className="display ink-sunset w-fit text-[clamp(3.5rem,13vw,12rem)]">
          Let&apos;s ship something
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-haze-muted">
          Open to Platform / DevOps and backend roles. Email is the quickest way to reach me.
        </p>

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
          <ul className="border-t border-dusk-line">
            {CHANNELS.map(({ label, value, href, Icon, external }) => (
              <li key={label} className="border-b border-dusk-line">
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-5 py-5 transition-colors"
                >
                  <Icon width={22} height={22} className="shrink-0 text-haze-subtle transition-colors group-hover:text-sunset" />
                  <span className="min-w-0">
                    <span className="block text-sm text-haze-subtle">{label}</span>
                    <span className="block truncate text-xl font-semibold text-haze transition-colors group-hover:text-sunset sm:text-2xl">
                      {value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="rounded-[2rem] border border-dusk-line bg-dusk/70 p-6 backdrop-blur sm:p-8">
            <h3 className="text-lg font-semibold text-haze">Send a message</h3>
            <div className="mt-6">
              <ContactForm formId={profile.formspreeId} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

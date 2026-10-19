import { profile } from "../../data/profile";
import { GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from "../ui/icons";
import { ContactForm } from "./ContactForm";
import { CopyButton } from "./CopyButton";

const subject = encodeURIComponent("Hello Matias");
const MAIL_OPTIONS = [
  { label: "Open in Gmail", href: `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${subject}`, external: true },
  { label: "Open in Outlook", href: `https://outlook.live.com/mail/0/deeplink/compose?to=${profile.email}&subject=${subject}`, external: true },
  { label: "Mail app", href: `mailto:${profile.email}?subject=${subject}`, external: false },
];

const CHANNELS = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon, external: false },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phoneHref}`, Icon: PhoneIcon, external: false },
  // Display text derives from the URL so the two can never drift apart.
  { label: "LinkedIn", value: profile.linkedinUrl.replace(/^https:\/\/(www\.)?/, ""), href: profile.linkedinUrl, Icon: LinkedInIcon, external: true },
  { label: "GitHub", value: profile.githubUrl.replace(/^https:\/\//, ""), href: profile.githubUrl, Icon: GitHubIcon, external: true },
] as const;

/** "Let's talk.": write from wherever you are (Gmail, Outlook, the mail app, or copy the address), or use the form. */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" data-companion-section="contact" className="scroll-mt-24 py-20 sm:py-24">
      <p className="hand text-3xl text-fg-muted">so…</p>
      <h2 id="contact-heading" className="display mt-1 text-[clamp(3rem,8vw,5.5rem)]">
        Let&apos;s talk.
      </h2>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">
        Open to Platform / DevOps and backend roles. Email is the quickest way to reach me.
      </p>

      <div data-reveal className="card mt-8 p-5 sm:p-6">
        <p className="font-mono text-sm">{profile.email}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {MAIL_OPTIONS.map((option) => (
            <a
              key={option.label}
              href={option.href}
              {...(option.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="rounded-full bg-fg px-4 py-2 text-sm font-semibold text-bg transition-opacity hover:opacity-90"
            >
              {option.label}
              {option.external && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          ))}
          <CopyButton value={profile.email} label="Copy address" />
        </div>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <ul className="grid content-start gap-3 sm:grid-cols-2 xl:grid-cols-1">
          {CHANNELS.map(({ label, value, href, Icon, external }) => (
            <li key={label} data-reveal>
              <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="card group flex items-center gap-4 px-5 py-4">
                <Icon width={20} height={20} className="shrink-0 text-fg-subtle transition-colors group-hover:text-accent-text" />
                <span className="min-w-0">
                  <span className="block font-mono text-xs text-fg-subtle">{label}</span>
                  <span className="block truncate font-medium">{value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div data-reveal className="card p-5 sm:p-6">
          <h3 className="font-semibold">Send a message</h3>
          <div className="mt-5">
            <ContactForm formId={profile.formspreeId} />
          </div>
        </div>
      </div>

      <a href="#top" className="mt-12 inline-block font-mono text-sm text-fg-muted hover:text-fg">
        Back to top ↑
      </a>
    </section>
  );
}

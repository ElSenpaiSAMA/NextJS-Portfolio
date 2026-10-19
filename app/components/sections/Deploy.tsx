import { profile } from "../../data/profile";
import { GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from "../ui/icons";
import { ContactForm } from "./ContactForm";
import { CopyButton } from "./CopyButton";

const CHANNELS = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon, external: false },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phoneHref}`, Icon: PhoneIcon, external: false },
  // Display text derives from the URL so the two can never drift apart.
  { label: "LinkedIn", value: profile.linkedinUrl.replace(/^https:\/\/(www\.)?/, ""), href: profile.linkedinUrl, Icon: LinkedInIcon, external: true },
  { label: "GitHub", value: profile.githubUrl.replace(/^https:\/\//, ""), href: profile.githubUrl, Icon: GitHubIcon, external: true },
] as const;

/** Stage 06 · deploy — the last step needs an approval: the direct channels and the form. */
export function Deploy() {
  return (
    <>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
        Open to Platform / DevOps and backend roles. The pipeline is green; the last step needs your approval. Email is the quickest way to reach me.
      </p>
      <div className="mt-10 grid gap-5 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="space-y-3">
          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
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
          <CopyButton value={profile.email} label="Copy email address" />
        </div>
        <div data-reveal className="card p-5 sm:p-6">
          <h3 className="font-semibold">Approve the deploy</h3>
          <p className="mt-1 text-sm text-fg-muted">Send a message and I&apos;ll reply by email.</p>
          <div className="mt-5">
            <ContactForm formId={profile.formspreeId} />
          </div>
        </div>
      </div>
    </>
  );
}

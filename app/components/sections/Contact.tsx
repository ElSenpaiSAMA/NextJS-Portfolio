import { profile } from "../../data/profile";
import { ContactForm } from "./ContactForm";
import { GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from "../ui/icons";
import { Section } from "../ui/Section";

const CHANNELS = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon, external: false },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phoneHref}`, Icon: PhoneIcon, external: false },
  { label: "LinkedIn", value: "linkedin.com/in/matias-speroni", href: profile.linkedinUrl, Icon: LinkedInIcon, external: true },
  { label: "GitHub", value: "github.com/ElSenpaiSAMA", href: profile.githubUrl, Icon: GitHubIcon, external: true },
] as const;

export function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Get in touch" intro="Open to Platform / DevOps and backend opportunities. Email is the quickest way to reach me." tinted>
      <div className="grid gap-12 md:grid-cols-[1fr_1.3fr]">
        <ul className="space-y-3">
          {CHANNELS.map(({ label, value, href, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:border-accent"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent">
                  <Icon width={18} height={18} />
                </span>
                <span className="min-w-0">
                  <span className="label block">{label}</span>
                  <span className="block truncate font-medium group-hover:text-accent">{value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="rounded-lg border border-border p-6">
          <h3 className="font-semibold">Send a message</h3>
          <div className="mt-5">
            <ContactForm formId={profile.formspreeId} />
          </div>
        </div>
      </div>
    </Section>
  );
}

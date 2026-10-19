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

/** The closing call to action: one big line, the direct channels as tiles, and the form. */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-12 bg-black py-28 text-white sm:py-40">
      <div className="mx-auto max-w-[980px] px-5 text-center sm:px-8">
        <h2 id="contact-heading" data-rise className="headline mx-auto text-[clamp(3rem,9vw,6.5rem)] leading-none">
          Let&apos;s build
          <span className="ink-gradient mx-auto block w-fit pb-2">what&apos;s next.</span>
        </h2>
        <p data-rise className="mx-auto mt-6 max-w-xl text-xl leading-snug text-mute-dark sm:text-2xl">
          Open to Platform / DevOps and backend roles. Email is the quickest way to reach me.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-[980px] gap-5 px-5 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {CHANNELS.map(({ label, value, href, Icon, external }) => (
            <li key={label} data-reveal>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex h-full items-center gap-4 rounded-[22px] bg-graphite px-6 py-5 transition-colors hover:bg-[#2a2a2d]"
              >
                <Icon width={22} height={22} className="shrink-0 text-mute-dark transition-colors group-hover:text-link-dark" />
                <span className="min-w-0">
                  <span className="block text-[13px] text-mute-dark">{label}</span>
                  <span className="block truncate text-[17px] font-semibold">{value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div data-reveal className="rounded-[28px] bg-graphite p-7 sm:p-9">
          <h3 className="text-[21px] font-semibold tracking-tight">Send a message</h3>
          <div className="mt-6">
            <ContactForm formId={profile.formspreeId} />
          </div>
        </div>
      </div>
    </section>
  );
}

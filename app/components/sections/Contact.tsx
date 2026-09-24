import { profile } from "../../data/profile";
import { ExternalLink } from "../ui/ExternalLink";
import { Section } from "../ui/Section";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <Section id="contact" index="06" title="Contact" intro="The fastest way to reach me is email. The form lands in the same inbox.">
      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <dl className="space-y-5">
          <div>
            <dt className="font-mono text-xs uppercase tracking-wider text-subtle">Email</dt>
            <dd className="mt-1">
              <a href={`mailto:${profile.email}`} className="font-medium text-accent underline-offset-4 hover:underline">
                {profile.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-wider text-subtle">LinkedIn</dt>
            <dd className="mt-1">
              <ExternalLink href={profile.linkedinUrl}>{profile.linkedinUrl.replace("https://www.", "")}</ExternalLink>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-wider text-subtle">GitHub</dt>
            <dd className="mt-1">
              <ExternalLink href={profile.githubUrl}>{profile.githubUrl.replace("https://", "")}</ExternalLink>
            </dd>
          </div>
        </dl>
        <ContactForm formId={profile.formspreeId} />
      </div>
    </Section>
  );
}

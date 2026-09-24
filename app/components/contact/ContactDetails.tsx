import { profile } from "../../data/profile";
import { ExternalLink } from "../ui/ExternalLink";

/** Direct channels, always visible — the form is optional. */
export function ContactDetails() {
  return (
    <dl className="space-y-5">
      <div>
        <dt className="label">Email</dt>
        <dd className="mt-1">
          <a
            href={`mailto:${profile.email}`}
            className="underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            {profile.email}
          </a>
        </dd>
      </div>
      <div>
        <dt className="label">LinkedIn</dt>
        <dd className="mt-1">
          <ExternalLink href={profile.linkedinUrl}>{profile.linkedinUrl.replace("https://www.", "")}</ExternalLink>
        </dd>
      </div>
      <div>
        <dt className="label">GitHub</dt>
        <dd className="mt-1">
          <ExternalLink href={profile.githubUrl}>{profile.githubUrl.replace("https://", "")}</ExternalLink>
        </dd>
      </div>
    </dl>
  );
}

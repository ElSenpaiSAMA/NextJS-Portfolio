import { profile } from "../../data/profile";
import { getBuildInfo } from "../../lib/site";
import { ExternalLink } from "../ui/ExternalLink";

export function SiteFooter() {
  const build = getBuildInfo(profile.repoUrl);

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p className="font-mono text-xs" data-testid="build-info">
          env: {build.environment} · commit:{" "}
          {build.commit && build.commitUrl ? (
            <a href={build.commitUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
              {build.commit}
            </a>
          ) : (
            "local"
          )}{" "}
          · <ExternalLink href={profile.ciWorkflowUrl}>CI pipeline</ExternalLink>
        </p>
      </div>
    </footer>
  );
}

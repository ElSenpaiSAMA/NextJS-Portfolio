import { profile } from "../../data/profile";
import { getBuildInfo } from "../../lib/site";

export function SiteFooter() {
  const build = getBuildInfo(profile.repoUrl);

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        {/* Quiet deployment evidence: which build is live and the pipeline behind it. */}
        <p data-testid="build-info">
          <a href={profile.ciWorkflowUrl} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
            Tested &amp; deployed by CI
          </a>{" "}
          ·{" "}
          {build.commit && build.commitUrl ? (
            <a href={build.commitUrl} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
              {build.environment} @ {build.commit}
            </a>
          ) : (
            <span>{build.environment} build</span>
          )}
        </p>
      </div>
    </footer>
  );
}

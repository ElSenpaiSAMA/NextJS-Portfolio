import { profile } from "../../data/profile";
import { getBuildInfo } from "../../lib/site";

/** Build output as a footer: which commit is live and the pipeline that shipped it. */
export function SiteFooter() {
  const build = getBuildInfo(profile.repoUrl);

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 font-mono text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}, {profile.location}. Footage: Mixkit.
        </p>
        <p data-testid="build-info" className="flex items-center gap-2">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-mint" />
          <a href={profile.ciWorkflowUrl} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
            Tested and deployed by CI
          </a>
          <span aria-hidden="true">/</span>
          {build.commit && build.commitUrl ? (
            <a href={build.commitUrl} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
              {build.environment} build {build.commit}
            </a>
          ) : (
            <span>{build.environment} build</span>
          )}
        </p>
      </div>
    </footer>
  );
}

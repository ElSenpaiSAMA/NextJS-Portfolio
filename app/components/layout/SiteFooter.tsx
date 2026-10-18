import { profile } from "../../data/profile";
import { getBuildInfo } from "../../lib/site";

/** Status line: which build is live and the pipeline that shipped it. */
export function SiteFooter() {
  const build = getBuildInfo(profile.repoUrl);

  return (
    <footer className="border-t border-line bg-panel-bar">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 font-mono text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}, {profile.location}
        </p>
        <p data-testid="build-info" className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-green" />
          <a href={profile.ciWorkflowUrl} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
            Tested and deployed by CI
          </a>
          <span aria-hidden="true">|</span>
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

import { profile } from "../../data/profile";
import { getBuildInfo } from "../../lib/site";

export function SiteFooter() {
  const build = getBuildInfo(profile.repoUrl);

  return (
    <footer className="border-t border-dusk-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-8 text-sm text-haze-subtle sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}, {profile.location}
        </p>
        {/* Quiet deployment evidence: which build is live and the pipeline behind it. */}
        <p data-testid="build-info">
          <a href={profile.ciWorkflowUrl} target="_blank" rel="noopener noreferrer" className="hover:text-haze">
            Tested and deployed by CI
          </a>
          ,{" "}
          {build.commit && build.commitUrl ? (
            <a href={build.commitUrl} target="_blank" rel="noopener noreferrer" className="hover:text-haze">
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

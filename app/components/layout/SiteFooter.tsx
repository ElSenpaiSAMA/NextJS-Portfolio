import { profile } from "../../data/profile";
import { getBuildInfo } from "../../lib/site";

/** Apple-style fine print: small grey text on paper, with the live build as quiet DevOps evidence. */
export function SiteFooter() {
  const build = getBuildInfo(profile.repoUrl);

  return (
    <footer className="bg-paper text-xs text-mute-light">
      <div className="mx-auto max-w-[980px] px-5 py-6 sm:px-8">
        <p className="border-b border-hairline-light pb-4 leading-relaxed">
          Background footage: Mixkit stock clips. This site is open source and every change goes through CI before it is deployed.
        </p>
        <div className="flex flex-col gap-2 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright © {new Date().getFullYear()} {profile.name}. {profile.location}.
          </p>
          <p data-testid="build-info">
            <a href={profile.ciWorkflowUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
              Tested and deployed by CI
            </a>
            <span aria-hidden="true" className="mx-2 text-hairline-light">
              |
            </span>
            {build.commit && build.commitUrl ? (
              <a href={build.commitUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {build.environment} build {build.commit}
              </a>
            ) : (
              <span>{build.environment} build</span>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}

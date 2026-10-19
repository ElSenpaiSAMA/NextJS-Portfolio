import { profile } from "../../data/profile";
import { projects } from "../../data/projects";
import { GitHubIcon, LinkedInIcon, DownloadIcon } from "../ui/icons";

/** Where to find me, at a glance: GitHub (with repos from this page), LinkedIn and the CV. */
export function Hub() {
  const repos = projects.filter((p) => p.github).slice(0, 3);
  const handle = profile.githubUrl.replace(/^https:\/\/github\.com\//, "@");
  const linkedin = profile.linkedinUrl.replace(/^https:\/\/(www\.)?/, "");

  return (
    <section aria-label="Profiles" className="pb-8">
      <ul className="grid gap-4 md:grid-cols-3">
        <li data-reveal className="card flex flex-col p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-ok/40 bg-ok/10 text-ok">
              <GitHubIcon width={20} height={20} />
            </span>
            <div>
              <p className="font-semibold">GitHub</p>
              <p className="font-mono text-xs text-ok">{handle}</p>
            </div>
          </div>
          <ul aria-label="Repositories" className="mt-4 space-y-1.5">
            {repos.map((repo) => (
              <li key={repo.slug} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-sm">
                <span className="truncate">{repo.title}</span>
                <span className="shrink-0 font-mono text-[11px] text-fg-subtle">{repo.tech[0]}</span>
              </li>
            ))}
          </ul>
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="mt-auto pt-5 text-sm font-semibold text-ok hover:underline">
            Explore repositories ↗
          </a>
        </li>

        <li data-reveal className="card flex flex-col p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-accent-text">
              <LinkedInIcon width={20} height={20} />
            </span>
            <div>
              <p className="font-semibold">LinkedIn</p>
              <p className="max-w-[14rem] truncate font-mono text-xs text-accent-text">{linkedin}</p>
            </div>
          </div>
          <dl className="mt-4 space-y-1.5 text-sm">
            <div className="flex justify-between gap-3 rounded-lg border border-line bg-surface-2 px-3 py-1.5">
              <dt className="text-fg-muted">Status</dt>
              <dd className="text-ok">{profile.availability}</dd>
            </div>
            <div className="flex justify-between gap-3 rounded-lg border border-line bg-surface-2 px-3 py-1.5">
              <dt className="text-fg-muted">Focus</dt>
              <dd>{profile.role}</dd>
            </div>
          </dl>
          <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="mt-auto pt-5 text-sm font-semibold text-accent-text hover:underline">
            Connect on LinkedIn ↗
          </a>
        </li>

        <li data-reveal className="card flex flex-col p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-warn/40 bg-warn/10 text-warn">
              <DownloadIcon width={20} height={20} />
            </span>
            <div>
              <p className="font-semibold">Curriculum</p>
              <p className="font-mono text-xs text-warn">CV.PDF</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-fg-muted">
            Everything on this page, on one page: experience, stack, education and certifications.
          </p>
          {profile.cvUrl && (
            <a href={profile.cvUrl} download className="mt-auto pt-5 text-sm font-semibold text-warn hover:underline">
              Download CV ↓
            </a>
          )}
        </li>
      </ul>
    </section>
  );
}

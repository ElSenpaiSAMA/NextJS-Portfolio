import type { CaseStudy } from "./types";

const GITHUB = "https://github.com/ElSenpaiSAMA";

export const projects: CaseStudy[] = [
  {
    slug: "spotify-pipeline",
    title: "Spotify Pipeline",
    tagline: "Scheduled ETL on GitHub Actions — no server to maintain",
    problem:
      "Track my listening data over time without running a script by hand every week or paying for a server that sits idle.",
    solution:
      "A GitHub Actions workflow runs every Monday (plus manual dispatch). It installs dependencies, runs the pytest suite as a gate, executes the ETL with credentials from Actions secrets, and commits the processed data and charts back to the repo as a bot.",
    architecture: [
      { label: "Cron trigger", detail: "Mon 09:00 UTC · workflow_dispatch", kind: "trigger" },
      { label: "pytest gate", detail: "fails the run before touching data", kind: "process" },
      { label: "Extract", detail: "Spotify Web API", kind: "process" },
      { label: "Transform", detail: "Pandas", kind: "process" },
      { label: "Load", detail: "SQLite + CSV + Plotly charts", kind: "store" },
      { label: "Bot commit", detail: "github-actions[bot] → repo", kind: "deploy" },
    ],
    stack: ["GitHub Actions", "Python 3.11", "Pandas", "SQLite", "Plotly", "pytest"],
    deployment:
      "Serverless by design: runs on GitHub-hosted Ubuntu runners. Secrets live in repository secrets; the job gets write access through a scoped GITHUB_TOKEN.",
    outcome:
      "14 weekly data snapshots committed between March and June 2026 without manual steps. Main lesson: put the tests before the side effects, so a broken transform never reaches the data.",
    nextSteps: [
      "Package the job in a Docker image so it runs identically locally and in CI.",
      "Pin action versions (checkout@v3 → v4) and Python dependencies.",
      "Add a lint job (ruff) on pull requests, separate from the scheduled run.",
      "Stop committing __pycache__ and the SQLite file; publish data as a release artifact instead.",
      "Alert on failure (issue or notification) instead of relying on the Actions tab.",
    ],
    links: { repo: `${GITHUB}/Spotify-Track` },
    featured: true,
  },
  {
    slug: "portfolio",
    title: "This portfolio",
    tagline: "A small site run like a production service",
    problem:
      "A portfolio for a platform role should be evidence in itself: every change tested, previewed and observable — not just a page that says it.",
    solution:
      "Static Next.js site with a CI pipeline on every push and pull request: lint, type-check, unit tests, production build, Playwright E2E (console errors, broken links, accessibility with axe, mobile layout) and Lighthouse budgets. Browser and server errors are logged as structured JSON.",
    architecture: [
      { label: "Pull request", detail: "branch → GitHub", kind: "trigger" },
      { label: "CI", detail: "lint · typecheck · unit · build", kind: "process" },
      { label: "E2E + a11y", detail: "Playwright + axe", kind: "process" },
      { label: "Lighthouse CI", detail: "perf / a11y / SEO budgets", kind: "process" },
      { label: "Vercel preview", detail: "one URL per PR", kind: "deploy" },
      { label: "Logs", detail: "/api/log + onRequestError → Vercel", kind: "store" },
    ],
    stack: ["Next.js 16", "TypeScript", "Tailwind CSS", "GitHub Actions", "Vitest", "Playwright", "Lighthouse CI", "Vercel"],
    deployment:
      "Vercel Git integration: every pull request gets a preview URL; merging deploys to production. The deployed commit is shown in the footer.",
    outcome:
      "Lighthouse lab run (mobile, median of 3): 95 performance, 100 accessibility, 100 best practices, 100 SEO — budgets enforced in CI. Replacing a WebGL-heavy first version with static HTML is what made those numbers possible.",
    nextSteps: [
      "Scheduled uptime / smoke check against production.",
      "Content-Security-Policy header with a nonce for the theme script.",
      "Forward logs to a log drain with alerting instead of reading them in Vercel.",
    ],
    links: { repo: `${GITHUB}/NextJS-Portfolio` },
    featured: true,
  },
  {
    slug: "study-bot",
    title: "Study Bot",
    tagline: "Four-service app — the natural candidate for Docker Compose",
    problem: "Turn personal notes into mock exams and a study schedule synced with Google Calendar.",
    solution: "React frontend, FastAPI backend, a local LLM through Ollama and SQL Server for persistence.",
    architecture: [
      { label: "React UI", kind: "trigger" },
      { label: "FastAPI", detail: "REST API", kind: "process" },
      { label: "Ollama", detail: "local LLM", kind: "process" },
      { label: "SQL Server", kind: "store" },
    ],
    stack: ["React", "FastAPI", "Ollama", "SQL Server"],
    deployment: "Runs locally. [COMPLETAR: cómo se levanta hoy]",
    outcome: "Learned to integrate an LLM runtime as one more service with its own resource needs.",
    nextSteps: [
      "docker-compose.yml with the four services, healthchecks and named volumes.",
      "CI running backend (pytest) and frontend tests on every PR.",
      "Configuration through environment variables instead of hard-coded values.",
    ],
    links: { repo: `${GITHUB}/Proyecto_Study_Bot` },
    featured: false,
  },
  {
    slug: "sala-de-reservas",
    title: "Sala de Reservas",
    tagline: ".NET backend ready to be containerised",
    problem: "Book meeting rooms with role-based access, an admin panel and email notifications.",
    solution: ".NET backend with Entity Framework Core on SQL Server and transactional email through the Resend API.",
    architecture: [
      { label: "Client", kind: "trigger" },
      { label: ".NET API", detail: "EF Core, role-based auth", kind: "process" },
      { label: "SQL Server", kind: "store" },
      { label: "Resend", detail: "email", kind: "deploy" },
    ],
    stack: [".NET", "Entity Framework Core", "SQL Server", "Resend API"],
    deployment: "Runs locally. [COMPLETAR: entorno de despliegue, si lo hubo]",
    outcome: "Designed the data model and migrations end to end.",
    nextSteps: [
      "Multi-stage Dockerfile (SDK build → ASP.NET runtime image).",
      "Compose file with SQL Server for local development.",
      "CI with dotnet build/test and EF migrations applied in the pipeline.",
    ],
    links: { repo: `${GITHUB}/SalaReservas` },
    featured: false,
  },
  {
    slug: "mundo-del-libro",
    title: "Mundo del Libro",
    tagline: "Next.js app deployed on Vercel",
    problem: "Online bookstore with search, inventory and user accounts.",
    solution: "Next.js + TypeScript frontend, OpenLibrary API for search, Firebase for authentication and data.",
    architecture: [
      { label: "Next.js", detail: "Vercel", kind: "deploy" },
      { label: "OpenLibrary API", kind: "process" },
      { label: "Firebase", detail: "auth + data", kind: "store" },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
    deployment: "Vercel Git integration — pushes to main deploy automatically.",
    outcome: "Live demo available.",
    nextSteps: [
      "CI with lint, type-check and build before Vercel deploys.",
      "Environment-specific Firebase projects (preview vs production).",
    ],
    links: { repo: `${GITHUB}/libreria`, demo: "https://mundolibro-bay.vercel.app" },
    featured: false,
  },
];

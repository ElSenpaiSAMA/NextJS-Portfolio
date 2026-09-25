# Matias Speroni — Portfolio

[![CI](https://github.com/ElSenpaiSAMA/NextJS-Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/ElSenpaiSAMA/NextJS-Portfolio/actions/workflows/ci.yml)

Personal site of **Matias Speroni**, Backend & DevOps Engineer based in Barcelona.
Live: **https://matias-nicolas-speroni.vercel.app**

The site is small on purpose; the engineering around it is the point. Every change goes
through the same checks a production service would get: tests, accessibility and performance
budgets, preview deploys and structured error logs.

## What runs on every push and pull request

```
push / PR ──► quality ──────────────┬──► e2e ─────────────┐
              lint                  │    next build       │
              typecheck (tsc)       │    Playwright:      ├──► Vercel preview (per PR)
              unit tests + coverage │     desktop+mobile  │    / production (main)
              no [COMPLETAR] left   │     console errors  │
                                    │     broken links    │
                                    │     axe (WCAG AA)   │
                                    └──► lighthouse ──────┘
                                         perf ≥ 0.9 (warn)
                                         a11y ≥ 0.95, BP/SEO ≥ 0.9 (fail)
```

| Job | Tooling | Fails the build when |
|-----|---------|----------------------|
| `quality` | ESLint, `tsc --noEmit`, Vitest | lint/type errors, any unit or component test fails, a missing image/logo in `public/`, a `[COMPLETAR]` placeholder |
| `e2e` | Playwright + @axe-core/playwright | an image that fails to load, console error, uncaught exception, same-origin 4xx/5xx, error shipped to `/api/log`, WCAG violation, broken anchor, unsafe external link, mobile overflow |
| `lighthouse` | Lighthouse CI | accessibility < 95, best practices / SEO < 90 (performance < 90 warns) |

Extras: concurrency cancels superseded runs, least-privilege `permissions: contents: read`,
Node version pinned in `.nvmrc`, Dependabot for npm and GitHub Actions, Playwright report
uploaded as an artifact on failure.

**Last local Lighthouse run (mobile, median of 3):** Performance 95 · Accessibility 100 · Best Practices 100 · SEO 100.

## Observability

| Source | Mechanism | Event |
|--------|-----------|-------|
| Server render / route handler errors | `instrumentation.ts` → `onRequestError` | `server.request_error` |
| Uncaught browser errors & promise rejections | `instrumentation-client.ts` | `client.unhandled_error`, `client.unhandled_rejection` |
| Failed images / scripts / stylesheets | capture-phase `error` listener | `client.resource_error` |
| React render errors | `app/error.tsx`, `app/global-error.tsx` | `client.render_error`, `client.global_error` |
| Contact form | `ContactForm` | `contact.submit`, `contact.success`, `contact.failure` |

Browser `warn`/`error` entries are sent with `sendBeacon` to **`POST /api/log`**, validated
(schema, 8 KB cap) and re-emitted by the server logger as one JSON line per event, so client and
server errors land in the same Vercel log stream. A per-page cap prevents error loops from flooding it.

```json
{"timestamp":"2026-09-25T10:00:00.000Z","level":"error","event":"contact.failure","source":"client","context":{"status":500,"path":"/"}}
```

## Stack

Next.js 16 (App Router, static single page, `next/image`) · React 19 · TypeScript (strict) · Tailwind CSS 4 ·
Formspree (contact) · Vitest + Testing Library · Playwright + axe · Lighthouse CI · Vercel.

No UI or animation libraries: the page ships almost no client JavaScript (theme toggle and contact form only).

## Local development

Requires Node 22 (`nvm use`).

```bash
npm ci
npm run dev             # http://localhost:3000
```

| Script | What it does |
|--------|--------------|
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript without emitting |
| `npm test` | Unit + component tests (Vitest, jsdom) |
| `npm run test:e2e` | Playwright against the **production build** (`npm run build` first) |
| `npm run check:placeholders` | Lists content marked `[COMPLETAR]` (`--strict` fails if any; CI runs strict) |
| `npm run verify` | Everything above, in CI order |

Run E2E against a deployed preview instead of a local server:

```bash
E2E_BASE_URL=https://<preview-url> npm run test:e2e
```

## Project structure

```
app/
  layout.tsx                shell (sticky header, main, footer), font, metadata
  page.tsx                  single page: Hero · Projects · Experience · Stack · About · Contact + JSON-LD
  opengraph-image.tsx       generated social card
  sitemap.ts, robots.ts, icon.svg, not-found.tsx
  error.tsx, global-error.tsx
  api/log/route.ts          browser log ingestion
  components/
    layout/                 header, footer, theme toggle
    sections/               Hero, Projects + ProjectCard, Experience, Stack, About, Contact + ContactForm
    ui/                     small primitives (Section, ButtonLink, ExternalLink, icons)
  data/                     all copy and content, typed — edit here, not in components
  lib/                      logger, client logger, log schema, contact, theme, site config
public/
  avatar.jpg, CV_Matias_Speroni.pdf, projects/<slug>.*, stack/<tech>.svg
e2e/                        Playwright specs + shared "no errors" fixture
scripts/                    repo tooling
instrumentation.ts          server error hook
instrumentation-client.ts   browser error hooks
docs/ai/                    architecture notes per layer (for AI assistants and contributors)
```

## Deployment

Vercel Git integration: every pull request gets a preview URL, and `main` deploys to production.
The footer shows the environment and the deployed commit (`VERCEL_ENV`, `VERCEL_GIT_COMMIT_SHA`).
Optional env var: `NEXT_PUBLIC_SITE_URL` (canonical/OG base URL, defaults to the Vercel domain).

Branches: work happens on `feat`; `dev` and `main` are the staging and production environments.

## Pending improvements

Content (owner):
- [ ] CV PDF: the LinkedIn link text reads `linkedin.com/in/matias-speroni` (no accent), which is another person; the correct slug is `matías-speroni`.
- [ ] Recompress the larger project screenshots (`mundo-del-libro.png` is 2.2 MB; served optimized, but the repo stays heavy).

DevOps evidence to build next:
- [ ] Spotify Pipeline: Dockerfile, pin `checkout@v4` / deps, ruff job on PRs, stop committing `__pycache__` and the `.db`, failure alerts.
- [ ] Containerise Sala de Reservas with a full CI/CD pipeline to a cloud provider.
- [ ] Terraform for that infrastructure (remote state, plan on PR).
- [ ] Local Kubernetes lab (kind + Helm) with Prometheus/Grafana monitoring.

This site:
- [ ] Content-Security-Policy with a nonce for the inline theme script.
- [ ] Scheduled smoke/uptime check against production (GitHub Actions cron + Playwright).
- [ ] Log drain with alerting on `level=error` instead of reading Vercel logs manually.
- [ ] Rate limiting on `/api/log` (e.g. Vercel Firewall rule or an edge KV counter).
- [ ] Branch protection on `main`/`dev` requiring the three CI jobs.

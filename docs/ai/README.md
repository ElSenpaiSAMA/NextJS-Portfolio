# Contexto por capas para IA

Documentación para que un agente de IA tome contexto rápido antes de tocar código.
**Leé solo la capa que vas a modificar** (más el overview la primera vez).

| # | Capa (scope de commit) | Archivos | Cuándo leerla |
|---|------------------------|----------|---------------|
| 00 | [Overview](00-overview.md) | todo el repo | Siempre la primera vez |
| 01 | [App shell](01-app-shell.md) · `app-shell` | `layout.tsx`, `page.tsx`, SEO (OG, sitemap, robots, icon), `not-found.tsx`, `next.config.ts` | Metadata, SEO, orden de secciones, headers |
| 02 | [Design system](02-design-system.md) · `design-system` | `globals.css`, `lib/theme.ts` | Colores, tema claro/oscuro, tipografía |
| 03 | [UI](03-ui.md) · `ui` | `app/components/**`, `lib/site.ts` | Secciones, componentes, accesibilidad |
| 04 | [Contenido](04-content.md) · `content` | `app/data/**`, `public/**` | Textos, proyectos, skills, roadmap, CV |
| 05 | [Backend y observabilidad](05-backend-observability.md) · `backend` | `app/api/**`, `lib/logger*`, `lib/log-schema.ts`, `lib/contact.ts`, `instrumentation*.ts`, `error.tsx`, `global-error.tsx` | Logs, errores, formulario, endpoints |
| 06 | [Calidad y CI](06-quality-ci.md) · `quality` | tests, `e2e/`, configs, `.github/`, `scripts/`, `package.json` | Tests, pipeline, Lighthouse, dependencias |

Los docs de IA, `.claude/`, `CLAUDE.md` y `README.md` van en el scope `ai-docs`.

## Reglas

- Si un cambio altera algo documentado acá (contratos, tokens, eventos de log, estructura), actualizá
  el doc de esa capa **en el commit de esa capa**.
- Describí el *por qué* y los contratos; no copies código entero.
- Cada doc termina con **Deuda técnica conocida**: si la resolvés, borrala.

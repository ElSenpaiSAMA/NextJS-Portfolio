---
name: git-step
description: Commitea los cambios terminados de UNA capa en la rama `feat` y la pushea, según CLAUDE.md. Usar al terminar los cambios de cada capa de una tarea, o cuando el usuario diga "commiteá", "subí esto".
---

# git-step

Ciclo del repo (ver `CLAUDE.md` → "Flujo de trabajo con Git"): **un commit por capa, siempre en `feat`**.

## Ramas

- `feat` → la única rama donde se commitea.
- `dev` y `main` → entornos del usuario. **Nunca** commitear, mergear ni pushear ahí.
- No crear ramas nuevas.

## Pasos

1. Estar en `feat`:
   ```bash
   git branch --show-current   # debe decir feat; si no: git checkout feat
   ```
2. Agrupar los archivos cambiados por capa (`git status`). Mapa de capas:

   | Scope | Archivos |
   |-------|----------|
   | `app-shell` | `app/layout.tsx`, `app/page.tsx`, `LoadingScreen.tsx`, `next.config.ts` |
   | `design-system` | `app/globals.css`, `app/lib/tokens.ts` |
   | `scene-3d` | `app/components/Scene/**` |
   | `ui` | `app/components/*.tsx`, `app/components/sections/**`, `app/hooks/**` |
   | `state` | `app/store/**` |
   | `content` | `app/data/**`, `public/**` |
   | `backend` | `app/api/**`, `app/actions/**`, `app/lib/server/**`, `.env.example` |
   | `quality` | tests, `eslint.config.mjs`, `.github/**`, `package.json` (deps de tooling) |
   | `ai-docs` | `docs/ai/**`, `.claude/**`, `CLAUDE.md` |

   El doc `docs/ai/0X-*.md` de una capa va en el commit de **esa** capa, no en `ai-docs`.
3. Verificar (si falla, **no** commitear; arreglar primero):
   ```bash
   npm run lint
   npm run build
   ```
   (Para cambios solo en `.md` o `.claude/` se puede omitir el build.)
4. Por cada capa con cambios terminados, un commit con archivos explícitos (nunca `git add -A`):
   ```bash
   git add <archivos de la capa>
   git commit -m "feat(ui): add project filter to projects grid"
   ```
   Formato: `<tipo>(<capa>): <descripción en inglés, imperativo>` — tipos `feat`, `fix`, `refactor`,
   `docs`, `chore`, `test`, `perf`, `style`. Primera línea ≤ 72 caracteres.
   **Prohibido**: `Co-Authored-By`, "Generated with Claude" o cualquier mención a Claude/IA.
5. Push:
   ```bash
   git push origin feat
   ```

## Reglas

- Si una capa todavía tiene cambios a medio hacer, no la commitees.
- Si `git push` falla (autenticación o conflicto de nombres), avisar al usuario con el error exacto; no intentar workarounds.
- Nunca `--force`, `--no-verify` ni reescribir historia ya pusheada.

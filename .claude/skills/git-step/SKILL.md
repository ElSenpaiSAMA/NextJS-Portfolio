---
name: git-step
description: Ejecuta el ciclo de Git del repo para UN paso de trabajo — rama desde main, commit, push y merge a main — según CLAUDE.md. Usar al terminar cada paso de una tarea, o cuando el usuario diga "commiteá", "subí esto", "mergeá".
---

# git-step

Ciclo obligatorio del repo (ver `CLAUDE.md` → "Flujo de trabajo con Git").
Un paso = una rama = un commit.

## Antes de empezar el paso

```bash
git checkout main && git pull
git checkout -b <tipo>/<descripcion-kebab>
```

Tipos de rama/commit: `feat`, `fix`, `refactor`, `docs`, `chore`, `test`, `perf`, `style`.

## Al terminar el paso

1. Verificar (si falla, **no** commitear; arreglar primero):
   ```bash
   npm run lint
   npm run build
   ```
   (Para cambios solo en `.md` o `.claude/` se puede omitir el build.)
2. Revisar qué entra: `git status` y `git diff`. Agregar **archivos explícitos**, nunca `git add -A` a ciegas.
3. Commit con mensaje convencional en inglés, imperativo, ≤ 72 caracteres en la primera línea:
   ```bash
   git commit -m "feat: add project filter to projects grid"
   ```
   **Prohibido**: `Co-Authored-By`, "Generated with Claude" o cualquier mención a Claude/IA.
4. Push y merge:
   ```bash
   git push -u origin <rama>
   git checkout main
   git merge <rama>
   git push origin main
   ```

## Reglas

- Nunca commitear directamente en `main`.
- No agrupar varios pasos en un commit.
- Si `git push` falla por autenticación, completar el merge local y avisar al usuario qué ramas quedaron sin pushear.
- Si hay conflictos en el merge, detenerse y mostrarlos; no resolver a ciegas.
- Nunca `--force`, `--no-verify` ni reescribir historia de `main`.

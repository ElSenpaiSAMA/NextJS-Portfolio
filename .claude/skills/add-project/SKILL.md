---
name: add-project
description: Agrega, reemplaza o edita un proyecto como case study DevOps en app/data/projects.ts (o mueve un ítem del roadmap a proyectos). Usar cuando el usuario pida "agregá este proyecto", "terminé X del roadmap", "actualizá Y".
---

# add-project

Contexto: `docs/ai/04-content.md`.

## 1. Reunir datos (no inventar)

Preguntá lo que falte:
- repo público (obligatorio salvo que haya demo) y demo
- problema real que resuelve · solución · cómo se despliega hoy
- stack real
- resultado verificable (métrica que se pueda comprobar en el repo o el deploy) o aprendizaje concreto
- qué le falta para ser evidencia sólida (Dockerfile, CI, deploy automatizado, IaC, monitoreo…)

Si no hay dato → `"[COMPLETAR: …]"`.

## 2. Escribir el case study

```ts
{
  slug: "kebab-case",               // único; se usa como ancla #slug
  title: "…",
  tagline: "…",                     // ángulo DevOps primero
  problem: "…",
  solution: "…",
  architecture: [                   // 2+ nodos en orden del flujo
    { label: "…", detail: "…", kind: "trigger" | "process" | "store" | "deploy" },
  ],
  stack: ["…"],
  deployment: "…",
  outcome: "…",
  nextSteps: ["…"],
  links: { repo: "https://…", demo: "https://…" },
  featured: true,                   // true = case study completo; false = card compacta
}
```

- Ordená el array por relevancia para Platform/DevOps (los featured primero).
- Si viene del roadmap: borralo de `roadmap.ts` y actualizá skills (`learning` → `used`, con el proyecto en `context`).

## 3. Verificar y commitear

- `npm test` (integridad de datos) → `npm run build` → `npm run test:e2e`.
- En `npm run dev`: diagrama legible en desktop y mobile.
- `git-step`, capa `content`: `feat(content): add <title> case study`.

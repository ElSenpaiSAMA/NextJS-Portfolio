# Portfolio NextJS — Instrucciones para Claude Code

## Stack

- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4
- **React:** v19
- **Formularios:** Formspree

## Estructura del proyecto

```
app/
  components/     # Componentes reutilizables (SiteChrome, ContentOverlay, Scene/, sections/)
  data/           # Datos estáticos (proyectos, skills, etc.)
  store/          # Estado global
  layout.tsx      # Layout raíz
  page.tsx        # Página principal (single-page con escena 3D)
public/           # Assets estáticos (imágenes, íconos)
```

## Comandos

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run lint     # Linter
```

## Flujo de trabajo con Git

Cada tarea se ejecuta **paso a paso**, y cada paso genera su propio ciclo completo:

1. Crear una nueva rama descriptiva desde `main`:
   ```bash
   git checkout main && git pull
   git checkout -b <nombre-descriptivo>
   ```
2. Implementar **solo ese paso**.
3. Commitear y pushear esa rama:
   ```bash
   git add <archivos>
   git commit -m "descripción del paso"
   git push -u origin <nombre-descriptivo>
   ```
4. Mergear a `main`:
   ```bash
   git checkout main
   git merge <nombre-descriptivo>
   git push origin main
   ```
5. Repetir desde el paso 1 para el siguiente paso.

**Reglas:**
- Nunca commitear directamente a `main`.
- Una tarea grande = muchos commits pequeños, cada uno con su propia rama.
- No agrupar pasos en un solo commit.
- Claude no debe aparecer como colaborador en ningún commit (sin `Co-Authored-By` ni ninguna mención).

## Estándares de código

Todo el código debe seguir principios de buena arquitectura, estabilidad y escalabilidad:

- **Separación de responsabilidades:** componentes pequeños y enfocados, lógica separada de la presentación.
- **Reutilización:** extraer lógica común a hooks, utilidades o componentes compartidos.
- **Tipado estricto:** usar TypeScript correctamente, sin `any`, con tipos explícitos en interfaces y props.
- **Mantenibilidad:** nombres claros y descriptivos, estructura de carpetas coherente.
- **No over-engineering:** no abstraer antes de que sea necesario, pero sí pensar en que el código pueda crecer sin romperse.

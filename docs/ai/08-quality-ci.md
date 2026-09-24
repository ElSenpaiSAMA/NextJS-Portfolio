# 08 — Calidad, CI y testing

**Archivos:** `eslint.config.mjs`, `tsconfig.json`, `.github/workflows/ci.yml`

## Verificación obligatoria antes de commitear

```bash
npm run lint     # eslint (config next core-web-vitals + typescript)
npm run build    # compila y chequea tipos — es lo mismo que corre CI
```

CI (`.github/workflows/ci.yml`) corre en push/PR a `main`: `npm ci` → `npx eslint .` → `npm run build` con Node 20.
Si alguno falla localmente, **no** se commitea.

## TypeScript

- `strict: true`. Prohibido `any`; usar tipos explícitos en props e interfaces.
- Alias `@/*` → raíz del repo (el código actual usa imports relativos; ambos son válidos, no mezclar en un mismo archivo).

## Reglas de lint que ya mordieron (ver comentarios en el código)

| Regla | Síntoma | Solución usada |
|-------|---------|----------------|
| `react-hooks/refs` | Acceder `obj.ref` del retorno de un hook se considera lectura de ref en render | Desestructurar: `const { ref, style } = useMagnetic()` |
| `react-hooks/immutability` | Mutar un valor de `useMemo` (uniforms) | Mutar vía `useRef` apuntando al mismo objeto |
| `@next/next/no-img-element` | Warning por `<img>` | Pendiente migrar a `next/image` |

## Testing

**Hoy no hay tests ni framework instalado.** Estrategia recomendada si se agregan:

| Nivel | Herramienta | Qué cubrir |
|-------|-------------|------------|
| Unit | **Vitest** | Funciones puras: `sectionOp`, `clamp`, `pr`, store (`navigateTo` → `scrollTarget`), integridad de `projects.ts` (ids únicos, imágenes existen en `public/`) |
| Componentes | Vitest + **@testing-library/react** + jsdom | `SiteChrome` (dots → `navigateTo`), `ContactDrawer3D` (abre con evento, cierra con Escape), `AboutContent` (tabs) |
| E2E | **Playwright** | Carga, loading screen desaparece, navegación por dots cambia opacidad de `#section-*`, drawer abre/cierra, sin errores de consola |

Notas:
- Los componentes de `Scene/` necesitan WebGL: **no** testearlos en jsdom; cubrirlos con E2E o mockear `@react-three/fiber`.
- Para testear `sectionOp`/`clamp`, primero extraerlos a `app/lib/` (hoy son privados de `CameraRig.tsx`).
- Mockear `@formspree/react` en tests de componentes.
- Al instalar un framework de tests, agregar el script `test` en `package.json` y un step en CI.

## Checklist manual (mientras no haya E2E)

- [ ] `npm run dev`, la loading screen termina y aparece Hero.
- [ ] Scroll/flechas recorren Hero → Projects → About; los dots se actualizan.
- [ ] Clicks en dots y CTAs navegan.
- [ ] Botones de las cards de proyectos son clickeables solo cuando la sección está visible.
- [ ] Drawer: abre (pill + "Get in touch"), cierra (Escape, backdrop), envía.
- [ ] Cursor custom en desktop; nativo en touch.
- [ ] Consola sin errores ni warnings de React.

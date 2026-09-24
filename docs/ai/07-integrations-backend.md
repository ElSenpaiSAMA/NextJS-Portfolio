# 07 — Integraciones y backend

## Estado actual

**No hay backend propio.** No existen `app/api/`, Server Actions, base de datos,
middleware ni variables de entorno. El sitio es 100% estático + client-side.

La única integración externa es **Formspree** para el formulario de contacto.

## Formspree

- Archivo: `app/components/ContactDrawer3D.tsx`
- `const [state, handleSubmit] = useForm("mrbzwjdp");` — el form ID está hardcodeado (es público por diseño).
- Campos: `name` (text), `email` (email), `message` (textarea); todos `required`.
- Errores por campo con `<ValidationError field="..." errors={state.errors} />`.
- Estados usados: `state.submitting` (deshabilita inputs), `state.succeeded` (muestra "Message sent.").
- Si cambiás nombres de campos, actualizá también el formulario en el dashboard de Formspree.

## Cómo agregar backend (si hace falta)

Seguir las convenciones de Next.js 16 App Router:

| Necesidad | Dónde | Notas |
|-----------|-------|-------|
| Endpoint HTTP | `app/api/<nombre>/route.ts` | Exportar `GET`/`POST`; validar input; respuestas `NextResponse.json` tipadas |
| Mutación desde form | Server Action en `app/actions/<nombre>.ts` con `"use server"` | Preferible a una API route si solo la consume la propia UI |
| Lógica reutilizable server-only | `app/lib/server/` | `import "server-only"` al tope |
| Tipos compartidos cliente/servidor | `app/types/` | |
| Secretos | `.env.local` (ya ignorado por git) | Solo variables `NEXT_PUBLIC_*` llegan al cliente; documentar en `.env.example` |

### Reglas

- Validar todo input del cliente en el servidor (esquema explícito; si se agrega una librería de validación, usar una sola en todo el repo).
- Nunca exponer secretos en componentes `"use client"`.
- Errores: devolver status HTTP correcto + mensaje genérico; loguear el detalle en server.
- Rate limiting / anti-spam si se reemplaza Formspree por un endpoint propio.
- El deploy es **Vercel**: las API routes corren como funciones serverless (sin estado en memoria entre requests).

## Deuda técnica conocida

- Form ID de Formspree hardcodeado en el componente (podría ir a `NEXT_PUBLIC_FORMSPREE_ID`).
- Sin protección anti-spam adicional (honeypot / reCAPTCHA de Formspree).

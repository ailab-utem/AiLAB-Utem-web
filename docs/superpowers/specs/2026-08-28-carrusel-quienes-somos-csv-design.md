# Diseño — Carrusel de noticias, page Quiénes somos, backend contacto CSV

Fecha: 2026-08-28
Rama: `feat/carrusel-quienes-somos-csv`

## Contexto

Sitio del club AiLAB UTEM. Next.js 16 (App Router) + TS + Tailwind v4, npm. Sin
framework de tests: `npm run build` type-checkea y prerenderiza todas las rutas.
Tras los pulls hasta `ad333ad` el compañero agregó: tema claro/oscuro + toggle,
hero con red neuronal, tokens semánticos (`surface`, `surface-raised`, `content`,
`line`, `muted*`, `btn-bg`/`btn-text`, `net-node`/`net-line`), `ContactForm.tsx`
(form demo cliente, `e.preventDefault()`, sin backend), tema ciberpunk en
`globals.css`, `Typewriter.tsx` (usado en el párrafo del hero) y
`PageTransition.tsx` — wrapper de view-transitions que **ahora envuelve el
contenido de TODAS las páginas**; los `<Link>` de nav llevan `transitionTypes`.

Estado relevante:

- `app/page.tsx` — home. Hero con `<aside>` de 300px que hoy tiene dos paneles:
  "System status / Mapa nodo UTEM" (placeholder gris) y "NODE: AiLAB_UTEM.LAT_…"
  (coordenadas). Luego sección `#pilares`. La vieja sección `#proyectos / estado
  del sistema` ya no existe.
- `app/{proyectos,talleres,recursos,contacto}/page.tsx` — stubs numerados
  `/05`–`/08`. Patrón: marcador `/0X` (mono, `text-cybergrape`), `<h2>` hero,
  texto `Próximamente.`.
- `app/layout.tsx` — nav con `{ href: "/#pilares", label: "Quiénes somos" }`.
  No hay page dedicada de Quiénes somos.
- No hay ninguna API route ni `lib/`.

## Alcance

Tres entregables, enfoque mínimo (ponytail):

### 1. Carrusel de noticias

- **Ubicación:** reemplaza el panel "System status / Mapa nodo UTEM" del `<aside>`
  del hero en `app/page.tsx`. Conserva el chrome del panel: `border border-line`,
  `bg-surface-raised`, `shadow-[0_4px_12px_rgba(0,0,0,0.08)]`, `<CornerBrackets />`.
  El segundo panel del aside (coordenadas NODE) queda igual.
- **Componente:** `components/NewsCarousel.tsx`, `"use client"` (necesita `useState`
  para el índice activo). Sin dependencia nueva — React plano. ~45 líneas.
  - 1 noticia visible a la vez.
  - Controles: flechas `‹` / `›` + fila de dots. Wrap-around (de la última a la
    primera). Sin auto-avance, sin drag/swipe (YAGNI; se agrega si lo piden).
  - Contenido del card: label `NOTICIAS` + pill live (mismo patrón que
    `[Transmisión abierta]` en contacto), fecha (mono, `text-muted-2`), título
    (`font-bold`, `text-content`), resumen 1–2 líneas (`text-muted`), y `↗` como
    link solo si la noticia trae `url`.
  - Si no hay noticias: muestra "Sin noticias" y oculta controles (no romper).
- **Datos:** `data/noticias.csv`, columnas `fecha,titulo,resumen,url` (`url`
  puede ir vacío). `fecha` en ISO `YYYY-MM-DD`. Leído en build por el Server
  Component (`app/page.tsx`) con `fs.readFileSync` + `parseCsv`, ordenado por
  `fecha` desc, pasado como prop `items` al carrusel. Seed con 3 filas
  placeholder plausibles.

### 2. Page `/quienes-somos`

- Ruta nueva `app/quienes-somos/page.tsx`. Marcador `/03` (libre; el home usa
  `/01`–`/02`, los stubs `/05`–`/08`). Mismo estilo casa que los stubs, y
  **envuelto en `<PageTransition>`** como el resto de páginas.
- **Estructura + placeholder** (copy real después). Secciones:
  - **Misión** — 1 párrafo placeholder tono "Próximamente".
  - **Objetivos** — lista placeholder. El copy real es la tarea aparte "Cambiar
    objetivos"; acá solo queda el contenedor.
  - **Equipo** — grid placeholder (roles genéricos, sin nombres inventados).
- `app/layout.tsx` — el link de nav `Quiénes somos` cambia de `/#pilares` a
  `/quienes-somos`. Como ya no es ancla al home, su `transitionTypes` pasa de
  `nav-back` a `nav-forward` (simplificar: quitar el condicional `i === 0` y
  dejar todos los links de nav en `nav-forward`).

### 3. Backend contacto → CSV

- `app/api/contacto/route.ts` — Route Handler `POST`.
  - Acepta JSON `{ name, email, career, socials, interests, message }` (mismas
    claves que los campos del form; `socials`/`interests` como arrays).
  - Validación server-side, espejo de la del cliente (`ContactForm.tsx`):
    `name`/`message` no vacíos, `email` con `EMAIL_RE`
    (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`), `message` ≥ 10 caracteres. 400
    `{ error }` si falla; 200 `{ ok: true }` si pasa.
  - Append de una fila a `data/contacto.csv` vía `toCsvRow`. Crea la fila header
    (`fecha,name,email,career,socials,interests,message`) si el archivo no
    existe. `fecha` = `new Date().toISOString()`. `socials`/`interests` (arrays)
    se serializan como `a|b|c` dentro de la celda.
  - `// ponytail:` append a archivo — funciona local y en host Node/VPS. Si el
    club despliega en serverless (Vercel) para `ailab.cl`, el disco es efímero:
    cambiar solo el "sink" de esta función (DB / Google Sheets / Formspree),
    la firma del handler y el contrato con el form no cambian.
  - Sin anti-spam por ahora (`// ponytail:` honeypot o rate-limit si aparece
    abuso).
- `components/ContactForm.tsx` — conserva la validación cliente actual
  (`name`/`email`/`message`, min 10) y la pantalla de éxito
  `[MENSAJE TRANSMITIDO]`. Cambia `handleSubmit`: tras pasar la validación,
  `fetch("/api/contacto", { method: "POST", headers, body: JSON.stringify({...,
  socials, interests }) })`; `setSent(true)` solo con respuesta ok. Agrega
  estado `error` (string) que muestra `[FALLO DE TRANSMISIÓN]` y permite
  reintentar. `handleSubmit` pasa a `async`.

### Formato de datos — CSV unificado

`lib/csv.mjs` — plain JS + JSDoc (no `.ts`), para que sea ejecutable directo con
`node lib/csv.mjs` sin runner de TS ni deps. Next importa `.mjs` sin problema
(`allowJs` ya viene activo en el tsconfig del scaffold; verificar en impl.).
~15 líneas:

- `parseCsv(text)` → `Array<Record<string,string>>` — primera fila = headers.
  Soporta campos entre comillas con comas internas y `""` escapado (parser de un
  solo paso, sin dependencia).
- `toCsvRow(values)` → `string` — escapa (`"` → `""`, envuelve en comillas si hay
  coma/comilla/salto de línea), join por coma, `+ "\n"`.
- Self-check al final tras `if (import.meta.url === \`file://${process.argv[1]}\`)`:
  `assert`-based, round-trip `parseCsv(header + toCsvRow([...]))` === objeto
  esperado, incluyendo un campo con coma y comillas. `node lib/csv.mjs` = check.

Lo usan las dos features (leer `noticias.csv`, escribir `contacto.csv`).

## Archivos

NEW:
- `data/noticias.csv` (seed 3 filas)
- `lib/csv.mjs`
- `components/NewsCarousel.tsx`
- `app/quienes-somos/page.tsx`
- `app/api/contacto/route.ts`

EDIT:
- `app/page.tsx` — leer/parsear `noticias.csv` en el Server Component; reemplazar
  el panel "System status" por `<NewsCarousel items={...} />`.
- `app/layout.tsx` — link de nav `/#pilares` → `/quienes-somos`.
- `components/ContactForm.tsx` — `fetch` real + estado de error.
- `.gitignore` — agregar `data/contacto.csv` (no versionar envíos). `noticias.csv`
  sí se versiona.
- `CHANGELOG.md` — anotar las adiciones.

## Verificación

- `npm run build` (type-check + prerender de todas las rutas, incl.
  `/quienes-somos`).
- `npm run lint`.
- Self-check de `lib/csv.ts` (round-trip con campo escapado).
- Manual (`npm run dev`):
  - Enviar el form de contacto → aparece fila nueva en `data/contacto.csv` con
    los arrays serializados; pantalla de éxito se muestra.
  - Enviar con email inválido → 400, el form muestra error, no se escribe fila.
  - Carrusel: prev/next y dots recorren las 3 noticias con wrap-around, en tema
    claro y oscuro; el `↗` solo aparece cuando hay `url`.

## Fuera de alcance

- Copy real de objetivos (tarea "Cambiar objetivos", aparte).
- Anti-spam / auth en la API.
- "Modificar a diseño dinámico (pantalla dinámica)" — tarea aparte.
- Auto-avance, drag/swipe, transiciones animadas del carrusel.
- Push a GitHub / PR — se decide después con permiso explícito.

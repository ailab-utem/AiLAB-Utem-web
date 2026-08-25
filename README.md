# AiLAB UTEM — sitio web

Sitio del club de Inteligencia Artificial de la UTEM. Next.js (App Router) + TypeScript +
Tailwind CSS.

## Setup

```bash
npm install
npm run dev
```

Abre http://localhost:3000.

## Scripts

- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción (también sirve como chequeo de tipos y de que cada
  página renderiza sin errores)
- `npm run start` — sirve el build de producción
- `npm run lint` — ESLint

## Estructura

- `app/layout.tsx` — chrome compartido (header, rieles laterales, ticker inferior), fuentes
- `app/page.tsx` — home
- `app/proyectos`, `app/talleres`, `app/recursos`, `app/contacto` — páginas stub
- `components/` — `StatusBar`, `StatusPill`, `EmailCapture` (los únicos 3 componentes del design
  system original que la home usa)

## Tipografía

Solo **Archivo** (hero) y **JetBrains Mono** (todo lo demás), vía Google Fonts. Las 7 fuentes del
kit de marca (Cyberjunkies, Omicron, Space Monkey, Striker, Voltec, Adventure Subtitles, Blue
Screen) **no están incluidas**: son de uso personal, de licencia ambigua, o de pago. Si el club
adquiere una licencia comercial para alguna, se puede sumar vía `next/font/local`.

## Diseño de referencia

El diseño original (export de Claude Design) vive en `../Primera página rediseñada/` — no forma
parte de este repo.

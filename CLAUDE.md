# CLAUDE.md

Guidance for Claude Code (claude.ai/code) working in this repo.

## What this is

The AiLAB UTEM club website. Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, npm.
Home page is fully implemented; `proyectos`, `talleres`, `recursos`, `contacto` are stub pages
(shared chrome + section marker + "Próximamente" — no invented content, intentionally).

Implemented from a Claude Design (`.dc`) export that lives in a sibling folder,
`../Primera página rediseñada/` (not part of this repo). `SitePage.dc.html` there is the
pixel-source-of-truth for the home layout; its accompanying design-system package
(`_ds/ailab-design-system-.../`) is where the brand palette/typography/copy rules are documented
in full — read its `readme.md` before adding any new UI copy or colors.

## Commands

- `npm run dev` — dev server (http://localhost:3000)
- `npm run build` — production build; also the de facto test suite (type-checks + prerenders
  every route, so a throwing component or bad import fails it)
- `npm run start` — serve the production build
- `npm run lint` — ESLint (not run automatically by `next build`, run it separately before
  pushing)

There is no test framework — components are visual/no business logic, verified via
`npm run build` + a targeted `grep` on the prerendered static HTML in `.next/server/app/`.

## Architecture

- `app/layout.tsx` — root chrome shared by every route: header (logo, nav, "Unirse al lab" CTA),
  side rails, bottom ticker. Internal navigation uses `next/link`, not `<a>`. Fonts are loaded
  here via `next/font/google` and exposed as CSS variables on `<html>`.
- `app/page.tsx` — home. Sections in order: `#top` (hero), `#pilares`, `#proyectos` (estado del
  sistema), `#contacto` (nested inside the `#proyectos` grid — unirse al lab), closing
  `//END_TRANSMISSION` bar. `#top` and `#pilares` only exist on this page — cross-page nav links
  to them use `/#top` / `/#pilares`, not bare `#top`.
- `app/{proyectos,talleres,recursos,contacto}/page.tsx` — stub pages, numbered `/05`–`/08`.
- `components/` — the only 3 design-system components the home actually uses:
  `StatusBar({ label, percent, value, tone? })`, `StatusPill({ tone?, live?, children })`,
  `EmailCapture({ label })`. **These are hand-written re-implementations in Tailwind, not the
  compiled `_ds_bundle.js`** (that bundle is an IIFE expecting `window.React`/`window.ReactDOM`
  globals — incompatible with Next's module system/SSR). `EmailCapture` needs `"use client"`
  because it defines an `onSubmit` handler; it's purely visual (`e.preventDefault()`, no fetch/
  backend).
- `public/hero-cyborg.webp` — extracted once from `../Primera página rediseñada/.image-slots.state.json`
  (base64 → binary). No pipeline reads that state file at build time; if the hero image ever
  needs to change, re-run the same kind of one-off extraction or just replace the file directly.

## Styling conventions

- Tailwind v4 — theming lives in `app/globals.css` via `@theme` blocks, not `tailwind.config.ts`
  (there isn't one). Two blocks matter:
  - `@theme inline { ... }` — the scaffold's original tokens (`--color-background`,
    `--color-foreground`, `--font-sans`). Do not add brand tokens here — `inline` resolves
    `var()` at point of use, which is required for the dark-mode media query and the
    `next/font` className wiring; merging brand tokens in and dropping `inline` breaks both
    silently (build still passes — it's a CSS-resolution bug, not a build error).
  - `@theme { ... }` (separate, non-inline, below it) — the 13 brand hex tokens + `--font-hero` +
    `--font-mono` (brand). Add new brand tokens here.
- Brand palette (fixed, from the design system): Smoky Black `#0D0D0D`, Cyber Grape `#63458C` as
  principals; Limerick `#99BF0F` (the only "go/healthy" signal), Lavender `#AA77F2` (imagery
  accents only), Electric Cyan `#00F0FF` (reserved, unused on this page). Paper tones
  `#F4F3EF`/`#FAF9F6`, ink ramp `ink-100`..`ink-600`.
- Fonts: **Archivo** (900, hero only) + **JetBrains Mono** (everything else), via
  `next/font/google`. Deliberately not the kit's 7 display fonts (Cyberjunkies, Omicron, Space
  Monkey, Striker, Voltec, Adventure Subtitles, Blue Screen) — all personal-use-only, ambiguous,
  or paid; see the design-system readme's Licensing section if that ever changes.
- All spacing/sizing/tracking values in JSX use Tailwind arbitrary bracket values (`w-[340px]`,
  `text-[11px]`, `tracking-[.14em]`) rather than the default scale — deliberate, to keep 1:1
  fidelity with the inline-styled `.dc.html` source without mechanical-conversion risk.
- Square corners by default; radius is reserved for status dots/pills. Shadows are hard offset
  slabs, not blur, per the design system — none of that appears on this page today.

## Git

- `origin` → `https://github.com/ailab-utem/AiLAB-Utem-web` (the club's repo — push here).
- `personal` → `https://github.com/dasalalvear-arch/AiLAB-Utem-web` (an earlier personal-account
  copy of the same history; not the canonical remote).
- No CI configured. Before pushing: `npm run build && npm run lint`.

## Known follow-ups (not blocking, tracked here instead of an issue tracker)

- `globals.css`: the scaffold's leftover `body { }` rule and the `prefers-color-scheme: dark`
  block sit outside Tailwind's cascade layers and currently win over the brand tokens applied to
  `<body>` in `app/layout.tsx`. No visible effect today (every text node carries its own
  `font-*`/`text-*` classes), but any new element added without explicit classes would silently
  inherit Arial/wrong color. Fix: delete the scaffold's `:root { --background/--foreground }`,
  the dark-mode media block, and the first `body { }` rule; keep only `body { margin: 0 }`.
  Related: `--font-sans: var(--font-geist-sans)` in the `@theme inline` block is orphaned
  (Geist is no longer imported anywhere) and should go with the same cleanup.
- `public/{next,vercel,file,globe,window}.svg` and `app/favicon.ico` are unused scaffold
  leftovers from `create-next-app` — the browser tab still shows the Next/Vercel triangle.
- `components/StatusBar`, `StatusPill`, `EmailCapture` visually diverge from the real
  `_ds_bundle.js` components of the same name (different layout, corner radius, default copy).
  This was a deliberate plan decision (the implementation plan gave this exact code to
  transcribe), not a bug — but if 1:1 fidelity to the design system ever matters, these need a
  rewrite against the real component specs in `_ds/.../components/`.
- The "Mapa nodo UTEM" panel in the hero aside is a static gray placeholder — the source
  `.image-slots.state.json` never had an image for that slot, only for the hero cyborg render.

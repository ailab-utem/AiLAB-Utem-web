# Carrusel de noticias + page Quiénes somos + backend contacto CSV — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar un carrusel de noticias compacto al hero del home, una página `/quienes-somos` con estructura + placeholder, y un backend real para el formulario de contacto que hace append a un CSV.

**Architecture:** Un helper CSV sin dependencias (`lib/csv.mjs`) compartido por las dos features. El carrusel es un client component que recibe las noticias ya parseadas desde el Server Component del home (lee `data/noticias.csv` en build). El contacto pasa de demo cliente a `fetch` real contra un Route Handler (`app/api/contacto/route.ts`) que valida y appendea a `data/contacto.csv` (git-ignored). El sink de archivo está aislado en un bloque para poder cambiarlo si el club despliega en serverless.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, React 19, npm. Sin dependencias nuevas.

## Global Constraints

- Next.js 16 App Router + TS + Tailwind v4, npm. **No hay framework de tests**: la verificación es `npm run build` (type-check + prerender de todas las rutas) + `npm run lint` + checks manuales / self-check con `node`.
- **Sin dependencias nuevas.** Nada de `npm install`.
- Tailwind v4: no hay `tailwind.config.ts`; los tokens viven en `app/globals.css` (`@theme`). En JSX se usan valores arbitrarios (`w-[340px]`, `text-[11px]`, `tracking-[.14em]`), no la escala por defecto.
- Paleta de marca fija. `Limerick #99BF0F` (`bg-limerick`) es la única señal "go/healthy". Esquinas rectas por defecto; radio (`rounded-*`) solo en dots y pills.
- Fuentes vía variables: `font-hero` (Archivo, solo títulos) y `font-mono` (JetBrains Mono, todo lo demás).
- **Todas las páginas** envuelven su contenido en `<PageTransition>` (de `@/components/PageTransition`).
- Marcadores de sección: home usa `/01`–`/02`, stubs `/05`–`/08`. `/quienes-somos` usa `/03`.
- Rama de trabajo: `feat/carrusel-quienes-somos-csv` (ya creada, rebasada sobre `origin/main` @ `68e3541`). No push a GitHub sin permiso explícito del usuario.
- Commits en español, prefijo convencional (`feat:` / `docs:` / `refactor:`), con trailer `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`.

---

## File Structure

| Archivo | Responsabilidad |
|---|---|
| `lib/csv.mjs` (nuevo) | `parseCsv` / `toCsvRow`. JS plano `.mjs` (ejecutable con `node`, sin runner de TS). Sin estado, sin I/O. |
| `lib/csv.check.mjs` (nuevo) | Self-check con `node:assert`. `node lib/csv.check.mjs` = la prueba de la lógica CSV. |
| `data/noticias.csv` (nuevo, versionado) | Fuente del carrusel. Columnas `fecha,titulo,resumen,url`. |
| `components/NewsCarousel.tsx` (nuevo) | Client component. Presenta 1 noticia, flechas + dots, wrap-around. Sin fetch propio. |
| `app/page.tsx` (modificar) | Lee/parsea `noticias.csv` en build; reemplaza el panel "System status" del aside por `<NewsCarousel>`. |
| `app/quienes-somos/page.tsx` (nuevo) | Página estática: marcador `/03` + secciones Misión / Objetivos / Equipo con placeholder. |
| `app/layout.tsx` (modificar) | Link de nav `Quiénes somos`: `href` y `transitionTypes`. |
| `app/api/contacto/route.ts` (nuevo) | `POST`: valida payload, appendea fila a `data/contacto.csv`. |
| `components/ContactForm.tsx` (modificar) | `handleSubmit` async: tras validación, `fetch` al route; estados `error` / `pending`. |
| `.gitignore` (modificar) | Ignora `data/contacto.csv`. |
| `CHANGELOG.md` (modificar) | Nueva sección con los cambios. |

---

## Task 1: Helper CSV (`lib/csv.mjs`) + self-check

**Files:**
- Create: `lib/csv.mjs`
- Create: `lib/csv.check.mjs`

**Interfaces:**
- Consumes: nada.
- Produces (importable como `@/lib/csv.mjs`):
  - `parseCsv(text: string): Array<Record<string, string>>` — primera fila = headers; soporta comillas, `""` escapado, y comas / saltos de línea dentro de celdas entrecomilladas; descarta filas totalmente vacías.
  - `toCsvRow(values: Array<string | number>): string` — escapa cada valor (`"` → `""`, envuelve en comillas si contiene `,` `"` o `\n`), une con `,`, agrega `\n` final.

- [ ] **Step 1: Crear `lib/csv.mjs` con stubs que lanzan**

```js
// lib/csv.mjs
// ponytail: CSV mínimo sin dependencia. Cubre RFC-4180 básico (comillas, ""
// escapado, comas y saltos de línea dentro de celdas). Si el dataset crece o
// llega CSV raro de Excel (BOM, separador ;), cambiar por la lib `csv-parse`.

/**
 * Parsea un CSV cuya primera fila son los headers.
 * @param {string} text
 * @returns {Array<Record<string, string>>}
 */
export function parseCsv(text) {
  throw new Error("not implemented");
}

/**
 * Serializa una fila de valores a una línea CSV terminada en "\n".
 * @param {Array<string | number>} values
 * @returns {string}
 */
export function toCsvRow(values) {
  throw new Error("not implemented");
}
```

- [ ] **Step 2: Crear `lib/csv.check.mjs` (la prueba)**

```js
// lib/csv.check.mjs
// Self-check de lib/csv.mjs. Correr: node lib/csv.check.mjs
import assert from "node:assert/strict";
import { parseCsv, toCsvRow } from "./csv.mjs";

// round-trip con celda que tiene coma y comillas, y una celda vacía
const header = "fecha,titulo,resumen,url\n";
const line = toCsvRow(["2026-08-01", "Título, con coma", 'Dijo "hola"', ""]);
assert.deepEqual(parseCsv(header + line)[0], {
  fecha: "2026-08-01",
  titulo: "Título, con coma",
  resumen: 'Dijo "hola"',
  url: "",
});

// salto de línea dentro de comillas
assert.deepEqual(parseCsv('a,b\n"x\ny",z\n'), [{ a: "x\ny", b: "z" }]);

// fila en blanco al final se ignora
assert.deepEqual(parseCsv("a,b\n1,2\n\n"), [{ a: "1", b: "2" }]);

console.log("csv.mjs OK");
```

- [ ] **Step 3: Correr la prueba y verificar que FALLA**

Run: `node lib/csv.check.mjs`
Expected: FALLA con `Error: not implemented`.

- [ ] **Step 4: Implementar `lib/csv.mjs`**

Reemplazar el cuerpo de las dos funciones (dejar el comentario `ponytail:` y los JSDoc):

```js
export function parseCsv(text) {
  const src = String(text).replace(/\r\n?/g, "\n");
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (quoted) {
      if (c === '"') {
        if (src[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          quoted = false;
        }
      } else {
        cell += c;
      }
    } else if (c === '"') {
      quoted = true;
    } else if (c === ",") {
      row.push(cell);
      cell = "";
    } else if (c === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += c;
    }
  }
  if (cell !== "" || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  const headers = rows.shift() ?? [];
  return rows
    .filter((r) => r.some((v) => v !== ""))
    .map((r) =>
      Object.fromEntries(headers.map((h, i) => [h, r[i] ?? ""]))
    );
}

export function toCsvRow(values) {
  return (
    values
      .map((v) => {
        const s = String(v ?? "");
        return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
      })
      .join(",") + "\n"
  );
}
```

- [ ] **Step 5: Correr la prueba y verificar que PASA**

Run: `node lib/csv.check.mjs`
Expected: imprime `csv.mjs OK`, exit 0.

- [ ] **Step 6: Lint**

Run: `npm run lint`
Expected: sin errores nuevos. (Si eslint marca `lib/csv.check.mjs` por `no-console`, agregar `// eslint-disable-next-line no-console` sobre el `console.log`.)

- [ ] **Step 7: Commit**

```bash
git add lib/csv.mjs lib/csv.check.mjs
git commit -m "feat: helper CSV minimo sin dependencias + self-check

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

> **Contingencia (solo si una tarea posterior falla el build por el import `@/lib/csv.mjs` desde un `.ts`/`.tsx`):** crear `lib/csv.d.ts` con:
> ```ts
> export function parseCsv(text: string): Array<Record<string, string>>;
> export function toCsvRow(values: Array<string | number>): string;
> ```
> y volver a commitear. No hacerlo preventivamente (YAGNI).

---

## Task 2: Carrusel de noticias

**Files:**
- Create: `data/noticias.csv`
- Create: `components/NewsCarousel.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `parseCsv` de `@/lib/csv.mjs` (Task 1).
- Produces (importable como `@/components/NewsCarousel`):
  - `type NewsItem = { fecha: string; titulo: string; resumen: string; url: string }`
  - `function NewsCarousel(props: { items: NewsItem[] }): JSX.Element`

- [ ] **Step 1: Crear `data/noticias.csv`**

```
fecha,titulo,resumen,url
2026-08-20,AiLAB abre inscripciones 2026-2,"Nuevo ciclo de talleres y proyectos para estudiantes de la UTEM.",
2026-07-15,Charla abierta: IA generativa y ética,"Sesión sobre límites, sesgos y usos responsables de los modelos actuales.",
2026-06-30,Proyecto de visión: flujo urbano en el campus,"Prototipo de conteo de personas con cámaras de bajo costo.",
```

(3 filas, `url` vacío a propósito — sin links inventados.)

- [ ] **Step 2: Crear `components/NewsCarousel.tsx`**

```tsx
"use client";

import { useState } from "react";
import { CornerBrackets } from "@/components/CornerBrackets";

export type NewsItem = {
  fecha: string;
  titulo: string;
  resumen: string;
  url: string;
};

export function NewsCarousel({ items }: { items: NewsItem[] }) {
  const [i, setI] = useState(0);
  const n = items.length;
  const active = n > 0 ? i % n : 0;
  const item = n > 0 ? items[active] : null;
  const go = (delta: number) => setI((prev) => (prev + delta + n) % n);

  return (
    <div className="relative flex flex-col gap-[12px] rounded-[10px] border border-line bg-surface-raised p-[14px] shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-content">
          Noticias
        </span>
        <span className="flex items-center gap-[6px] font-mono text-[10px] font-medium uppercase leading-none tracking-[0.1em] text-cybergrape">
          <span className="h-[5px] w-[5px] rounded-full bg-limerick animate-[ail-blink_1.1s_linear_infinite]" />
          Live
        </span>
      </div>

      {item ? (
        <>
          <div className="flex min-h-[104px] flex-col gap-[6px]">
            <span className="font-mono text-[10px] font-medium leading-none tracking-[0.1em] text-muted-2">
              {item.fecha}
            </span>
            <span className="font-mono text-[12px] font-bold leading-[1.35] text-content">
              {item.titulo}
            </span>
            <span className="font-mono text-[11px] leading-[1.5] text-muted">
              {item.resumen}
            </span>
            {item.url ? (
              <a
                href={item.url}
                className="mt-[2px] w-fit font-mono text-[10px] font-medium uppercase leading-none tracking-[0.14em] text-cybergrape no-underline hover:text-content"
              >
                Leer ↗
              </a>
            ) : null}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-[8px]">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Noticia anterior"
                className="grid h-[24px] w-[24px] place-items-center border border-line font-mono text-[12px] leading-none text-muted-2 hover:border-cybergrape hover:text-content"
              >
                {"‹"}
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Noticia siguiente"
                className="grid h-[24px] w-[24px] place-items-center border border-line font-mono text-[12px] leading-none text-muted-2 hover:border-cybergrape hover:text-content"
              >
                {"›"}
              </button>
            </div>
            <div className="flex items-center gap-[5px]">
              {items.map((it, idx) => (
                <span
                  key={`${it.fecha}-${it.titulo}`}
                  className={`h-[5px] w-[5px] rounded-full ${
                    idx === active ? "bg-cybergrape" : "bg-line"
                  }`}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <span className="font-mono text-[11px] leading-[1.5] text-muted-2">
          Sin noticias.
        </span>
      )}

      <CornerBrackets />
    </div>
  );
}
```

- [ ] **Step 3: Cablear en `app/page.tsx` — imports**

Agregar al bloque de imports del tope (después de los imports de componentes existentes):

```tsx
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseCsv } from "@/lib/csv.mjs";
import { NewsCarousel, type NewsItem } from "@/components/NewsCarousel";
```

- [ ] **Step 4: `app/page.tsx` — cargar los datos a nivel de módulo**

Borrar el `const gridTexture = ...` completo (desde `const gridTexture` hasta el `)}')\`;` de cierre — ya no se usa). En su lugar, dejar:

```tsx
const noticias = (
  parseCsv(readFileSync(join(process.cwd(), "data/noticias.csv"), "utf8")) as NewsItem[]
).sort((a, b) => b.fecha.localeCompare(a.fecha));
```

- [ ] **Step 5: `app/page.tsx` — reemplazar el panel "System status"**

Dentro del `<aside>` del hero, borrar el primer `<div>` hijo completo — el que contiene el `<span>System status</span>`, el `<div>` con `style={{ backgroundImage: gridTexture }}` ("Mapa nodo UTEM"), el pill `[Conexión segura]` y sus dos `<CornerBrackets />`. Reemplazarlo por:

```tsx
<NewsCarousel items={noticias} />
```

El segundo `<div>` del aside (el de `NODE: AiLAB_UTEM.LAT_ ...` con su `<CornerBrackets />`) queda **igual**. El import de `CornerBrackets` en `app/page.tsx` se mantiene (lo sigue usando ese panel).

- [ ] **Step 6: Build**

Run: `npm run build`
Expected: PASS. En la salida, `/` aparece como estática (prerender). Sin errores de tipo por `parseCsv` / `NewsItem` / `node:fs`.

- [ ] **Step 7: Lint**

Run: `npm run lint`
Expected: sin errores. (Si marca `gridTexture` o algún import como no usado, es que quedó algo sin borrar en los Steps 4–5 — borrarlo.)

- [ ] **Step 8: Check manual**

Run: `npm run dev` → abrir http://localhost:3000
Verificar:
- El aside del hero muestra el card "NOTICIAS" con la noticia más reciente (2026-08-20 arriba por el sort desc).
- Flechas `‹` / `›` y dots recorren las 3 noticias con wrap-around (de la última vuelve a la primera).
- No aparece "Leer ↗" (las 3 filas tienen `url` vacío).
- Toggle de tema claro/oscuro: el card se ve bien en ambos.
Cortar el dev server (Ctrl+C).

- [ ] **Step 9: Commit**

```bash
git add data/noticias.csv components/NewsCarousel.tsx app/page.tsx
git commit -m "feat: carrusel de noticias en el aside del hero (fuente data/noticias.csv)

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 3: Página `/quienes-somos` + link de nav

**Files:**
- Create: `app/quienes-somos/page.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `PageTransition` de `@/components/PageTransition` (ya existe).
- Produces: ruta `/quienes-somos`.

- [ ] **Step 1: Crear `app/quienes-somos/page.tsx`**

```tsx
import { PageTransition } from "@/components/PageTransition";

const secciones = [
  { titulo: "Misión", cuerpo: "Próximamente." },
  { titulo: "Objetivos", cuerpo: "Próximamente." },
  { titulo: "Equipo", cuerpo: "Próximamente." },
];

export default function QuienesSomosPage() {
  return (
    <PageTransition>
      <section className="flex flex-col gap-[24px] px-[32px] py-[40px]">
        <div className="flex flex-col gap-[12px]">
          <span className="font-mono text-[11px] font-medium leading-none tracking-[0.08em] text-cybergrape">
            /03
          </span>
          <h2 className="m-0 font-hero text-[32px] font-black uppercase leading-none tracking-[-0.03em] text-content">
            Quiénes somos
          </h2>
          <span className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-muted-2">
            {"> IDENTIDAD DEL NODO_"}
          </span>
        </div>

        {secciones.map((s) => (
          <div key={s.titulo} className="flex flex-col gap-[8px]">
            <h3 className="m-0 font-mono text-[12px] font-bold uppercase leading-none tracking-[0.14em] text-content">
              {s.titulo}
            </h3>
            <p className="m-0 max-w-[64ch] font-mono text-[12px] leading-[1.7] text-muted-3">
              {s.cuerpo}
            </p>
          </div>
        ))}
      </section>
    </PageTransition>
  );
}
```

- [ ] **Step 2: `app/layout.tsx` — cambiar el link de nav**

En el array `navLinks`, cambiar la primera entrada:

```tsx
// antes
{ href: "/#pilares", label: "Quiénes somos" },
// después
{ href: "/quienes-somos", label: "Quiénes somos" },
```

- [ ] **Step 3: `app/layout.tsx` — simplificar `transitionTypes` del nav**

En el `<Link>` de dentro de `navLinks.map(...)`, cambiar:

```tsx
// antes
transitionTypes={[i === 0 ? "nav-back" : "nav-forward"]}
// después
transitionTypes={["nav-forward"]}
```

(Ya no hay ningún link de nav que sea "volver al home", así que el condicional sobra. El `i` del `.map` sigue usándose para el separador `/`.)

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: PASS. En la salida aparece `/quienes-somos` como ruta estática prerenderizada.

- [ ] **Step 5: Lint**

Run: `npm run lint`
Expected: sin errores.

- [ ] **Step 6: Check manual**

Run: `npm run dev`
- Click en "Quiénes somos" en el header → navega a `/quienes-somos` (con la transición de nav).
- Se ve el marcador `/03`, el título, y las 3 secciones Misión / Objetivos / Equipo con "Próximamente.".
- Claro/oscuro OK.
Cortar el dev server.

- [ ] **Step 7: Commit**

```bash
git add app/quienes-somos/page.tsx app/layout.tsx
git commit -m "feat: page /quienes-somos (estructura + placeholder) y link de nav

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 4: Backend contacto (Route Handler + fetch en el form)

**Files:**
- Create: `app/api/contacto/route.ts`
- Modify: `components/ContactForm.tsx`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: `toCsvRow` de `@/lib/csv.mjs` (Task 1).
- Produces: endpoint `POST /api/contacto`.
  - Request body (JSON): `{ name: string; email: string; career?: string; socials?: string[]; interests?: string[]; message: string }`
  - Respuestas: `200 { ok: true }` · `400 { error: string }` (validación / JSON inválido) · `500 { error: string }` (falló el guardado).
  - Efecto: appendea una fila a `data/contacto.csv` con columnas `fecha,name,email,career,socials,interests,message`; `socials` e `interests` serializados como `a|b|c` dentro de la celda. Crea la fila header si el archivo no existe.

- [ ] **Step 1: Crear `app/api/contacto/route.ts`**

```ts
import { appendFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { toCsvRow } from "@/lib/csv.mjs";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATA_DIR = join(process.cwd(), "data");
const CSV_PATH = join(DATA_DIR, "contacto.csv");
const HEADER = "fecha,name,email,career,socials,interests,message\n";

type Payload = {
  name?: string;
  email?: string;
  career?: string;
  socials?: string[];
  interests?: string[];
  message?: string;
};

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "JSON inválido" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return Response.json({ error: "Faltan campos obligatorios" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "Correo inválido" }, { status: 400 });
  }
  if (message.length < 10) {
    return Response.json({ error: "Mensaje muy corto" }, { status: 400 });
  }

  // ponytail: append a archivo — anda local y en host Node/VPS. En serverless
  // (Vercel) el disco es efímero: cambiar SOLO este bloque por DB / Google
  // Sheets / Formspree. La firma del handler y el contrato con el form no cambian.
  const row = toCsvRow([
    new Date().toISOString(),
    name,
    email,
    (body.career ?? "").trim(),
    (body.socials ?? []).join("|"),
    (body.interests ?? []).join("|"),
    message,
  ]);
  try {
    mkdirSync(DATA_DIR, { recursive: true });
    if (!existsSync(CSV_PATH)) appendFileSync(CSV_PATH, HEADER);
    appendFileSync(CSV_PATH, row);
  } catch {
    return Response.json({ error: "No se pudo guardar" }, { status: 500 });
  }

  return Response.json({ ok: true });
}
```

- [ ] **Step 2: `.gitignore` — ignorar los envíos**

Agregar al final de `.gitignore`:

```
# envios del formulario de contacto (no versionar)
/data/contacto.csv
```

- [ ] **Step 3: `components/ContactForm.tsx` — estados nuevos**

Junto a los `useState` existentes (después de `const [sent, setSent] = useState(false);`), agregar:

```tsx
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
```

- [ ] **Step 4: `components/ContactForm.tsx` — reescribir `handleSubmit`**

Reemplazar la función `handleSubmit` completa por:

```tsx
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const career = String(data.get("career") ?? "");

    const next: Errors = {};
    if (!name) next.name = "[ERROR DE CAMPO]";
    if (!email) next.email = "[ERROR DE CAMPO]";
    else if (!EMAIL_RE.test(email)) next.email = "[FORMATO INVALIDO]";
    if (!message) next.message = "[ERROR DE CAMPO]";
    else if (message.length < 10) next.message = "[MIN. 10 CARACTERES]";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, career, socials, interests, message }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("[FALLO DE TRANSMISIÓN] Reintenta.");
    } finally {
      setPending(false);
    }
  };
```

- [ ] **Step 5: `components/ContactForm.tsx` — botón submit con `pending`**

En el `<button type="submit">`, agregar `disabled={pending}` y la clase `disabled:opacity-60`, y cambiar el texto:

```tsx
          <button
            type="submit"
            disabled={pending}
            className="flex h-[46px] items-center gap-[12px] rounded-[8px] bg-btn-bg px-[22px] font-mono text-[12px] font-medium uppercase leading-none tracking-[0.14em] text-btn-text hover:bg-cybergrape disabled:opacity-60"
          >
            {pending ? "Transmitiendo…" : "Transmitir"} <span aria-hidden>↗</span>
          </button>
```

- [ ] **Step 6: `components/ContactForm.tsx` — mostrar el error**

Justo antes del bloque `{sent && ( ... )}`, agregar:

```tsx
      {error && (
        <div className="border-t border-line pt-[16px]">
          <span className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-rose">
            {error}
          </span>
        </div>
      )}
```

- [ ] **Step 7: Build**

Run: `npm run build`
Expected: PASS. `/api/contacto` aparece como Route (ƒ / dynamic). Sin errores de tipo.

- [ ] **Step 8: Lint**

Run: `npm run lint`
Expected: sin errores.

- [ ] **Step 9: Check manual — happy path**

Run: `npm run dev` → http://localhost:3000/contacto
- Llenar NOMBRE, CORREO válido (`x@utem.cl`), CARRERA, marcar 1 red y 1 área, MENSAJE ≥ 10 chars → "Transmitir".
- Aparece `[MENSAJE TRANSMITIDO]`.
- En otra terminal: `cat data/contacto.csv` — tiene la fila header y una fila con la fecha ISO, y `socials` / `interests` como `valor|valor`.
- `git status` — `data/contacto.csv` **no** aparece (está ignorado).

- [ ] **Step 10: Check manual — validación server**

Con `curl` (o el form con email inválido):

Run: `curl -s -X POST http://localhost:3000/api/contacto -H "Content-Type: application/json" -d '{"name":"a","email":"malo","message":"1234567890"}'`
Expected: `{"error":"Correo inválido"}` con status 400. No se agrega fila al CSV.

Cortar el dev server.

- [ ] **Step 11: Commit**

```bash
git add app/api/contacto/route.ts components/ContactForm.tsx .gitignore
git commit -m "feat: backend contacto -> append a data/contacto.csv + fetch real en el form

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 5: CHANGELOG + verificación final

**Files:**
- Modify: `CHANGELOG.md`

**Interfaces:**
- Consumes: todo lo anterior.
- Produces: nada (docs + sweep de verificación).

- [ ] **Step 1: Agregar sección al `CHANGELOG.md`**

Agregar al final del archivo:

```markdown
## feat: carrusel de noticias, page Quiénes somos, backend contacto CSV

- `lib/csv.mjs` (nuevo) — `parseCsv` / `toCsvRow`, CSV mínimo sin dependencia.
  Self-check en `lib/csv.check.mjs` (`node lib/csv.check.mjs`).
- `components/NewsCarousel.tsx` (nuevo) — carrusel compacto (1 noticia, flechas +
  dots, wrap-around) que reemplaza el panel "System status" del aside del hero.
- `data/noticias.csv` (nuevo, versionado) — fuente del carrusel
  (`fecha,titulo,resumen,url`), leída en build por `app/page.tsx` y ordenada por
  fecha desc.
- `app/quienes-somos/page.tsx` (nuevo) — marcador `/03`, secciones Misión /
  Objetivos / Equipo con placeholder. El nav `Quiénes somos` ahora apunta acá
  (antes era ancla a `/#pilares`); `transitionTypes` de los links de nav
  simplificado a `nav-forward`.
- `app/api/contacto/route.ts` (nuevo) — `POST`: valida (espejo del form) y hace
  append a `data/contacto.csv` (git-ignored). El sink de archivo está aislado en
  un bloque para cambiarlo si se pasa a serverless.
- `components/ContactForm.tsx` — `handleSubmit` async con `fetch` real al route +
  estados `error` / `pending`.
```

- [ ] **Step 2: Sweep de verificación completo**

Run: `node lib/csv.check.mjs && npm run build && npm run lint`
Expected: `csv.mjs OK`, build PASS (rutas `/`, `/quienes-somos`, `/api/contacto` presentes), lint sin errores.

- [ ] **Step 3: Commit**

```bash
git add CHANGELOG.md
git commit -m "docs: changelog carrusel + quienes-somos + backend contacto CSV

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

- [ ] **Step 4: Revisión del diff completo**

Run: `git log --oneline main..HEAD` y `git diff main..HEAD --stat`
Expected: 5 commits (`feat: helper CSV...`, `feat: carrusel...`, `feat: page /quienes-somos...`, `feat: backend contacto...`, `docs: changelog...`), tocando solo los archivos del cuadro "File Structure". **No hacer push** — eso lo decide el usuario con permiso explícito.

---

## Self-Review (hecho por el autor del plan)

**1. Cobertura del spec:**
- Carrusel: ubicación (aside, reemplaza "System status") → Task 2 Steps 5. Componente sin dep, 1 noticia, flechas + dots, wrap-around, sin auto-avance → Task 2 Step 2. Contenido del card (label, pill live, fecha, título, resumen, `↗` condicional) → Task 2 Step 2. Estado "Sin noticias" → Task 2 Step 2. Datos `data/noticias.csv` leídos en build y ordenados desc → Task 2 Steps 1, 4. ✓
- Page `/quienes-somos`: ruta + marcador `/03` + estilo casa + `<PageTransition>` → Task 3 Step 1. Secciones Misión / Objetivos / Equipo placeholder → Task 3 Step 1. Nav link `/#pilares` → `/quienes-somos` + `transitionTypes` → Task 3 Steps 2–3. ✓
- Backend contacto: Route Handler POST, validación espejo (`name`/`message` no vacíos, `EMAIL_RE`, `message` ≥ 10), 400/200, append con header, arrays `a|b|c`, `fecha` ISO, comentario `ponytail:` del sink → Task 4 Step 1. `ContactForm` `fetch` real + `error`/`pending`, conserva validación cliente y pantalla de éxito → Task 4 Steps 3–6. `.gitignore` → Task 4 Step 2. ✓
- Formato CSV unificado: `lib/csv.mjs` + self-check ejecutable → Task 1. Usado por carrusel (lee) y contacto (escribe) → Tasks 2, 4. ✓
- `CHANGELOG.md` → Task 5. ✓
- Verificación (`npm run build` + `npm run lint` + self-check + manual) → cada task + Task 5 Step 2. ✓
- Fuera de alcance (copy real de objetivos, anti-spam, diseño dinámico, auto-avance, push/PR) → respetado; nada de eso aparece en las tasks. ✓

**2. Placeholders:** No hay "TBD"/"TODO"/"añadir manejo de errores" sin código. El "Próximamente." de la page es contenido deliberado del spec, no un placeholder del plan. ✓

**3. Consistencia de tipos:** `parseCsv` / `toCsvRow` con las mismas firmas en Task 1 (Produces), Task 2 (Consumes, `parseCsv`) y Task 4 (Consumes, `toCsvRow`). `NewsItem` definido y exportado en Task 2 Step 2, consumido en el mismo archivo `app/page.tsx` (Task 2 Steps 3–4) con la misma forma (`fecha,titulo,resumen,url`), que coincide con los headers de `data/noticias.csv` (Task 2 Step 1). Payload del route (Task 4 Interfaces + Step 1) coincide con el body que arma `ContactForm` (Task 4 Step 4): `{ name, email, career, socials, interests, message }`. ✓

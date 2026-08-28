# Changelog — Rediseño 2026

Cambios del rediseño del landing (agosto 2026), agrupados por commit.
Las rutas son relativas a la raíz del repo.

## feat: tema claro/oscuro completo

- `app/globals.css`
  - Tokens semánticos vía `@theme inline`: `surface`, `surface-raised`, `content`, `line`, `muted`/`muted-2/3/4`, `btn-bg`, `btn-text`, `net-node`, `net-line`.
  - Overrides por tema en el bloque `.dark`; variante `@custom-variant dark`.
  - `color-scheme` a nivel documento (`light` en `:root`, `dark` en `.dark`) — corrige el `<select>` que se pintaba blanco en modo oscuro.
  - `.ail-glow` con mayor blur/opacidad en dark; transición global de colores.
- `components/ThemeToggle.tsx` (nuevo)
  - Toggle Sol/Luna con `useSyncExternalStore` (sin mismatch de hidratación).
  - Persiste la preferencia en `localStorage` (clave `ail-theme`); aplica la clase `.dark` en `<html>`.
- `app/layout.tsx`
  - Script anti-FOUC inline que aplica el tema antes de pintar el primer frame.
  - `suppressHydrationWarning` en `<html>`.
  - Celda del toggle en el header (tras `SYS.TIME`).
- `package.json` / `package-lock.json`
  - Nueva dependencia `lucide-react` (iconos del toggle).

## feat: hero con red neuronal de fondo

- `components/NeuralBackdrop.tsx` (nuevo)
  - SVG de fondo que cubre todo el hero: 22 nodos dispersos + links por 3-nearest.
  - Usa los tokens `--ail-net-node` / `--ail-net-line` para adaptarse a dark/light.
- `components/NeuralBlob.tsx` (nuevo)
  - Círculo de imagen con halo glow, borde `conic-gradient`, badge `AI.CORE // ACTIVE` y `CornerBrackets`.
- `app/page.tsx`
  - Hero y sección pilares migrados a tokens semánticos (`border-line`, `bg-surface-raised`, `text-content`…).
  - `dark:border-white/15` en pilares para que la curva se distinga en modo oscuro.

## feat: sysclock y tokens semánticos en layout/páginas

- `components/SysClock.tsx` (nuevo)
  - Reloj en vivo (hh:mm:ss) en el header, usado en la celda `SYS.TIME`.
- `components/StatusBar.tsx`
  - Migrado a tokens semánticos (`text-content`, `text-muted-3`, `border-line`, `bg-surface-raised`).
- `components/EmailCapture.tsx`
  - Migrado a tokens semánticos (`text-content`, `border-content`, `bg-btn-bg`, `text-btn-text`).
- `app/proyectos/page.tsx`, `app/talleres/page.tsx`, `app/recursos/page.tsx`
  - Texto y bordes con tokens (`text-content`, `text-muted-3`, `border-line`).

## feat: formulario de contacto

- `components/ContactForm.tsx` (nuevo)
  - Form demo (cliente): NOMBRE, CORREO, CARRERA (select UTEM), RED SOCIAL (Instagram/WhatsApp/Discord, multiselección), ÁREA DE INTERÉS (6 pills, multiselección), MENSAJE.
  - Validación de campos (required, formato de email, largo mínimo), estado de éxito `[MENSAJE TRANSMITIDO]`.
  - Inputs ocultos `socials` / `interests` para el FormData del submit.
- `app/contacto/page.tsx`
  - Grid responsive con el form + panel informativo (NODE, coordenadas, EMAIL/GITHUB/DISCORD, pill "Transmisión abierta").
- `components/CornerBrackets.tsx` (nuevo)
  - Esquineros HUD reutilizables; variante `alternate` usa `border-content`.

## docs: changelog

- `CHANGELOG.md` — este archivo.
- `.gitignore` — excluye `REVERT-DISENO-2026.md` (respaldo local con el diseño original).
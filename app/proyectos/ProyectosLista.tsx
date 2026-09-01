"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { CornerBrackets } from "@/components/CornerBrackets";
import { statusDe, type ProyectoNumerado } from "./proyectos-data";

/** Cuántas tarjetas se ven antes de tener que pulsar "VER MÁS_". */
const VISIBLES_INICIAL = 3;

function MetaRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <span className="flex items-baseline justify-between gap-[10px] font-mono text-[11px] leading-none tracking-[0.06em] text-muted-3">
      <span className="uppercase">{label}</span>
      <span className="text-content">{value}</span>
    </span>
  );
}

/** [EN CURSO] en verde neón; [TERMINADO] en un tono neutro pero legible. */
function EstadoTag({ proyecto }: { proyecto: ProyectoNumerado }) {
  const enCurso = statusDe(proyecto) === "in_progress";

  return (
    <span
      className={`font-mono text-[10px] font-medium uppercase leading-none tracking-[0.12em] ${
        enCurso ? "text-mi-limerick" : "text-muted-3"
      }`}
    >
      {enCurso ? "[En curso]" : "[Terminado]"}
    </span>
  );
}

function ProyectoCard({ proyecto }: { proyecto: ProyectoNumerado }) {
  // Sin `url` no hay adónde ir: la tarjeta se muestra igual, pero no enlaza.
  const enlace = proyecto.url;

  return (
    <article
      className={`ail-hud relative flex min-h-[210px] flex-col gap-[12px] p-[16px] ${
        enlace
          ? "group transition-[background-color] duration-[170ms] ease-out hover:[--ail-hud-border:var(--color-mi-cyan)] active:[--ail-hud-border:var(--color-mi-cyan)] has-[a:focus-visible]:[--ail-hud-bw:2px] has-[a:focus-visible]:[--ail-hud-border:var(--color-mi-cyan)]"
          : ""
      }`}
    >
      {enlace ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-mi-cyan opacity-0 transition-opacity duration-[170ms] ease-out group-hover:opacity-[0.06] group-active:opacity-[0.06] group-has-[a:focus-visible]:opacity-[0.06]"
        />
      ) : null}

      <div className="relative flex flex-1 flex-col gap-[12px]">
        <div className="flex items-center justify-between gap-[10px]">
          <span className="font-mono text-[11px] font-medium leading-none tracking-[0.14em] text-mi-lavender">
            {proyecto.codigo}
          </span>
          <EstadoTag proyecto={proyecto} />
        </div>

        {/* Espacio de portada: se reserva siempre para que todas las tarjetas
            midan igual, tengan imagen o no. */}
        <div className="ail-hud relative aspect-[16/9] w-full [--ail-hud-cut:8px] [--ail-hud-fill:var(--ail-surface)]">
          {proyecto.imagen ? (
            <Image
              src={proyecto.imagen}
              alt={proyecto.imagenAlt ?? ""}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <span className="absolute inset-0 grid place-items-center font-mono text-[10px] uppercase leading-none tracking-[0.12em] text-muted-4">
              {"// SIN IMAGEN_"}
            </span>
          )}
        </div>

        <h3 className="m-0 font-mono text-[13px] font-bold uppercase leading-[1.3] tracking-[0.06em] text-content">
          {proyecto.nombre}
        </h3>

        {proyecto.descripcion ? (
          <p className="m-0 line-clamp-3 font-mono text-[11.5px] leading-[1.6] text-muted [text-wrap:pretty]">
            {proyecto.descripcion}
          </p>
        ) : null}

        {proyecto.tecnologias && proyecto.tecnologias.length > 0 ? (
          <ul className="m-0 flex list-none flex-wrap gap-[6px] p-0">
            {proyecto.tecnologias.map((tec) => (
              <li
                key={tec}
                className="border border-line px-[8px] py-[4px] font-mono text-[10px] uppercase leading-none tracking-[0.1em] text-muted-3"
              >
                {tec}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto flex flex-col gap-[7px] border-t border-line pt-[10px]">
          <MetaRow label="Área" value={proyecto.categoria} />
          <MetaRow label="Periodo" value={proyecto.periodo} />

          {enlace ? (
            <span
              aria-hidden
              className="mt-[3px] flex items-center justify-end gap-[6px] font-mono text-[10px] font-medium uppercase leading-none tracking-[0.12em] text-muted-3 transition-colors duration-[170ms] ease-out touch:text-mi-lavender group-hover:text-mi-lavender group-active:text-mi-lavender group-has-[a:focus-visible]:text-mi-lavender"
            >
              {"> ABRIR PROYECTO_"}
              <span className="inline-block transition-transform duration-[170ms] ease-out group-hover:translate-x-[3px] group-has-[a:focus-visible]:translate-x-[3px]">
                ↗
              </span>
            </span>
          ) : (
            <span className="mt-[3px] flex justify-end font-mono text-[10px] font-medium uppercase leading-none tracking-[0.12em] text-muted-4">
              {"// SIN ENLACE_"}
            </span>
          )}
        </div>
      </div>

      {/* Toda la tarjeta es el enlace. Un <a> real —y no window.open— conserva
          el clic central, ctrl+clic y el menú contextual, y no lo bloquea el
          navegador. `noreferrer` implica también `noopener`. */}
      {enlace ? (
        <a
          href={enlace}
          target="_blank"
          rel="noreferrer"
          aria-label={`Abrir proyecto ${proyecto.codigo}: ${proyecto.nombre} (se abre en una pestaña nueva)`}
          className="absolute inset-0 z-[2] cursor-pointer outline-none"
        />
      ) : null}

      <CornerBrackets
        className={enlace ? "border-mi-cyan" : "border-muted-4"}
        corners={["tr", "bl"]}
      />
    </article>
  );
}

export function BloqueProyectos({
  titulo,
  vacio,
  items,
}: {
  titulo: string;
  vacio: string;
  items: ProyectoNumerado[];
}) {
  const [expandido, setExpandido] = useState(false);
  const grillaId = useId();

  const ocultos = items.length - VISIBLES_INICIAL;
  const hayMas = ocultos > 0;
  const visibles = expandido || !hayMas ? items : items.slice(0, VISIBLES_INICIAL);

  return (
    <section className="flex flex-col gap-[14px]">
      {/* Mismo patrón de cabecera con línea técnica que la sección #pilares. */}
      <div className="flex items-baseline gap-[14px]">
        <h3 className="m-0 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-content">
          {titulo}
        </h3>
        <span aria-hidden className="h-px flex-1 bg-line" />
        {hayMas ? (
          <span className="font-mono text-[10px] font-medium uppercase leading-none tracking-[0.12em] text-muted-3">
            {`${visibles.length}/${items.length}`}
          </span>
        ) : null}
      </div>

      {items.length > 0 ? (
        <>
          <div
            id={grillaId}
            className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-3"
          >
            {visibles.map((proyecto) => (
              <ProyectoCard key={proyecto.codigo} proyecto={proyecto} />
            ))}
          </div>

          {hayMas ? (
            <div className="flex justify-center pt-[4px]">
              <button
                type="button"
                onClick={() => setExpandido((v) => !v)}
                aria-expanded={expandido}
                aria-controls={grillaId}
                className="ail-hud flex h-[44px] w-full cursor-pointer items-center justify-center gap-[8px] whitespace-nowrap px-[22px] font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-mi-lavender outline-none transition-colors duration-[170ms] ease-out [--ail-hud-border:var(--color-mi-lavender)] [--ail-hud-cut:8px] hover:text-mi-smoky hover:[--ail-hud-fill:var(--color-mi-lavender)] focus-visible:[--ail-hud-border:var(--color-mi-cyan)] focus-visible:[--ail-hud-bw:2px] sm:w-auto"
              >
                {expandido ? "> VER MENOS_" : `> VER MÁS_ [+${ocultos}]`}
                <span aria-hidden>{expandido ? "↑" : "↓"}</span>
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <p className="ail-hud m-0 px-[32px] py-[22px] pb-[26px] font-mono text-[11px] uppercase leading-[1.6] tracking-[0.08em] text-muted-3 [--ail-hud-cut:20px] [--ail-hud-fill:var(--ail-surface)]">
          {vacio}
        </p>
      )}
    </section>
  );
}

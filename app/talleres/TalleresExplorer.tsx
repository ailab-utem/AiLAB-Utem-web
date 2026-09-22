"use client";

import { useCallback, useId, useRef, useState } from "react";
import { CornerBrackets } from "@/components/CornerBrackets";
import { StatusPill } from "@/components/StatusPill";
import { useDialogoModal } from "@/components/useDialogoModal";
import { ESTADO_LABEL, estadoDe, type Taller } from "./talleres-data";

function MetaRow({ label, value }: { label: string; value?: string }) {
  return (
    <span className="flex items-baseline justify-between gap-[10px] font-mono text-[11px] leading-none tracking-[0.06em] text-muted-3">
      <span className="uppercase">{label}</span>
      <span className={value ? "text-content" : "text-muted-4"}>{value ?? "—"}</span>
    </span>
  );
}

function EstadoTag({ taller }: { taller: Taller }) {
  const estado = estadoDe(taller);

  if (estado === "sin-asignar") {
    return (
      <span className="font-mono text-[10px] font-medium uppercase leading-none tracking-[0.12em] text-muted-4">
        [Slot libre]
      </span>
    );
  }

  return (
    <StatusPill tone={estado === "disponible" ? "signal" : "default"} live={estado === "disponible"}>
      {ESTADO_LABEL[estado]}
    </StatusPill>
  );
}

function ModuloCard({ taller, onOpen }: { taller: Taller; onOpen: (t: Taller) => void }) {
  const libre = estadoDe(taller) === "sin-asignar";

  return (
    <article
      className={`ail-hud group relative flex min-h-[210px] flex-col p-[16px] transition-[background-color] duration-[170ms] ease-out hover:[--ail-hud-border:var(--color-mi-cyan)] active:[--ail-hud-border:var(--color-mi-cyan)] has-[button:focus-visible]:[--ail-hud-bw:2px] has-[button:focus-visible]:[--ail-hud-border:var(--color-mi-cyan)] ${
        libre
          ? "[--ail-hud-border:var(--ail-muted-4)] [--ail-hud-fill:var(--ail-surface)]"
          : ""
      }`}
    >
      {/* Brillo cian muy tenue al pasar el cursor / al enfocar con teclado. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-mi-cyan opacity-0 transition-opacity duration-[170ms] ease-out group-hover:opacity-[0.06] group-active:opacity-[0.06] group-has-[button:focus-visible]:opacity-[0.06]"
      />

      <div className="relative flex flex-1 flex-col gap-[12px]">
        <div className="flex items-center justify-between gap-[10px]">
          <span className="font-mono text-[11px] font-medium leading-none tracking-[0.14em] text-mi-lavender">
            {taller.codigo}
          </span>
          <EstadoTag taller={taller} />
        </div>

        {libre ? (
          <>
            <span className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.12em] text-muted-3">
              {"// MÓDULO SIN ASIGNAR_"}
            </span>
            <div aria-hidden className="flex flex-col gap-[8px] pt-[2px]">
              <span className="block h-[8px] w-[72%] bg-line" />
              <span className="block h-[8px] w-[92%] bg-line" />
              <span className="block h-[8px] w-[48%] bg-line" />
            </div>
          </>
        ) : (
          <>
            <h3 className="m-0 font-mono text-[13px] font-bold uppercase leading-[1.3] tracking-[0.06em] text-content">
              {taller.titulo}
            </h3>
            {taller.descripcion ? (
              <p className="m-0 line-clamp-3 font-mono text-[11.5px] leading-[1.6] text-muted [text-wrap:pretty]">
                {taller.descripcion}
              </p>
            ) : null}
          </>
        )}

        <div className="mt-auto flex flex-col gap-[7px] border-t border-line pt-[10px]">
          <MetaRow label="Nivel" value={taller.nivel} />
          <MetaRow label="Duración" value={taller.duracion} />
          <MetaRow label="Cupos" value={taller.cupos} />

          <span
            aria-hidden
            className="mt-[3px] flex items-center justify-end gap-[6px] font-mono text-[10px] font-medium uppercase leading-none tracking-[0.12em] text-muted-3 transition-colors duration-[170ms] ease-out touch:text-mi-lavender group-hover:text-mi-lavender group-active:text-mi-lavender group-has-[button:focus-visible]:text-mi-lavender"
          >
            {"> VER MÓDULO_"}
            <span className="inline-block transition-transform duration-[170ms] ease-out group-hover:translate-x-[3px] group-has-[button:focus-visible]:translate-x-[3px]">
              →
            </span>
          </span>
        </div>
      </div>

      {/* Toda la tarjeta es área clickeable; el botón real es quien recibe el foco. */}
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={`Ver módulo ${taller.codigo}${taller.titulo ? `: ${taller.titulo}` : " sin asignar"}`}
        onClick={() => onOpen(taller)}
        className="absolute inset-0 z-[2] cursor-pointer outline-none"
      />

      <CornerBrackets
        className={libre ? "border-muted-4" : "border-mi-cyan"}
        corners={["tr", "bl"]}
      />
    </article>
  );
}

function DetalleLista({ titulo, items }: { titulo: string; items?: string[] }) {
  return (
    <section className="flex flex-col gap-[10px]">
      <h3 className="m-0 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-mi-lavender">
        {titulo}
      </h3>
      {items && items.length > 0 ? (
        <ul className="m-0 flex list-none flex-col gap-[8px] p-0">
          {items.map((item) => (
            <li
              key={item}
              className="flex gap-[10px] font-mono text-[11.5px] leading-[1.6] text-muted [text-wrap:pretty]"
            >
              <span aria-hidden className="text-mi-limerick">
                ▸
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="m-0 font-mono text-[11px] uppercase leading-[1.6] tracking-[0.08em] text-muted-4">
          {"// CONTENIDO EN DEFINICIÓN_"}
        </p>
      )}
    </section>
  );
}

function DetallePanel({ taller, onClose }: { taller: Taller; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const cerrarRef = useRef<HTMLButtonElement>(null);
  const tituloId = useId();
  const estado = estadoDe(taller);
  const tieneCurso = estado !== "sin-asignar";

  useDialogoModal({ panelRef, focoInicialRef: cerrarRef, onClose });

  return (
    <div className="fixed inset-0 z-[90] flex justify-end">
      {/* Clic fuera del panel = cerrar. */}
      <div
        aria-hidden
        onClick={onClose}
        className="ail-scrim-in absolute inset-0 cursor-pointer bg-mi-smoky/70 backdrop-blur-[2px]"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={tituloId}
        className="ail-panel-in relative flex h-full w-full flex-col border-l border-mi-cyan bg-surface-raised sm:w-[min(460px,100%)]"
      >
        <header className="flex flex-col gap-[12px] border-b border-line px-[22px] py-[18px]">
          <div className="flex items-center justify-between gap-[10px]">
            <span className="font-mono text-[11px] font-medium leading-none tracking-[0.14em] text-mi-lavender">
              {taller.codigo}
            </span>
            <EstadoTag taller={taller} />
          </div>
          <h2
            id={tituloId}
            className="m-0 font-mono text-[15px] font-bold uppercase leading-[1.3] tracking-[0.06em] text-content"
          >
            {taller.titulo ?? "Módulo sin asignar"}
          </h2>
          <span className="font-mono text-[10px] font-medium uppercase leading-none tracking-[0.14em] text-muted-3">
            {"> DETALLE DEL MÓDULO_"}
          </span>
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-[22px] overflow-y-auto px-[22px] py-[20px]">
          <section className="flex flex-col gap-[10px]">
            <h3 className="m-0 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-mi-lavender">
              Descripción
            </h3>
            {taller.descripcion ? (
              <p className="m-0 font-mono text-[11.5px] leading-[1.6] text-muted [text-wrap:pretty]">
                {taller.descripcion}
              </p>
            ) : (
              <p className="m-0 font-mono text-[11px] uppercase leading-[1.6] tracking-[0.08em] text-muted-4">
                {estado === "sin-asignar"
                  ? "// MÓDULO SIN ASIGNAR_"
                  : "// DESCRIPCIÓN EN DEFINICIÓN_"}
              </p>
            )}
          </section>

          <div className="ail-hud relative flex flex-col gap-[9px] p-[14px] [--ail-hud-border:var(--color-mi-grape)]">
            <MetaRow label="Duración" value={taller.duracion} />
            <MetaRow label="Nivel" value={taller.nivel} />
            <MetaRow label="Cupos" value={taller.cupos} />
            <MetaRow label="Estado" value={ESTADO_LABEL[estado]} />
            <CornerBrackets />
          </div>

          <DetalleLista titulo="Objetivos de aprendizaje" items={taller.objetivos} />
          <DetalleLista titulo="Contenidos / unidades" items={taller.contenidos} />
        </div>

        <footer className="flex flex-col gap-[10px] border-t border-line px-[22px] py-[16px] sm:flex-row sm:items-center">
          {tieneCurso && taller.enlace ? (
            <a
              href={taller.enlace}
              target="_blank"
              rel="noopener noreferrer"
              className="ail-hud flex h-[44px] w-full cursor-pointer items-center justify-center whitespace-nowrap px-[18px] sm:flex-1 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-mi-smoky outline-none transition-colors duration-[170ms] ease-out [--ail-hud-border:var(--color-mi-limerick)] [--ail-hud-cut:8px] [--ail-hud-fill:var(--color-mi-limerick)] hover:text-mi-white hover:[--ail-hud-border:var(--color-mi-lavender)] hover:[--ail-hud-fill:var(--color-mi-lavender)] focus-visible:[--ail-hud-border:var(--color-mi-cyan)] focus-visible:[--ail-hud-bw:2px]"
            >
              {"COMENZAR CURSO_"}
            </a>
          ) : null}
          <button
            ref={cerrarRef}
            type="button"
            onClick={onClose}
            className={`ail-hud flex h-[44px] w-full cursor-pointer items-center justify-center px-[18px] font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-mi-lavender outline-none transition-colors duration-[170ms] ease-out [--ail-hud-border:var(--color-mi-lavender)] [--ail-hud-cut:8px] hover:text-mi-smoky hover:[--ail-hud-fill:var(--color-mi-lavender)] focus-visible:[--ail-hud-border:var(--color-mi-cyan)] focus-visible:[--ail-hud-bw:2px] ${
              tieneCurso ? "sm:w-auto" : "sm:flex-1"
            }`}
          >
            {"VOLVER_"}
          </button>
        </footer>

        <CornerBrackets />
      </div>
    </div>
  );
}

export function TalleresExplorer({ talleres }: { talleres: Taller[] }) {
  const [activo, setActivo] = useState<Taller | null>(null);
  const origenRef = useRef<HTMLElement | null>(null);

  const abrir = useCallback((taller: Taller) => {
    origenRef.current = document.activeElement as HTMLElement | null;
    setActivo(taller);
  }, []);

  const cerrar = useCallback(() => {
    setActivo(null);
    origenRef.current?.focus();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-3">
        {talleres.map((taller) => (
          <ModuloCard key={taller.codigo} taller={taller} onOpen={abrir} />
        ))}
      </div>

      {activo ? <DetallePanel key={activo.codigo} taller={activo} onClose={cerrar} /> : null}
    </>
  );
}

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

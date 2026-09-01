"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLES = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Comportamiento compartido de los paneles de detalle (talleres y proyectos):
 * foco inicial, foco atrapado con Tab, cierre con Escape y bloqueo del scroll
 * de fondo mientras el panel está abierto.
 */
export function useDialogoModal({
  panelRef,
  focoInicialRef,
  onClose,
}: {
  panelRef: RefObject<HTMLDivElement | null>;
  focoInicialRef: RefObject<HTMLElement | null>;
  onClose: () => void;
}) {
  useEffect(() => {
    focoInicialRef.current?.focus();

    // Bloqueo de scroll de fondo. `overflow: hidden` por sí solo no basta en
    // Safari de iOS: hay que fijar el body y reponer la posición al cerrar.
    const scrollY = window.scrollY;
    const previo = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLES);
      if (focusables.length === 0) return;

      const primero = focusables[0];
      const ultimo = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === primero) {
        event.preventDefault();
        ultimo.focus();
      } else if (!event.shiftKey && document.activeElement === ultimo) {
        event.preventDefault();
        primero.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previo.overflow;
      document.body.style.position = previo.position;
      document.body.style.top = previo.top;
      document.body.style.width = previo.width;
      window.scrollTo(0, scrollY);
    };
  }, [onClose, panelRef, focoInicialRef]);
}

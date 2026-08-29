"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "ail-theme";
const listeners = new Set<() => void>();

let pattern = 0;

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function isDark() {
  return (
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark")
  );
}

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  listeners.forEach((cb) => cb());
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  const toggle = () => {
    const next = !dark;
    const root = document.documentElement;

    const wipe = document.createElement("div");
    wipe.className = `ail-cp-wipe ail-cp-wipe--p${(pattern % 4) + 1}`;
    pattern = (pattern + 1) % 4;
    root.appendChild(wipe);

    root.classList.add("ail-cp-glitch");
    const finish = () => {
      wipe.remove();
      root.classList.remove("ail-cp-glitch");
    };
    wipe.addEventListener("animationend", finish, { once: true });

    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // storage no disponible (p. ej. entorno de previews): sólo aplicar clase
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={dark ? "Modo claro" : "Modo oscuro"}
      className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] border border-white/20 text-white hover:border-limerick hover:text-limerick"
    >
      {dark ? <Sun size={14} strokeWidth={2} /> : <Moon size={14} strokeWidth={2} />}
    </button>
  );
}
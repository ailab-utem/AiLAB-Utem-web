import type { ReactNode } from "react";

type StatusPillProps = {
  tone?: "default" | "signal";
  live?: boolean;
  children: ReactNode;
};

export function StatusPill({ tone = "default", live = false, children }: StatusPillProps) {
  const bg = tone === "signal" ? "bg-limerick" : "bg-cybergrape";
  const text = tone === "signal" ? "text-smoky" : "text-white";

  return (
    <div
      className={`ail-hud-clip [--ail-hud-cut:8px] inline-flex w-fit items-center gap-[8px] h-[28px] px-[14px] font-mono font-medium text-[11px] leading-none tracking-[0.08em] uppercase ${bg} ${text}`}
    >
      <span
        className={`w-[6px] h-[6px] rounded-full bg-current ${live ? "animate-[ail-blink_1.1s_linear_infinite]" : ""}`}
      />
      {children}
    </div>
  );
}

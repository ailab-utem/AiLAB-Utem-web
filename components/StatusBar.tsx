type StatusBarProps = {
  label: string;
  percent: number;
  value: string;
  tone?: "default" | "signal";
};

export function StatusBar({ label, percent, value, tone = "default" }: StatusBarProps) {
  const fill = tone === "signal" ? "bg-limerick" : "bg-smoky";
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div className="flex flex-col gap-[6px]">
      <div className="flex items-baseline justify-between font-mono text-[11px] leading-none tracking-[0.06em] uppercase text-smoky">
        <span>{label}</span>
        <span className="text-ink-300">{value}</span>
      </div>
      <div className="h-[16px] w-full border border-ink-600 bg-paper-raised">
        <div className={`h-full ${fill}`} style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}

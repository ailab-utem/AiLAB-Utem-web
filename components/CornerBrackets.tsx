export function CornerBrackets({
  className,
  alternate,
}: {
  className?: string;
  alternate?: boolean;
}) {
  const c = className ?? "border-cyan";
  const colors = alternate
    ? ["border-cyan", "border-content", "border-content", "border-cyan"]
    : [c, c, c, c];
  const base = "pointer-events-none absolute h-[10px] w-[10px]";
  return (
    <>
      <span
        aria-hidden
        className={`${base} left-[1px] top-[1px] border-l-2 border-t-2 ${colors[0]}`}
      />
      <span
        aria-hidden
        className={`${base} right-[1px] top-[1px] border-r-2 border-t-2 ${colors[1]}`}
      />
      <span
        aria-hidden
        className={`${base} bottom-[1px] left-[1px] border-b-2 border-l-2 ${colors[2]}`}
      />
      <span
        aria-hidden
        className={`${base} bottom-[1px] right-[1px] border-b-2 border-r-2 ${colors[3]}`}
      />
    </>
  );
}
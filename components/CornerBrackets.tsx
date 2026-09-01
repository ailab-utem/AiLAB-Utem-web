/** Esquinas del recuadro, en el orden en que se dibujan. */
export type Corner = "tl" | "tr" | "bl" | "br";

const ALL_CORNERS: Corner[] = ["tl", "tr", "bl", "br"];

const EDGES: Record<Corner, string> = {
  tl: "left-[1px] top-[1px] border-l-2 border-t-2",
  tr: "right-[1px] top-[1px] border-r-2 border-t-2",
  bl: "bottom-[1px] left-[1px] border-b-2 border-l-2",
  br: "bottom-[1px] right-[1px] border-b-2 border-r-2",
};

export function CornerBrackets({
  className,
  alternate,
  corners,
}: {
  className?: string;
  alternate?: boolean;
  /**
   * Esquinas a dibujar. Por defecto las cuatro. Sirve para omitir las que
   * lleven un corte a 45 grados (`.ail-hud`), donde el marco quedaría partido.
   */
  corners?: Corner[];
}) {
  const c = className ?? "border-cyan";
  const colors: Record<Corner, string> = alternate
    ? { tl: "border-cyan", tr: "border-content", bl: "border-content", br: "border-cyan" }
    : { tl: c, tr: c, bl: c, br: c };
  const base = "pointer-events-none absolute h-[10px] w-[10px]";
  const visibles = corners ?? ALL_CORNERS;

  return (
    <>
      {ALL_CORNERS.filter((corner) => visibles.includes(corner)).map((corner) => (
        <span
          key={corner}
          aria-hidden
          className={`${base} ${EDGES[corner]} ${colors[corner]}`}
        />
      ))}
    </>
  );
}

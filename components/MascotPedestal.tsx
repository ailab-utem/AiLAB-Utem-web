const CX = 250;
const CY = 110;
const RX = 190;
const RY = 38;

const RADIAL_TICKS = Array.from({ length: 16 }, (_, i) => {
  const a = (i * 22.5 * Math.PI) / 180;
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  const x1 = CX + RX * cos;
  const y1 = CY - RY * sin;
  const d = 9;
  const x2 = CX + (RX + d) * cos;
  const y2 = y1 + d * (RY / RX) * sin;
  return { x1, y1, x2, y2 };
});

export function MascotPedestal() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 500 150"
      className="mascot-ped pointer-events-none absolute bottom-[84px] left-[60%] z-[1] h-auto w-[min(400px,80%)] -translate-x-1/2 font-mono"
    >
<g stroke="#4dd9e8" fill="none" strokeWidth={1}>
        <ellipse cx={CX} cy={CY} rx={RX} ry={RY} opacity={0.85} />
        <ellipse cx={CX} cy={CY} rx={132} ry={26} opacity={0.6} />

        <ellipse
          className="mascot-ped-spin"
          cx={CX}
          cy={CY}
          rx={164}
          ry={32}
          strokeDasharray="6 14"
          opacity={0.8}
        />

        <line
          x1={CX - 120}
          y1={CY}
          x2={CX + 120}
          y2={CY}
          strokeDasharray="2 6"
          opacity={0.45}
        />

        <polyline points="60,108 26,98 18,96" opacity={0.85} />
        <polyline points="440,104 474,92 482,90" opacity={0.85} />
        <line x1={60} y1={108} x2={CX - RX} y2={110} opacity={0.6} />
        <line x1={440} y1={104} x2={CX + RX} y2={110} opacity={0.6} />

        {RADIAL_TICKS.map((t, i) => (
          <line key={`t-${i}`} {...t} opacity={0.8} />
        ))}
      </g>

      <g fill="#4dd9e8" stroke="#4dd9e8">
        <circle cx={18} cy={96} r={2.5} />
        <circle cx={482} cy={90} r={2.5} />
      </g>

      <g
        stroke="none"
        fill="#4dd9e8"
        opacity={0.95}
        fontSize={9}
        fontWeight={500}
        style={{ letterSpacing: "0.18em" }}
      >
        <text x={12} y={90} textAnchor="start">
          NODE_ANCHOR
        </text>
        <text x={488} y={82} textAnchor="end">
          X:042 Y:017
        </text>
        <text x={CX} y={140} textAnchor="middle" fontSize={8}>
          AZM:015°
        </text>
      </g>
    </svg>
  );
}
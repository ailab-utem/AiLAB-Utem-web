interface BgNode {
  x: number;
  y: number;
  accent?: "cyan" | "lime";
}

const BG_NODES: BgNode[] = [
  { x: 80, y: 30 },
  { x: 220, y: 18 },
  { x: 400, y: 42 },
  { x: 560, y: 28 },
  { x: 760, y: 20 },
  { x: 900, y: 45, accent: "lime" },
  { x: 18, y: 150, accent: "lime" },
  { x: 22, y: 320 },
  { x: 15, y: 480 },
  { x: 430, y: 120 },
  { x: 480, y: 300, accent: "cyan" },
  { x: 560, y: 180 },
  { x: 520, y: 430 },
  { x: 620, y: 480 },
  { x: 660, y: 260 },
  { x: 120, y: 560 },
  { x: 340, y: 575 },
  { x: 600, y: 585, accent: "cyan" },
  { x: 820, y: 560 },
  { x: 880, y: 240 },
  { x: 920, y: 420 },
  { x: 750, y: 130 },
];

const NET_LINKS: Array<[number, number]> = (() => {
  const seen = new Set<string>();
  const links: Array<[number, number]> = [];
  BG_NODES.forEach((n, i) => {
    const nearest = BG_NODES.map((m, j) => ({
      j,
      d: (m.x - n.x) ** 2 + (m.y - n.y) ** 2,
    }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 3);
    for (const { j } of nearest) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!seen.has(key)) {
        seen.add(key);
        links.push([i, j]);
      }
    }
  });
  return links;
})();

const NET_COLORS = {
  cyan: "#4DD9E8",
  lime: "#D4FF3D",
};

export function NeuralBackdrop() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    >
      <g stroke="var(--ail-net-line)" strokeWidth={1} opacity={0.1}>
        {NET_LINKS.map(([a, b], i) => (
          <line
            key={i}
            x1={BG_NODES[a].x}
            y1={BG_NODES[a].y}
            x2={BG_NODES[b].x}
            y2={BG_NODES[b].y}
          />
        ))}
      </g>

      {BG_NODES.map((n, i) => {
        const color = n.accent ? NET_COLORS[n.accent] : undefined;
        const r = color ? 4.5 : 3 + (i % 3) * 0.5;
        return (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={r}
            fill={color ?? "var(--ail-net-node)"}
            opacity={color ? 0.3 : 0.18}
          />
        );
      })}
    </svg>
  );
}
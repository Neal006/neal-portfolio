/* Seeded generative artwork per project: a dot-field "terrain" whose dots
   swell where a hashed noise field peaks. Deterministic, so SSR == client. */

const COLS = 22;
const ROWS = 14;
const GAP = 20;

function seedFrom(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

function rng(seed: number): () => number {
  let s = seed || 1;
  return () => {
    s = (Math.imul(s ^ (s >>> 15), 1 | s) + 0x6d2b79f5) | 0;
    return ((s ^ (s >>> 14)) >>> 0) / 4294967296;
  };
}

export default function ProjectArt({ slug }: { slug: string }) {
  const rand = rng(seedFrom(slug));
  const peaks = Array.from({ length: 3 }, () => ({ x: rand() * COLS, y: rand() * ROWS, r: 3 + rand() * 5 }));
  const tilt = rand() * 0.6 - 0.3;

  const dots = [];
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const h = peaks.reduce((s, p) => s + Math.exp(-((x - p.x) ** 2 + (y - p.y) ** 2) / (p.r * p.r)), 0);
      const wave = 0.5 + 0.5 * Math.sin((x + y * tilt) * 0.55);
      const v = Math.min(1, h * 0.85 + wave * 0.12);
      dots.push(
        <circle
          key={`${x}-${y}`}
          cx={x * GAP + GAP / 2}
          cy={y * GAP + GAP / 2}
          r={(0.8 + v * 6.2).toFixed(2)}
          fill={v > 0.62 ? "var(--ember)" : "var(--text)"}
          opacity={(v > 0.62 ? 0.35 + v * 0.65 : 0.08 + v * 0.35).toFixed(3)}
        />,
      );
    }
  }

  return (
    <svg
      viewBox={`0 0 ${COLS * GAP} ${ROWS * GAP}`}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {dots}
    </svg>
  );
}

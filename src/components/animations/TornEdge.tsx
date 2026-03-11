export default function TornEdge({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className={`w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""}`}
      style={{
        height: 60,
        marginTop: flip ? -2 : 0,
        marginBottom: flip ? 0 : -2,
        position: "absolute",
        bottom: flip ? undefined : 0,
        top: flip ? 0 : undefined,
        left: 0,
        right: 0,
      }}
    >
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <path
          d="M0,0 L0,35 Q40,55 80,30 Q120,10 160,40 Q200,60 240,35 Q280,15 320,45
             Q360,60 400,30 Q440,8  480,38 Q520,58 560,28 Q600,5  640,42
             Q680,60 720,30 Q760,5  800,40 Q840,60 880,28 Q920,5  960,42
             Q1000,60 1040,28 Q1080,3 1120,38 Q1160,58 1200,25 Q1240,5 1280,40
             Q1320,60 1360,30 Q1400,8 1440,35 L1440,0 Z"
          fill="var(--bg)"
        />
      </svg>
    </div>
  );
}

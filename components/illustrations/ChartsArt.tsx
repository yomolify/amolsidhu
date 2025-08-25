export default function ChartsArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 420"
      className={className}
      role="img"
      aria-label="Charts"
    >
      <rect
        width="800"
        height="420"
        rx="16"
        fill="currentColor"
        opacity="0.05"
      />
      {/* grid */}
      {[...Array(5)].map((_, i) => (
        <line
          key={i}
          x1="60"
          x2="740"
          y1={120 + i * 50}
          y2={120 + i * 50}
          stroke="currentColor"
          opacity="0.08"
        />
      ))}
      {/* bars */}
      {[100, 140, 180, 130, 200, 160].map((h, i) => (
        <rect
          key={i}
          x={90 + i * 90}
          y={300 - h}
          width="26"
          height={h}
          rx="6"
          fill="currentColor"
          opacity="0.16"
        />
      ))}
      {/* line */}
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.45"
        points="80,260 160,220 240,190 320,210 400,170 480,190 560,150 640,165 720,140"
      />
      {/* dots */}
      {[160, 240, 320, 400, 480, 560, 640, 720].map((x, i) => (
        <circle
          key={i}
          cx={x}
          cy={[220, 190, 210, 170, 190, 150, 165, 140][i]}
          r="4"
          fill="currentColor"
          opacity="0.7"
        />
      ))}
    </svg>
  );
}

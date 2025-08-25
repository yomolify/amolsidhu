export default function KanbanArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 420"
      className={className}
      role="img"
      aria-label="Kanban board"
    >
      <rect
        width="800"
        height="420"
        rx="16"
        fill="currentColor"
        opacity="0.05"
      />
      {/* columns */}
      {[60, 290, 520].map((x, i) => (
        <rect
          key={i}
          x={x}
          y="60"
          width="200"
          height="300"
          rx="14"
          fill="currentColor"
          opacity="0.08"
        />
      ))}
      {/* cards */}
      {[
        { x: 80, y: 90 },
        { x: 80, y: 150 },
        { x: 80, y: 220 },
        { x: 310, y: 90 },
        { x: 310, y: 170 },
        { x: 540, y: 120 },
        { x: 540, y: 190 },
        { x: 540, y: 260 },
      ].map((c, i) => (
        <rect
          key={i}
          x={c.x}
          y={c.y}
          width="160"
          height="44"
          rx="10"
          fill="currentColor"
          opacity="0.18"
        />
      ))}
      {/* drag handle icon */}
      <circle cx="670" cy="320" r="12" fill="currentColor" opacity="0.22" />
      <rect
        x="664"
        y="314"
        width="12"
        height="2"
        rx="1"
        fill="white"
        opacity="0.8"
      />
      <rect
        x="664"
        y="318"
        width="12"
        height="2"
        rx="1"
        fill="white"
        opacity="0.8"
      />
      <rect
        x="664"
        y="322"
        width="12"
        height="2"
        rx="1"
        fill="white"
        opacity="0.8"
      />
    </svg>
  );
}

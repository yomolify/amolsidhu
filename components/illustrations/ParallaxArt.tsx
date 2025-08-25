export default function ParallaxArt({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 800 420"
      className={className}
      role="img"
      aria-label="Parallax layers"
    >
      <rect
        width="800"
        height="420"
        rx="16"
        fill="currentColor"
        opacity="0.05"
      />
      <path
        d="M0,320 C120,270 220,330 360,300 C520,265 640,320 800,280 L800,420 L0,420 Z"
        fill="currentColor"
        opacity="0.10"
      />
      <path
        d="M0,300 C140,260 260,300 400,280 C560,255 670,300 800,260 L800,420 L0,420 Z"
        fill="currentColor"
        opacity="0.14"
      />
      <path
        d="M0,285 C150,250 300,270 460,260 C620,250 720,270 800,240 L800,420 L0,420 Z"
        fill="currentColor"
        opacity="0.18"
      />
      {/* floating sun/dot */}
      <circle cx="140" cy="120" r="10" fill="currentColor" opacity="0.35" />
      <circle cx="620" cy="90" r="6" fill="currentColor" opacity="0.25" />
    </svg>
  );
}

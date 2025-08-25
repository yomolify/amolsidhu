export default function StarfieldOverlay({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 800 420"
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden
    >
      <g className="animate-card-drift group-hover:animate-card-drift-fast">
        {/* a lightweight, repeating star tile */}
        <defs>
          <pattern
            id="star-tile"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="20"
              cy="30"
              r="1.4"
              fill="currentColor"
              opacity="0.55"
            />
            <circle
              cx="70"
              cy="20"
              r="1.2"
              fill="currentColor"
              opacity="0.40"
            />
            <circle
              cx="55"
              cy="65"
              r="1.6"
              fill="currentColor"
              opacity="0.50"
            />
            <circle
              cx="15"
              cy="80"
              r="1.0"
              fill="currentColor"
              opacity="0.35"
            />
            <circle
              cx="85"
              cy="75"
              r="1.3"
              fill="currentColor"
              opacity="0.45"
            />
          </pattern>
        </defs>
        <rect x="0" y="0" width="800" height="420" fill="url(#star-tile)" />
      </g>
    </svg>
  );
}

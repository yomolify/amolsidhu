export default function HomepageArt({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 800 420"
      className={className}
      role="img"
      aria-label="Homepage layout"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* very soft neutral background */}
      <rect
        width="800"
        height="420"
        rx="0"
        fill="currentColor"
        opacity="0.02"
      />

      {/* Nav bar */}
      <rect
        x="40"
        y="40"
        width="720"
        height="36"
        rx="8"
        fill="currentColor"
        opacity="0.15"
      />
      {/* Hero left */}
      <rect
        x="40"
        y="100"
        width="360"
        height="140"
        rx="12"
        fill="currentColor"
        opacity="0.15"
      />
      {/* Hero right blocks */}
      <rect
        x="420"
        y="100"
        width="340"
        height="64"
        rx="10"
        fill="currentColor"
        opacity="0.1"
      />
      <rect
        x="420"
        y="172"
        width="260"
        height="40"
        rx="8"
        fill="currentColor"
        opacity="0.1"
      />
      {/* Cards */}
      <rect
        x="40"
        y="260"
        width="210"
        height="110"
        rx="12"
        fill="currentColor"
        opacity="0.12"
      />
      <rect
        x="260"
        y="260"
        width="210"
        height="110"
        rx="12"
        fill="currentColor"
        opacity="0.12"
      />
      <rect
        x="480"
        y="260"
        width="210"
        height="110"
        rx="12"
        fill="currentColor"
        opacity="0.12"
      />
    </svg>
  );
}
